import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleWeather } from "./routes/weather";
import { handleEvents } from "./routes/events";
import { handleMedia } from "./routes/media";
import { handleProbability } from "./routes/probability";

export function createServer() {
  const app = express();

  // CORS configuration - allow frontend access
  app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
  }));
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logging middleware
  app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path} - ${req.ip}`);
    next();
  });

  // Health check endpoint
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // ChronoCast API endpoints
  app.get("/api/weather", handleWeather);
  app.get("/api/events", handleEvents);
  app.get("/api/media", handleMedia);
  app.get("/api/probability", handleProbability);

  // Legacy demo endpoint
  app.get("/api/demo", handleDemo);

  return app;
}
