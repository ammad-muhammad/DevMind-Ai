import { create } from 'zustand';
import api from '../services/api';

const useSnippetStore = create((set) => ({
  snippets: [],
  loading: false,
  error: null,

  fetchSnippets: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/snippets');
      set({ snippets: response.data.snippets, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch snippets', 
        loading: false 
      });
    }
  },

  saveSnippet: async (title, code, language, description = "") => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/snippets', { title, code, language, description });
      const { snippet } = response.data;
      
      set(state => ({
        snippets: [snippet, ...state.snippets],
        loading: false
      }));
      return snippet;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to save snippet', 
        loading: false 
      });
      return null;
    }
  },

  deleteSnippet: async (id) => {
    try {
      await api.delete(`/snippets/${id}`);
      set(state => ({
        snippets: state.snippets.filter(s => s._id !== id)
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to delete snippet' });
    }
  }
}));

export default useSnippetStore;
