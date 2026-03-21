import React from 'react';
import { User, Sparkles } from 'lucide-react';
import styles from './MessageList.module.css';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyBadge}></div>
        <h1 className={styles.emptyTitle}>Ask anything about<br/>the Oscars</h1>
        
        <div className={styles.suggestionsList}>
          <button className={styles.suggestionItem}>
            <Sparkles size={16} className={styles.suggestionIcon} />
            Who won Best Picture in 2024?
          </button>
          <button className={styles.suggestionItem}>
            <Sparkles size={16} className={styles.suggestionIcon} />
            How many awards did Titanic win?
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.messageList}>
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`${styles.messageWrapper} ${message.role === 'user' ? styles.userMessage : styles.botMessage}`}
        >
          {message.role === 'assistant' && (
            <div className={styles.avatarBot}>
              <Sparkles size={16} />
            </div>
          )}
          
          <div className={styles.messageContent}>
            {message.role === 'assistant' && <div className={styles.messageAuthor}>The Envelope</div>}
            <div className={styles.text}>{message.content}</div>
          </div>

          {message.role === 'user' && (
            <div className={styles.avatarUser}>
              <User size={16} />
            </div>
          )}
        </div>
      ))}
      
      {isLoading && (
        <div className={`${styles.messageWrapper} ${styles.botMessage}`}>
          <div className={styles.avatarBot}>
            <Sparkles size={16} />
          </div>
          <div className={styles.messageContent}>
            <div className={styles.messageAuthor}>The Envelope</div>
            <div className={styles.typingIndicator}>
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
