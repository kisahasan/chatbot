import { useState, useRef, useEffect } from "react";

type Message = {
  text: string;
  sender: "user" | "bot";
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const [step, setStep] = useState<"chat" | "name" | "phone" | "done">("chat");
  const [lead, setLead] = useState({ name: "", phone: "" });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchReply = async (message: string) => {
    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { text: data.reply, sender: "bot" },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "Error connecting to server", sender: "bot" },
      ]);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);


    if (step === "chat") {
      await fetchReply(input);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "May I know your name?", sender: "bot" },
        ]);
        setStep("name");
      }, 800);
    }

    else if (step === "name") {
      setLead((prev) => ({ ...prev, name: input }));

      setMessages((prev) => [
        ...prev,
        { text: "Please share your phone number.", sender: "bot" },
      ]);

      setStep("phone");
    }

    else if (step === "phone") {
      const updatedLead = { ...lead, phone: input };

      setLead(updatedLead);

      setMessages((prev) => [
        ...prev,
        {
          text: "Thank you! Our team will contact you shortly.",
          sender: "bot",
        },
      ]);

      setStep("done");

      await fetch("http://localhost:5000/lead", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(updatedLead),
});
    }

    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <div
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-xl hover:scale-110 transition cursor-pointer z-50"
      >
        💬
      </div>

      {/* Chatbox */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 h-[420px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden z-50">
          
          {/* Header */}
          <div className="bg-black text-white p-3 text-sm tracking-wide">
            Roul Assistant
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[75%] px-3 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-black text-white ml-auto"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-2 border-t flex">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Type a message..."
              className="flex-1 border rounded px-2 py-1 text-sm outline-none"
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-black text-white px-3 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}