"use client";

import { motion } from "framer-motion";
import React from "react";

export default function Marquee({
  children,
  direction = "left",
  speed = 40,
  className = "",
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden flex select-none ${className}`}>
      <motion.div
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex min-w-full shrink-0 gap-12 py-4"
      >
        {/* Render twice for seamless loop */}
        {children}
        {children}
      </motion.div>
    </div>
  );
}
