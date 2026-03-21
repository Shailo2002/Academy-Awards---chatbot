import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import styles from './ChatInput.module.css';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <Sparkles className={styles.icon} size={20} />
        <input
          type="text"
          className={styles.input}
          placeholder="Ask anything about the Oscars..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className={styles.button}
          disabled={!input.trim() || isLoading}
        >
          <ArrowRight size={18} />
        </button>
      </div>
      <p className={styles.footerText}>
        Bot may occasionally produce inaccuracies. Please verify information.
      </p>
    </form>
  );
}
