import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { AppEvent } from "@/pages/Dashboard";

interface EventMapProps {
    events: AppEvent[];
}

// Severity colors
const SEVERITY_COLORS: Record<string, string> = {
    high: "red",
    medium: "orange",
    low: "green",
};

// Auto-fit map to all markers
const FitBounds = ({ events }: { events: AppEvent[] }) => {
    const map = useMap();
    if (events.length === 0) return null;

    const bounds = events.map((e) => [e.location.lat, e.location.lng] as [number, number]);
    map.fitBounds(bounds, { padding: [50, 50] });
    return null;
};

// Function to create a DivIcon with colored badge
const getDivIcon = (severity: string) =>
    L.divIcon({
        html: `<div style="
        background-color: ${SEVERITY_COLORS[severity.toLowerCase()] || "blue"};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 3px rgba(0,0,0,0.5);
    "></div>`,
        className: "", // Remove default leaflet styles
        iconSize: [24, 24],
        iconAnchor: [12, 12],
    });

const EventMap = ({ events }: EventMapProps) => {
    const defaultCenter: [number, number] = [20, 0];
    const defaultZoom = 2;

    return (
        <MapContainer
            center={defaultCenter}
            zoom={defaultZoom}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            <FitBounds events={events} />

            {events.map((event) => (
                <Marker
                    key={event.id}
                    position={[event.location.lat, event.location.lng]}
                    icon={getDivIcon(event.severity)}
                >
                    <Popup>
                        <strong>{event.name}</strong>
                        <br />
                        {event.description}
                        <br />
                        Probability: {event.probability}%
                        <br />
                        Severity: {event.severity}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default EventMap;
