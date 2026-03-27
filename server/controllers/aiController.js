import axios from "axios";
import Chat from "../models/Chat.js";

export const askAI = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemini-2.0-flash-lite-001",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = response.data.choices[0].message.content;

    res.json({ result });
  } catch (error) {
    console.error("AI Error Details:", error.response?.data || error.message);
    res.status(500).json({ error: "AI error", details: error.response?.data || error.message });
  }
};

export const saveChat = async (req, res) => {
  const { prompt, response } = req.body;

  try {
    const chat = new Chat({ prompt, response });
    await chat.save();

    res.json({ message: "Saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Save failed" });
  }
};