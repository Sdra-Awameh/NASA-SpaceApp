import { cn } from "@/lib/utils";

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div
      id="cc-skeleton"
      className={cn("cc-skeleton bg-muted animate-pulse rounded-md", className)}
    />
  );
}