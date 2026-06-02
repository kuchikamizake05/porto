import prisma from "@/app/lib/db";
import ProjectsClient, {
  type Project,
} from "@/app/projects/components/ProjectsClient";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects | Faaid Sakhaa",
  description:
    "Selected software projects by Faaid Sakhaa, including web apps, backend systems, and interactive portfolio work.",
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      tech: true,
      imageUrl: true,
      repoUrl: true,
      siteUrl: true,
      category: true,
    },
  });

  return <ProjectsClient projects={projects as Project[]} />;
}
