import styles from './layout.module.css'
import HeaderBanner from './HeaderBanner'
import type { ReactNode } from 'react';


type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <header>
        <HeaderBanner />
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}