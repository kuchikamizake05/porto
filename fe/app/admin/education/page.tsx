import prisma from "@/app/lib/db";
import EducationClient from "./EducationClient";

export default async function AdminEducationPage() {
  const educations = await prisma.education.findMany({
    orderBy: { id: "desc" },
    select: {
      id: true,
      school: true,
      degree: true,
      duration: true,
      description: true,
    },
  });

  return <EducationClient initialEducations={educations} />;
}
