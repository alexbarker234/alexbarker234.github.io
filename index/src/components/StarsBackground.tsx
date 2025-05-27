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
  const { width, height } = useWindowSize();
  const starsRef = useRef<Star[]>([]);
  const glowImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    canvas.width = width;
    canvas.height = height;

    const glowImage = new Image();
    glowImage.src = "/glow.png";
    glowImage.onload = () => {
      glowImageRef.current = glowImage;
    };

    if (starsRef.current.length > 0) return; // Dont recreate stars

    starsRef.current = generateStars(50);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      starsRef.current.forEach((star) => {
        const xPixel = (star.x / 100) * width;
        const yPixel = (star.y / 100) * height;

        ctx.globalAlpha = star.opacity;
        // Glow
        if (glowImageRef.current) {
          const glowSize = star.size * 2;
          ctx.drawImage(
            glowImageRef.current,
            xPixel - glowSize / 2,
            yPixel - glowSize / 2,
            glowSize,
            glowSize
          );
        }
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
  }, [width, height]);

  return <canvas ref={canvasRef} className="absolute w-full" />;
}
