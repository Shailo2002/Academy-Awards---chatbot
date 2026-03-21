import React from 'react';
import Sidebar from './Sidebar';
import styles from './ChatLayout.module.css';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
