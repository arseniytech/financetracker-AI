import { create } from 'zustand';
import api from '../api';
export type Expense = {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: string;
};

type ExpenseStore = {
  expenses: Expense[];
  filter: string;
  fetchExpenses: () => void;
  addExpense: (expense: Expense) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: number) => void;
  setFilter: (filter: string) => void;
};

export const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: [],
  filter: 'Все',
  fetchExpenses: async () => {
    const res = await api.get('/expenses');
    set({ expenses: res.data });
  },
  addExpense: async (expense) => {
    const res = await api.post('/expenses', expense);
    set((state) => ({ expenses: [...state.expenses, { ...expense, id: res.data.id }] }));
  },
  updateExpense: async (expense) => {
    await api.put(`/expenses/${expense.id}`, expense);
    set((state) => ({
      expenses: state.expenses.map((e) => (e.id === expense.id ? expense : e)),
    }));
  },
  deleteExpense: async (id) => {
    await api.delete(`/expenses/${id}`);
    set((state) => ({ expenses: state.expenses.filter((e) => e.id !== id) }));
  },
  setFilter: (filter) => set({ filter }),
}));

export const CATEGORIES = [
  { id: 1, name: 'Еда' },
  { id: 2, name: 'Транспорт' },
  { id: 3, name: 'Развлечения' },
  { id: 4, name: 'Здоровье' },
  { id: 5, name: 'Одежда' },
  { id: 6, name: 'Прочее' },
];