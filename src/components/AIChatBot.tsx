// components/AIChatBot.tsx
"use client";

import { useState } from "react";

export default function AIChatBot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const botMessage = { role: "assistant", content: data.reply };

    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="rounded-xl border border-[var(--foreground)]/20 p-4" style={{ backgroundColor: "var(--glass-light)" }}>
      <h2 className="text-xl font-semibold mb-2">🤖 Ask me anything!</h2>

      <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-md ${
              msg.role === "user"
                ? "bg-blue-100 text-blue-900"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && <div className="text-sm text-gray-500">Thinking...</div>}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What's Albin's latest project?"
          className="flex-1 px-3 py-2 rounded-md border border-gray-300"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded-md bg-[var(--foreground)] text-[var(--background)] hover:opacity-90"
        >
          Send
        </button>
      </div>
    </div>
  );
}
