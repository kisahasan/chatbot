import express from 'express';
import dotenv from 'dotenv';
import corsMiddleware from './config/cors';
import chatRoutes from './routes/chat';
import { errorHandler } from './middleware/errorhandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
console.log("API KEY:", process.env.GROQ_API_KEY);

// Middleware
app.use(express.json());
app.use(corsMiddleware);

// Routes
app.use("/api", chatRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'AI Chatbot Server is running' });
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Chat API available at http://localhost:${PORT}/api/chat`);
});