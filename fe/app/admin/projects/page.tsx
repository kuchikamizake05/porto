import prisma from "@/app/lib/db";
import ProjectsClient from "./ProjectsClient";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { id: "desc" },
    select: {
      id: true,
      title: true,
      description: true,
      tech: true,
      imageUrl: true,
      repoUrl: true,
      siteUrl: true,
    },
  });

  return <ProjectsClient initialProjects={projects} />;
}
