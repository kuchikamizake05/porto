import { Router } from "express";
import prisma from "../db.js";

const router = Router();

// GET all educations
router.get("/", async (req, res) => {
  try {
    const educations = await prisma.education.findMany();
    res.json(educations);
  } catch (err: any) {
    console.error("GET /education error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST new education
router.post("/", async (req, res) => {
  try {
    const { school, degree, duration, description, logoUrl } = req.body;
    const newEducation = await prisma.education.create({
      data: { school, degree, duration, description, logoUrl },
    });
    res.json(newEducation);
  } catch (err: any) {
    console.error("POST /education error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET single education by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const education = await prisma.education.findUnique({
      where: { id: Number(id) },
    });
    if (!education) {
      return res.status(404).json({ error: "Education not found" });
    }
    res.json(education);
  } catch (err: any) {
    console.error("GET /education/:id error:", err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE education
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { school, degree, duration, description, logoUrl } = req.body;
    const updatedEducation = await prisma.education.update({
      where: { id: Number(id) },
      data: { school, degree, duration, description, logoUrl },
    });
    res.json(updatedEducation);
  } catch (err: any) {
    console.error("PUT /education/:id error:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE education
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.education.delete({
      where: { id: Number(id) },
    });
    res.json({ success: true });
  } catch (err: any) {
    console.error("DELETE /education/:id error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
