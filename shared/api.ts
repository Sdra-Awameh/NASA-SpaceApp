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
 * Event API response type for /api/events
 */
export interface EventResponse {
  title: string;
  date: string;
  location: {
    lat: number;
    lon: number;
  };
}

/**
 * Media API response type for /api/media
 */
export interface MediaResponse {
  title: string;
  url: string;
  date: string;
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
 * Probability API response type for /api/probability
 */
export interface ProbabilityResponse {
  rainProbability: number;
  heatwaveProbability: number;
  windyDayProbability: number;
  avgTemperature: number;
}
