import { useState } from 'react';
import api from '../api';
import styles from './Chat.module.css';

type Message = {
  role: 'user' | 'ai';
  text: string;
};

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const res = await api.post('/chat/analyze', { message: userMessage });
      setMessages(prev => [...prev, { role: 'ai', text: res.data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Ошибка соединения с ИИ' }]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className={styles.chat}>
      <div className={styles.messages}>
        {messages.length === 0 && (
          <div className={styles.empty}>Спросите ИИ про ваши расходы</div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`${styles.message} ${m.role === 'user' ? styles.user : styles.ai}`}>
            {m.text}
          </div>
        ))}
        {loading && <div className={styles.ai}>Анализирую...</div>}
      </div>
      <div className={styles.input}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Спросите про расходы..."
        />
        <button onClick={sendMessage}>Отправить</button>
        <div className={styles.suggestions}>
            <button onClick={() => setInput('Проанализируй мои расходы')}>
            Общий анализ
            </button>

            <button onClick={() => setInput('На чём я могу экономить?')}>
    Где экономить
            </button>

            <button onClick={() => setInput('Какие у меня финансовые привычки?')}>
    Привычки
            </button>
</div>
      </div>
    </div>
  );
};