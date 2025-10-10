import serverless from "serverless-http";
import express from "express";
import connectDB from "../src/db.js";
import scoreRoutes from "../src/routes/scoreRoutes.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

const app = express();

app.use(express.json());
app.use("/", scoreRoutes);

// Swagger
const swaggerPath = path.join(process.cwd(), "swagger.yaml");
const swaggerDocument = YAML.load(swaggerPath);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => res.json({ message: "API funcionando!" }));

const handler = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (err) {
    console.error("Erro na função serverless:", err);
    res.status(500).json({ message: "Erro no servidor" });
  }
};

export const handlerExport = serverless(handler);

export default app;