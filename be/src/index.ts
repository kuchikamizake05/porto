import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
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

// Other routes
app.use("/projects", projectsRoute);
app.use("/contact", contactRoute);
app.use("/experiences", experiencesRoute);
app.use("/education", educationRoute);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});