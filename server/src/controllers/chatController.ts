import { Request, Response } from "express";
import Groq from "groq-sdk";
import dotenv from "dotenv";
import Chat from "../models/Chat";
import Message from "../models/Message";
dotenv.config();


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const chat = async (req: Request, res: Response) => {
  const { message, model = "llama-3.1-8b-instant" } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message required" });
  }

  try {
    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model,
    });

    const reply = response.choices[0]?.message?.content;

    res.json({ response: reply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to respond" });
  }
};
export const createChat = async (req: any, res: { json: (arg0: any) => void; }) => {
  const chat = new Chat();
  await chat.save();

  res.json(chat);
};
export const getChats = async (req: any, res: { json: (arg0: any) => void; }) => {
  const chats = await Chat.find().sort({ createdAt: -1 });
  res.json(chats);
};
export const sendMessage = async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const { message, model = "llama-3.1-8b-instant" } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message required" });
  }

  try {
    const userMsg = new Message({
      chatId,
      role: "user",
      content: message,
    });
    await userMsg.save();

    const history = await Message.find({ chatId }).sort({ createdAt: 1 });

    const formatted = history.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const response = await groq.chat.completions.create({
      messages: formatted,
      model,
    });

    const reply = response.choices[0]?.message?.content || "";

    const botMsg = new Message({
      chatId,
      role: "assistant",
      content: reply,
    });
    await botMsg.save();

    res.json({ response: reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to respond" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  const { chatId } = req.params;

  const messages = await Message.find({ chatId }).sort({ createdAt: 1 });

  res.json(messages);
};