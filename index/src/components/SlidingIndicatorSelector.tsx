import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

type Option<T> = {
  value: T;
  label: string;
  icon?: IconDefinition;
};

type SlidingIndicatorSelectorProps<T> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: "sm" | "md" | "lg" | "responsive";
  equalButtons?: boolean;
};

export default function SlidingIndicatorSelector<T extends string | null>({
  options,
  value,
  onChange,
  size = "md",
  equalButtons = false
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
      container: "px-0.5 py-2",
      button: "p-1 text-xs",
      gap: "gap-0.5"
    },
    md: {
      container: "p-1",
      button: "p-2 text-sm",
      gap: "gap-1"
    },
    lg: {
      container: "p-1.5",
      button: "p-2 text-base md:p-4",
      gap: "gap-1.5"
    },
    /** Small screens use `sm`; `md` and up match `lg`. */
    responsive: {
      container: "px-0.5 py-2 md:p-1.5",
      button: "p-1 text-xs md:text-base md:p-4",
      gap: "gap-0.5 md:gap-1.5"
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <div
      ref={containerRef}
      className={`relative flex ${currentSize.gap} rounded-full bg-bg-dark/50 border
        border-blue/20 w-full ${currentSize.container} backdrop-blur-sm`}
    >
      {/* Sliding indicator */}
      <div
        className={`absolute top-1 h-[calc(100%-8px)] rounded-full bg-blue
          ${isInitialised ? "transition-all duration-400 ease-bounce" : ""}`}
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
            className={`relative z-10 ${equalButtons ? "flex-1" : "flex-grow"} cursor-pointer rounded-lg
            ${currentSize.button} font-medium transition-colors disabled:cursor-not-allowed
            flex items-center justify-center gap-2 ${
            value === option.value
                ? "text-white font-semibold"
                : "text-grey-light hover:text-white"
            }`}
          >
            {option.icon && (
              <span className={`${value === option.value ? "" : "opacity-70"}`}>
                <FontAwesomeIcon icon={option.icon} />
              </span>
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
