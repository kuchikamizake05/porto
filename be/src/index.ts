import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/profile", (req, res) => {
  res.json({
    name: "Nama Kamu",
    role: "Informatics Student",
    stack: ["Next.js", "Express", "TypeScript"],
  });
});
