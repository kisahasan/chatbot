import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";

import corsMiddleware from './config/cors';
import chatRoutes from './routes/chat';
import { errorHandler } from './middleware/errorhandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(corsMiddleware);

// Routes
app.use("/api", chatRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'AI Chatbot Server is running' });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📡 Chat API available at http://localhost:${PORT}/api/chat`);
    });

  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
};

// start
startServer();