"use client";

import { useEffect, useState } from "react";
import { apiGet, apiDelete } from "../../lib/api";
import Link from "next/link";

type Project = {
  id: number;
  title: string;
  description: string;
  tech: string;
  imageUrl?: string;
  repoUrl?: string;
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await apiGet<Project[]>("/projects");
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await apiDelete(`/projects/${id}`);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (error) {
      alert("Failed to delete project");
      console.error(error);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight text-white">Manage Projects</h1>
          <p className="text-gray-400 font-light text-sm">Create and organize your architectural works.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all text-sm font-bold flex items-center gap-2"
        >
          <span className="text-lg">+</span> Add Project
        </Link>
      </div>

      <div className="bg-white/2 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/3 border-b border-white/5">
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-400">Project Name</th>
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-400">Tech Stack</th>
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              [1, 2, 3].map((i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-8 py-6"><div className="h-5 bg-white/5 rounded-lg w-48" /></td>
                  <td className="px-8 py-6"><div className="h-5 bg-white/5 rounded-lg w-64" /></td>
                  <td className="px-8 py-6"><div className="h-5 bg-white/5 rounded-lg w-24 ml-auto" /></td>
                </tr>
              ))
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-8 py-20 text-center">
                  <div className="space-y-3">
                    <p className="text-gray-500 font-light">No projects found. Start by adding one!</p>
                  </div>
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="hover:bg-white/1 transition-colors group">
                  <td className="px-8 py-6">
                    <span className="font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-wrap gap-2 text-xs font-medium">
                      {project.tech.split(",").slice(0, 4).map((t, idx) => (
                        <span key={idx} className="bg-white/5 text-gray-400 px-3 py-1 rounded-full border border-white/5">
                          {t.trim()}
                        </span>
                      ))}
                      {project.tech.split(",").length > 4 && <span className="text-gray-600">...</span>}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right space-x-4">
                    <Link
                      href={`/admin/projects/edit/${project.id}`}
                      className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-sm font-bold text-gray-500 hover:text-red-500 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
