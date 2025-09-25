import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
  className={cn("cc-skeleton", className)}
      {...props}
    />
  );
}

export { Skeleton };
