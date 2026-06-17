import { create } from 'zustand';

type AuthStore = {
  token: string | null;
  user: { name: string; email: string } | null;
  setAuth: (token: string, user: { name: string; email: string }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  setAuth: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, user });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ token: null, user: null });
  },
}));