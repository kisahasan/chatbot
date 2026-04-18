import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const leads = [];

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
  model: "llama-3.1-8b-instant",
  messages: [
    {
      role: "system",
      content:
        "You are a helpful assistant for a premium salon. Keep replies short, polite, and professional.",
    },
    {
      role: "user",
      content: message,
    },
  ],
});

    res.json({
      reply: response.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Something went wrong" });
  }
});

app.post("/lead", (req, res) => {
  const { name, phone } = req.body;

  console.log("New Lead:", { name, phone });

  leads.push({ name, phone, time: new Date() });

  res.json({ success: true });
});

app.get("/leads", (req, res) => {
  res.json(leads);
});

app.listen(5000, () => console.log("Server running on 5000"));