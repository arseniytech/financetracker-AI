import { Router } from 'express';
import db from '../db';

const router = Router();

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const stmt = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
  const result = stmt.run(name, email, password);
  res.json({ id: result.lastInsertRowid, name, email });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?').get(email, password);
  if (!user) return res.status(401).json({ error: 'wrong credentials' });
  res.json(user);
});

export default router;