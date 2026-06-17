import { Router } from 'express';
import db from '../db';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

const OLLAMA_URL =
  process.env.OLLAMA_URL || 'http://localhost:11434';

const OLLAMA_MODEL =
  process.env.OLLAMA_MODEL || 'qwen2.5-coder:latest';

router.post('/analyze', async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const { message } = req.body;

    const expenses = db.prepare(`
        SELECT
          expenses.*,
          categories.name as category_name
        FROM expenses
        LEFT JOIN categories
          ON categories.id = expenses.category_id
        WHERE expenses.user_id = ?
        ORDER BY expenses.date DESC
      `).all(userId);
    if (!expenses.length) {
      return res.json({
        reply:
          'У вас пока нет расходов для анализа. Добавьте несколько записей.'
      });
    }

    const total = expenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
    );

    const byCategory: Record<string, number> = {};

expenses.forEach((e) => {
  const category = e.category_name || 'Без категории';

  byCategory[category] =
    (byCategory[category] || 0) + Number(e.amount);
});

    const prompt = `
Ты финансовый аналитик приложения Expense Tracker.

ВАЖНЫЕ ПРАВИЛА:

- Используй только предоставленные данные.
- Ничего не придумывай.
- Не делай предположений об источниках дохода.
- Не придумывай причины расходов.
- Если данных недостаточно — прямо так и скажи.
- Не оценивай моральную сторону покупок.
- Дай рекомендации только по оптимизации бюджета.

ДАННЫЕ ПОЛЬЗОВАТЕЛЯ

Всего потрачено: ${total} руб.

Количество операций: ${expenses.length}

Расходы по категориям:
${JSON.stringify(byCategory, null, 2)}

Последние операции:

${JSON.stringify(expenses.slice(0, 10))}

Запрос пользователя:

${message}

Сформируй ответ в формате:

📊 Общая картина

📈 Основные паттерны

⚠️ Что можно улучшить

💡 Рекомендации по экономии

Ответ на русском языке.
`;

    const response = await fetch(
      `${OLLAMA_URL}/api/generate`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          model: OLLAMA_MODEL,
          prompt,
          stream: false
        })
      }
    );

    if (!response.ok) {
      throw new Error(
        `Ollama returned ${response.status}`
      );
    }

    const data = await response.json();

    return res.json({
      reply: data.response
    });
  } catch (error) {
    console.error('CHAT ERROR:', error);

    return res.status(500).json({
      error: 'Ошибка анализа расходов'
    });
  }
});

export default router;