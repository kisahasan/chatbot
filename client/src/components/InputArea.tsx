import { Send } from 'lucide-react';

interface Props {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export default function InputArea({ input, setInput, onSend, isLoading }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-gray-800 p-4 bg-gray-950">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={1}
            className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-5 py-4 pr-14 
                       text-white placeholder-gray-500 focus:outline-none focus:border-blue-600 resize-y min-h-[56px] max-h-[200px]"
          />
          <button
            onClick={onSend}
            disabled={!input.trim() || isLoading}
            className="absolute bottom-3 right-3 p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 
                       text-white rounded-xl transition-colors disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-center text-xs text-gray-500 mt-2">
          AI can make mistakes. Consider checking important info.
        </p>
      </div>
    </div>
  );
}