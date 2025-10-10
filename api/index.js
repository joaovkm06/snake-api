import serverless from "serverless-http";
import express from "express";
import scoreRoutes from "../src/routes/scoreRoutes.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

const app = express();
app.use(express.json());

// Rotas da API
app.use("/", scoreRoutes);

// Carregar Swagger (verifica vários nomes possíveis)
let swaggerDocument;
const possibleFiles = ["swagger.yaml", "Swagger.yaml", "jogador-swagger.yaml"];

for (const file of possibleFiles) {
  try {
    const filePath = path.join(process.cwd(), file);
    swaggerDocument = YAML.load(filePath);
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


export default serverless(app);