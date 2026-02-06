"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function Spotlight({
  className = "",
  fillColor = "rgba(37, 99, 235, 0.15)",
  size = 400,
}: {
  className?: string;
  fillColor?: string;
  size?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement
  const springConfig = { stiffness: 150, damping: 20 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { left, top } = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 z-30 transition-opacity duration-500 overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          top: -size / 2,
          left: -size / 2,
          x: smoothX,
          y: smoothY,
          background: `radial-gradient(circle, ${fillColor} 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}
