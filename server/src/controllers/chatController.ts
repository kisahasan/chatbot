import { Request, Response } from "express";
import Groq from "groq-sdk";
import dotenv from "dotenv";
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