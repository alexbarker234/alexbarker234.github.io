import { useEffect, useRef } from "react";

// https://segmentfault.com/a/1190000041166007/en
// This is way too performance heavy. I gotta write a shader or something.

interface AuroraBorealisProps {
  width?: number;
  height?: number;
  color1?: string;
  color2?: string;
  startFrames?: number;
  id?: string;
}

export default function AuroraBorealis({
  color1 = "#bd63c1",
  color2 = "#53e5a6",
  startFrames = 0,
  id = "aurora-wave"
}: AuroraBorealisProps) {
  const filterRef = useRef<SVGFETurbulenceElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const width = 500;
  const height = 700;

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return; // Don't run animation on mobile

    let frames = startFrames;
    const rad = Math.PI / 180;
    let frameCount = 0;
    function animate() {
      let bfx = 0.005;
      let bfy = 0.005;
      frames += 0.5;
      bfx += 0.0025 * Math.cos(frames * rad);
      bfy += 0.0025 * Math.sin(frames * rad);

      frameCount++;
      if (frameCount % 2 === 0) {
        const bf = `${bfx} ${bfy}`;
        if (filterRef.current) {
          filterRef.current.setAttribute("baseFrequency", bf);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          if (animationRef.current !== null) {
            cancelAnimationFrame(animationRef.current);
          }
        }
      },
      { threshold: 0 }
    );

    if (mainRef.current) {
      observer.observe(mainRef.current);
    }

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative blur-lg" style={{ width, height }} ref={mainRef}>
      {/* Aurora effect */}
      <div
        className="absolute origin-center rotate-[38deg] scale-x-[1.4]"
        style={{
          width: width * 1.14,
          height: height * 0.6,
          background: `radial-gradient(circle at 100% 100%, transparent 45%, ${color1} 55%, ${color2} 65%, transparent 85%)`,
          filter: `url(#${id}) blur(8px)`
        }}
      />

      {/* SVG Filter */}
      <svg>
        <defs>
          <filter id={id}>
            <feTurbulence
              ref={filterRef}
              id="turbulence"
              baseFrequency="0.003 0.003"
              numOctaves="3"
              seed="10"
            />
            <feDisplacementMap in="SourceGraphic" scale="72" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
