import { cn } from "@/utils/cn";
import { ElementType } from "react";

type HeaderProps = {
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  className?: string;
};

export default function HeaderText({
  level,
  children,
  className
}: HeaderProps) {
  const HeadingTag: ElementType = level;

  return (
    <HeadingTag
      className={cn(`text-center relative w-fit mx-auto my-4 ${className}`)}
    >
      {children}
      <span
        className="absolute block left-1/2 w-5/6 h-0 top-full mt-1 transform -translate-x-1/2
          border-b-white border-b-2"
      ></span>
    </HeadingTag>
  );
}
