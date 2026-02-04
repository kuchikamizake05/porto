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

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet<Experience[]>("/experiences")
      .then(setExperiences)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="experience" className="py-32 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-24 space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight shrink-0">Carrier <span className="text-blue-500 italic">Timeline</span></h2>
            <div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
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
        ) : experiences.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border border-dashed border-white/10 bg-white/2">
            <p className="text-gray-500 font-light text-lg italic tracking-wide">Timeline entries pending.</p>
          </div>
        ) : (
          <div className="relative border-l border-white/10 ml-4 md:ml-32 space-y-16">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative pl-12 group">
                {/* Timeline Dot */}
                <div className="absolute -left-2.25 top-6 w-4 h-4 rounded-full border-4 border-black bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:scale-150 transition-all duration-500" />
                
                {/* Date Label (Desktop) */}
                <div className="hidden md:block absolute -left-40 top-5 w-32 text-right">
                  <span className="text-[10px] font-bold text-gray-600 group-hover:text-blue-400 transition-colors uppercase tracking-[0.2em] leading-none">
                    {exp.duration}
                  </span>
                </div>

                {/* Content Card */}
                <div className="bg-white/2 rounded-3xl p-8 border border-white/5 hover:border-blue-500/20 hover:shadow-[0_0_50px_rgba(37,99,235,0.1)] transition-all duration-500 backdrop-blur-sm">
                  <div className="md:hidden mb-3">
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{exp.duration}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-lg font-semibold text-gray-400">{exp.company}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-700" />
                    <span className="text-sm text-gray-600 font-medium">Full-time</span>
                  </div>
                  <p className="text-gray-400 leading-relaxed font-light whitespace-pre-wrap text-lg">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
