import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/Layout";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { SeverityBadge, SeverityLevel } from "@/components/common/SeverityBadge";
import { EventTypeIcon, EventType } from "@/components/icons/EventTypeIcon";
import { Calendar, MapPin, RefreshCcw, Thermometer, Flag } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
  // Show skeleton on initial load, then hide after 1200ms

interface Event {
  id: number;
  type: EventType;
  name: string;
  probability: number;
  severity: SeverityLevel;
  location: { lat: number; lng: number };
  date: string;
  description: string;
}

interface ProbabilityData {
  date: string;
  probability: number;
}

const mockEvents: Event[] = [
  {
    id: 1,
    type: "solar-flare",
    name: "Solar Flare M-Class",
    probability: 75,
    severity: "medium",
    location: { lat: 0, lng: 0 },
    date: "2025-09-24",
    description: "Moderate solar flare expected to impact satellite communications",
  },
  {
    id: 2,
    type: "asteroid",
    name: "Asteroid 2023 DW Close Approach",
    probability: 45,
    severity: "low",
    location: { lat: 35.6762, lng: 139.6503 },
    date: "2025-09-25",
    description: "Near-Earth asteroid will make close approach",
  },
  {
    id: 3,
    type: "storm",
    name: "Hurricane Formation",
    probability: 85,
    severity: "high",
    location: { lat: 25.7617, lng: -80.1918 },
    date: "2025-09-26",
    description: "Tropical storm formation predicted in Atlantic Ocean",
  },
];

const mockProbabilityData: ProbabilityData[] = [
  { date: "09-20", probability: 45 },
  { date: "09-21", probability: 52 },
  { date: "09-22", probability: 48 },
  { date: "09-23", probability: 75 },
  { date: "09-24", probability: 68 },
  { date: "09-25", probability: 85 },
  { date: "09-26", probability: 72 },
];

const mockNASAImage = {
  title: "Aurora Over Earth from ISS",
  url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200&h=800&fit=crop",
  description: "Beautiful aurora captured from the International Space Station",
};

