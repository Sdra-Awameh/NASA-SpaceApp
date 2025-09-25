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
        title: "Storm",
        date: "2023-06-10",
        location: {
          lat: 35.9,
          lon: 31.9
        }
      },
      {
        title: "Heatwave",
        date: "2023-06-12",
        location: {
          lat: 35.9,
          lon: 31.9
        }
      },
      {
        title: "Earthquake",
        date: "2023-06-15",
        location: {
          lat: 34.0,
          lon: -118.2
        }
      },
      {
        title: "Flood",
        date: "2023-06-18",
        location: {
          lat: 40.7,
          lon: -74.0
        }
      },
      {
        title: "Wildfire",
        date: "2023-06-20",
        location: {
          lat: 37.8,
          lon: -122.4
        }
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
        event.title.toLowerCase().includes(eventTypeStr)
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
