import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/', (req, res) => {
  const expenses = db.prepare('SELECT * FROM expenses').all();
  res.json(expenses);
});

router.post('/', (req, res) => {
  const { amount, description, date, user_id, category_id } = req.body;
  const result = db.prepare('INSERT INTO expenses (amount, description, date, user_id, category_id) VALUES (?, ?, ?, ?, ?)').run(amount, description, date, user_id, category_id);
  res.json({ id: result.lastInsertRowid });
});
router.put('/:id', (req, res) => {
  const { amount, description, date } = req.body;
  db.prepare('UPDATE expenses SET amount = ?, description = ?, date = ? WHERE id = ?').run(amount, description, date, req.params.id);
  res.json({ ok: true });
});
router.delete('/:id', (req, res) => {
  db.prepare('DELETE FROM expenses WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

export default router;