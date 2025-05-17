import styles from './layout.module.css';
import HeaderBanner from './HeaderBanner';
import type { ReactNode } from 'react';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <header>
        <HeaderBanner />
      </header>
      <main>{children}</main>
    </div>
  );
}
