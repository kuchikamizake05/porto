import { Router } from "express";
import prisma from "../db.js";

const router = Router();

router.post("/", async (req, res) => {
  const { name, message } = req.body;

  await prisma.contact.create({
    data: { name, message },
  });

  res.json({ success: true });
});

export default router;
