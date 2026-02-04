import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "backend alive" });
});

app.get("/profile", (req: Request, res: Response) => {
  res.json({
    name: "Nama Kamu",
    role: "Informatics Student",
    stack: ["Next.js", "Express", "TypeScript"],
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

app.get("/projects", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Personal Portfolio",
      description: "My personal website built with Next.js",
      tech: ["Next.js", "TypeScript"],
    },
    {
      id: 2,
      title: "Academic Web App",
      description: "Web app for managing academic data",
      tech: ["Next.js", "Express"],
    },
  ]);
});
