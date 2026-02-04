import { Router } from "express";
import prisma from "../db.js";

const router = Router();

router.get("/", async (req, res) => {
  const projects = await prisma.project.findMany();
  res.json(projects);
});

router.post("/", async (req, res) => {
    const { title, description, tech, imageUrl, repoUrl } = req.body;
    const newProject = await prisma.project.create({
        data: { title, description, tech, imageUrl, repoUrl },
    });
    res.json(newProject);
});

// GET single project by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
        where: { id: Number(id) },
    });
    if (!project) {
        return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
});

// UPDATE project
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, tech, imageUrl, repoUrl } = req.body;
    const updatedProject = await prisma.project.update({
        where: { id: Number(id) },
        data: { title, description, tech, imageUrl, repoUrl },
    });
    res.json(updatedProject);
});

// DELETE project
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await prisma.project.delete({
        where: { id: Number(id) },
    });
    res.json({ success: true });
});

export default router;
