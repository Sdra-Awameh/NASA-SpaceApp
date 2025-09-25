import { Satellite } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandIcon({ className }: { className?: string }) {
  return (
    <div
      id="brand-icon"
      className={cn("brand-icon relative inline-flex items-center justify-center", className)}
    >
      <span className="brand-icon-bg absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-fuchsia-600/20 blur-sm" />

      <Satellite className="brand-icon-satellite relative h-5 w-5 text-blue-400" />
    </div>
  );
}
