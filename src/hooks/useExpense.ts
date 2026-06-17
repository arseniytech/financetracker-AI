import { useState } from 'react';
import { useExpenseStore, CATEGORIES } from '../store/expenseStore';

export const useExpenseForm = () => {
  const addExpense = useExpenseStore((s) => s.addExpense);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<number>(1);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    addExpense({
      id: Date.now(),
      amount: Number(amount),
      category: CATEGORIES.find((c) => c.id === category)?.name ?? 'Прочее',
      description,
      date,
    });
    setAmount('');
    setDescription('');
    setDate('');
  };

  return { amount, setAmount, category, setCategory, description, setDescription, date, setDate, handleSubmit };
};