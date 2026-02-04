"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiPost, apiPut } from "../../lib/api";

type ExperienceFormProps = {
  initialData?: {
    id?: number;
    company: string;
    role: string;
    duration: string;
    description: string;
  };
  isEdit?: boolean;
};

export default function ExperienceForm({ initialData, isEdit }: ExperienceFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    company: initialData?.company || "",
    role: initialData?.role || "",
    duration: initialData?.duration || "",
    description: initialData?.description || "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit && initialData?.id) {
        await apiPut(`/experiences/${initialData.id}`, formData);
      } else {
        await apiPost("/experiences", formData);
      }
      router.push("/admin/experience");
      router.refresh();
    } catch (error) {
      console.error("Failed to save experience", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/2 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md">
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 text-sm">
            <label className="block font-bold text-gray-400">Role / Job Title</label>
            <input
              type="text"
              required
              className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="e.g. Fullstack Developer"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
          </div>
          <div className="space-y-3 text-sm">
            <label className="block font-bold text-gray-400">Company Name</label>
            <input
              type="text"
              required
              className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="e.g. Acme Corp"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <label className="block font-bold text-gray-400">Duration</label>
          <input
            type="text"
            required
            className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="e.g. Jan 2022 - Present"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          />
        </div>

        <div className="space-y-3 text-sm">
          <label className="block font-bold text-gray-400">Description</label>
          <textarea
            required
            rows={5}
            className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none font-light"
            placeholder="What did you do there?"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
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
          {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Experience"}
        </button>
      </div>
    </form>
  );
}
