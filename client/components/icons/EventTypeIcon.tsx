import { CloudRain, Flame, Flag, Rocket, Satellite, Telescope } from "lucide-react";

export type EventType = "solar-flare" | "asteroid" | "storm" | "earthquake" | "satellite" | "space";

export function EventTypeIcon({ type, className }: { type: EventType; className?: string }) {
  const map = {
    "solar-flare": { Icon: Flame, cls: "icon-solar-flare" },
    asteroid: { Icon: Rocket, cls: "icon-asteroid" },
    storm: { Icon: CloudRain, cls: "icon-storm" },
    earthquake: { Icon: Flag, cls: "icon-earthquake" },
    satellite: { Icon: Satellite, cls: "icon-satellite" },
    space: { Icon: Telescope, cls: "icon-space" },
  } as const;
  const { Icon, cls } = map[type] ?? { Icon: Flag, cls: "icon-earthquake" };
  return (
    <Icon
      id={`event-type-icon-${type}`}
      className={`event-type-icon event-type-icon-${type} ${cls} ${className ?? ""}`.trim()}
    />
  );
}
