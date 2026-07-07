import { create } from 'zustand';
import api from '../services/api';

const useChatStore = create((set, get) => ({
  chats: [],
  activeChat: null,
  loading: false,
  sending: false,
  error: null,

  fetchChats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/chat');
      set({ chats: response.data.chats, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch chats', 
        loading: false 
      });
    }
  },

  createChat: async (message, language) => {
    set({ sending: true, error: null });
    try {
      const response = await api.post('/chat', { message, language });
      const { chat } = response.data;
      
      set(state => ({
        chats: [chat, ...state.chats],
        activeChat: chat,
        sending: false
      }));
      return chat;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to create chat', 
        sending: false 
      });
      return null;
    }
  },

  sendMessage: async (chatId, message) => {
    set({ sending: true, error: null });
    try {
      const response = await api.post(`/chat/${chatId}`, { message });
      const { chat } = response.data;
      
      set(state => ({
        chats: state.chats.map(c => c._id === chatId ? chat : c),
        activeChat: chat,
        sending: false
      }));
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to send message', 
        sending: false 
      });
    }
  },

  getChat: async (chatId) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/chat/${chatId}`);
      set({ activeChat: response.data, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to load chat', 
        loading: false 
      });
    }
  },

  deleteChat: async (chatId) => {
    try {
      await api.delete(`/chat/${chatId}`);
      set(state => ({
        chats: state.chats.filter(c => c._id !== chatId),
        activeChat: state.activeChat?._id === chatId ? null : state.activeChat
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to delete chat' });
    }
  },

  clearError: () => set({ error: null }),

  clearChat: () => set({ activeChat: null })
}));

export default useChatStore;
