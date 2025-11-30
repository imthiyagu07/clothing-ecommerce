import { create } from 'zustand';
import api from '../services/api';

const useProductStore = create((set) => ({
  products: [],
  product: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    pages: 1,
    total: 0,
  },

  // Fetch all products with filters
  fetchProducts: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/products?${queryParams}`);
      set({
        products: response.data.products,
        pagination: {
          page: response.data.page,
          pages: response.data.pages,
          total: response.data.total,
        },
        loading: false,
      });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch products', loading: false });
    }
  },

  // Fetch single product
  fetchProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/products/${id}`);
      set({ product: response.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch product', loading: false });
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

export default useProductStore;