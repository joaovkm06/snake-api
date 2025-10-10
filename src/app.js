import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import scoreRoutes from "./routes/scoreRoutes.js"; 
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 

// Conexão MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error("Erro ao conectar no MongoDB:", err));

// Rotas
app.use("/", scoreRoutes);

// Swagger
const swaggerPath = path.join(process.cwd(), "swagger.yaml"); // pega a raiz do projeto no Vercel
const swaggerDocument = YAML.load(swaggerPath);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.json({ message: "API funcionando!" });
});

export default app;
