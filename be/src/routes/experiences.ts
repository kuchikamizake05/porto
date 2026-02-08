import { Router } from "express";
import prisma from "../db.js";

const router = Router();

// GET all experiences
router.get("/", async (req, res) => {
  try {
    const experiences = await prisma.experience.findMany();
    res.json(experiences);
  } catch (err: any) {
    console.error("GET /experiences error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST new experience
router.post("/", async (req, res) => {
  try {
    const { company, role, duration, description, logoUrl } = req.body;
    const newExperience = await prisma.experience.create({
      data: { company, role, duration, description, logoUrl },
    });
    res.json(newExperience);
  } catch (err: any) {
    console.error("POST /experiences error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET single experience by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await prisma.experience.findUnique({
      where: { id: Number(id) },
    });
    if (!experience) {
      return res.status(404).json({ error: "Experience not found" });
    }
    res.json(experience);
  } catch (err: any) {
    console.error("GET /experiences/:id error:", err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE experience
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { company, role, duration, description, logoUrl } = req.body;
    const updatedExperience = await prisma.experience.update({
      where: { id: Number(id) },
      data: { company, role, duration, description, logoUrl },
    });
    res.json(updatedExperience);
  } catch (err: any) {
    console.error("PUT /experiences/:id error:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE experience
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.experience.delete({
      where: { id: Number(id) },
    });
    res.json({ success: true });
  } catch (err: any) {
    console.error("DELETE /experiences/:id error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
