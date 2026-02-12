"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiGet, apiPost, apiPut } from "../../lib/api";
import Link from "next/link";

type EducationFormProps = {
  id?: string;
};

export default function EducationForm({ id }: EducationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!id);
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    duration: "",
    description: "",
    logoUrl: "",
  });

  useEffect(() => {
    if (id) {
      fetchEducation();
    }
  }, [id]);

  const fetchEducation = async () => {
    try {
      const data = await apiGet<any>(`/education/${id}`);
      setFormData({
        school: data.school || "",
        degree: data.degree || "",
        duration: data.duration || "",
        description: data.description || "",
        logoUrl: data.logoUrl || "",
      });
    } catch (error) {
      console.error("Failed to fetch education", error);
      alert("Education data not found.");
      router.push("/admin/education");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await apiPut(`/education/${id}`, formData);
      } else {
        await apiPost("/education", formData);
      }
      router.push("/admin/education");
    } catch (error) {
      alert(`Failed to ${id ? "update" : "create"} education`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="bg-white/2 border border-white/5 rounded-3xl p-8 animate-pulse">
        <div className="h-64 bg-white/5 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="bg-white/2 border border-white/5 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 px-1">
                School/Institution
              </label>
              <input
                type="text"
                required
                placeholder="e.g. University of Indonesia"
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-blue-500/50 focus:bg-white/10 transition-all outline-hidden font-medium placeholder:text-gray-600"
                value={formData.school}
                onChange={(e) =>
                  setFormData({ ...formData, school: e.target.value })
                }
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 px-1">
                Degree/Field
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Bachelor of Computer Science"
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-blue-500/50 focus:bg-white/10 transition-all outline-hidden font-medium placeholder:text-gray-600"
                value={formData.degree}
                onChange={(e) =>
                  setFormData({ ...formData, degree: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 px-1">
                Duration
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 2020 - 2024"
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-blue-500/50 focus:bg-white/10 transition-all outline-hidden font-medium placeholder:text-gray-600"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 px-1">
                Logo URL (Optional)
              </label>
              <input
                type="text"
                placeholder="https://example.com/logo.png"
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-blue-500/50 focus:bg-white/10 transition-all outline-hidden font-medium placeholder:text-gray-600"
                value={formData.logoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, logoUrl: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 px-1">
              Description
            </label>
            <textarea
              required
              rows={5}
              placeholder="Briefly describe your focus of study or achievements..."
              className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-blue-500/50 focus:bg-white/10 transition-all outline-hidden font-medium placeholder:text-gray-600 resize-none"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="pt-4 flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-5 bg-linear-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-bold tracking-widest uppercase text-sm hover:from-blue-500 hover:to-indigo-600 shadow-[0_10px_40px_rgba(37,99,235,0.2)] disabled:opacity-50 transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
              {loading
                ? id
                  ? "Updating..."
                  : "Adding..."
                : id
                  ? "Update Education"
                  : "Save Education Entry"}
            </button>
            <Link
              href="/admin/education"
              className="px-8 py-5 border border-white/5 text-gray-400 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-white/5 transition-all"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
