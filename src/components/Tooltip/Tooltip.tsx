import { ReactNode } from "react";
import { cn } from "@/libs/cn";

interface TooltipProps {
  text: string | boolean;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({ text, children, position = "bottom" }: TooltipProps) {
  const base =
    "absolute px-2 py-1 text-[12px] rounded shadow whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 transition";

  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowPositions = {
    top: "before:bottom-[-6px] before:left-1/2 before:-translate-x-1/2 before:border-t-black dark:before:border-t-white before:border-t-8 before:border-x-8 before:border-x-transparent before:border-b-0",
    bottom:
      "before:top-[-6px] before:left-1/2 before:-translate-x-1/2 before:border-b-black dark:before:border-b-white before:border-b-8 before:border-x-8 before:border-x-transparent before:border-t-0",
    left: "before:right-[-6px] before:top-1/2 before:-translate-y-1/2 before:border-l-black dark:before:border-l-white before:border-l-8 before:border-y-8 before:border-y-transparent before:border-r-0",
    right:
      "before:left-[-6px] before:top-1/2 before:-translate-y-1/2 before:border-r-black dark:before:border-r-white before:border-r-8 before:border-y-8 before:border-y-transparent before:border-l-0",
  };

  return (
    <div className="relative group inline-block">
      {children}
      {text && (
        <div
          className={cn(
            base,
            "bg-black text-white dark:bg-white dark:text-black before:content-[''] before:absolute",
            positions[position],
            arrowPositions[position]
          )}
        >
          {text}
        </div>
      )}
    </div>
  );
}
