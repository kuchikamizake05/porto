import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.project.createMany({
    data: [
      {
        title: "Personal Portfolio",
        description: "My personal website built with Next.js",
        tech: "Next.js,TypeScript,Tailwind",
      },
      {
        title: "Academic Web App",
        description: "Web app for managing academic data",
        tech: "Next.js,Express,Prisma",
      },
    ],
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
