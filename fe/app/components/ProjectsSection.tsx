"use client";

import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import Magnetic from "./core/Magnetic";

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

  useEffect(() => {
    apiGet<Project[]>("/projects")
      .then((data) => {
        // Only show first 4 projects for the bento grid (highlighted)
        setProjects(data.slice(0, 4));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-12 scroll-mt-20 relative overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
      {/* Dynamic Blending Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/[0.03] blur-[150px] rounded-full -z-10" />
      
      <div className="w-full px-4 md:px-0">
        <div className="mb-16 space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight leading-none shrink-0">
              Featured <span className="text-blue-500 font-medium italic">Work</span>
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-lg">
            A precision-focused selection of architectural digital experiences.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[280px] gap-6">
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
          <div className="text-center py-20 rounded-[2.5rem] border border-dashed border-white/10 bg-white/2">
            <p className="text-gray-500 font-light text-lg italic tracking-wide">Work is currently in progress.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[320px] gap-6">
            {projects.map((project, idx) => {
              // High-end Bento grid logic for 4 projects
              let gridClasses = "md:col-span-2 md:row-span-1";
              if (idx === 0) gridClasses = "md:col-span-4 md:row-span-2";
              if (idx === 1) gridClasses = "md:col-span-2 md:row-span-2";
              if (idx === 2) gridClasses = "md:col-span-3 md:row-span-1";
              if (idx === 3) gridClasses = "md:col-span-3 md:row-span-1";

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

        {/* See More Button */}
        {!loading && projects.length > 0 && (
          <div className="mt-16 flex justify-center">
            <Magnetic strength={0.2}>
              <Link
                href="/projects"
                className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white text-sm font-bold tracking-widest uppercase transition-all flex items-center gap-3"
              >
                See All Projects
                <div className="relative w-4 h-4">
                  <div className="absolute inset-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                </div>
              </Link>
            </Magnetic>
          </div>
        )}
      </div>
    </section>
  );
}
