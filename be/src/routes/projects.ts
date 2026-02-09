import { Router } from "express";
import prisma from "../db.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (err: any) {
    console.error("GET /projects error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, tech, category, imageUrl, repoUrl, siteUrl } = req.body;
    const newProject = await prisma.project.create({
      data: { title, description, tech, category, imageUrl, repoUrl, siteUrl },
    });
    res.json(newProject);
  } catch (err: any) {
    console.error("POST /projects error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET single project by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
      where: { id: Number(id) },
    });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (err: any) {
    console.error("GET /projects/:id error:", err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE project
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tech, category, imageUrl, repoUrl, siteUrl } = req.body;
    const updatedProject = await prisma.project.update({
      where: { id: Number(id) },
      data: { title, description, tech, category, imageUrl, repoUrl, siteUrl },
    });
    res.json(updatedProject);
  } catch (err: any) {
    console.error("PUT /projects/:id error:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE project
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({
      where: { id: Number(id) },
    });
    res.json({ success: true });
  } catch (err: any) {
    console.error("DELETE /projects/:id error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
