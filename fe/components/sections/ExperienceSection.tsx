"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/app/lib/api";

type Experience = {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
};

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    apiGet<Experience[]>("/experiences")
      .then(setExperiences)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      ref={containerRef}
      className="glass-card rounded-[32px] p-8 border border-white/5 h-full flex flex-col"
    >
      <div className="mb-8 flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
        <h2 className="text-lg md:text-xl font-bold text-white uppercase tracking-[0.2em]">
          Experience
        </h2>
      </div>

      {loading ? (
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex gap-4">
              <div className="w-16 h-4 bg-white/5 rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-6 bg-white/5 rounded-lg w-1/2" />
                <div className="h-16 bg-white/5 rounded-xl w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative pl-4 space-y-12">
          {/* Animated Timeline Line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-white/5" />
          <motion.div
            style={{ scaleY }}
            className="absolute left-0 top-2 bottom-2 w-px bg-blue-500 origin-top shadow-[0_0_15px_rgba(37,99,235,0.5)]"
          />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative pl-8 group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#020203] bg-zinc-600 group-hover:bg-blue-500 transition-colors z-10" />

              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2 py-1 rounded-md w-fit">
                    {exp.duration}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    {exp.role}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase tracking-wider">
                  <span>{exp.company}</span>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed font-light">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
