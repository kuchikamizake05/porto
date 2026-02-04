"use client";

import { useEffect, useState, use } from "react";
import { apiGet } from "../../../../lib/api";
import ExperienceForm from "../../../../components/admin/ExperienceForm";

type Experience = {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
};

export default function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet<Experience>(`/experiences/${id}`)
      .then(setExperience)
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch experience");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!experience) return <div>Experience not found</div>;

  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold tracking-tight text-white">Edit Experience</h1>
        <p className="text-gray-400 font-light text-sm">Update your role at {experience.company}.</p>
      </div>
      <ExperienceForm isEdit initialData={experience} />
    </div>
  );
}
