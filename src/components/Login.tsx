import { useState } from 'react';
import api from '../api';
import { useAuthStore } from '../store/authStore';
import styles from './Login.module.css';

export const Login = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');

    try {
      if (isRegister) {
        const res = await api.post('/auth/register', {
          name,
          email,
          password,
        });

        setAuth(res.data.token, {
          name: res.data.name,
          email: res.data.email,
        });
      } else {
        const res = await api.post('/auth/login', {
          email,
          password,
        });

        setAuth(res.data.token, {
          name: res.data.name,
          email: res.data.email,
        });
      }
    } catch {
      setError(
        isRegister
          ? 'Ошибка регистрации'
          : 'Неверный логин или пароль'
      );
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1>Трекер расходов</h1>

        <p>
          Учёт расходов и ИИ-анализ финансов
        </p>

        {isRegister && (
          <input
            placeholder="Имя"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <button
          className={styles.primary}
          onClick={handleSubmit}
        >
          {isRegister
            ? 'Зарегистрироваться'
            : 'Войти'}
        </button>

        <button
          className={styles.secondary}
          onClick={() =>
            setIsRegister(!isRegister)
          }
        >
          {isRegister
            ? 'Уже есть аккаунт'
            : 'Создать аккаунт'}
        </button>
      </div>
    </div>
  );
};