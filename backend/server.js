import "dotenv/config";
import { createApp } from "./src/app.js";
import { connectDB } from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

async function start() {
  // Connecting to MongoDB is awaited but non-fatal — the server still
  // starts (and /api/health still works) even if the DB is unreachable,
  // so a misconfigured .env doesn't take the whole API down.
  await connectDB();

  const app = createApp();
  app.listen(PORT, () => {
    console.log(`[server] Listening on http://localhost:${PORT}`);
  });
}

start();
