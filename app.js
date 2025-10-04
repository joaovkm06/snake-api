import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import scoreRoutes from "./src/routes/ScoreRoutes.js";
import connectDB from "./src/config/DbConnect.js";

const app = express();

dotenv.config();

app.use(cors({
  origin: ["http://localhost:3000", "https://snake-api-git-main-joao-kmnieicks-projects.vercel.app/"], 
}));
app.use(express.json());

connectDB();

app.use("/", scoreRoutes);

app.get("/teste", (req, res) => {
  res.json({ message: "API funcionando!" });
});

export default app;
