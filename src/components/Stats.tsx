import { useExpenseStore } from '../store/expenseStore';
import styles from './Stats.module.css';

export const Stats = () => {
  const expenses = useExpenseStore((s) => s.expenses);
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className={styles.statsRow}>
      <div className={styles.statCard}>
        <div className={styles.statLabel}>Всего потрачено</div>
        <div className={`${styles.statValue} ${styles.red}`}>{total} ₽</div>
        <div className={styles.statSub}>{expenses.length} записей</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statLabel}>Категорий</div>
        <div className={styles.statValue}>{new Set(expenses.map((e) => e.category)).size}</div>
      </div>
    </div>
  );
};