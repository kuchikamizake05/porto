"use client";

import { motion } from "framer-motion";
import Marquee from "@/components/ui/Marquee";
// import {
//   Atom, // React
//   Wind, // Tailwind
//   SquareCode, // Next.js/React
//   FileJson, // TypeScript
//   Server, // Node.js
//   Database, // SQL
//   Box, // Docker/Packaging
//   Flame, // Firebase
//   Braces, // C++/JS
//   Github, // Version Control
// } from "lucide-react";

const logos = [
  { icon: "devicon-python-plain", color: "text-blue-500" },
  { icon: "devicon-tailwindcss-plain", color: "text-sky-400" },
  { icon: "devicon-typescript-plain", color: "text-blue-600" },
  { icon: "devicon-nodejs-plain", color: "text-green-500" },
  { icon: "devicon-mysql-plain", color: "text-indigo-500" },
  { icon: "devicon-docker-plain", color: "text-blue-400" },
  { icon: "devicon-supabase-plain", color: "text-green-500" },
  { icon: "devicon-cplusplus-plain", color: "text-blue-500" },
  { icon: "devicon-javascript-plain", color: "text-yellow-400" },
  { icon: "devicon-github-original", color: "text-white" },
  { icon: "devicon-react-original", color: "text-blue-500" },
  { icon: "devicon-mongodb-plain", color: "text-green-500" },
  { icon: "devicon-amazonwebservices-plain", color: "text-white" },
  { icon: "devicon-git-plain", color: "text-red-500" },
  { icon: "devicon-nextjs-plain", color: "text-white" },
  { icon: "devicon-googlecloud-plain", color: "text-white" },
];

// const logos = [
//   { icon: Atom, color: "text-blue-500" },
//   { icon: Wind, color: "text-sky-400" },
//   { icon: SquareCode, color: "text-white" },
//   { icon: FileJson, color: "text-blue-600" },
//   { icon: Server, color: "text-green-500" },
//   { icon: Database, color: "text-indigo-500" },
//   { icon: Box, color: "text-blue-400" },
//   { icon: Flame, color: "text-orange-500" },
//   { icon: Braces, color: "text-yellow-500" },
//   { icon: Github, color: "text-white" },
// ];

export default function TechStack() {
  return (
    <section className="md:pt-8 py-5 relative overflow-hidden">
      {/* BACKGROUND TEXT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none -z-10 opacity-2">
        <span className="text-[15rem] md:text-[25rem] font-black text-white tracking-tighter uppercase whitespace-nowrap">
          Stack
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-0 mb-15 relative">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <h2 className="md:text-2xl text-xl font-extrabold text-center uppercase tracking-[0.4em] text-blue-500/80 transition-colors hover:text-blue-400">
            Professional Stack
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>
      </div>

      <div className="relative">
        <Marquee
          speed={30}
          className="md:py-8 pt-0 hover:[animation-play-state:paused]"
        >
          {logos.map((logo, idx) => (
            <motion.div
              key={idx}
              className="px-12 group"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4 + (idx % 3),
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="relative flex items-center justify-center">
                {/* Dynamic Glow */}
                <div
                  className={`absolute inset-0 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 bg-current ${logo.color}`}
                />
                <i
                  className={`
    ${logo.icon}
    ${logo.color}
    text-7xl
    transition-all duration-700
    group-hover:scale-125
    drop-shadow-[0_0_8px_rgba(37,99,235,0.2)]
    group-hover:drop-shadow-[0_0_15px_rgba(37,99,235,0.6)]
  `}
                />
              </div>
            </motion.div>
          ))}
        </Marquee>

        <Marquee
          speed={30}
          direction="right"
          className="py-8 hover:[animation-play-state:paused]"
        >
          {[...logos].reverse().map((logo, idx) => (
            <motion.div
              key={idx}
              className="px-12 group"
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 5 + (idx % 2),
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="relative flex items-center justify-center">
                {/* Dynamic Glow */}
                <div
                  className={`absolute inset-0 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 bg-current ${logo.color}`}
                />
                <i
                  className={`
    ${logo.icon}
    ${logo.color}
    text-7xl
    transition-all duration-700
    group-hover:scale-125
    drop-shadow-[0_0_8px_rgba(37,99,235,0.2)]
    group-hover:drop-shadow-[0_0_15px_rgba(37,99,235,0.6)]
  `}
                />
              </div>
            </motion.div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
