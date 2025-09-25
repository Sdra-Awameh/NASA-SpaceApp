import { cn } from "@/lib/utils";

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div
      id="loading-skeleton"
      className={cn("loading-skeleton animate-pulse rounded-md bg-loading-skeleton", className)}
    />
  );
}
