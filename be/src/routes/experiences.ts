import { Router } from "express";
import prisma from "../db.js";

const router = Router();

// GET all experiences
router.get("/", async (req, res) => {
  const experiences = await prisma.experience.findMany();
  res.json(experiences);
});

// POST new experience
router.post("/", async (req, res) => {
  const { company, role, duration, description } = req.body;
  const newExperience = await prisma.experience.create({
    data: { company, role, duration, description },
  });
  res.json(newExperience);
});

// GET single experience by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const experience = await prisma.experience.findUnique({
    where: { id: Number(id) },
  });
  if (!experience) {
    return res.status(404).json({ error: "Experience not found" });
  }
  res.json(experience);
});

// UPDATE experience
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { company, role, duration, description } = req.body;
  const updatedExperience = await prisma.experience.update({
    where: { id: Number(id) },
    data: { company, role, duration, description },
  });
  res.json(updatedExperience);
});

// DELETE experience
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.experience.delete({
    where: { id: Number(id) },
  });
  res.json({ success: true });
});

export default router;
