from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
import uvicorn
import math
import random
from datetime import datetime

# Create FastAPI app
app = FastAPI(
    title="ChronoCast Probability Engine",
    description="FastAPI service for calculating weather probabilities",
    version="1.0.0"
)

# Configure CORS middleware to allow Node.js backend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",  # Node.js backend
        "http://localhost:3000",  # React frontend
        "*"  # Allow all origins in development
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Request/Response models
class ProbabilityRequest(BaseModel):
    lat: float = Field(..., description="Latitude coordinate", ge=-90, le=90)
    lon: float = Field(..., description="Longitude coordinate", ge=-180, le=180)
    date: str = Field(..., description="Date in YYYY-MM-DD format", pattern=r'^\d{4}-\d{2}-\d{2}$')

class ProbabilityResponse(BaseModel):
    rainProbability: int = Field(..., description="Rain probability percentage (0-100)")
    heatwaveProbability: int = Field(..., description="Heatwave probability percentage (0-100)")
    windyDayProbability: int = Field(..., description="Windy day probability percentage (0-100)")
    avgTemperature: int = Field(..., description="Average temperature in Celsius")

class HealthResponse(BaseModel):
    status: str
    service: str
    timestamp: str

def calculate_weather_probabilities(lat: float, lon: float, date_str: str) -> ProbabilityResponse:
    """
    Calculate mock weather probabilities based on location and date.
    Uses mathematical functions to create realistic-looking probability distributions.
    """
    try:
        # Parse the date
        date_obj = datetime.strptime(date_str, "%Y-%m-%d")
        
        # Base calculations using location and seasonal factors
        seasonal_factor = math.sin((date_obj.month - 1) * math.pi / 6)  # -1 to 1 seasonal variation
        
        # Latitude-based temperature calculation
        latitude_factor = math.cos(lat * math.pi / 180)  # 0 to 1 (equator to pole)
        base_temp = 30 - (latitude_factor * 30)  # 30°C at equator, 0°C at poles
        
        # Seasonal temperature variation
        seasonal_temp = seasonal_factor * 10  # ±10°C seasonal variation
        avg_temperature = int(base_temp + seasonal_temp + random.uniform(-3, 3))
        
        # Rain probability calculation (higher in tropical regions and during certain seasons)
        tropical_factor = 1 - abs(lat / 45)  # Higher near equator
        seasonal_rain = max(0, seasonal_factor + 0.5)  # Rainier in certain seasons
        rain_probability = int(20 + (tropical_factor * 40) + (seasonal_rain * 20) + random.uniform(-10, 10))
        rain_probability = max(0, min(100, rain_probability))
        
        # Heatwave probability (higher in continental interiors and during summer)
        continental_factor = 1 - abs(lon % 180) / 90  # Higher in continental interiors
        summer_factor = max(0, seasonal_factor)  # Higher in summer
        heatwave_probability = int((continental_factor * 15) + (summer_factor * 15) + random.uniform(-5, 5))
        heatwave_probability = max(0, min(100, heatwave_probability))
        
        # Windy day probability (higher in certain geographic regions)
        wind_factor = math.sin(lat * math.pi / 180) + math.cos(lon * math.pi / 180)
        windy_probability = int(15 + (abs(wind_factor) * 25) + random.uniform(-8, 8))
        windy_probability = max(0, min(100, windy_probability))
        
        return ProbabilityResponse(
            rainProbability=rain_probability,
            heatwaveProbability=heatwave_probability,
            windyDayProbability=windy_probability,
            avgTemperature=avg_temperature
        )
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Invalid date format: {str(e)}")

@app.get("/", response_model=HealthResponse)
async def root():
    """Root endpoint - health check"""
    return HealthResponse(
        status="healthy",
        service="ChronoCast Probability Engine",
        timestamp=datetime.now().isoformat()
    )

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        service="ChronoCast Probability Engine",
        timestamp=datetime.now().isoformat()
    )

@app.post("/api/probability", response_model=ProbabilityResponse)
async def calculate_probability(request: ProbabilityRequest):
    """
    Calculate weather probabilities based on location and date.
    
    Args:
        request: ProbabilityRequest with lat, lon, and date
        
    Returns:
        ProbabilityResponse with calculated probabilities
    """
    try:
        probabilities = calculate_weather_probabilities(
            lat=request.lat,
            lon=request.lon,
            date_str=request.date
        )
        return probabilities
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculating probabilities: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
