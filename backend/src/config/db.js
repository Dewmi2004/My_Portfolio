import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.warn("[db] MONGO_URI is not set — contact messages cannot be saved.");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("[db] MongoDB connected");
  } catch (err) {
    console.error("[db] MongoDB connection failed:", err.message);
    console.warn("[db] The API will keep running, but /api/contact will return an error until the database is reachable.");
  }
}

export function isDbConnected() {
  return mongoose.connection.readyState === 1;
}
