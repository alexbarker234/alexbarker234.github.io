import { useEffect, useState } from "react";

export default function MouseGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [brightness, setBrightness] = useState(0.05);

  const clickBrightness = 0.1;
  const defaultBrightness = 0.05;

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY
      });
    };

    const handleMouseDown = () => {
      setBrightness(clickBrightness);
    };

    const handleMouseUp = () => {
      const startTime = Date.now();
      const duration = 300;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const easing = 1 - Math.pow(1 - progress, 3);
        const currentBrightness =
          clickBrightness - easing * (clickBrightness - defaultBrightness);

        setBrightness(currentBrightness);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="pointer-events-none hidden md:block fixed inset-0 -z-5">
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(24, 79, 163, ${brightness}), transparent 80%)`
        }}
      />
    </div>
  );
}
