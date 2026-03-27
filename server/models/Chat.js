import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    prompt: String,
    response: String,
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);