export default function Dashboard() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("2025-09-24");
  const [selectedLocation, setSelectedLocation] = useState<string>("Global");
  const [eventFilter, setEventFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setLoading(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const filtered = mockEvents.filter((e) => eventFilter === "all" || e.type === (eventFilter as EventType));

  const refresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  };

  return (
    <AppLayout>
      <div className="cc-dashboard-page">
        {/* KPIs */}
        <div className="cc-dashboard-kpis">
          {[
            { t: "Risk Index", v: "75%", icon: Thermometer, c: "text-emerald-300" },
            { t: "Events", v: String(mockEvents.length), icon: Flag, c: "text-blue-300" },
            { t: "Space Weather", v: "M-Class", icon: Thermometer, c: "text-fuchsia-300" },
            { t: "Updated", v: "2 min ago", icon: RefreshCcw, c: "text-amber-300" },
          ].map((k) => (
            <div key={k.t} className="cc-dashboard-kpi">
              <div className="cc-dashboard-kpi-row">
                <div>
                  <p className="cc-dashboard-kpi-label">{k.t}</p>
                  <p className={`cc-dashboard-kpi-value ${k.c}`}>{k.v}</p>
                </div>
                <k.icon className={`cc-dashboard-kpi-icon ${k.c}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="cc-dashboard-main">
          {/* Controls */}
          <div className="space-y-6 lg:col-span-1">
            <div className="cc-dashboard-controls">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold">Controls</h3>
                <button
                  onClick={refresh}
                  className="dashboard-refresh-button"
                >
                  <RefreshCcw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </button>
              </div>
              <div className="space-y-4">
                <label className="block text-xs">
                  <span className="mb-1 inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Location
                  </span>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="dashboard-select"
                  >
                    {"Global,North America,Europe,Asia".split(",").map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-xs">
                  <span className="mb-1 inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Date
                  </span>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="dashboard-input"
                  />
                </label>
                <label className="block text-xs">
                  <span className="mb-1">Event Type</span>
                  <select
                    value={eventFilter}
                    onChange={(e) => setEventFilter(e.target.value)}
                    className="dashboard-select"
                  >
                    <option value="all">All Events</option>
                    <option value="solar-flare">Solar Flares</option>
                    <option value="asteroid">Asteroids</option>
                    <option value="storm">Storms</option>
                    <option value="earthquake">Earthquakes</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="cc-dashboard-nasa">
              <h3 className="mb-3 text-sm font-semibold">NASA Image</h3>
              {loading ? (
                <LoadingSkeleton className="mb-3 h-36 w-full" />
              ) : (
                <>
                  <img src={mockNASAImage.url} alt={mockNASAImage.title} className="mb-3 h-36 w-full rounded-lg object-cover" />
                  <h4 className="mb-1 text-sm font-medium">{mockNASAImage.title}</h4>
                  <p className="text-xs text-muted-foreground">{mockNASAImage.description}</p>
                </>
              )}
            </div>
          </div>

          {/* Map + Viz */}
          <div className="space-y-6 lg:col-span-3">
            <div className="cc-dashboard-map">
              <h3 className="mb-3 text-sm font-semibold">Event Map</h3>
              {loading ? (
                <LoadingSkeleton className="h-64 w-full" />
              ) : (
                <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-blue-950 via-slate-900 to-emerald-950">
                  <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_20%_30%,#60a5fa_0%,transparent_30%),radial-gradient(circle_at_80%_70%,#22c55e_0%,transparent_30%)]" />
                  <div className="z-10 text-center">
                    <MapPin className="mx-auto mb-2 h-8 w-8 text-blue-300" />
                    <p className="text-sm text-white">Interactive Map Placeholder</p>
                    <p className="text-xs text-muted-foreground">{filtered.length} events visible</p>
                  </div>
                  {/* markers */}
                  <span className="absolute left-1/3 top-1/4 h-2 w-2 animate-pulse rounded-full bg-rose-500" />
                  <span className="absolute right-1/4 top-1/2 h-2 w-2 animate-pulse rounded-full bg-amber-400" />
                  <span className="absolute left-1/2 bottom-1/3 h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                </div>
              )}
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div className="cc-dashboard-probability">
                <h3 className="mb-3 text-sm font-semibold">Probability Forecast</h3>
                {loading ? (
                  <LoadingSkeleton className="h-64 w-full" />
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={mockProbabilityData}>
                      <CartesianGrid className="cc-chart-grid" />
                      <XAxis
                        dataKey="date"
                        className="cc-chart-axis"
                      />
                      <YAxis
                        className="cc-chart-axis"
                      />
                      <Tooltip
                        wrapperClassName="cc-chart-tooltip"
                        contentStyle={{}}
                        labelStyle={{}}
                        itemStyle={{}}
                      />
                      <Line
                        type="monotone"
                        dataKey="probability"
                        className="cc-chart-line-primary"
                        dot={{ className: "cc-chart-dot-primary" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>

              <div className="cc-dashboard-upcoming">
                <h3 className="mb-3 text-sm font-semibold">Upcoming Events</h3>
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <LoadingSkeleton className="h-10 w-10 rounded-full" />
                        <div className="flex-1">
                          <LoadingSkeleton className="mb-2 h-4 w-3/4" />
                          <LoadingSkeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="max-h-64 space-y-3 pr-1">
                    {filtered.map((e) => (
                      <button
                        key={e.id}
                        onClick={() => setSelectedEvent(e)}
                        className="dashboard-event-button"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <EventTypeIcon type={e.type} className="h-5 w-5" />
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">{e.name}</p>
                            <p className="text-xs text-muted-foreground">{e.date}</p>
                          </div>
                        </div>
                        <div className="flex flex-shrink-0 items-center gap-2">
                          <span className="text-xs font-bold">{e.probability}%</span>
                          <SeverityBadge severity={e.severity} />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedEvent && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal-content">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <EventTypeIcon type={selectedEvent.type} className="h-6 w-6" />
                <h2 className="truncate text-lg font-bold">{selectedEvent.name}</h2>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="dashboard-modal-close"
              >
                Close
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>Probability</span>
                <span className="font-semibold">{selectedEvent.probability}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Severity</span>
                <SeverityBadge severity={selectedEvent.severity} />
              </div>
              <div className="flex items-center justify-between">
                <span>Date</span>
                <span className="font-semibold">{selectedEvent.date}</span>
              </div>
              <div>
                <span className="mb-1 block font-medium">Description</span>
                <p className="text-muted-foreground leading-relaxed">{selectedEvent.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}