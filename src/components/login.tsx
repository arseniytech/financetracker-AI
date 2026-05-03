import { useState } from 'react';
import api from '../api';

export const Login = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    if (isRegister) {
      const res = await api.post('/auth/register', { name, email, password });
      onLogin(res.data);
    } else {
      const res = await api.post('/auth/login', { email, password });
      onLogin(res.data);
    }
  };

  return (
    <div>
      <div    >{'Вход'}</div>
      {isRegister && <input placeholder="Имя" value={name} onChange={e => setName(e.target.value)} />}
      <input placeholder=" Имейл" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>{isRegister ? 'Зарегистрироваться' : 'Войти'}</button>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Уже есть аккаунт' : 'Нет аккаунта'}
      </button>
    </div>
  );
};