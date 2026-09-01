import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import router from "./routes";
import { logger } from "./lib/logger";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

// Configure CORS based on environment. Allow configured origins plus any
// Vercel deployment host (e.g. *.vercel.app preview/custom/alias domains).
const allowedOrigins = process.env.CORS_ORIGIN?.split(',').map(o => o.trim()).filter(Boolean) || [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://0.0.0.0:3000',
];

const corsOrigin = (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
  if (!origin) {
    callback(null, true);
    return;
  }
  const allows = allowedOrigins.includes(origin) || origin.endsWith('.vercel.app');
  callback(null, allows);
};

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// In production, serve the frontend build only if it exists.
// The frontend is normally hosted separately (e.g. Vercel), so on Render the
// frontend source may not be present and we should serve the API alone.
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development") {
  const baseDir = __dirname.endsWith('dist') || __dirname.endsWith('src') ? path.join(__dirname, '..') : __dirname;
  const frontendDistPath = path.resolve(baseDir, "..", "brdm-school", "dist", "public");
  const indexFile = path.join(frontendDistPath, "index.html");

  if (fs.existsSync(indexFile)) {
    app.use(express.static(frontendDistPath));
    app.use((req, res) => {
      res.sendFile(indexFile);
    });
  }
}

export default app;
