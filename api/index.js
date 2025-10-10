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

// Conecta no MongoDB **uma vez só**
connectDB().then(() => console.log("MongoDB conectado"))
          .catch(err => console.error("Erro MongoDB:", err));

// Exporta direto o Express pro serverless
export default serverless(app);
