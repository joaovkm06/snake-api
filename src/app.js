import serverless from "serverless-http";
import express from "express";
import connectDB from "./config/DbConnect.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use("/", scoreRoutes);

// Tenta carregar Swagger
let swaggerDocument;
try {
  const swaggerPathOptions = [
    path.join(__dirname, "swagger.yaml"),
    path.join(__dirname, "Swagger.yaml"),
    path.join(__dirname, "jogador-swagger.yaml"),
  ];

  for (const p of swaggerPathOptions) {
    try {
      swaggerDocument = YAML.load(p);
      console.log(`Swagger carregado de: ${p}`);
      break;
    } catch (err) {
      console.log(`Não foi possível carregar ${p}: ${err.message}`);
    }
  }
} catch (err) {
  console.log("Swagger não carregado. Nenhuma documentação disponível.");
}

if (swaggerDocument) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

connectDB();

export const handler = serverless(app);
