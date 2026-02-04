"use client";

import { useEffect, useState, useCallback } from "react";
import { apiGet } from "../lib/api";
import ProjectCard from "./ProjectCard";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Project = {
  id: number;
  title: string;
  description: string;
  tech: string;
  imageUrl?: string;
  repoUrl?: string;
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    apiGet<Project[]>("/projects")
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-16 scroll-mt-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Featured <span className="text-blue-500 italic">Work</span>
            </h2>
            <p className="text-xl text-gray-400 font-light">
              A selection of architectural digital experiences.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={scrollPrev}
              className="p-3 rounded-full border border-white/10 bg-white/5 text-white hover:bg-blue-600 transition-all active:scale-90"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              className="p-3 rounded-full border border-white/10 bg-white/5 text-white hover:bg-blue-600 transition-all active:scale-90"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[250px] gap-6">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`rounded-[2.5rem] border border-white/5 bg-white/2 overflow-hidden animate-pulse ${
                  i === 1 ? "md:col-span-4 md:row-span-2" : "md:col-span-2 md:row-span-1"
                }`}
              >
                <div className="w-full h-full bg-white/5" />
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border border-dashed border-white/10 bg-white/2">
            <p className="text-gray-500 font-light text-lg italic tracking-wide">Gallery is currently empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[300px] gap-6">
            {projects.map((project, idx) => {
              // Bento grid logic: first project is large (4x2), others fill the gaps
              let gridClasses = "md:col-span-2 md:row-span-1";
              if (idx === 0) gridClasses = "md:col-span-4 md:row-span-2";
              if (idx === 1) gridClasses = "md:col-span-2 md:row-span-2";
              if (idx > 2) gridClasses = "md:col-span-3 md:row-span-1";

              return (
                <div key={project.id} className={`${gridClasses} transition-all duration-700`}>
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    tech={project.tech}
                    imageUrl={project.imageUrl}
                    repoUrl={project.repoUrl}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
