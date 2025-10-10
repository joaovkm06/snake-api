import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("MongoDB conectado!");
  } catch (err) {
    console.error("Erro no MongoDB:", err);
    throw err; // importante lançar para o Vercel capturar
  }
};

export default connectDB;
