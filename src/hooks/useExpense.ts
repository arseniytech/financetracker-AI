import { useState } from 'react';
import { useExpenseStore } from '../store/expenseStore';

export const useExpenseForm = () => {
  const addExpense = useExpenseStore((s) => s.addExpense);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Еда');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    addExpense({
      id: Date.now(),
      amount: Number(amount),
      category,
      description,
      date,
    });
    setAmount('');
    setDescription('');
    setDate('');
  };

  return { amount, setAmount, category, setCategory, description, setDescription, date, setDate, handleSubmit };
};