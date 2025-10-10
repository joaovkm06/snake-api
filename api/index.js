import serverless from "serverless-http";
import app from "../src/app.js"; // importa o app já configurado
import connectDB from "../src/db.js";

// Cache global da conexão (Serverless não mantém estado entre invocações, mas isso ajuda)
let cached = false;

const handler = async (req, res) => {
  if (!cached) {
    try {
      await connectDB();
      cached = true;
      console.log("MongoDB conectado via Serverless!");
    } catch (err) {
      console.error("Erro ao conectar ao MongoDB:", err);
      return res.status(500).json({ error: "Erro ao conectar ao banco" });
    }
  }

  return app(req, res);
};

export const server = serverless(handler);
