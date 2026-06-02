"use client";

import React, { useMemo } from "react";

export default function Meteors({ number = 20 }: { number?: number }) {
  const meteorStyles = useMemo<Array<React.CSSProperties>>(
    () => [...new Array(number)].map(() => ({
      top: -5,
      left: Math.floor(Math.random() * 100) + "%",
      animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
    })),
    [number],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {meteorStyles.map((style, idx) => (
        <span
          key={"meteor" + idx}
          style={style}
          className="animate-meteor absolute top-1/2 left-1/2 size-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]"
        >
          <div className="absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-[50%] bg-gradient-to-r from-slate-500 to-transparent" />
        </span>
      ))}
    </div>
  );
}
