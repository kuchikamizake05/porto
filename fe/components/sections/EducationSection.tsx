"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/app/lib/api";
import { GraduationCap } from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

type Education = {
  id: number;
  school: string;
  degree: string;
  duration: string;
  description: string;
  logoUrl?: string;
};

export default function EducationSection() {
  const [educations, setEducations] = useState<Education[]>([]);
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
    apiGet<Education[]>("/education")
      .then(setEducations)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      ref={containerRef}
      className="glass-card rounded-[32px] px-8 pt-8 pb-4 border bg-linear-to-br from-purple-500/5 to-purple-500/2 border-white/5 h-full flex flex-col"
    >
      <div className="mb-2 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-white/5 border border-white/10">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-lg md:text-xl font-bold text-white uppercase tracking-[0.2em]">
          Education
        </h2>
      </div>

      {loading ? (
        <div className="space-y-8">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse flex gap-6 px-12">
              <div className="w-24 h-4 bg-white/5 rounded-lg shrink-0 mt-4" />
              <div className="flex-1 h-32 bg-white/5 rounded-3xl" />
            </div>
          ))}
        </div>
      ) : (
        <div className="relative">
          <div className="flex flex-col">
            {educations.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex flex-col md:flex-row gap-4 md:gap-14 relative group py-4"
              >
                {/* Date Column */}
                <div className="md:w-24 shrink-0 text-sm font-medium text-purple-400/80 text-center self-center leading-relaxed">
                  {edu.duration.replace(/-/g, " - ")}
                </div>

                {/* Timeline Column (Dot & Line) */}
                <div className="hidden md:flex flex-col items-center absolute left-[113px] top-0 bottom-0 pointer-events-none">
                  {/* Unified Static Line */}
                  <div
                    className={`w-[1px] absolute bg-purple-400/30 
                    ${
                      index === 0
                        ? "top-1/2 bottom-0"
                        : index === educations.length - 1
                          ? "top-0 bottom-1/2"
                          : "top-0 bottom-0"
                    }`}
                  />

                  {/* Solid Highlight Line (Static) */}
                  <div
                    className={`w-[1px] absolute bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]
                    ${
                      index === 0
                        ? "top-1/2 bottom-0"
                        : index === educations.length - 1
                          ? "top-0 bottom-1/2"
                          : "top-0 bottom-0"
                    }`}
                  />

                  {/* Dot */}
                  <div className="flex items-center justify-center relative z-10 shrink-0 h-full">
                    <div className="w-3 h-3 rounded-full bg-zinc-900 border-2 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]" />
                  </div>
                </div>

                {/* Content Card */}
                <div className="flex-1 glass-card bg-zinc-900/40 p-6 rounded-[24px] border border-white/10 group-hover:border-purple-500 transition-all duration-300 flex items-center gap-5">
                  {/* Logo - Circular crop */}
                  <div className="w-12 h-12 rounded-[5px] overflow-hidden shrink-0 transition-all duration-300 shadow-xl">
                    {edu.logoUrl ? (
                      <img
                        src={edu.logoUrl}
                        alt={edu.school}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-zinc-500" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white transition-colors">
                      {edu.degree}
                    </h3>
                    <div className="text-purple-400/80 text-sm font-medium">
                      {edu.school}
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed mt-2 font-light">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
