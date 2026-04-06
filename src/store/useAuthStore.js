import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user-session')) || null,
  isAuthenticated: !!localStorage.getItem('user-session'),

  login: (userData) => {
    localStorage.setItem('user-session', JSON.stringify(userData));
    set({ user: userData, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('user-session');
    set({ user: null, isAuthenticated: false });
  }
}));