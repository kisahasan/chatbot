import { useState, useRef, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import type { Message as MessageType } from './types';
import ModelSelector from './components/ModelSelector';
import Message from './components/Message';
import InputArea from './components/InputArea';

function App() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Only model (no provider)
  const [model, setModel] = useState("llama-3.1-8b-instant");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: MessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input.trim(),
          model, 
        }),
      });

      const data = await response.json();

      const assistantMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || "Sorry, I couldn't process that.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error(error);

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Error connecting to AI service.",
        timestamp: new Date(),
      }]);

    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">

        {/* Header */}
        <header className="border-b border-gray-800 p-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">AI Chatbot</h1>

          <div className="flex items-center gap-4">
            <ModelSelector 
              model={model}
              setModel={setModel}
            />

            <button
              onClick={clearChat}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              title="Clear Chat"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              Start a conversation...
            </div>
          ) : (
            messages.map((msg) => (
              <Message key={msg.id} message={msg} />
            ))
          )}

          {isLoading && (
            <div className="text-gray-400 italic">AI is thinking...</div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <InputArea 
          input={input} 
          setInput={setInput} 
          onSend={handleSend} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
}

export default App;