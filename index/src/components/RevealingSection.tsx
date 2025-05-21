import { cn } from "@/utils/cn";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const RevealingSection: React.FC<{
  children: ReactNode;
  id?: string;
  className?: string;
}> = ({ children, id, className }) => {
  const [hasObserved, setHasObserved] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || hasObserved) return;

    const offset = Math.min(300, window.innerHeight / 2);
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasObserved(entry.isIntersecting);
      },
      { rootMargin: `-${offset}px 0px 0px 0px` }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasObserved]);

  return (
    <div
      className={cn(
        "opacity-0 transition-opacity duration-500 pointer-events-none text-[1.125rem]",
        hasObserved && "opacity-100 pointer-events-auto",
        className
      )}
      ref={ref}
      id={id}
    >
      {children}
    </div>
  );
};

export default RevealingSection;
