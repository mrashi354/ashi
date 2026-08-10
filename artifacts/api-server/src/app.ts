import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import path from "path";
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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// In production, serve the frontend build
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development") {
  // Handle __dirname being in src or dist
  const baseDir = __dirname.endsWith('dist') || __dirname.endsWith('src') ? path.join(__dirname, '..') : __dirname;
  
  // Since we are in api-server, the frontend is at ../brdm-school
  const frontendDistPath = path.resolve(baseDir, "..", "brdm-school", "dist", "public");
  
  app.use(express.static(frontendDistPath));
  app.use((req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

export default app;
