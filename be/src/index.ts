import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import prisma from "./db.js";
import projectsRoute from "./routes/projects.js";
import contactRoute from "./routes/contact.js";
import experiencesRoute from "./routes/experiences.js";
import educationRoute from "./routes/education.js";

const app = express();
const PORT = process.env.PORT || 8000;

// CORS configuration
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "backend alive" });
});

// Health check - test DB connection
app.get("/health", async (req: Request, res: Response) => {
  try {
    await prisma.$queryRawUnsafe("SELECT 1");
    res.json({ status: "ok", db: "connected" });
  } catch (err: any) {
    res.status(500).json({ status: "error", db: err.message });
  }
});

// Other routes
app.use("/projects", projectsRoute);
app.use("/contact", contactRoute);
app.use("/experiences", experiencesRoute);
app.use("/education", educationRoute);

// Global error handler - ensures CORS headers are always sent
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});