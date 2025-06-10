"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Maximize2, Minimize2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function AIChatBot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();
      const botMessage = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Client ChatBot Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Sorry, something went wrong while generating a response. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: `Hi there! 👋 I'm an AI assistant trained to answer questions about Albin — his projects, skills, experience, and more. Try asking:
- **What tech does Albin use?**
- **What’s his latest project?**
- **Where can I contact him?**
`,
        },
      ]);
    }
  }, [messages.length, isOpen]);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-xl shadow-[var(--glow)] bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-all ${
          !isOpen ? "animate-bounce-twice-wait" : ""
        }`}
        title="Ask the AI about Albin"
        aria-label="Open chatbot"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline font-semibold text-sm">
          Chat with AlbinBot
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed z-[60] ${
            isFullscreen
              ? "top-0 left-0 w-full h-full flex items-center justify-center p-4"
              : "bottom-20 right-6"
          }`}
        >
          <div
            className={`border border-[var(--foreground)]/20 shadow-lg backdrop-blur-md bg-[var(--glass)] ${
              isFullscreen
                ? "w-full max-w-screen-sm h-[90vh] rounded-xl flex flex-col"
                : "w-[320px] sm:w-[380px] max-h-[80vh] rounded-2xl flex flex-col"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-4">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                🤖 Ask about Albin
              </h2>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  title={isFullscreen ? "Exit Fullscreen" : "Go Fullscreen"}
                  aria-label={
                    isFullscreen ? "Exit Fullscreen" : "Go Fullscreen"
                  }
                  className="p-2 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-5 h-5 text-[var(--text-primary)]" />
                  ) : (
                    <Maximize2 className="w-5 h-5 text-[var(--text-primary)]" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Chat"
                  aria-label="Close Chat"
                  className="p-2 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition"
                >
                  <X className="w-5 h-5 text-[var(--text-primary)]" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-2 px-4 py-2 text-sm">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 whitespace-pre-wrap rounded-md ${
                    msg.role === "user"
                      ? "bg-[var(--foreground)] text-[var(--background)]"
                      : "bg-[var(--background)] text-[var(--text-primary)] border border-[var(--foreground)]/10"
                  }`}
                >
                  <div className="markdown">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="text-[var(--text-muted)]">Thinking...</div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-2 border-t border-[var(--foreground)]/10 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g. What’s Albin’s background?"
                className="flex-1 px-3 py-2 rounded-md border border-[var(--foreground)]/20 text-sm bg-[var(--background)] text-[var(--text-primary)]"
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 text-sm rounded-md bg-[var(--foreground)] text-[var(--background)] hover:opacity-90"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
