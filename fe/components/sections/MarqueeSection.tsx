"use client";

import { motion } from "framer-motion";

export default function MarqueeSection() {
  const text =
    "FAAID SAKHAA • WEB DEVELOPER • CYBER SECURITY ENTHUSIAST • AI ENTHUSIAST";

  // Repeat text for seamless loop
  const repeatedText = Array(10).fill(text).join(" ✦ ");

  return (
    <section className="pt-20 pb-10 overflow-hidden relative">
      {/* First Marquee - Rotated Left */}
      <div className="absolute w-[200vw] -left-[50vw] -rotate-5">
        <div className="bg-[linear-gradient(to_right,black,#1e3a8a,#2563eb,#1e3a8a,black)] py-6 shadow-lg">
          <motion.div
            animate={{ x: [0, -2000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            className="whitespace-nowrap"
          >
            <span className="text-white font-bold text-2xl md:text-5xl tracking-wider">
              {repeatedText}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Second Marquee - Rotated Right (Opposite direction) */}
      <div className="absolute w-[200vw] -left-[50vw] rotate-5">
        <div className="bg-[linear-gradient(to_right,black,#4c1d95,#7c3aed,#4c1d95,black)] py-6 shadow-lg">
          <motion.div
            animate={{ x: [-2000, 0] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            className="whitespace-nowrap"
          >
            <span className="text-white font-bold text-2xl md:text-5xl tracking-wider">
              {repeatedText}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Spacer for height */}
      <div className="h-40" />
    </section>
  );
}
