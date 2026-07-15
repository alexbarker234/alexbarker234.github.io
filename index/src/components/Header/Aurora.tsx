import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

const noiseStrength = 60;
const xOff = 0.002;
const yOff = 0.003;
const zOff = 0.001;
/** Degrees of hue shift per frame (~15s full cycle at 60fps) */
const hueSpeed = 0.4;
/** Hue span across the band — keep narrow so one ribbon doesn't mix opposites */
const hueAcrossWidth = 70;

type AuroraConfig = {
  id: string;
  baseY: number;
  height: number;
  /** Small offsets keep stacked bands in a related colour family */
  phase: number;
  /** Scroll direction: 1 left→right, -1 right→left */
  direction: number;
  saturation: number;
  lightness: number;
  peakAlpha: number;
};

const baseY = 0.2;
const auroraConfigs: AuroraConfig[] = [
  {
    id: "a",
    baseY: baseY,
    height: 130,
    phase: 0,
    direction: 1,
    saturation: 95,
    lightness: 58,
    peakAlpha: 0.55
  },
  {
    id: "b",
    baseY: baseY + 0.1,
    height: 110,
    phase: 40,
    direction: -1,
    saturation: 90,
    lightness: 55,
    peakAlpha: 0.45
  },
  {
    id: "c",
    baseY: baseY + 0.05,
    height: 130,
    phase: 75,
    direction: 1,
    saturation: 92,
    lightness: 56,
    peakAlpha: 0.4
  }
];

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

    const CANVAS_HEIGHT = 500;

    const createHorizontalGradient = (
      ctx: CanvasRenderingContext2D,
      auroraConfig: AuroraConfig,
      width: number,
      tick: number
    ): CanvasGradient => {
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      const baseHue =
        (tick * hueSpeed * auroraConfig.direction + auroraConfig.phase + 360) %
        360;
      const steps = 10;

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const hue = (baseHue + t * hueAcrossWidth + 360) % 360;
        gradient.addColorStop(
          t,
          `hsla(${hue},${auroraConfig.saturation}%,${auroraConfig.lightness}%,${auroraConfig.peakAlpha})`
        );
      }

      return gradient;
    };

    const resize = () => {
      const container = containerRef.current;
      if (!container || !canvas) return;

      const { width } = container.getBoundingClientRect();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = width;
      canvas.height = CANVAS_HEIGHT;
    };

    const drawAuroraBand = (auroraConfig: AuroraConfig, offset: number) => {
      if (!canvas || !ctxRef.current || !noise3DRef.current) return;

      const ctx = ctxRef.current;
      const width = canvas.width;
      const height = canvas.height;
      const bandBaseY = auroraConfig.baseY * height;
      const bandHeight = auroraConfig.height;
      const tick = tickRef.current;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.beginPath();

      const points: { x: number; y: number }[] = [];
      const segmentWidth = 2;
      const numSegments = Math.ceil(width / segmentWidth);

      for (let i = 0; i <= numSegments; i++) {
        const x = (i / numSegments) * width;
        const noise =
          noise3DRef.current(x * xOff, (bandBaseY + offset) * yOff, tick * zOff) *
          noiseStrength;
        points.push({ x, y: bandBaseY + noise });
      }

      for (let i = numSegments; i >= 0; i--) {
        const x = (i / numSegments) * width;
        const noise =
          noise3DRef.current(
            x * xOff,
            (bandBaseY + bandHeight + offset) * yOff,
            tick * zOff
          ) *
          (noiseStrength * 0.5);
        points.push({ x, y: bandBaseY + bandHeight + noise });
      }

      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.closePath();

      ctx.fillStyle = createHorizontalGradient(ctx, auroraConfig, width, tick);
      ctx.fill();

      ctx.restore();
    };

    const draw = () => {
      if (!canvas || !ctxRef.current || !noise3DRef.current) return;

      tickRef.current++;
      const ctx = ctxRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let index = 0; index < auroraConfigs.length; index++) {
        drawAuroraBand(auroraConfigs[index], index * 100);
      }

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
        className="absolute w-full h-full blur-[28px] brightness-115"
      />
    </div>
  );
}
