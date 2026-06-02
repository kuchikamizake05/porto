"use client";

import { useEffect, useState } from "react";
import { apiGet, apiDelete } from "../../lib/api";
import Link from "next/link";

type Education = {
  id: number;
  school: string;
  degree: string;
  duration: string;
  description: string;
};

export default function AdminEducationPage() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const data = await apiGet<Education[]>("/education");
      setEducations(data);
    } catch (error) {
      console.error("Failed to fetch educations", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this education entry?"))
      return;

    try {
      await apiDelete(`/education/${id}`);
      setEducations(educations.filter((e) => e.id !== id));
    } catch (error) {
      alert("Failed to delete education");
      console.error(error);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Manage Education
          </h1>
          <p className="text-gray-500 font-light text-sm">
            Document your academic background and certifications.
          </p>
        </div>
        <Link
          href="/admin/education/new"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 shadow-[0_0_25px_rgba(37,99,235,0.25)] transition-all text-sm font-bold flex items-center gap-2 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
          <span className="relative z-10 text-lg">+</span>
          <span className="relative z-10">Add Education</span>
        </Link>
      </div>

      <div className="bg-white/2 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/3 border-b border-white/5">
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-400">
                School & Degree
              </th>
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-400">
                Duration
              </th>
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              [1, 2, 3].map((i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={3} className="px-8 py-6">
                    <span className="sr-only">Loading education entries</span>
                    <div
                      aria-hidden="true"
                      className="grid grid-cols-[1fr_120px_120px] gap-6 items-center"
                    >
                      <div>
                        <div className="h-5 bg-white/5 rounded-lg w-48 mb-2" />
                        <div className="h-4 bg-white/5 rounded-lg w-32" />
                      </div>
                      <div className="h-5 bg-white/5 rounded-lg w-24" />
                      <div className="h-5 bg-white/5 rounded-lg w-24 ml-auto" />
                    </div>
                  </td>
                </tr>
              ))
            ) : educations.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-8 py-20 text-center">
                  <p className="text-gray-500 font-light">
                    No education entries found. Add your academic journey!
                  </p>
                </td>
              </tr>
            ) : (
              educations.map((edu) => (
                <tr
                  key={edu.id}
                  className="hover:bg-white/1 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <p className="font-bold text-white group-hover:text-blue-400 transition-colors">
                      {edu.school}
                    </p>
                    <p className="text-blue-500/80 text-sm font-medium">
                      {edu.degree}
                    </p>
                  </td>
                  <td className="px-8 py-6 text-gray-400 text-sm font-light">
                    {edu.duration}
                  </td>
                  <td className="px-8 py-6 text-right space-x-4">
                    <Link
                      href={`/admin/education/edit/${edu.id}`}
                      className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(edu.id)}
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
