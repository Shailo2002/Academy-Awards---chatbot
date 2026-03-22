import React from "react";
import HeroSection from "./HeroSection";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string | {
    text: string;
    highlightWord?: string;
    director?: string;
    totalWins?: string;
  };
};

function highlightMovie(text: string, word: string) {
  if (!word) return <span>{text}</span>;
  const parts = text.split(new RegExp(`(${word})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === word.toLowerCase() ? (
          <em key={i} style={{ color: "#D4AF37", fontStyle: "italic", fontWeight: 600 }}>
            '{part}'
          </em>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function AssistantCard({ content }: { content: Message["content"] }) {
  if (typeof content === "string") {
    return <p style={{ margin: 0, color: "#E8E8E8", lineHeight: 1.6 }}>{content}</p>;
  }

  const { text, highlightWord, director, totalWins } = content;

  return (
    <div>
      <p style={{ margin: "0 0 20px 0", color: "#E8E8E8", fontSize: "16px", lineHeight: 1.7 }}>
        {highlightWord ? highlightMovie(text, highlightWord) : text}
      </p>

      {(director || totalWins) && (
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
          {director && (
            <div style={{
              flex: 1, backgroundColor: "#111", borderRadius: "8px",
              padding: "14px 18px", border: "1px solid #2A2A2A"
            }}>
              <div style={{ color: "#888", fontSize: "11px", letterSpacing: "0.1em", marginBottom: "8px" }}>
                DIRECTOR
              </div>
              <div style={{ color: "#E8E8E8", fontSize: "18px", fontWeight: 400 }}>
                {director}
              </div>
            </div>
          )}
          {totalWins && (
            <div style={{
              flex: 1, backgroundColor: "#111", borderRadius: "8px",
              padding: "14px 18px", border: "1px solid #2A2A2A"
            }}>
              <div style={{ color: "#888", fontSize: "11px", letterSpacing: "0.1em", marginBottom: "8px" }}>
                TOTAL WINS
              </div>
              <div style={{ color: "#E8E8E8", fontSize: "18px", fontWeight: 400 }}>
                {totalWins}
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{ display: "flex", gap: "10px" }}>
        <button style={{
          backgroundColor: "transparent", color: "#D4AF37",
          border: "1px solid #D4AF37", padding: "10px 18px",
          borderRadius: "6px", fontSize: "12px", letterSpacing: "0.08em",
          fontWeight: 600, cursor: "pointer"
        }}>
          WATCH SPEECH
        </button>
        <button style={{
          backgroundColor: "transparent", color: "#D4AF37",
          border: "1px solid #D4AF37", padding: "10px 18px",
          borderRadius: "6px", fontSize: "12px", letterSpacing: "0.08em",
          fontWeight: 600, cursor: "pointer"
        }}>
          SEE ALL NOMINEES
        </button>
      </div>
    </div>
  );
}

export default function MessageList({ messages, isLoading, onSuggestionClick }: {
  messages: Message[];
  isLoading: boolean;
  onSuggestionClick: (text: string) => void;
}) {
  if (messages.length === 0 && !isLoading) {
    return <HeroSection onSuggestionClick={onSuggestionClick} />;
  }

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
      {messages.map((msg) => (
        <div key={msg.id} style={{
          display: "flex",
          justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
          alignItems: "flex-start",
          gap: "12px"
        }}>
          {msg.role === "assistant" && (
            <div style={{
              width: "40px", height: "40px", borderRadius: "10px",
              backgroundColor: "#D4AF37", display: "flex",
              alignItems: "center", justifyContent: "center",
              flexShrink: 0, fontSize: "16px"
            }}>
              ★
            </div>
          )}

          <div style={{
            maxWidth: "75%",
            backgroundColor: msg.role === "user" ? "#2A2A2A" : "#1C1C1A",
            borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "4px 18px 18px 18px",
            padding: msg.role === "user" ? "12px 18px" : "20px 24px",
            borderLeft: msg.role === "assistant" ? "3px solid #D4AF37" : "none",
          }}>
            {msg.role === "user" ? (
              <p style={{ margin: 0, color: "#E8E8E8" }}>
                {typeof msg.content === "string" ? msg.content : msg.content.text}
              </p>
            ) : (
              <AssistantCard content={msg.content} />
            )}
          </div>
        </div>
      ))}

      {isLoading && (
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "10px",
            backgroundColor: "#D4AF37", display: "flex",
            alignItems: "center", justifyContent: "center", fontSize: "16px"
          }}>★</div>
          <div style={{
            backgroundColor: "#1C1C1A", borderRadius: "4px 18px 18px 18px",
            padding: "20px 24px", borderLeft: "3px solid #D4AF37"
          }}>
            <span style={{ color: "#888" }}>The Envelope is thinking…</span>
          </div>
        </div>
      )}
    </div>
  );
}
