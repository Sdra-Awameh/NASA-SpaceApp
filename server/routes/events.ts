import { RequestHandler } from "express";
import { EventResponse } from "@shared/api";

/**
 * Events API endpoint handler
 * GET /api/events
 * Returns mock natural events data
 */
export const handleEvents: RequestHandler = (req, res) => {
  try {
    // Mock natural events data
    const eventsData: EventResponse[] = [
      {
        id: 1,
        type: "solar-flare",
        name: "Solar Flare M-Class",
        probability: 75,
        severity: "medium",
        location: { lat: 31.9539, lon: 35.9106 },
        date: "2025-09-24",
        description: "Moderate solar flare expected to impact satellite communications"
      },
      {
        id: 2,
        type: "asteroid",
        name: "Asteroid 2023 DW Close Approach",
        probability: 45,
        severity: "low",
        location: { lat: 25.2048, lon: 55.2708 },
        date: "2025-09-25",
        description: "Near-Earth asteroid will make close approach"
      },
      {
        id: 3,
        type: "storm",
        name: "Hurricane Formation",
        probability: 85,
        severity: "high",
        location: { lat: 25.7617, lon: -80.1918 }, // unchanged
        date: "2025-09-26",
        description: "Tropical storm formation predicted in Atlantic Ocean"
      },
      {
        id: 4,
        type: "heatwave",
        name: "Heatwave M-Class",
        probability: 90,
        severity: "high",
        location: { lat: 25.7617, lon: -80.1918 },
        date: "2025-09-26",
        description: "Heatwave conditions expected in Florida"
      }
    ];

    // Support query parameters for filtering
    const { location, date, eventType } = req.query;

    let filteredEvents = [...eventsData];

    // Filter by location if provided
    if (location) {
      const locationStr = location.toString().toLowerCase();
      filteredEvents = filteredEvents.filter(event =>
        event.location.lat.toString().includes(locationStr) ||
        event.location.lon.toString().includes(locationStr)
      );
    }

    // Filter by date if provided
    if (date) {
      filteredEvents = filteredEvents.filter(event =>
        event.date.includes(date.toString())
      );
    }

    // Filter by event type if provided
    if (eventType) {
      const eventTypeStr = eventType.toString().toLowerCase();
      filteredEvents = filteredEvents.filter(event =>
        event.type.toLowerCase().includes(eventTypeStr)
      );
    }

    res.json(filteredEvents);
  } catch (error) {
    console.error("Error in events endpoint:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};