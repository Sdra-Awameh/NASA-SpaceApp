import { RequestHandler } from "express";
import { MediaResponse } from "@shared/api";

/**
 * Media API endpoint handler
 * GET /api/media
 * Returns mock images from NASA APIs (APOD - Astronomy Picture of the Day)
 */
export const handleMedia: RequestHandler = (req, res) => {
  try {
    // Mock NASA APOD data
    const mediaData: MediaResponse[] = [
      {
        title: "APOD Example - Earth from Space",
        url: "https://example.com/apod-earth.jpg",
        date: "2023-06-01"
      },
      {
        title: "APOD Example - Mars Rover",
        url: "https://example.com/apod-mars.jpg",
        date: "2023-06-02"
      },
      {
        title: "APOD Example - Hubble Deep Field",
        url: "https://example.com/apod-hubble.jpg",
        date: "2023-06-03"
      },
      {
        title: "APOD Example - Solar Eclipse",
        url: "https://example.com/apod-eclipse.jpg",
        date: "2023-06-04"
      },
      {
        title: "APOD Example - Aurora Borealis",
        url: "https://example.com/apod-aurora.jpg",
        date: "2023-06-05"
      },
      {
        title: "APOD Example - International Space Station",
        url: "https://example.com/apod-iss.jpg",
        date: "2023-06-06"
      },
      {
        title: "APOD Example - Nebula",
        url: "https://example.com/apod-nebula.jpg",
        date: "2023-06-07"
      }
    ];

    // Support query parameters for filtering
    const { date, title } = req.query;

    let filteredMedia = [...mediaData];

    // Filter by date if provided
    if (date) {
      filteredMedia = filteredMedia.filter(media => 
        media.date.includes(date.toString())
      );
    }

    // Filter by title if provided
    if (title) {
      const titleStr = title.toString().toLowerCase();
      filteredMedia = filteredMedia.filter(media => 
        media.title.toLowerCase().includes(titleStr)
      );
    }

    res.json(filteredMedia);
  } catch (error) {
    console.error("Error in media endpoint:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};
