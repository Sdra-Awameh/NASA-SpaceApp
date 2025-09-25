import { RequestHandler } from "express";
import { WeatherResponse, WeatherQueryParams } from "@shared/api";

/**
 * Weather API endpoint handler
 * GET /api/weather
 * Query params: lat, lon, date (optional)
 * Returns mock historical weather data
 */
export const handleWeather: RequestHandler = (req, res) => {
  try {
    const { lat, lon, date } = req.query as unknown as WeatherQueryParams;

    // Validate required parameters
    if (!lat || !lon) {
      return res.status(400).json({
        error: "Missing required parameters: lat and lon are required"
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

    // Generate mock weather data based on location and date
    const baseTemp = 20 + Math.sin(latitude * Math.PI / 180) * 10; // Temperature varies with latitude
    const seasonalVariation = date ? Math.sin(new Date(date).getMonth() * Math.PI / 6) * 5 : 0;
    
    const weatherData: WeatherResponse = {
      temperature: Math.round(baseTemp + seasonalVariation + (Math.random() - 0.5) * 4),
      rainProbability: Math.round(30 + Math.sin(latitude * Math.PI / 180 + longitude * Math.PI / 180) * 20 + Math.random() * 20),
      windSpeed: Math.round(5 + Math.random() * 15),
      humidity: Math.round(60 + Math.random() * 30)
    };

    res.json(weatherData);
  } catch (error) {
    console.error("Error in weather endpoint:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};
