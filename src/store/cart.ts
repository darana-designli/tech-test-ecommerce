import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Product } from '@/domain/product/ProductType';

interface CartState {
  items: Product[];
  cartTotal: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  isProductInCart: (productId: number) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      cartTotal: 0,
      addToCart: (product) => set((state) => {
        const updatedItems = [...state.items, product];
        return { items: updatedItems, cartTotal: updatedItems.reduce((total, item) => total + item.price, 0) };
      }),
      removeFromCart: (productId) => set((state) => {
        const updatedItems = state.items.filter((item) => item.id !== productId);
        return { items: updatedItems, cartTotal: updatedItems.reduce((total, item) => total + item.price, 0) };
      }),
      clearCart: () => set({ items: [], cartTotal: 0 }),
      isProductInCart: (productId) => get().items.some((item) => item.id === productId),
    }),
    { name: 'cart' }
  )
);
