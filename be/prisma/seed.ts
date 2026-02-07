import prisma from "../src/db.js";

async function main() {
  // Projects
  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      {
        title: "Personal Portfolio",
        description: "A visually stunning portfolio website built with Next.js and Tailwind CSS.",
        tech: "Next.js, Tailwind, Framer Motion",
      },
      {
        title: "Academic Web App",
        description: "A comprehensive web application for managing academic records and schedules.",
        tech: "React, Node.js, PostgreSQL",
      },
    ],
  });

  // Experiences
  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: [
      {
        company: "Google",
        role: "Software Engineer Intern",
        duration: "Jun 2025 - Aug 2025",
        description: "Worked on improving the efficiency of search algorithms using machine learning models.",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_\"G\"_logo.svg",
      },
      {
        company: "Indosat Ooredoo Hutchison",
        role: "Frontend Developer Intern",
        duration: "Jan 2025 - May 2025",
        description: "Developed and maintained responsive web applications using React and Next.js.",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Indosat_Ooredoo_Hutchison_logo.svg",
      },
      {
        company: "BCA",
        role: "Fullstack Web Developer",
        duration: "Sep 2024 - Dec 2024",
        description: "Built and optimized internal banking tools with a focus on security and performance.",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg",
      },
    ],
  });

  // Education
  await prisma.education.deleteMany();
  await prisma.education.createMany({
    data: [
      {
        school: "Gadjah Mada University",
        degree: "Bachelor of Information Engineering",
        duration: "2022 - 2026",
        description: "Focusing on software development, computer networks, and artificial intelligence.",
        logoUrl: "https://upload.wikimedia.org/wikipedia/id/3/36/Lambang_Universitas_Gadjah_Mada.svg",
      },
      {
        school: "Harvard University",
        degree: "Online CS50x Certificate",
        duration: "2023 - 2023",
        description: "Introduction to the intellectual enterprises of computer science and the art of programming.",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/70/Harvard_University_logo.svg",
      },
    ],
  });

  console.log("Seed successful");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
