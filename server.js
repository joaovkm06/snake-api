// server.js
import app from "./src/app.js";
import connectDB from "./src/db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDB(); // conecta no MongoDB antes de iniciar
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Erro ao iniciar servidor:", err);
  }
};

startServer();
