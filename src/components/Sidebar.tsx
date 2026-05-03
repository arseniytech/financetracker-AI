import { useState } from 'react';
import styles from './Sidebar.module.css';

export const Sidebar = () => {
  const [page, setPage] = useState('main');

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
        Мои расходы
      </div>
      <div
        className={`${styles.navItem} ${page === 'main' ? styles.active : ''}`}
        onClick={() => setPage('main')}> Главная
      </div>
    </div>
  );
};