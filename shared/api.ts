/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 * ! Stubs *partially*
 */

export interface DemoResponse {
  message: string;
}

/**
 * Weather API response type for /api/weather
 */
export interface WeatherResponse {
  temperature: number;
  rainProbability: number;
  windSpeed: number;
  humidity: number;
}

/**
 * Weather API query parameters
 */
export interface WeatherQueryParams {
  lat: string;
  lon: string;
  date?: string;
}

/**
 * Event types and severity levels
 */
export type EventType = "solar-flare" | "asteroid" | "storm" | "earthquake" | "heatwave" | "flood" | "wildfire";
export type SeverityLevel = "low" | "medium" | "high";

/**
 * Event API response type for /api/events
 */
export interface EventResponse {
  id: number;
  type: EventType;
  name: string; 
  probability: number; // %
  severity: SeverityLevel;
  location: {
    lat: number;
    lon: number;
  };
  date: string;
  description: string;
}

/**
 * Media API response type for /api/media
 */
export interface MediaResponse {
  title: string;
  url: string;
  date: string;
  description?: string;
}

/**
 * Probability API response type for /api/probability
 */
export interface ProbabilityResponse {
  location: { lat: number; lon: number };
  date: string;
  probability: number;
  details?: {
    model: string;
    confidence: number;
  };
  rainProbability?: number;
  heatwaveProbability?: number;
  windyDayProbability?: number;
  avgTemperature?: number;
}