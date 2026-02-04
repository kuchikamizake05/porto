"use client";

import { useEffect, useState } from "react";

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
    <main style={{ padding: 20 }}>
      <h1>Projects</h1>

      {projects.map((project) => (
        <div key={project.id} style={{ marginBottom: 16 }}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <small>{project.tech.join(", ")}</small>
        </div>
      ))}
    </main>
  );
}
