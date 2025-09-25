# ChronoCast Technical Setup & Architecture

This document contains all **technical details, setup instructions, environment configuration, and troubleshooting** for ChronoCast.  
For a high-level overview, see [README.md](./README.md).

---

## Table of Contents
1. [Quick Start](#quick-start)
2. [Architecture Overview](#architecture-overview)
3. [Project Structure](#project-structure)
4. [Services Overview](#services-overview)
5. [Setup Instructions](#setup-instructions)
6. [API Usage Examples](#api-usage-examples)
7. [Configuration](#configuration)
8. [Testing](#testing)
9. [Monitoring & Health Checks](#monitoring--health-checks)
10. [Production Deployment](#production-deployment)
11. [Troubleshooting](#troubleshooting)

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/rasha-2k/ChronoCast
cd ChronoCast

# Install Node.js dependencies
npm install

# Start Node.js + React dev server
npm run dev

# Start Python service (in separate shell)
cd python-service
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Or, to run everything in Docker:

```bash
docker-compose up --build
```

---

## Architecture Overview

```
┌───────────────┐    ┌─────────────────┐    ┌────────────────────┐
│ React SPA     │ ⇄ │ Node.js API      │ ⇄ │ Python FastAPI     │
│ (client/)     │    │ Aggregator      │    │ Probability Engine │
│ (Port 3000)   │    │ (server/, 8080) │    │ (python-service/,  │
└───────────────┘    └─────────────────┘    │ Port 8000)         │
                                            └────────────────────┘
```

---

## Project Structure

```bash
ChronoCast/
├── client/              # React SPA frontend
│   ├── pages/           # Route components (Landing, Dashboard, About, NotFound)
│   ├── components/ui/   # Pre-built UI component library
│   └── App.tsx          # SPA routing setup
├── server/              # Node.js Express backend
│   ├── index.ts         # Main server setup
│   └── routes/          # API handlers (weather, events, media, probability, demo)
├── python-service/      # Python FastAPI probability engine
│   ├── main.py          # FastAPI application
│   ├── requirements.txt # Python dependencies
│   └── test_api.py      # API testing script
├── shared/              # Shared TypeScript interfaces
│   └── api.ts           # Common types
├── docker-compose.yml   # Multi-container orchestration
├── Dockerfile           # Node.js container config
└── README.md            # Project overview
```

---

## Services Overview

### Node.js API Aggregator (Port 8080)

**Purpose**: Central API aggregation layer that coordinates between frontend and Python service.

**Endpoints**:
- `GET /api/weather` - Weather data with location parameters
- `GET /api/events` - Natural events with filtering
- `GET /api/media` - NASA APOD media data
- `GET /api/probability` - Probability calculations (calls Python service)
- `GET /api/ping` - Health check

**Features**:
- CORS middleware for frontend access
- Request logging with timestamps
- TypeScript with shared interfaces
- Error handling and validation
- Fallback data when Python service unavailable

### Python FastAPI Probability Engine (Port 8000)

**Purpose**: Sophisticated probability calculations using mathematical models.

**Endpoints**:
- `POST /api/probability` - Calculate weather probabilities
- `GET /health` - Health check

**Features**:
- Location-based probability calculations
- Seasonal weather pattern modeling
- Mathematical models for realistic data
- CORS middleware for Node.js integration
- Pydantic validation and type safety

### React SPA Frontend (Port 3000)

**Purpose**: User interface for the ChronoCast application.

**Features**:
- React Router 6 SPA routing
- TailwindCSS 3 styling
- Radix UI components
- TypeScript integration

---

## Setup Instructions

### Prerequisites
- Node.js 18+
- Python 3.11+
- npm or pnpm
- Docker (optional)

### Option 1: Local Development

#### 1. Install Node.js dependencies
```bash
npm install
# or
pnpm install
```

#### 2. Start development server (includes frontend)
```bash
npm run dev
# or
pnpm dev
```

#### 3. Start Python FastAPI service
```bash
cd python-service
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### 4. Build for production
```bash
npm run build
npm start
```

### Option 2: Docker Compose Deployment

#### 1. Start all services together
```bash
docker-compose up --build
```

#### 2. Test containers
```bash
curl http://localhost:8080/api/ping
curl http://localhost:8000/health
```

#### 3. Run individual containers (manual)
```bash
docker build -t chronocast-api .
docker run -p 8080:8080 chronocast-api

cd python-service
docker build -t chronocast-python .
docker run -p 8000:8000 chronocast-python
```

---

## API Usage Examples

### JavaScript/Fetch
```javascript
// Get weather data
const weatherResponse = await fetch('/api/weather?lat=35.9&lon=31.9');
const weatherData = await weatherResponse.json();

// Get events with filtering
const eventsResponse = await fetch('/api/events?eventType=storm');
const eventsData = await eventsResponse.json();

// Get media data
const mediaResponse = await fetch('/api/media?title=earth');
const mediaData = await mediaResponse.json();

// Get probability data (Node.js GET)
const probResponse = await fetch('/api/probability?lat=35.9&lon=31.9&date=2023-06-10');
const probData = await probResponse.json();

// Get probability data (Python POST)
const pyResponse = await fetch('http://localhost:8000/api/probability', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ lat: 35.9, lon: 31.9, date: '2023-06-10' })
});
const pyProbData = await pyResponse.json();
```

### cURL Examples
```bash
# Weather API
curl "http://localhost:8080/api/weather?lat=35.9&lon=31.9&date=2023-06-10"

# Events API
curl "http://localhost:8080/api/events?eventType=storm"

# Media API
curl "http://localhost:8080/api/media?title=earth"

# Probability API (Node.js GET)
curl "http://localhost:8080/api/probability?lat=35.9&lon=31.9&date=2023-06-10"

# Probability API (Python POST)
curl -X POST "http://localhost:8000/api/probability" \
     -H "Content-Type: application/json" \
     -d '{"lat": 35.9, "lon": 31.9, "date": "2023-06-10"}'

# Health check
curl "http://localhost:8080/api/ping"
curl "http://localhost:8000/health"
```

---

## Configuration

### Environment Variables

#### Node.js Backend (`.env` in root or server/)
```env
FRONTEND_URL=http://localhost:3000
PING_MESSAGE=ChronoCast API is running
PORT=8080
NODE_ENV=development
PYTHON_API_URL=http://localhost:8000
```

#### Python Service (`.env` in python-service/)
```env
PORT=8000
HOST=0.0.0.0
LOG_LEVEL=info
ALLOWED_ORIGINS=http://localhost:8080,http://localhost:3000
```

---

## Testing

### Node.js API Testing
```bash
# Test all endpoints
curl "http://localhost:8080/api/ping"
curl "http://localhost:8080/api/weather?lat=35.9&lon=31.9"
curl "http://localhost:8080/api/events"
curl "http://localhost:8080/api/media"
curl "http://localhost:8080/api/probability?lat=35.9&lon=31.9&date=2023-06-10"
```

### Python API Testing
```bash
cd python-service
python test_api.py
```

### Integration Testing
```bash
# Test the full flow: Node.js → Python → Node.js
curl "http://localhost:8080/api/probability?lat=35.9&lon=31.9&date=2023-06-10"
```

---

## Monitoring & Health Checks

### Health Endpoints
- Node.js: `GET http://localhost:8080/api/ping`
- Python: `GET http://localhost:8000/health`

### Docker Health Checks
Both containers include built-in health checks that monitor service availability.

### Logging
- **Node.js**: Request logging with timestamps
- **Python**: FastAPI automatic request logging
- **Docker**: Container logs available via `docker-compose logs`

---

## Production Deployment

### Docker Compose (Recommended)
```bash
docker-compose up -d --build
```

### Individual Containers
```bash
# Node.js
docker build -t chronocast-api .
docker run -d -p 8080:8080 chronocast-api

# Python
cd python-service
docker build -t chronocast-python .
docker run -d -p 8000:8000 chronocast-python
```

### Cloud Deployment
The services are designed to work with:
- **Netlify**: Frontend deployment
- **Vercel**: Frontend deployment
- **Railway**: Full-stack deployment
- **AWS/GCP/Azure**: Container orchestration

---

## Troubleshooting

### Common Issues

1. **Python service not starting**:
  
```bash
  # Check Python version
  python --version
  # Install dependencies manually
  pip install fastapi uvicorn
```

2. **Node.js API errors**:
```bash
  # Check Node.js version
  node --version
  # Reinstall dependencies
  npm install
```

3. **CORS errors**:
  - Verify CORS origins in both services
  - Check that services are running on correct ports

4. **Docker issues**:
```bash
  # Check container logs
  docker-compose logs
  # Rebuild containers
  docker-compose down
  docker-compose up --build
```

---

- **Node.js API**: See this file and `server/` for API details
- **Python Service**: See `python-service/README.md` for FastAPI documentation
- **Frontend**: See `client/` for React setup and UI components

---