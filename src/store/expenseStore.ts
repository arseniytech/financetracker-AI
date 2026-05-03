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
  deleteExpense: async (id) => {
    await api.delete(`/expenses/${id}`);
    set((state) => ({ expenses: state.expenses.filter((e) => e.id !== id) }));
  },
  setFilter: (filter) => set({ filter }),
}));

export const CATEGORIES = ['Еда', 'Транспорт', 'Развлечения', 'Здоровье', 'Одежда', 'Прочее'];