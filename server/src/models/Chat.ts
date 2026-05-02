import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "New Chat",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // later we enforce after auth
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Chat", chatSchema);