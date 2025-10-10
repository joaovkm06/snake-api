import serverless from "serverless-http";
import express from "express";
import scoreRoutes from "./src/routes/scoreRoutes.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

const app = express();
app.use(express.json());

// Rotas da API
app.use("/", scoreRoutes);

// Tentativa de carregar o Swagger (sensível a maiúsculas/minúsculas)
let swaggerDocument;
const possibleFiles = ["swagger.yaml", "Swagger.yaml"];

for (const file of possibleFiles) {
  try {
    swaggerDocument = YAML.load(path.join(process.cwd(), file));
    console.log(`Swagger carregado com sucesso de: ${file}`);
    break;
  } catch (err) {
    console.warn(`Não foi possível carregar ${file}: ${err.message}`);
  }
}

if (swaggerDocument) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
  console.warn("Swagger não carregado. Nenhuma documentação disponível.");
}

export const handler = serverless(app);
