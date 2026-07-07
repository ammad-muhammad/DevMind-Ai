import { create } from 'zustand';
import api from '../services/api';

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 < Date.now()
  } catch {
    return true
  }
}

const storedToken = localStorage.getItem('devmind_token')
const storedUser = localStorage.getItem('devmind_user')

const tokenValid = storedToken && !isTokenExpired(storedToken)

if (!tokenValid) {
  localStorage.removeItem('devmind_token')
  localStorage.removeItem('devmind_user')
}

const useAuthStore = create((set) => ({
  user: tokenValid && storedUser ? JSON.parse(storedUser) : null,
  token: tokenValid ? storedToken : null,
  isAuthenticated: tokenValid ? true : false,
  loading: false,
  error: null,
  pendingEmail: null,
  requiresVerification: false,

  register: async (username, email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/register', { username, email, password });
      
      if (response.data.requiresVerification) {
        set({
          pendingEmail: email,
          requiresVerification: true,
          loading: false
        });
        return { requiresVerification: true };
      }

      // Normal flow (if no OTP)
      localStorage.setItem('devmind_token', response.data.token);
      localStorage.setItem('devmind_user', JSON.stringify(response.data.user));
      set({
        user: response.data.user,
        token: response.data.token,
        isAuthenticated: true,
        loading: false
      });
      return { requiresVerification: false };
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Registration failed', 
        loading: false 
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('devmind_token', token);
      localStorage.setItem('devmind_user', JSON.stringify(user));
      
      set({ user, token, isAuthenticated: true, loading: false });
    } catch (error) {
      if (error.response?.status === 403 && error.response?.data?.requiresVerification) {
        set({ 
          pendingEmail: email, 
          requiresVerification: true, 
          loading: false 
        });
        throw error;
      }
      set({ 
        error: error.response?.data?.message || 'Login failed', 
        loading: false 
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('devmind_token');
    localStorage.removeItem('devmind_user');
    set({ user: null, token: null, isAuthenticated: false });
  },

  verifyOTP: async (email, otp) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/verify-otp', { email, otp });
      const { token, user } = response.data;
      
      localStorage.setItem('devmind_token', token);
      localStorage.setItem('devmind_user', JSON.stringify(user));
      
      set({ 
        user, 
        token, 
        isAuthenticated: true, 
        requiresVerification: false,
        pendingEmail: null,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Verification failed', 
        loading: false 
      });
      throw error;
    }
  },

  resendOTP: async (email) => {
    try {
      await api.post('/auth/resend-otp', { email });
    } catch (error) {
      throw error;
    }
  },

  clearError: () => set({ error: null }),

  setPendingEmail: (email) => set({ 
    pendingEmail: email, 
    requiresVerification: true 
  })
}));

export default useAuthStore;
