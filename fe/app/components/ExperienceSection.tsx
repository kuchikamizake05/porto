"use client";

import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";

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
    <section id="experience" className="py-16 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 md:px-0" ref={containerRef}>
        <div className="mb-24 space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight shrink-0">Carrier <span className="text-blue-500 italic">Timeline</span></h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          <p className="text-xl text-gray-500 font-light max-w-2xl">
            A chronological journey through my professional milestones.
          </p>
        </div>

        {loading ? (
          <div className="space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex gap-8">
                <div className="w-24 h-6 bg-white/5 rounded-lg shrink-0" />
                <div className="flex-1 space-y-4">
                  <div className="h-10 bg-white/5 rounded-xl w-1/3" />
                  <div className="h-32 bg-white/5 rounded-2xl w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative ml-4 md:ml-32 space-y-20">
            {/* Animated Timeline Line */}
            <div className="absolute -left-px top-2 bottom-2 w-0.5 bg-white/5" />
            <motion.div
              style={{ scaleY }}
              className="absolute -left-px top-2 bottom-2 w-0.5 bg-blue-500 origin-top shadow-[0_0_15px_rgba(37,99,235,0.5)]"
            />

            {experiences.map((exp, index) => (
              <motion.div 
                key={exp.id} 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative pl-12 group"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-2 top-6 w-4 h-4 rounded-full border-4 border-[#020203] bg-zinc-800 group-hover:bg-blue-500 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-500 z-10" />
                
                {/* Date Label (Desktop) */}
                <div className="hidden md:block absolute -left-48 top-5 w-40 text-right">
                  <span className="text-[10px] font-bold text-gray-600 group-hover:text-blue-400 transition-colors uppercase tracking-[0.2em] leading-none">
                    {exp.duration}
                  </span>
                </div>

                {/* Content Card */}
                <div className="glass-card rounded-[2rem] p-8 border border-white/5 hover:border-blue-500/20 hover:shadow-[0_0_50px_rgba(37,99,235,0.05)] transition-all duration-500">
                  <div className="md:hidden mb-4">
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">{exp.duration}</span>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold text-gray-400">{exp.company}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-700" />
                        <span className="text-xs text-gray-600 font-bold uppercase tracking-wider">Full-time</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-400 leading-relaxed font-light whitespace-pre-wrap text-lg">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
