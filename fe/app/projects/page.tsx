import prisma from "@/app/lib/db";
import ProjectsClient, {
  type Project,
} from "@/app/projects/components/ProjectsClient";

export const revalidate = 60;

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
