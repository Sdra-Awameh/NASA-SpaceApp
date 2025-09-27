import { cn } from "@/lib/utils";

function LoadingSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("cc-skeleton animate-pulse bg-muted rounded", className)}
      {...props}
    />
  );
}

const Skeleton = LoadingSkeleton;

export { LoadingSkeleton, Skeleton };