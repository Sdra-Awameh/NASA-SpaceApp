# ChronoCast Python Probability Engine

A FastAPI service that calculates weather probabilities based on historical and mock data. This service is part of the ChronoCast multi-service architecture and handles probability calculations for the Node.js API aggregator.

## Architecture

This service is designed to work within the ChronoCast ecosystem:
```
React Frontend → Node.js Backend → Python FastAPI → Node.js Backend → React Frontend
```

## Features

- **Probability Calculations**: Calculate rain, heatwave, and windy day probabilities
- **Location-Based Logic**: Uses latitude/longitude for realistic calculations
- **Seasonal Variations**: Considers date for seasonal weather patterns
- **CORS Support**: Configured for Node.js backend integration
- **Type Safety**: Full Pydantic model validation
- **Health Checks**: Built-in health monitoring endpoints
- **Docker Ready**: Containerized deployment support

## API Endpoints

### POST /api/probability

Calculate weather probabilities based on location and date.

**Request Body:**
```json
{
  "lat": 35.9,
  "lon": 31.9,
  "date": "2023-06-10"
}
```

**Response:**
```json
{
  "rainProbability": 40,
  "heatwaveProbability": 10,
  "windyDayProbability": 20,
  "avgTemperature": 26
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "service": "ChronoCast Probability Engine",
  "timestamp": "2023-06-10T10:30:00.000Z"
}
```

### GET /

Root endpoint with service information.

**Response:**
```json
{
  "status": "healthy",
  "service": "ChronoCast Probability Engine",
  "timestamp": "2023-06-10T10:30:00.000Z"
}
```

## Installation & Setup

### Prerequisites
- Python 3.11+
- pip

### Local Development

1. **Navigate to the Python service directory:**
```bash
   cd python-service
```

2. **Create virtual environment:**
```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
   pip install -r requirements.txt
```

4. **Run with uvicorn (development):**
```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

5. **Run with Python directly:**
```bash
   python main.py
```

### Docker Deployment

1. **Build Docker image:**
```bash
   docker build -t chronocast-python .
```

2. **Run container:**
```bash
   docker run -p 8000:8000 chronocast-python
   ```

## Usage Examples

### cURL Examples

```bash
# Health check
curl http://localhost:8000/health

# Calculate probabilities
curl -X POST "http://localhost:8000/api/probability" \
     -H "Content-Type: application/json" \
     -d '{
       "lat": 35.9,
       "lon": 31.9,
       "date": "2023-06-10"
     }'
```

### Python Example

```python
import requests

# Calculate probabilities
response = requests.post(
    "http://localhost:8000/api/probability",
    json={
        "lat": 35.9,
        "lon": 31.9,
        "date": "2023-06-10"
    }
)

probabilities = response.json()
print(f"Rain probability: {probabilities['rainProbability']}%")
print(f"Heatwave probability: {probabilities['heatwaveProbability']}%")
print(f"Windy day probability: {probabilities['windyDayProbability']}%")
print(f"Average temperature: {probabilities['avgTemperature']}°C")
```

### JavaScript/Node.js Example

```javascript
const response = await fetch('http://localhost:8000/api/probability', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    lat: 35.9,
    lon: 31.9,
    date: '2023-06-10'
  })
});

const probabilities = await response.json();
console.log('Probabilities:', probabilities);
```

## Probability Calculation Logic

The service uses sophisticated mathematical models to generate realistic probability distributions:

### Temperature Calculation
- **Base temperature**: 30°C at equator, decreasing to 0°C at poles
- **Seasonal variation**: ±10°C based on month
- **Random variation**: ±3°C for realistic fluctuation

### Rain Probability
- **Tropical factor**: Higher probability near equator (0-40% bonus)
- **Seasonal factor**: Varies with season (±20% variation)
- **Base probability**: 20-80% range

### Heatwave Probability
- **Continental factor**: Higher in continental interiors (0-15% bonus)
- **Summer factor**: Higher during summer months (0-15% bonus)
- **Base probability**: 0-30% range

### Windy Day Probability
- **Geographic factor**: Based on lat/lon patterns (0-25% bonus)
- **Base probability**: 15-40% range

## Error Handling

The API returns appropriate HTTP status codes:

- `200 OK` - Successful calculation
- `400 Bad Request` - Invalid input parameters
- `422 Unprocessable Entity` - Validation errors
- `500 Internal Server Error` - Server-side errors

## Environment Variables

```bash
# Service configuration (optional)
PORT=8000
HOST=0.0.0.0
LOG_LEVEL=info

# CORS origins (optional - defaults to allow all in development)
ALLOWED_ORIGINS=http://localhost:8080,http://localhost:3000
```

## Development

### Code Structure

```bash
python-service/
├── main.py            # FastAPI application
├── requirements.txt   # Python dependencies
├── Dockerfile         # Docker configuration
├── .dockerignore      # Docker ignore file
└── README.md          # This file
```

### Adding New Probability Types

To add new probability calculations:

1. **Add to ProbabilityResponse model:**
   ```python
   class ProbabilityResponse(BaseModel):
       # ... existing fields ...
       newProbability: int = Field(..., description="New probability percentage")
   ```

2. **Update calculation function:**
   ```python
   def calculate_weather_probabilities(lat, lon, date_str):
       # ... existing calculations ...
       new_probability = calculate_new_probability(lat, lon, date_obj)
       
       return ProbabilityResponse(
           # ... existing fields ...
           newProbability=new_probability
       )
   ```

## Integration with Node.js Backend

This service is designed to be called by the Node.js backend. The Node.js service can make HTTP requests to this Python service:

```javascript
// In Node.js backend
const pythonResponse = await fetch('http://localhost:8000/api/probability', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ lat, lon, date })
});

const probabilities = await pythonResponse.json();
```

## Monitoring & Health Checks

The service includes built-in health monitoring:

- **Health endpoint**: `/health` for basic health status
- **Root endpoint**: `/` for service information
- **Docker health check**: Built-in container health monitoring

## License

This project is part of the ChronoCast application suite.
