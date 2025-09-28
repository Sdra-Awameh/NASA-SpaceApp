# ChronoCast

ChronoCast is a modern, multi-service web application that combines **weather**, **natural events**, and **media data** into a single, interactive dashboard. It features:
- **React SPA frontend** (client)
- **Node.js backend** (API aggregator)
- **Python FastAPI service** (probability engine)

---

## What does ChronoCast do?

- Aggregate weather, natural events, and NASA-style media for any location and date  
- Compute weather probabilities using real mathematical models  
- Present everything in a responsive, single-page dashboard  

---

## Key Features

- Weather, events, and media APIs
- Probability calculations (Node.js + Python)
- Modern UI with theming and reusable components
- Type-safe API communication
- Containerized for easy deployment

---

## Example API Endpoints

**Weather:**  
`GET /api/weather?lat=35.9&lon=31.9&date=2023-06-10`

**Events:**  
`GET /api/events?eventType=storm`

**Media:**  
`GET /api/media?title=earth`

**Probability:**  
`GET /api/probability?lat=35.9&lon=31.9&date=2023-06-10` (Node.js, GET)  
`POST /api/probability` (Python, POST; for advanced calculations)

---

## Project Structure (Short Overview)

```bash
ChronoCast/
├── client/              # React SPA frontend
├── server/              # Node.js API backend
├── python-service/      # Python FastAPI probability engine
└── shared/              # Shared TypeScript interfaces
```

---

## Getting Started

- For installation steps, environment configuration, troubleshooting, and technical details, see [SETUP.md](./SETUP.md).
- For API details, see each service's README and code comments.

<!-- 
## Demo & Screenshots

![ChronoCast Dashboard](./screenshots/dashboard.png)
-->

---

## Supported Environments 

Runs locally, via Docker Compose, or on cloud platforms (Netlify, Vercel, Railway, AWS, GCP, Azure).

---


## Contact

> Website: [rashaalsaleh.com](https://rashaalsaleh.com) | Email: [rasha.k.alsaleh@gmail.com](mailto:rasha.k.alsaleh@gmail.com) | LinkedIn: [@rasha-alsaleh](https://www.linkedin.com/in/rasha-alsaleh/)
