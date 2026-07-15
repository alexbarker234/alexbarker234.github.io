import { useEffect, useRef } from "react";

const hueSpeed = 0.4;
const hueAcross = 70;
const maxPoints = 160;
const minPointDistance = 4;
const pointLifetime = 90; // frames

type TrailPoint = {
  x: number;
  y: number;
  life: number;
};

type TrailLayer = {
  phase: number;
  saturation: number;
  lightness: number;
  peakAlpha: number;
  radiusScale: number;
};

const layers: TrailLayer[] = [
  {
    phase: 0,
    saturation: 95,
    lightness: 58,
    peakAlpha: 0.55,
    radiusScale: 1
  },
  {
    phase: 40,
    saturation: 90,
    lightness: 55,
    peakAlpha: 0.4,
    radiusScale: 1.15
  },
  {
    phase: 75,
    saturation: 92,
    lightness: 56,
    peakAlpha: 0.35,
    radiusScale: 0.8
  }
];

export default function AuroraTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<TrailPoint[]>([]);
  const tickRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const pushPoint = (x: number, y: number) => {
      const points = pointsRef.current;
      points.push({ x, y, life: pointLifetime });
      while (points.length > maxPoints) points.shift();
    };

    const addPoint = (x: number, y: number) => {
      const points = pointsRef.current;
      const last = points[points.length - 1];

      if (!last) {
        pushPoint(x, y);
        return;
      }

      const dx = x - last.x;
      const dy = y - last.y;
      const dist = Math.hypot(dx, dy);
      if (dist < minPointDistance) return;

      const steps = Math.max(1, Math.ceil(dist / minPointDistance));
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        pushPoint(last.x + dx * t, last.y + dy * t);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      addPoint(event.clientX, event.clientY);
    };

    const draw = () => {
      tickRef.current++;
      const tick = tickRef.current;
      const points = pointsRef.current;
      const { width, height } = canvas;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < points.length; i++) {
        points[i].life -= 1;
      }
      pointsRef.current = points.filter((p) => p.life > 0);

      const livePoints = pointsRef.current;
      if (livePoints.length > 0) {
        for (const layer of layers) {
          for (let i = 0; i < livePoints.length; i++) {
            const point = livePoints[i];
            const along = i / Math.max(livePoints.length - 1, 1);
            const lifeT = point.life / pointLifetime;
            const hue =
              (tick * hueSpeed + layer.phase + along * hueAcross + 360) % 360;
            const radius = (10 + along * 22) * lifeT * layer.radiusScale;
            const alpha = layer.peakAlpha * lifeT * (0.35 + along * 0.65);

            ctx.save();
            ctx.globalCompositeOperation = "screen";
            const gradient = ctx.createRadialGradient(
              point.x,
              point.y,
              0,
              point.x,
              point.y,
              radius
            );
            gradient.addColorStop(
              0,
              `hsla(${hue},${layer.saturation}%,${layer.lightness}%,${alpha})`
            );
            gradient.addColorStop(
              0.45,
              `hsla(${hue},${layer.saturation}%,${layer.lightness}%,${alpha * 0.35})`
            );
            gradient.addColorStop(1, `hsla(${hue},${layer.saturation}%,${layer.lightness}%,0)`);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div className="pointer-events-none hidden md:block fixed inset-0 -z-5">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full blur-[14px] brightness-115"
      />
    </div>
  );
}
