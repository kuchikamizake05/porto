import prisma from "@/app/lib/db";
import ExperienceClient from "./ExperienceClient";

export default async function AdminExperiencePage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { id: "desc" },
    select: {
      id: true,
      company: true,
      role: true,
      duration: true,
      description: true,
      logoUrl: true,
    },
  });

  return <ExperienceClient initialExperiences={experiences} />;
}
