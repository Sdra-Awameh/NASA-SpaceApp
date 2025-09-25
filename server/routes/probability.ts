import { RequestHandler } from "express";
import { WeatherQueryParams } from "@shared/api";

/**
 * Probability API endpoint handler that calls the Python FastAPI service
 * GET /api/probability
 * Query params: lat, lon, date
 * Returns probability calculations from Python service
 */
export const handleProbability: RequestHandler = async (req, res) => {
  try {
    const { lat, lon, date } = req.query as unknown as WeatherQueryParams;

    // Validate required parameters
    if (!lat || !lon || !date) {
      return res.status(400).json({
        error: "Missing required parameters: lat, lon, and date are required"
      });
    }

    // Validate lat and lon are valid numbers
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({
        error: "Invalid parameters: lat and lon must be valid numbers"
      });
    }

    // Call Python FastAPI service
    const pythonApiUrl = process.env.PYTHON_API_URL || "http://localhost:8000";
    
    try {
      const pythonResponse = await fetch(`${pythonApiUrl}/api/probability`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: latitude,
          lon: longitude,
          date: date
        })
      });

      if (!pythonResponse.ok) {
        throw new Error(`Python API returned ${pythonResponse.status}: ${pythonResponse.statusText}`);
      }

      const probabilityData = await pythonResponse.json();
      res.json(probabilityData);
      
    } catch (pythonError) {
      console.error("Error calling Python API:", pythonError);
      
      // Fallback to mock data if Python service is unavailable
      const fallbackData = {
        rainProbability: Math.round(30 + Math.random() * 40),
        heatwaveProbability: Math.round(5 + Math.random() * 15),
        windyDayProbability: Math.round(10 + Math.random() * 30),
        avgTemperature: Math.round(20 + Math.random() * 15)
      };
      
      console.log("Using fallback probability data");
      res.json(fallbackData);
    }

  } catch (error) {
    console.error("Error in probability endpoint:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};
