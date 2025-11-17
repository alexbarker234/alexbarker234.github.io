import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

const noiseStrength = 80;
const xOff = 0.002;
const yOff = 0.003;
const zOff = 0.001;

// Aurora band properties
const pinkAurora = {
  baseY: 0.45, // Position in canvas (0-1)
  height: 150,
  hueStart: 290, // Purple
  hueEnd: 320, // Pink
  saturation: 100,
  lightness: 70
};

const blueAurora = {
  baseY: 0.55, // Position in canvas (0-1) - slightly lower to overlap
  height: 180,
  hueStart: 220, // Blue
  hueEnd: 150, // Blueish green
  saturation: 100,
  lightness: 65
};

interface AuroraBorealisProps {
  width?: number;
  height?: number;
  color1?: string;
  color2?: string;
  startFrames?: number;
  id?: string;
}

export default function AuroraBorealis({
  startFrames = 0
}: AuroraBorealisProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const tickRef = useRef<number>(startFrames);
  const animationRef = useRef<number | null>(null);
  const noise3DRef = useRef<ReturnType<typeof createNoise3D> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gradientCacheRef = useRef<{
    pink: CanvasGradient | null;
    blue: CanvasGradient | null;
  }>({
    pink: null,
    blue: null
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctxRef.current = ctx;
    noise3DRef.current = createNoise3D();

    const CANVAS_HEIGHT = 500;

    const createGradient = (
      ctx: CanvasRenderingContext2D,
      auroraConfig: typeof pinkAurora
    ): CanvasGradient => {
      const baseY = auroraConfig.baseY * CANVAS_HEIGHT;
      const bandHeight = auroraConfig.height;
      const gradient = ctx.createLinearGradient(
        0,
        baseY - bandHeight,
        0,
        baseY
      );

      if (auroraConfig.hueStart !== undefined) {
        // Reduced from 10 to 5 steps for better performance
        const steps = 5;
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const hue =
            auroraConfig.hueStart +
            (auroraConfig.hueEnd - auroraConfig.hueStart) * t;
          const alpha = 0.2 + 0.85 * (1 - t);
          gradient.addColorStop(
            t,
            `hsla(${hue},${auroraConfig.saturation}%,${auroraConfig.lightness}%,${Math.min(alpha, 1.0)})`
          );
        }
      }

      return gradient;
    };

    // Initialise gradients once
    if (!gradientCacheRef.current.pink || !gradientCacheRef.current.blue) {
      gradientCacheRef.current.pink = createGradient(ctx, pinkAurora);
      gradientCacheRef.current.blue = createGradient(ctx, blueAurora);
    }

    const resize = () => {
      const container = containerRef.current;
      if (!container || !canvas) return;

      const { width } = container.getBoundingClientRect();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = width;
      canvas.height = CANVAS_HEIGHT;
    };

    const drawAuroraBand = (
      auroraConfig: typeof pinkAurora,
      gradient: CanvasGradient
    ) => {
      if (!canvas || !ctxRef.current || !noise3DRef.current) return;

      const ctx = ctxRef.current;
      const width = canvas.width;
      const height = canvas.height;
      const baseY = auroraConfig.baseY * height;
      const bandHeight = auroraConfig.height;
      const tick = tickRef.current;

      ctx.save();
      ctx.beginPath();

      // Create wavy path using noise
      const points: { x: number; y: number }[] = [];
      const segmentWidth = 2;
      const numSegments = Math.ceil(width / segmentWidth);

      // Top edge (wavy)
      for (let i = 0; i <= numSegments; i++) {
        const x = (i / numSegments) * width;
        const noise =
          noise3DRef.current(x * xOff, baseY * yOff, tick * zOff) *
          noiseStrength;
        const y = baseY - bandHeight + noise;
        points.push({ x, y });
      }

      // Bottom edge (wavy, but less variation)
      for (let i = numSegments; i >= 0; i--) {
        const x = (i / numSegments) * width;
        const noise =
          noise3DRef.current(x * xOff, (baseY + 77) * yOff, tick * zOff) *
          (noiseStrength * 0.5);
        const y = baseY + noise;
        points.push({ x, y });
      }

      // Draw the path
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.closePath();

      // Fill with gradient
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.restore();
    };

    const draw = () => {
      if (!canvas || !ctxRef.current || !noise3DRef.current) return;

      tickRef.current++;
      const ctx = ctxRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw pink aurora first (behind)
      drawAuroraBand(pinkAurora, gradientCacheRef.current.pink!);

      // Draw blue aurora second (in front, overlapping)
      drawAuroraBand(blueAurora, gradientCacheRef.current.blue!);

      animationRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      console.log("Aurora resized");
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [startFrames]);

  return (
    <div className="absolute w-full h-full" ref={containerRef}>
      <canvas
        ref={canvasRef}
        className="absolute w-full h-full -z-10 blur-[18px] brightness-110"
      />
    </div>
  );
}
