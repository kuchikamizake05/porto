"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ShineBorder({
  children,
  className = "",
  borderRadius = "1.5rem",
  borderWidth = 1,
  duration = 14,
  color = ["#2563eb", "#4f46e5", "#2563eb"],
}: {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
  borderWidth?: number;
  duration?: number;
  color?: string | string[];
}) {
  return (
    <div
      className={`relative p-[${borderWidth}px] overflow-hidden ${className}`}
      style={{ borderRadius }}
    >
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-[-1000%] opacity-50"
        style={{
          background: `conic-gradient(from 0deg, ${
            Array.isArray(color) ? color.join(", ") : color
          })`,
        }}
      />
      <div
        className="relative h-full w-full bg-background"
        style={{ borderRadius: `calc(${borderRadius} - ${borderWidth}px)` }}
      >
        {children}
      </div>
    </div>
  );
}
