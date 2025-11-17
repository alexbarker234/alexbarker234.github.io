import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

const noiseStrength = 80;
const xOff = 0.002;
const yOff = 0.003;
const zOff = 0.001;

// Aurora band properties
const pinkAurora = {
  baseY: 0.35, // Position in canvas (0-1)
  height: 150,
  hueStart: 290, // Purple
  hueEnd: 320, // Pink
  saturation: 100,
  lightness: 70
};

const blueAurora = {
  baseY: 0.5, // Position in canvas (0-1) - slightly lower to overlap
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
  const canvasARef = useRef<HTMLCanvasElement>(null);
  const canvasBRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<{
    a: CanvasRenderingContext2D | null;
    b: CanvasRenderingContext2D | null;
  } | null>(null);
  const tickRef = useRef<number>(startFrames);
  const animationRef = useRef<number | null>(null);
  const noise3DRef = useRef<ReturnType<typeof createNoise3D> | null>(null);

  useEffect(() => {
    const canvasA = canvasARef.current;
    const canvasB = canvasBRef.current;
    if (!canvasA || !canvasB) return;

    const ctxA = canvasA.getContext("2d");
    const ctxB = canvasB.getContext("2d");

    if (!ctxA || !ctxB) return;

    ctxRef.current = { a: ctxA, b: ctxB };
    noise3DRef.current = createNoise3D();

    const resize = () => {
      const { innerWidth, innerHeight } = window;
      if (canvasA && canvasB) {
        canvasA.width = innerWidth;
        canvasA.height = innerHeight;
        canvasB.width = innerWidth;
        canvasB.height = innerHeight;
      }
    };

    const drawAuroraBand = (auroraConfig: typeof pinkAurora) => {
      if (!canvasA || !ctxRef.current || !noise3DRef.current) return;

      const ctxA = ctxRef.current.a;
      if (!ctxA) return;

      const width = canvasA.width;
      const height = canvasA.height;
      const baseY = auroraConfig.baseY * height;
      const bandHeight = auroraConfig.height;
      const tick = tickRef.current;

      // Create gradient for vertical fade (more solid at bottom)
      const gradient = ctxA.createLinearGradient(
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

      ctxA.save();
      ctxA.beginPath();

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
      ctxA.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctxA.lineTo(points[i].x, points[i].y);
      }
      ctxA.closePath();

      // Fill with gradient
      ctxA.fillStyle = gradient;
      ctxA.fill();

      ctxA.restore();
    };

    const render = () => {
      if (!canvasA || !ctxRef.current) return;

      const ctxB = ctxRef.current.b;
      const ctxA = ctxRef.current.a;

      if (!ctxB || !ctxA) return;

      ctxB.save();
      ctxB.filter = "blur(18px)";
      ctxA.globalCompositeOperation = "screen";
      ctxB.drawImage(canvasA, 0, 0);
      ctxB.restore();

      ctxB.save();
      ctxB.filter = "blur(30px) brightness(1.2)";
      ctxB.globalAlpha = 0.4;
      ctxB.drawImage(canvasA, 0, 0);
      ctxB.restore();
    };

    const draw = () => {
      if (!canvasA || !canvasB || !ctxRef.current || !noise3DRef.current)
        return;

      tickRef.current++;
      const ctxA = ctxRef.current.a;
      const ctxB = ctxRef.current.b;

      if (!ctxA || !ctxB) return;

      ctxA.clearRect(0, 0, canvasA.width, canvasA.height);
      ctxB.clearRect(0, 0, canvasB.width, canvasB.height);

      // Draw pink aurora first (behind)
      drawAuroraBand(pinkAurora);

      // Draw blue aurora second (in front, overlapping)
      drawAuroraBand(blueAurora);

      render();

      animationRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resize);
    };
  }, [startFrames]);

  return (
    <>
      <canvas ref={canvasARef} className="hidden" />
      <canvas
        ref={canvasBRef}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />
    </>
  );
}
