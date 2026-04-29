export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export type ModelProvider = 'openai' | 'groq';

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}