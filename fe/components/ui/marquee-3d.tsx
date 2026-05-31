"use client";

import Marquee from "@/components/ui/Marquee";
import { cn } from "@/lib/utils";
import React from "react";

interface Marquee3DProps {
  children: React.ReactNode[];
  className?: string;
}

export default function Marquee3D({ children, className }: Marquee3DProps) {
  const quarter = Math.ceil(children.length / 4);
  const first = children.slice(0, quarter);
  const second = children.slice(quarter, quarter * 2);
  const third = children.slice(quarter * 2, quarter * 3);
  const fourth = children.slice(quarter * 3);

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        className
      )}
    >
      <div
        className="relative w-full max-w-4xl h-96 overflow-hidden [perspective:150px]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent), linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent), linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskComposite: "intersect",
          maskComposite: "intersect",
        }}
      >
        <div
          className="absolute inset-0 flex flex-row items-center justify-center gap-4"
          style={{
            transform:
              "scale(1.5) translateX(-60px) translateY(0px) translateZ(-20px) rotateX(12deg) rotateY(-6deg) rotateZ(0deg)",
          }}
        >
          <Marquee pauseOnHover vertical speed={30} className="h-full">
            {first.map((child, i) => (
              <React.Fragment key={i}>{child}</React.Fragment>
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover vertical speed={35} className="h-full">
            {second.map((child, i) => (
              <React.Fragment key={i}>{child}</React.Fragment>
            ))}
          </Marquee>
          <Marquee pauseOnHover vertical speed={28} className="h-full">
            {third.map((child, i) => (
              <React.Fragment key={i}>{child}</React.Fragment>
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover vertical speed={33} className="h-full">
            {fourth.map((child, i) => (
              <React.Fragment key={i}>{child}</React.Fragment>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}
