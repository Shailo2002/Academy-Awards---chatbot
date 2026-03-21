import React from 'react';
import { Home, LayoutGrid, Tag, User } from 'lucide-react';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoBadge}></div> The Envelope
        </div>
        <div className={styles.subtitle}>Academy Awards Bot</div>
      </div>
      
      <nav className={styles.nav}>
        <div className={styles.navGroup}>
          <p className={styles.navLabel}>Explore</p>
          <a href="#" className={`${styles.navItem} ${styles.active}`}>
            <Home className={styles.icon} size={18} /> Home
          </a>
          <a href="#" className={styles.navItem}>
            <LayoutGrid className={styles.icon} size={18} /> Categories
          </a>
          <a href="#" className={styles.navItem}>
            <Tag className={styles.icon} size={18} /> History
          </a>
        </div>
      </nav>

      <div className={styles.footer}>
        <a href="#" className={styles.navItem}>
          <User className={styles.icon} size={18} /> Profile
        </a>
      </div>
    </aside>
  );
}
