import { useWindowSize } from "@/hooks/useWindowSize";
import { useEffect, useRef } from "react";

const randBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

const generateStars = (numStars: number): Star[] => {
  return Array.from({ length: numStars }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: randBetween(4, 8),
    opacity: Math.random()
  }));
};

const flickerVariation = 0.4;

export default function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !container) return;

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    if (starsRef.current.length === 0) {
      starsRef.current = generateStars(50);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star) => {
        const xPixel = (star.x / 100) * canvas.width;
        const yPixel = (star.y / 100) * canvas.height;

        ctx.globalAlpha = star.opacity;
        // Glow
        const glowSize = star.size * 4;
        const gradient = ctx.createRadialGradient(
          xPixel,
          yPixel,
          1,
          xPixel,
          yPixel,
          glowSize
        );
        gradient.addColorStop(0, "rgba(209, 218, 255, 0.05)");
        gradient.addColorStop(1, "rgba(209, 218, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(xPixel, yPixel, glowSize, 0, Math.PI * 2);
        ctx.fill();
        // Main star body
        ctx.beginPath();
        ctx.arc(xPixel, yPixel, star.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        // Flicker between 0.8 & 1
        star.opacity =
          Math.sin(Date.now() / 1000 + star.x + star.y) *
            (flickerVariation / 2) +
          (1 - flickerVariation / 2);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [width]);

  return (
    <div ref={containerRef} className="absolute w-full h-full">
      <canvas ref={canvasRef} className="absolute w-full h-full" />
    </div>
  );
}
