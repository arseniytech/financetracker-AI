import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db, { seedCategories } from '../db';
import { JWT_SECRET } from '../config';

const router = Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const stmt = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
  const result = stmt.run(name, email, hashed);
  seedCategories(Number(result.lastInsertRowid));
  const token = jwt.sign({ id: result.lastInsertRowid, email }, JWT_SECRET);
  res.json({ token, name, email });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user: any = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) return res.status(401).json({ error: 'wrong credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'wrong credentials' });
  seedCategories(user.id);
  const token = jwt.sign({ id: user.id, email }, JWT_SECRET);
  res.json({ token, name: user.name, email });
});

export default router;