import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import projectsRoute from "./routes/projects.js";
import contactRoute from "./routes/contact.js";
import experiencesRoute from "./routes/experiences.js";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

// Profile endpoint - must be before other routes
app.get("/profile", (req: Request, res: Response) => {
  res.json({
    name: "Faaid Sakhaa",
    role: "Information Engineering Student",
    stack: ["Next.js", "Express", "TypeScript"],
  });
});

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "backend alive" });
});

// Other routes
app.use("/projects", projectsRoute);
app.use("/contact", contactRoute);
app.use("/experiences", experiencesRoute);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});