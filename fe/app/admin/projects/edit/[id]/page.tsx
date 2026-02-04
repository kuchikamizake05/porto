"use client";

import { useEffect, useState, use } from "react";
import { apiGet } from "../../../../lib/api";
import ProjectForm from "../../../../components/admin/ProjectForm";

type Project = {
  id: number;
  title: string;
  description: string;
  tech: string;
  imageUrl?: string;
  repoUrl?: string;
};

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet<Project>(`/projects/${id}`)
      .then(setProject)
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch project");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold tracking-tight text-white">Edit Project</h1>
        <p className="text-gray-400 font-light text-sm">Update the information for &ldquo;{project.title}&rdquo;.</p>
      </div>
      <ProjectForm isEdit initialData={project} />
    </div>
  );
}
