import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes.js";
import { isDbConnected } from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

export function createApp() {
  const app = express();

  // Vercel (and most hosts) sit behind a proxy — trust the first hop so
  // req.ip and express-rate-limit read the real client IP from
  // X-Forwarded-For instead of the proxy's own address.
  app.set("trust proxy", 1);

  const allowedOrigins = (process.env.FRONTEND_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin(origin, callback) {
        // Allow tools like curl/Postman (no Origin header) and any configured origin.
        if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        callback(new Error("Not allowed by CORS"));
      },
    })
  );

  app.use(express.json({ limit: "20kb" }));

  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      db: isDbConnected() ? "connected" : "disconnected",
      time: new Date().toISOString(),
    });
  });

  app.use("/api/contact", contactRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
