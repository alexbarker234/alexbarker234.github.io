import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";

type Option<T> = {
  value: T;
  label: string;
  icon?: IconType;
};

type SlidingIndicatorSelectorProps<T> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: "sm" | "md" | "lg";
};

export default function SlidingIndicatorSelector<T extends string | null>({
  options,
  value,
  onChange,
  size = "md"
}: SlidingIndicatorSelectorProps<T>) {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [isInitialised, setIsInitialised] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const updateIndicator = () => {
      const valueKey = value === null ? "__null__" : String(value);
      const activeButton = buttonsRef.current[valueKey];
      const container = containerRef.current;

      if (activeButton && container) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();

        setIndicatorStyle({
          left: buttonRect.left - containerRect.left,
          width: buttonRect.width
        });

        if (!isInitialised) {
          setTimeout(() => setIsInitialised(true), 10);
        }
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [value, isInitialised]);

  const sizeClasses = {
    sm: {
      container: "p-0.5",
      button: "px-3 py-1 text-xs",
      gap: "gap-0.5"
    },
    md: {
      container: "p-1",
      button: "px-4 py-1 text-sm sm:py-2",
      gap: "gap-1"
    },
    lg: {
      container: "p-1.5",
      button: "px-6 py-2 text-base sm:py-3",
      gap: "gap-1.5"
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <div
      ref={containerRef}
      className={`relative flex ${currentSize.gap} rounded-xl bg-bg-dark/50 border border-blue/20
        ${currentSize.container} backdrop-blur-sm`}
    >
      {/* Sliding indicator */}
      <div
        className={`absolute top-1 h-[calc(100%-8px)] rounded-lg bg-gradient-to-r from-blue
          to-blue-light ${isInitialised ? "transition-all duration-300 ease-out" : ""}`}
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`
        }}
      />

      {/* Buttons */}
      {options.map((option) => {
        const optionKey =
          option.value === null ? "__null__" : String(option.value);
        return (
          <button
            key={optionKey}
            ref={(el) => {
              buttonsRef.current[optionKey] = el;
            }}
            onClick={() => onChange(option.value)}
            className={`relative z-10 flex-grow cursor-pointer rounded-lg ${currentSize.button}
            font-medium transition-colors disabled:cursor-not-allowed flex items-center
            justify-center gap-2 ${
            value === option.value
                ? "text-white font-semibold"
                : "text-grey-light hover:text-white"
            }`}
          >
            {option.icon && (
              <span className={`${value === option.value ? "" : "opacity-70"}`}>
                <option.icon />
              </span>
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
