import serverless from "serverless-http";
import app from "../src/app.js";
import connectDB from "../src/db.js";

// Conecta no MongoDB antes de responder
const handler = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao conectar no banco" });
  }
};

export const defaultHandler = serverless(handler);
