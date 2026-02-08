"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apiGet } from "@/app/lib/api";
import ProjectPageCard from "@/app/projects/components/ProjectPageCard";

type Project = {
  id: number;
  title: string;
  description: string;
  tech: string;
  imageUrl?: string;
  repoUrl?: string;
  siteUrl?: string;
  category?: string; // Assume category exists or we derive it
};

const CATEGORIES = ["ALL", "WEBAPP", "WEBSITE", "UI/UX", "GRAPHIC"];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet<Project[]>("/projects")
      .then((data) => {
        setProjects(data);
        setFilteredProjects(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeFilter === "ALL") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) => p.category?.toUpperCase() === activeFilter),
      );
    }
  }, [activeFilter, projects]);

  return (
    <div className="min-h-screen md:pt-12 pt-24 pb-28 relative overflow-hidden bg-transparent">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-4 flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none"
          >
            My <span className="text-blue-500 italic">Projects</span>
          </motion.h1>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center mt-5 md:mt-0 gap-3 mb-5"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 border border-white/5 ${
                activeFilter === cat
                  ? "bg-linear-to-b from-blue-500 to-blue-700 text-white scale-105"
                  : "bg-linear-to-b from-white/20 to-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-16/10 glass-card rounded-[24px] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProjectPageCard
                    title={project.title}
                    description={project.description}
                    tech={project.tech}
                    imageUrl={project.imageUrl}
                    repoUrl={project.repoUrl}
                    siteUrl={project.siteUrl}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Safe Bottom Spacing awareness */}
        <div className="h-40" />
      </div>
    </div>
  );
}
