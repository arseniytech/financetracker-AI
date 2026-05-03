import { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Stats } from './components/Stats';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { Login } from './components/login.tsx';
import { useExpenseStore } from './store/expenseStore';
import './App.css';

function App() {
  const fetchExpenses = useExpenseStore((s) => s.fetchExpenses);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (user) fetchExpenses();
  }, [user]);

  const today = new Date().toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <Sidebar />
      <div className="main">
        <div className="topbar">
          <span className="topbarTitle">Обзор расходов</span>
          <span className="topbarDate">{today}</span>
        </div>
        <div className="content">
          <Stats />
          <ExpenseForm />
          <ExpenseList />
        </div>
      </div>
    </>
  );
}

export default App;