import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "cc-slider",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="cc-slider-track">
      <SliderPrimitive.Range className="cc-slider-range" />
    </SliderPrimitive.Track>
  <SliderPrimitive.Thumb className="cc-slider-thumb" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
