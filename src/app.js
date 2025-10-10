import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import scoreRoutes from "./routes/scoreRoutes.js"; 
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import connectDB from "./db.js"; // importa o db com cache

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const swaggerDocument = YAML.load(join(__dirname, "..", "swagger.yaml"));

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 


app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("Erro na conexão com o MongoDB:", err);
    res.status(500).json({ error: "Erro ao conectar ao banco" });
  }
});

app.use("/", scoreRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.json({ message: "API funcionando!" });
});

export default app;
