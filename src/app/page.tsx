"use client";

import React, { useState } from "react";
import ChatLayout from "@/components/ChatLayout";
import MessageList, { Message } from "@/components/Chat/MessageList";
import ChatInput from "@/components/Chat/ChatInput";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gemini-2.5-flash");

  const handleSend = async (content: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: "user", content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({
            ...m,
            content: typeof m.content === 'object' ? m.content.text : m.content
          })),
          model: selectedModel
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response, // store the full { text, highlightWord, director, totalWins }
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "The Academy is unavailable right now. Due to high volume you cannot use The Academy right now but please keep checking back.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatLayout>
      <div style={{ padding: '12px 20px', borderBottom: '1px solid #2A2A2A', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          style={{ backgroundColor: '#1A1A1A', color: '#D4AF37', border: '1px solid #333', padding: '6px 12px', borderRadius: '6px', outline: 'none', fontSize: '13px', cursor: 'pointer' }}
        >
          <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
          <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
          <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
          <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
        </select>
      </div>
      <div style={{ flex: 1, overflowY: "auto", display: 'flex', flexDirection: 'column' }}>
        <MessageList
          messages={messages}
          isLoading={isLoading}
          onSuggestionClick={handleSend}
        />      </div>
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </ChatLayout>
  );
}
