"use client";

import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";
import ProjectCard from "./ProjectCard";

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
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-32 scroll-mt-20 relative">
      <div className="max-w-4xl mx-auto">
        <div className="mb-24 space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-white/10 to-transparent" />
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Featured <span className="text-blue-500 italic">Work</span></h2>
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-white/10 to-transparent" />
          </div>
          <p className="text-xl text-gray-500 font-light text-center">
            A selection of architectural digital experiences.
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-[2.5rem] border border-white/5 bg-white/2 overflow-hidden animate-pulse">
                <div className="aspect-video bg-white/5" />
                <div className="p-8 space-y-4">
                  <div className="h-6 bg-white/5 rounded-xl w-3/4" />
                  <div className="h-12 bg-white/5 rounded-xl w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border border-dashed border-white/10 bg-white/2">
            <p className="text-gray-500 font-light text-lg italic tracking-wide">Gallery is currently empty.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-12">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                tech={project.tech}
                imageUrl={project.imageUrl}
                repoUrl={project.repoUrl}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
