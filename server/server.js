import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/ai", aiRoutes);

  app.get("/", (req, res) => {
    res.send("API is running...");
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});