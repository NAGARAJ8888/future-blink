import express from "express";
import { askAI, saveChat } from "../controllers/aiController.js";

const router = express.Router();

router.post("/ask-ai", askAI);
router.post("/save", saveChat);

export default router;