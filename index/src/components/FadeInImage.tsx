import { ImgHTMLAttributes, useState } from "react";

interface FadeInImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  onLoad?: () => void;
}

export default function FadeInImage({ onLoad, ...props }: FadeInImageProps) {
  const [isLoaded, setLoaded] = useState(false);

  return (
    <img
      {...props}
      style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.5s" }}
      onLoad={() => {
        setLoaded(true);
        onLoad?.();
      }}
      alt={props.alt}
    />
  );
}
