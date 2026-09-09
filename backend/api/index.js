import "dotenv/config";
import { createApp } from "../src/app.js";
import { connectDB } from "../src/config/db.js";

// Vercel reuses a "warm" serverless instance across nearby requests, so we
// cache both the DB connection attempt and the Express app across
// invocations instead of reconnecting/rebuilding on every request.
let appPromise;

function getApp() {
  if (!appPromise) {
    appPromise = connectDB().then(() => createApp());
  }
  return appPromise;
}

export default async function handler(req, res) {
  const app = await getApp();
  return app(req, res);
}
