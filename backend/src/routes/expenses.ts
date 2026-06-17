import { Router } from 'express';
import db, { seedCategories } from '../db';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
  const userId = (req as any).user.id;
  seedCategories(userId);
  const expenses = db.prepare(`
    SELECT expenses.*, categories.name as category
    FROM expenses
    LEFT JOIN categories ON categories.id = expenses.category_id
    WHERE expenses.user_id = ?
    ORDER BY expenses.date DESC
  `).all(userId);
  res.json(expenses);
});

router.post('/', (req, res) => {
  const userId = (req as any).user.id;
  seedCategories(userId);
  const { amount, description, date, category, category_id } = req.body;

  let resolvedCategoryId: number | null = null;

  if (category_id) {
    const row = db
      .prepare('SELECT id FROM categories WHERE id = ? AND user_id = ?')
      .get(category_id, userId) as { id: number } | undefined;
    resolvedCategoryId = row?.id ?? null;
  } else if (category) {
    const row = db
      .prepare('SELECT id FROM categories WHERE name = ? AND user_id = ?')
      .get(category, userId) as { id: number } | undefined;
    resolvedCategoryId = row?.id ?? null;
  }

  const result = db.prepare(`
    INSERT INTO expenses (amount, description, date, user_id, category_id)
    VALUES (?, ?, ?, ?, ?)
  `).run(amount, description, date, userId, resolvedCategoryId);

  res.json({ id: result.lastInsertRowid });
});

router.put('/:id', (req, res) => {
  const userId = (req as any).user.id;
  const { amount, description, date, category, category_id } = req.body;

  let resolvedCategoryId: number | null = null;

  if (category_id) {
    const row = db
      .prepare('SELECT id FROM categories WHERE id = ? AND user_id = ?')
      .get(category_id, userId) as { id: number } | undefined;
    resolvedCategoryId = row?.id ?? null;
  } else if (category) {
    const row = db
      .prepare('SELECT id FROM categories WHERE name = ? AND user_id = ?')
      .get(category, userId) as { id: number } | undefined;
    resolvedCategoryId = row?.id ?? null;
  }

  db.prepare(`
    UPDATE expenses SET amount = ?, description = ?, date = ?, category_id = ?
    WHERE id = ? AND user_id = ?
  `).run(amount, description, date, resolvedCategoryId, req.params.id, userId);
  res.json({ ok: true });
});

router.delete('/:id', (req, res) => {
  const userId = (req as any).user.id;
  db.prepare('DELETE FROM expenses WHERE id = ? AND user_id = ?').run(req.params.id, userId);
  res.json({ ok: true });
});

export default router;