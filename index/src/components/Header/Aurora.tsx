import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

const noiseStrength = 80;
const xOff = 0.002;
const yOff = 0.003;
const zOff = 0.001;

// Aurora band properties
const pinkAurora = {
  baseY: 0.65, // Position in canvas (0-1)
  height: 150,
  hueStart: 290, // Purple
  hueEnd: 320, // Pink
  saturation: 100,
  lightness: 70
};

const blueAurora = {
  baseY: 0.8, // Position in canvas (0-1) - slightly lower to overlap
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctxRef.current = ctx;
    noise3DRef.current = createNoise3D();

    const resize = () => {
      const container = containerRef.current;
      if (!container || !canvas) return;

      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };

    const drawAuroraBand = (auroraConfig: typeof pinkAurora) => {
      if (!canvas || !ctxRef.current || !noise3DRef.current) return;

      const ctx = ctxRef.current;
      const width = canvas.width;
      const height = canvas.height;
      const baseY = auroraConfig.baseY * height;
      const bandHeight = auroraConfig.height;
      const tick = tickRef.current;

      // Create gradient for vertical fade (more solid at bottom)
      const gradient = ctx.createLinearGradient(
        0,
        baseY - bandHeight,
        0,
        baseY
      );

      // Both auroras now use hue gradients
      if (auroraConfig.hueStart !== undefined) {
        const steps = 10;
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const hue =
            auroraConfig.hueStart +
            (auroraConfig.hueEnd - auroraConfig.hueStart) * t;
          // Bottom more solid, top more transparent - increased alpha for brightness
          const alpha = 0.2 + 0.85 * (1 - t); // 1.05 at bottom, 0.2 at top (clamped to 1.0)
          gradient.addColorStop(
            t,
            `hsla(${hue},${auroraConfig.saturation}%,${auroraConfig.lightness}%,${Math.min(alpha, 1.0)})`
          );
        }
      }

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
          noise3DRef.current(x * xOff, (baseY + 20) * yOff, tick * zOff) *
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
      drawAuroraBand(pinkAurora);

      // Draw blue aurora second (in front, overlapping)
      drawAuroraBand(blueAurora);

      animationRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const resizeObserver = new ResizeObserver(() => {
      resize();
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
