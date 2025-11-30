import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      loading: false,
      error: null,

      // Get cart from server (for logged-in users)
      fetchCart: async () => {
        set({ loading: true, error: null });
        try {
          const response = await api.get('/cart');
          set({ cart: response.data.items || [], loading: false });
        } catch (error) {
          set({ error: error.response?.data?.message || 'Failed to fetch cart', loading: false });
        }
      },

      // Add to cart
      addToCart: async (productId, size, quantity, isAuthenticated) => {
        set({ loading: true, error: null });
        try {
          if (isAuthenticated) {
            const response = await api.post('/cart/add', { productId, size, quantity });
            set({ cart: response.data.items || [], loading: false });
          } else {
            // Guest cart - store in localStorage
            const currentCart = get().cart;
            const existingItemIndex = currentCart.findIndex(
              (item) => item.product._id === productId && item.size === size
            );

            if (existingItemIndex > -1) {
              currentCart[existingItemIndex].quantity += quantity;
            } else {
              // For guest, we need to fetch product details
              const productResponse = await api.get(`/products/${productId}`);
              currentCart.push({
                product: productResponse.data,
                size,
                quantity,
              });
            }
            set({ cart: currentCart, loading: false });
          }
        } catch (error) {
          set({ error: error.response?.data?.message || 'Failed to add to cart', loading: false });
          throw error;
        }
      },

      // Update cart item
      updateCartItem: async (productId, size, quantity, isAuthenticated) => {
        set({ loading: true, error: null });
        try {
          if (isAuthenticated) {
            const response = await api.put('/cart/update', { productId, size, quantity });
            set({ cart: response.data.items || [], loading: false });
          } else {
            const currentCart = get().cart;
            const itemIndex = currentCart.findIndex(
              (item) => item.product._id === productId && item.size === size
            );
            if (itemIndex > -1) {
              currentCart[itemIndex].quantity = quantity;
              set({ cart: [...currentCart], loading: false });
            }
          }
        } catch (error) {
          set({ error: error.response?.data?.message || 'Failed to update cart', loading: false });
          throw error;
        }
      },

      // Remove from cart
      removeFromCart: async (productId, size, isAuthenticated) => {
        set({ loading: true, error: null });
        try {
          if (isAuthenticated) {
            const response = await api.delete('/cart/remove', { data: { productId, size } });
            set({ cart: response.data.items || [], loading: false });
          } else {
            const currentCart = get().cart.filter(
              (item) => !(item.product._id === productId && item.size === size)
            );
            set({ cart: currentCart, loading: false });
          }
        } catch (error) {
          set({ error: error.response?.data?.message || 'Failed to remove from cart', loading: false });
          throw error;
        }
      },

      // Sync guest cart with server on login
      syncCart: async () => {
        const guestCart = get().cart;
        if (guestCart.length > 0) {
          try {
            const formattedCart = guestCart.map((item) => ({
              product: item.product._id,
              size: item.size,
              quantity: item.quantity,
            }));
            const response = await api.post('/cart/sync', { guestCart: formattedCart });
            set({ cart: response.data.items || [] });
          } catch (error) {
            console.error('Failed to sync cart:', error);
          }
        }
      },

      // Clear cart
      clearCart: () => set({ cart: [] }),

      // Get cart total
      getCartTotal: () => {
        const cart = get().cart;
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },

      // Get cart count
      getCartCount: () => {
        const cart = get().cart;
        return cart.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;