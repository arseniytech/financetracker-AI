import { useExpenseStore, CATEGORIES } from '../store/expenseStore';
import styles from './ExpenseList.module.css';

export const ExpenseList = () => {
  const expenses = useExpenseStore((s) => s.expenses);
  const filter = useExpenseStore((s) => s.filter);
  const deleteExpense = useExpenseStore((s) => s.deleteExpense);
  const setFilter = useExpenseStore((s) => s.setFilter);

  const filtered = filter === 'Все' ? expenses : expenses.filter((e) => e.category === filter);

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>История расходов</div>
      <div className={styles.filterRow}>
        {['Все', ...CATEGORIES].map((f) => (
          <button
            key={f}
            className={`${styles.filterChip} ${filter === f ? styles.active : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Категория</th>
            <th>Описание</th>
            <th>Сумма</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((e) => (
            <tr key={e.id}>
              <td className={styles.tdDate}>{e.date}</td>
              <td>{e.category}</td>
              <td>{e.description}</td>
              <td className={styles.tdAmount}>{e.amount} ₽</td>
              <td>
                <button className={styles.deleteBtn} onClick={() => deleteExpense(e.id)}>x</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};