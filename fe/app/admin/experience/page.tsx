"use client";

import { useEffect, useState } from "react";
import { apiGet, apiDelete } from "../../lib/api";
import Link from "next/link";

type Experience = {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
};

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const data = await apiGet<Experience[]>("/experiences");
      setExperiences(data);
    } catch (error) {
      console.error("Failed to fetch experiences", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this experience entry?")) return;

    try {
      await apiDelete(`/experiences/${id}`);
      setExperiences(experiences.filter((e) => e.id !== id));
    } catch (error) {
      alert("Failed to delete experience");
      console.error(error);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight text-white">Manage Experience</h1>
          <p className="text-gray-400 font-light text-sm">Document your professional career and milestones.</p>
        </div>
        <Link
          href="/admin/experience/new"
          className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all text-sm font-bold flex items-center gap-2"
        >
          <span className="text-lg">+</span> Add Experience
        </Link>
      </div>

      <div className="bg-white/2 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/3 border-b border-white/5">
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-400">Role & Company</th>
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-400">Duration</th>
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              [1, 2, 3].map((i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-8 py-6">
                    <div className="h-5 bg-white/5 rounded-lg w-48 mb-2" />
                    <div className="h-4 bg-white/5 rounded-lg w-32" />
                  </td>
                  <td className="px-8 py-6"><div className="h-5 bg-white/5 rounded-lg w-24" /></td>
                  <td className="px-8 py-6"><div className="h-5 bg-white/5 rounded-lg w-24 ml-auto" /></td>
                </tr>
              ))
            ) : experiences.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-8 py-20 text-center">
                  <p className="text-gray-500 font-light">No experience entries found. Add your professional journey!</p>
                </td>
              </tr>
            ) : (
              experiences.map((exp) => (
                <tr key={exp.id} className="hover:bg-white/1 transition-colors group">
                  <td className="px-8 py-6">
                    <p className="font-bold text-white group-hover:text-blue-400 transition-colors">{exp.role}</p>
                    <p className="text-blue-500/80 text-sm font-medium">{exp.company}</p>
                  </td>
                  <td className="px-8 py-6 text-gray-400 text-sm font-light">{exp.duration}</td>
                  <td className="px-8 py-6 text-right space-x-4">
                    <Link
                      href={`/admin/experience/edit/${exp.id}`}
                      className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(exp.id)}
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
