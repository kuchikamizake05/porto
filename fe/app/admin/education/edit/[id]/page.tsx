import { notFound } from "next/navigation";
import prisma from "@/app/lib/db";
import EducationForm from "../../../components/EducationForm";

export default async function EditEducationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const education = await prisma.education.findUnique({
    where: { id: Number(id) },
    select: {
      school: true,
      degree: true,
      duration: true,
      description: true,
      logoUrl: true,
    },
  });

  if (!education) notFound();

  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Edit Education
        </h1>
        <p className="text-gray-400 font-light text-sm">
          Update your academic milestone details.
        </p>
      </div>
      <EducationForm id={id} initialData={education} />
    </div>
  );
}
