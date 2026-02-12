import { Router } from "express";
import prisma from "../db.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, message } = req.body;
    await prisma.contact.create({
      data: { name, message },
    });
    res.json({ success: true });
  } catch (err: any) {
    console.error("POST /contact error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
