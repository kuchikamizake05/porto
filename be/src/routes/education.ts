import { Router } from "express";
import prisma from "../db.js";

const router = Router();

// GET all educations
router.get("/", async (req, res) => {
  const educations = await prisma.education.findMany();
  res.json(educations);
});

// POST new education
router.post("/", async (req, res) => {
  const { school, degree, duration, description, logoUrl } = req.body;
  const newEducation = await prisma.education.create({
    data: { school, degree, duration, description, logoUrl },
  });
  res.json(newEducation);
});

// GET single education by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const education = await prisma.education.findUnique({
    where: { id: Number(id) },
  });
  if (!education) {
    return res.status(404).json({ error: "Education not found" });
  }
  res.json(education);
});

// UPDATE education
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { school, degree, duration, description, logoUrl } = req.body;
  const updatedEducation = await prisma.education.update({
    where: { id: Number(id) },
    data: { school, degree, duration, description, logoUrl },
  });
  res.json(updatedEducation);
});

// DELETE education
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.education.delete({
    where: { id: Number(id) },
  });
  res.json({ success: true });
});

export default router;
