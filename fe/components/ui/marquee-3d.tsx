"use client";

import Marquee from "@/components/ui/Marquee";
import { cn } from "@/lib/utils";
import React from "react";

interface Marquee3DProps {
  children: React.ReactNode[];
  className?: string;
}

export default function Marquee3D({ children, className }: Marquee3DProps) {
  // Desktop: 4 kolom
  const quarter = Math.ceil(children.length / 4);
  const d1 = children.slice(0, quarter);
  const d2 = children.slice(quarter, quarter * 2);
  const d3 = children.slice(quarter * 2, quarter * 3);
  const d4 = children.slice(quarter * 3);

  // Mobile: 3 kolom
  const third = Math.ceil(children.length / 3);
  const m1 = children.slice(0, third);
  const m2 = children.slice(third, third * 2);
  const m3 = children.slice(third * 2);

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div
        className="relative w-full max-w-4xl h-72 md:h-96 overflow-hidden [perspective:100px]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent), linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent), linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskComposite: "intersect",
          maskComposite: "intersect",
        }}
      >
        {/* Mobile — 3 kolom */}
        <div
          className="md:hidden absolute inset-0 flex flex-row items-center justify-center gap-2"
          style={{
            transform:
              "scale(0.85) translateX(0px) translateY(0px) translateZ(0px) rotateX(8deg) rotateY(-3deg) rotateZ(0deg)",
          }}
        >
          <Marquee pauseOnHover vertical speed={28} className="h-full">
            {m1.map((child, i) => (
              <React.Fragment key={i}>{child}</React.Fragment>
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover vertical speed={33} className="h-full">
            {m2.map((child, i) => (
              <React.Fragment key={i}>{child}</React.Fragment>
            ))}
          </Marquee>
          <Marquee pauseOnHover vertical speed={30} className="h-full">
            {m3.map((child, i) => (
              <React.Fragment key={i}>{child}</React.Fragment>
            ))}
          </Marquee>
        </div>

        {/* Desktop — 4 kolom */}
        <div
          className="hidden md:flex absolute inset-0 flex-row items-center justify-center gap-4"
          style={{
            transform:
              "scale(1.5) translateX(-60px) translateY(0px) translateZ(-20px) rotateX(12deg) rotateY(-6deg) rotateZ(0deg)",
          }}
        >
          <Marquee pauseOnHover vertical speed={30} className="h-full">
            {d1.map((child, i) => (
              <React.Fragment key={i}>{child}</React.Fragment>
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover vertical speed={35} className="h-full">
            {d2.map((child, i) => (
              <React.Fragment key={i}>{child}</React.Fragment>
            ))}
          </Marquee>
          <Marquee pauseOnHover vertical speed={28} className="h-full">
            {d3.map((child, i) => (
              <React.Fragment key={i}>{child}</React.Fragment>
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover vertical speed={33} className="h-full">
            {d4.map((child, i) => (
              <React.Fragment key={i}>{child}</React.Fragment>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}
