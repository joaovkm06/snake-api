import express from "express";
import cors from "cors";
import scoreRoutes from "./routes/scoreRoutes.js"; 
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json()); 

// Rotas
app.use("/", scoreRoutes);

// Swagger
const swaggerPath = path.join(process.cwd(), "swagger.yaml");
const swaggerDocument = YAML.load(swaggerPath);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.json({ message: "API funcionando!" });
});

export default app;
