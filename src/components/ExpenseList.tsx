import { useState } from 'react';
import { useExpenseStore, CATEGORIES, type Expense } from '../store/expenseStore';
import styles from './ExpenseList.module.css';

export const ExpenseList = () => {
  const expenses = useExpenseStore((s) => s.expenses);
  const filter = useExpenseStore((s) => s.filter);
  const deleteExpense = useExpenseStore((s) => s.deleteExpense);
  const updateExpense = useExpenseStore((s) => s.updateExpense);
  const setFilter = useExpenseStore((s) => s.setFilter);

  const [editing, setEditing] = useState<Expense | null>(null);

  const filtered = filter === 'Все' ? expenses : expenses.filter((e) => e.category === filter);

  const startEdit = (expense: Expense) => {
    setEditing({ ...expense });
  };

  const cancelEdit = () => {
    setEditing(null);
  };

  const saveEdit = async () => {
    if (!editing) return;
    await updateExpense(editing);
    setEditing(null);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>История расходов</div>
      <div className={styles.filterRow}>
        {['Все', ...CATEGORIES.map((c) => c.name)].map((f) => (
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
              {editing?.id === e.id ? (
                <>
                  <td>
                    <input
                      className={styles.editInput}
                      type="date"
                      value={editing.date}
                      onChange={(ev) => setEditing({ ...editing, date: ev.target.value })}
                    />
                  </td>
                  <td>
                    <select
                      className={styles.editInput}
                      value={CATEGORIES.find((c) => c.name === editing.category)?.id ?? 6}
                      onChange={(ev) => {
                        const category = CATEGORIES.find((c) => c.id === Number(ev.target.value))?.name ?? 'Прочее';
                        setEditing({ ...editing, category });
                      }}
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      className={styles.editInput}
                      type="text"
                      value={editing.description}
                      onChange={(ev) => setEditing({ ...editing, description: ev.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      className={styles.editInput}
                      type="number"
                      value={editing.amount}
                      onChange={(ev) => setEditing({ ...editing, amount: Number(ev.target.value) })}
                    />
                  </td>
                  <td className={styles.actions}>
                    <button className={styles.saveBtn} onClick={saveEdit}>✓</button>
                    <button className={styles.deleteBtn} onClick={cancelEdit}>✕</button>
                  </td>
                </>
              ) : (
                <>
                  <td className={styles.tdDate}>{e.date}</td>
                  <td>{e.category}</td>
                  <td>{e.description}</td>
                  <td className={styles.tdAmount}>{e.amount} ₽</td>
                  <td className={styles.actions}>
                    <button className={styles.editBtn} onClick={() => startEdit(e)}>✎</button>
                    <button className={styles.deleteBtn} onClick={() => deleteExpense(e.id)}>x</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
