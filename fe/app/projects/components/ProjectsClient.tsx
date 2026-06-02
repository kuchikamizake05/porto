"use client";

import { AnimatePresence, m as motion } from "motion/react";
import { useMemo, useState } from "react";
import ProjectPageCard from "@/app/projects/components/ProjectPageCard";

export type Project = {
  id: number;
  title: string;
  description: string;
  tech: string;
  imageUrl?: string | null;
  repoUrl?: string | null;
  siteUrl?: string | null;
  category?: string | null;
};

const CATEGORY_ORDER = ["WEBAPP", "WEBSITE", "UI/UX", "GRAPHIC"];

function normalizeCategory(category?: string | null) {
  const normalized = category?.trim().toUpperCase();
  return normalized || "UNCATEGORIZED";
}

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();

    for (const project of projects) {
      const category = normalizeCategory(project.category);
      counts.set(category, (counts.get(category) || 0) + 1);
    }

    return counts;
  }, [projects]);

  const categories = useMemo(() => {
    const dynamicCategories = Array.from(categoryCounts.keys()).filter(
      (category) => !CATEGORY_ORDER.includes(category)
    );

    return [
      { name: "ALL", count: projects.length },
      ...CATEGORY_ORDER.map((category) => ({
        name: category,
        count: categoryCounts.get(category) || 0,
      })),
      ...dynamicCategories.sort().map((category) => ({
        name: category,
        count: categoryCounts.get(category) || 0,
      })),
    ];
  }, [categoryCounts, projects.length]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "ALL") {
      return projects;
    }

    return projects.filter(
      (project) => normalizeCategory(project.category) === activeFilter
    );
  }, [activeFilter, projects]);

  return (
    <div className="min-h-screen md:pt-12 pt-24 pb-28 relative overflow-hidden bg-transparent">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10">
        <div className="mb-4 flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none"
          >
            My <span className="text-blue-500 italic">Projects</span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.2 }}
          className="mx-auto mt-5 md:mt-0 mb-6 flex max-w-full items-center justify-start md:justify-center gap-3 overflow-x-auto px-1 pb-2"
        >
          {categories.map((category) => {
            const isActive = activeFilter === category.name;
            const isDisabled = category.count === 0;

            return (
              <button
                key={category.name}
                type="button"
                onClick={() => setActiveFilter(category.name)}
                disabled={isDisabled}
                className={`shrink-0 rounded-xl border px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
                  isActive
                    ? "border-blue-400 bg-blue-600 text-white shadow-[0_14px_35px_rgba(37,99,235,0.28)]"
                    : isDisabled
                      ? "border-white/5 bg-white/[0.03] text-zinc-700"
                      : "border-white/10 bg-white/[0.08] text-zinc-200 hover:border-blue-400/50 hover:text-white"
                }`}
              >
                <span>{category.name}</span>
                <span
                  className={`ml-3 rounded-full px-2 py-0.5 text-[10px] tracking-normal ${
                    isActive
                      ? "bg-white/20 text-white"
                      : isDisabled
                        ? "bg-white/[0.04] text-zinc-700"
                        : "bg-white/10 text-zinc-400"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {filteredProjects.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] px-8 py-16 text-center">
            <p className="text-sm font-medium text-zinc-500">
              Belum ada project untuk kategori ini.
            </p>
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
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                >
                  <ProjectPageCard
                    title={project.title}
                    description={project.description}
                    tech={project.tech}
                    imageUrl={project.imageUrl || undefined}
                    repoUrl={project.repoUrl || undefined}
                    siteUrl={project.siteUrl || undefined}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <div className="h-40" />
      </div>
    </div>
  );
}
