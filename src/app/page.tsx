"use client";

import React, { useState } from "react";
import ChatLayout from "@/components/ChatLayout";
import MessageList, { Message } from "@/components/Chat/MessageList";
import ChatInput from "@/components/Chat/ChatInput";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (content: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: "user", content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
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
      <div style={{ flex: 1, overflowY: "auto", display: 'flex', flexDirection: 'column' }}>
        <MessageList messages={messages} isLoading={isLoading} />
      </div>
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </ChatLayout>
  );
}
