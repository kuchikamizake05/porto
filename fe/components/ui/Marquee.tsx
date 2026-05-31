"use client";

import { cn } from "@/lib/utils";
import React, { useMemo } from "react";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
  pauseOnHover?: boolean;
  reverse?: boolean;
  vertical?: boolean;
}

export default function Marquee({
  children,
  speed = 40,
  className = "",
  pauseOnHover = false,
  reverse = false,
  vertical = false,
}: MarqueeProps) {
  const animStyle = useMemo(
    () => ({
      animationName: vertical
        ? reverse
          ? "marquee-vertical-down"
          : "marquee-vertical-up"
        : reverse
          ? "marquee-horizontal-reverse"
          : "marquee-horizontal",
      animationDuration: `${speed}s`,
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
    } as React.CSSProperties),
    [speed, reverse, vertical]
  );

  const content = (
    <div
      className={cn("shrink-0 flex items-center gap-4", vertical ? "flex-col" : "flex-row")}
    >
      {children}
      {children}
      {children}
      {children}
    </div>
  );

  return (
    <div
      className={cn(
        "overflow-hidden select-none",
        vertical ? "h-full" : "w-full",
        className
      )}
    >
      <style>{`
        @keyframes marquee-vertical-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes marquee-vertical-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        @keyframes marquee-horizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-horizontal-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <div
        style={animStyle}
        className={cn(pauseOnHover && "group/col hover:[animation-play-state:paused]")}
      >
        {content}
      </div>
    </div>
  );
}
