import { useEffect, useMemo, useState } from "react";

export default function ParallaxDivider() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const layers = useMemo(
    () => [
      {
        speed: -0.075,
        yOffset: 140
      },
      {
        speed: -0.1,
        yOffset: 160
      },
      {
        speed: 0,
        yOffset: 80
      }
    ],
    []
  );

  const getLayerSVG = (layer: number) => {
    if (layer == 0) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-full"
          viewBox="0 57.75 1440 262.27"
          preserveAspectRatio="none"
        >
          <path
            fill="#2c2c36"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,58.7C1120,64,1280,96,1360,112L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      );
    } else if (layer == 1) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-full"
          viewBox="0 64 1440 256"
          preserveAspectRatio="none"
        >
          <path
            fill="#202026"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,101.3C640,117,800,139,960,160C1120,181,1280,203,1360,213.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      );
    }

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-full"
        viewBox="0 128 1440 192"
        preserveAspectRatio="none"
      >
        <path
          fill="#16161a"
          fillOpacity="1"
          d="M0,224L80,229.3C160,235,320,245,480,240C640,235,800,213,960,192C1120,171,1280,149,1360,138.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
    );
  };

  return (
    <div className="h-60 absolute w-full -bottom-1 z-50">
      <div className="absolute inset-0">
        {layers.map((layer, index) => (
          <div
            key={`layer-${index}`}
            className="absolute w-full h-full top-0 left-0"
            style={{
              transform: `translateY(${scrollY * layer.speed + layer.yOffset}px)`
            }}
          >
            {getLayerSVG(index)}
          </div>
        ))}
      </div>
    </div>
  );
}
