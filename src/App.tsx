import { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Stats } from './components/Stats';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { Chat } from './components/Chat';
import { Login } from './components/Login';
import { useExpenseStore } from './store/expenseStore';
import { useAuthStore } from './store/authStore';
import './App.css';

function App() {
  const fetchExpenses = useExpenseStore((s) => s.fetchExpenses);
  const token = useAuthStore((s) => s.token);
  const [page, setPage] = useState('main');

  useEffect(() => {
    if (token) fetchExpenses();
  }, [token]);

  const today = new Date().toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  if (!token) return <Login />;

  return (
    <>
      <Sidebar page={page} setPage={setPage} />
      <div className="main">
        <div className="topbar">
          <span className="topbarTitle">
            {page === 'main' ? 'Обзор расходов' : 'ИИ анализ'}
          </span>
          <span className="topbarDate">{today}</span>
        </div>
        <div className="content">
          {page === 'main' && (
            <>
              <Stats />
              <ExpenseForm />
              <ExpenseList />
            </>
          )}
          {page === 'chat' && <Chat />}
        </div>
      </div>
    </>
  );
}

export default App;