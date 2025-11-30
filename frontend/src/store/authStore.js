import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Register
      register: async (userData) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post('/auth/register', userData);
          set({ user: response.data, isAuthenticated: true, loading: false });
          return response.data;
        } catch (error) {
          set({ error: error.response?.data?.message || 'Registration failed', loading: false });
          throw error;
        }
      },

      // Login
      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post('/auth/login', credentials);
          set({ user: response.data, isAuthenticated: true, loading: false });
          return response.data;
        } catch (error) {
          set({ error: error.response?.data?.message || 'Login failed', loading: false });
          throw error;
        }
      },

      // Logout
      logout: async () => {
        set({ loading: true, error: null });
        try {
          await api.post('/auth/logout');
          set({ user: null, isAuthenticated: false, loading: false });
        } catch (error) {
          set({ error: error.response?.data?.message || 'Logout failed', loading: false });
          throw error;
        }
      },

      // Get Profile
      getProfile: async () => {
        set({ loading: true, error: null });
        try {
          const response = await api.get('/auth/profile');
          set({ user: response.data, isAuthenticated: true, loading: false });
          return response.data;
        } catch (error) {
          set({ user: null, isAuthenticated: false, loading: false });
          throw error;
        }
      },

      // Clear error
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

export default useAuthStore;