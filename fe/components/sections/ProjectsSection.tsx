"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/app/lib/api";
import Link from "next/link";
import Image from "next/image";

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
        // Show first 5 projects for the list
        setProjects(data.slice(0, 5));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      id="projects"
      className="py-12 scroll-mt-20 relative overflow-hidden"
    >
      {/* Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/[0.03] blur-[150px] rounded-full -z-10" />

      <div className="w-full px-4 md:px-0">
        {/* Header */}
        <div className="mb-10 space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-none shrink-0">
              Featured
              <span className="text-blue-500 font-bold italic">Work</span>
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          <p className="text-lg md:text-xl text-muted-foreground font-light">
            A precision-focused selection of architectural digital experiences.
          </p>
        </div>

        {/* Projects List */}
        {loading ? (
          <div className="space-y-0">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="border-b border-white/5 py-6 animate-pulse"
              >
                <div className="h-16 bg-white/5 rounded" />
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 rounded-[2.5rem] border border-dashed border-white/10 bg-white/2">
            <p className="text-gray-500 font-light text-lg italic tracking-wide">
              Work is currently in progress.
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {projects.map((project, idx) => (
              <Link
                key={project.id}
                href={project.repoUrl || "#"}
                target={project.repoUrl ? "_blank" : undefined}
                rel={project.repoUrl ? "noopener noreferrer" : undefined}
                className="group block border-b-3 border-white/10 py-7 px-6 relative overflow-hidden transition-all duration-500 hover:border-blue-500/30"
              >
                {/* Background Color Change on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Project Image - Full size with zoom effect on hover */}
                {project.imageUrl && (
                  <div className="absolute inset-0 -mx-6 -my-7 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none will-change-transform overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="100vw"
                      className="object-cover object-center scale-100 group-hover:scale-110 transition-transform duration-700 will-change-transform"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "translateZ(0)",
                      }}
                    />
                    {/* Gradient mask: dark on left (protect text), transparent on right (show image) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60" />
                  </div>
                )}

                <div className="relative z-10 flex items-center justify-between gap-12">
                  {/* Left: Title and Description */}
                  <div className="flex-1 space-y-2">
                    <h3 className="text-3xl md:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {project.description}
                    </p>
                  </div>

                  {/* Right: Arrow Icon */}
                  <div className="shrink-0 md:mr-6">
                    <svg
                      className="w-15 h-15 text-gray-500 group-hover:text-blue-400 transform group-hover:translate-x-2 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M17 8l4 4m0 0l-4 4m4-4H12"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* See More */}
        {!loading && (
          <div className="mt-10 flex justify-center">
            <Link
              href="/projects"
              className="relative h-[52px] px-8 rounded-full bg-gradient-to-b from-white/20 to-white/10 border border-white/10 text-white font-bold text-base tracking-wide flex items-center gap-2 overflow-hidden group hover:bg-white/10 transition-colors"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              <span className="relative z-10">See All Projects</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
