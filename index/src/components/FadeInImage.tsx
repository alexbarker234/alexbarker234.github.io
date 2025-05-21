import { cn } from "@/utils/cn";
import type { ImgHTMLAttributes } from "react";
import { useState } from "react";

interface FadeInImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  onLoad?: () => void;
}

export default function FadeInImage({
  onLoad,
  className,
  ...props
}: FadeInImageProps) {
  const [isLoaded, setLoaded] = useState(false);

  return (
    <img
      {...props}
      className={cn(
        "transition-opacity duration-500 w-full h-full object-cover object-top",
        isLoaded ? "opacity-100" : "opacity-0",
        className
      )}
      onLoad={() => {
        setLoaded(true);
        onLoad?.();
      }}
      alt={props.alt}
    />
  );
}
