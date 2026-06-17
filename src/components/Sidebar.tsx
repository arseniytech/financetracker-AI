import { useAuthStore } from '../store/authStore';
import styles from './Sidebar.module.css';

type Props = {
  page: string;
  setPage: (page: string) => void;
};

export const Sidebar = ({ page, setPage }: Props) => {
  const { user, logout } = useAuthStore();

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
        Мои расходы
      </div>

      <div
        className={`${styles.navItem} ${page === 'main' ? styles.active : ''}`}
        onClick={() => setPage('main')}
      >
        Главная
      </div>
      <div
        className={`${styles.navItem} ${page === 'chat' ? styles.active : ''}`}
        onClick={() => setPage('chat')}
      >
        ИИ анализ
      </div>

      <div className={styles.sidebarBottom}>
        <div className={styles.userName}>{user?.name}</div>
        <button onClick={logout} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '12px' }}>выйти</button>
      </div>
    </div>
  );
};