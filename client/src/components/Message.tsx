import type { Message as MessageType } from "../types";
import { User, Bot } from 'lucide-react';

interface Props {
  message: MessageType;
}

export default function Message({ message }: Props) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : ''}`}>
        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center
          ${isUser ? 'bg-blue-600' : 'bg-gray-700'}`}>
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>

        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed
          ${isUser 
            ? 'bg-blue-600 text-white rounded-br-none' 
            : 'bg-gray-800 text-gray-100 rounded-bl-none'}`}>
          {message.content}
        </div>
      </div>
    </div>
  );
}