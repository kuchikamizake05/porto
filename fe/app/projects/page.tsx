"use client";

import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";

type Project = {
  id: number;
  title: string;
  description: string;
  tech: string[];
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/projects")
      .then((res) => res.json())
      .then(setProjects);
  }, []);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Projects</h1>

      <div className="grid gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            tech={project.tech}
          />
        ))}
      </div>
    </section>
  );
}
