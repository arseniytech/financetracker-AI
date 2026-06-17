import Database from 'better-sqlite3';

const db = new Database('expenses.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    description TEXT,
    date TEXT,
    user_id INTEGER,
    category_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS expense_tags (
    expense_id INTEGER,
    tag_id INTEGER,
    FOREIGN KEY (expense_id) REFERENCES expenses(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
  );
`);

export const DEFAULT_CATEGORIES = [
  'Еда',
  'Транспорт',
  'Развлечения',
  'Здоровье',
  'Одежда',
  'Прочее',
];

export function seedCategories(userId: number) {
  const row = db
    .prepare('SELECT COUNT(*) as count FROM categories WHERE user_id = ?')
    .get(userId) as { count: number };

  if (row.count > 0) return;

  const insert = db.prepare('INSERT INTO categories (name, user_id) VALUES (?, ?)');
  const tx = db.transaction(() => {
    for (const name of DEFAULT_CATEGORIES) {
      insert.run(name, userId);
    }
  });
  tx();
}

export default db;