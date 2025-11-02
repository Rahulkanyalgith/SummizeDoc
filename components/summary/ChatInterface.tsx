"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { askQuestionAction } from "@/actions/chat-actions";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  summaryId: string;
}

export function ChatInterface({ summaryId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await askQuestionAction(summaryId, input);
      if (result.success && result.answer) {
        const assistantMessage: Message = {
          role: "assistant",
          content: result.answer,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        const errorMessage: Message = {
          role: "assistant",
          content: result.error || "Sorry, something went wrong.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        role: "assistant",
        content: "An unexpected error occurred.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-2xl lg:text-4xl font-bold lg:tracking-tight mb-4">
        <span className="bg-linear-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
          Chat With This Document
        </span>
      </h3>
      <div className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all h-96 overflow-y-auto">
        <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
        <div className="relative space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-xl shadow-sm max-w-lg ${
                  msg.role === "user"
                    ? "bg-rose-500 text-white"
                    : "bg-gray-200/70 text-gray-800"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="p-3 rounded-xl bg-gray-200/70 text-gray-600 shadow-sm">
                Thinking...
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 p-3 rounded-2xl border border-gray-500/10 bg-linear-to-br from-gray-200/[0.06] to-gray-400/[0.02]">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about the document..."
            className="flex-grow"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </form>
      </div>
    </div>
  );
}
