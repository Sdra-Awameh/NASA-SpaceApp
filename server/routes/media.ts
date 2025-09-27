import { RequestHandler } from "express";
import { MediaResponse } from "@shared/api";

/**
 * Media API endpoint handler
 * GET /api/media
 * Returns one mock image from NASA APIs (APOD)
 */
export const handleMedia: RequestHandler = (req, res) => {
  try {
    // Mock NASA APOD image for dashboard
    const mediaData: MediaResponse = {
      title: "Aurora Over Earth from ISS",
      url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200&h=800&fit=crop",
      date: "2025-09-24"
    };

    res.json(mediaData);
  } catch (error) {
    console.error("Error in media endpoint:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};