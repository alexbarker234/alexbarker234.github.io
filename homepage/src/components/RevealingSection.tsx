import React, { ReactNode, useEffect, useRef, useState } from "react";

const RevealingSection: React.FC<{
  children: ReactNode;
  id?: string;
  className?: string;
}> = ({ children, id, className }) => {
  const [hasObserbed, setHasObserved] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || hasObserbed) return;

    var offset = Math.min(300, window.innerHeight / 2);
    console.log(offset);
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasObserved(entry.isIntersecting);
      },
      { rootMargin: `-${offset}px 0px 0px 0px` }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasObserbed]);

  return (
    <div
      className={`section ${hasObserbed ? "shown" : ""} ${className}`}
      ref={ref}
      id={id}
    >
      {children}
    </div>
  );
};

export default RevealingSection;
