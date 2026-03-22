import React, { useState } from "react";
import HeroSection from "./HeroSection";
import TypingIndicator from "./Typingindicator";

export type Nominee = {
  name: string;
  work: string;
};

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string | {
    text: string;
    highlightWord?: string;
    director?: string;
    totalWins?: string;
    youtubeLink?: string;
    nominees?: Nominee[];
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

function getYouTubeEmbedId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function AssistantCard({ content }: { content: Message["content"] }) {
  const [showNominees, setShowNominees] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);

  if (typeof content === "string") {
    return <p style={{ margin: 0, color: "#E8E8E8", lineHeight: 1.6 }}>{content}</p>;
  }

  const { text, highlightWord, director, totalWins, youtubeLink, nominees } = content;
  const embedId = youtubeLink ? getYouTubeEmbedId(youtubeLink) : null;
  const hasNominees = nominees && nominees.length > 0;

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
              <div style={{ color: "#888", fontSize: "11px", letterSpacing: "0.1em", marginBottom: "8px" }}>DIRECTOR</div>
              <div style={{ color: "#E8E8E8", fontSize: "18px", fontWeight: 400 }}>{director}</div>
            </div>
          )}
          {totalWins && (
            <div style={{
              flex: 1, backgroundColor: "#111", borderRadius: "8px",
              padding: "14px 18px", border: "1px solid #2A2A2A"
            }}>
              <div style={{ color: "#888", fontSize: "11px", letterSpacing: "0.1em", marginBottom: "8px" }}>TOTAL WINS</div>
              <div style={{ color: "#E8E8E8", fontSize: "18px", fontWeight: 400 }}>{totalWins}</div>
            </div>
          )}
        </div>
      )}

      {/* YouTube Embed */}
      {showEmbed && embedId && (
        <div style={{ marginBottom: "16px", borderRadius: "10px", overflow: "hidden", border: "1px solid #2A2A2A" }}>
          <iframe
            width="100%"
            height="280"
            src={`https://www.youtube.com/embed/${embedId}?autoplay=1`}
            title="Acceptance Speech"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ display: "block" }}
          />
        </div>
      )}

      {/* Nominees Panel */}
      {showNominees && hasNominees && (
        <div style={{
          marginBottom: "16px", backgroundColor: "#111",
          borderRadius: "10px", border: "1px solid #2A2A2A", overflow: "hidden"
        }}>
          <div style={{
            padding: "12px 18px", borderBottom: "1px solid #2A2A2A",
            color: "#888", fontSize: "11px", letterSpacing: "0.1em"
          }}>
            ALL NOMINEES
          </div>
          {nominees!.map((n, i) => (
            <div key={i} style={{
              padding: "12px 18px",
              borderBottom: i < nominees!.length - 1 ? "1px solid #1A1A1A" : "none",
              display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
              <span style={{ color: "#E8E8E8", fontWeight: 500 }}>{n.name}</span>
              <span style={{ color: "#888", fontSize: "13px", fontStyle: "italic" }}>{n.work}</span>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {youtubeLink && (
          <button
            onClick={() => {
              if (embedId) {
                setShowEmbed(prev => !prev);
              } else {
                window.open(youtubeLink, "_blank");
              }
            }}
            style={{
              backgroundColor: showEmbed ? "#D4AF37" : "transparent",
              color: showEmbed ? "#0A0A08" : "#D4AF37",
              border: "1px solid #D4AF37", padding: "10px 18px",
              borderRadius: "6px", fontSize: "12px", letterSpacing: "0.08em",
              fontWeight: 600, cursor: "pointer", transition: "all 0.2s"
            }}
          >
            {showEmbed ? "▼ HIDE SPEECH" : "▶ WATCH SPEECH"}
          </button>
        )}

        {!youtubeLink && (
          <button style={{
            backgroundColor: "transparent", color: "#555",
            border: "1px solid #333", padding: "10px 18px",
            borderRadius: "6px", fontSize: "12px", letterSpacing: "0.08em",
            fontWeight: 600, cursor: "not-allowed"
          }} disabled title="No speech available">
            WATCH SPEECH
          </button>
        )}

        {hasNominees && (
          <button
            onClick={() => setShowNominees(prev => !prev)}
            style={{
              backgroundColor: showNominees ? "#D4AF37" : "transparent",
              color: showNominees ? "#0A0A08" : "#D4AF37",
              border: "1px solid #D4AF37", padding: "10px 18px",
              borderRadius: "6px", fontSize: "12px", letterSpacing: "0.08em",
              fontWeight: 600, cursor: "pointer", transition: "all 0.2s"
            }}
          >
            {showNominees ? "▲ HIDE NOMINEES" : "SEE ALL NOMINEES"}
          </button>
        )}

        {!hasNominees && (
          <button style={{
            backgroundColor: "transparent", color: "#555",
            border: "1px solid #333", padding: "10px 18px",
            borderRadius: "6px", fontSize: "12px", letterSpacing: "0.08em",
            fontWeight: 600, cursor: "not-allowed"
          }} disabled title="No nominees available">
            SEE ALL NOMINEES
          </button>
        )}
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
            }}>★</div>
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

      {isLoading && <TypingIndicator />}
    </div>
  );
}