// Load .env from the artifact directory before anything else.
// dotenv silently no-ops when the file is absent (Replit injects env vars
// through its own mechanism, so .env is only present in local dev).
import "dotenv/config";
import app from "./app";
import { logger } from "./lib/logger";

// On Replit PORT is injected by the artifact system.
// Locally it falls back to 3000 so the server starts without any extra setup.
const rawPort = process.env.PORT || "3000";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
