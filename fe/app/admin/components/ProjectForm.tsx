"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiPost, apiPut } from "../../lib/api";

type ProjectFormProps = {
  initialData?: {
    id?: number;
    title: string;
    description: string;
    tech: string;
    imageUrl?: string;
    repoUrl?: string;
  };
  isEdit?: boolean;
};

export default function ProjectForm({ initialData, isEdit }: ProjectFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    tech: initialData?.tech || "",
    imageUrl: initialData?.imageUrl || "",
    repoUrl: initialData?.repoUrl || "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit && initialData?.id) {
        await apiPut(`/projects/${initialData.id}`, formData);
      } else {
        await apiPost("/projects", formData);
      }
      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      console.error("Failed to save project", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/2 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md">
      <div className="p-8 space-y-6">
        <div className="space-y-3 text-sm">
          <label className="block font-bold text-gray-400">Project Title</label>
          <input
            type="text"
            required
            className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="e.g. My Awesome App"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div className="space-y-3 text-sm">
          <label className="block font-bold text-gray-400">Description</label>
          <textarea
            required
            rows={4}
            className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none font-light"
            placeholder="Tell us about this project..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="space-y-3 text-sm">
          <label className="block font-bold text-gray-400">Tech Stack (comma separated)</label>
          <input
            type="text"
            required
            className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="e.g. Next.js, TypeScript, Tailwind"
            value={formData.tech}
            onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 text-sm">
            <label className="block font-bold text-gray-400">Image URL (optional)</label>
            <input
              type="url"
              className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="https://..."
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
          </div>
          <div className="space-y-3 text-sm">
            <label className="block font-bold text-gray-400">Repository URL (optional)</label>
            <input
              type="url"
              className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="https://github.com/..."
              value={formData.repoUrl}
              onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="px-8 py-6 bg-white/2 border-t border-white/5 flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 text-sm font-bold text-gray-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all disabled:opacity-50"
        >
          {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Project"}
        </button>
      </div>
    </form>
  );
}
