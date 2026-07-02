'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { Cart, CartLineInput, CartLineUpdateInput } from '@/lib/shopify/types';

interface CartContextValue {
  cart: Cart | null;
  loading: boolean;
  totalQuantity: number;
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const loadCart = useCallback(async (cartId: string) => {
    try {
      const { getCart } = await import('@/lib/shopify');
      const data = await getCart(cartId);
      if (!data) {
        localStorage.removeItem('cartId');
        setCart(null);
      } else {
        setCart(data);
      }
    } catch {
      localStorage.removeItem('cartId');
    }
  }, []);

  useEffect(() => {
    const cartId = localStorage.getItem('cartId');
    if (cartId) loadCart(cartId);
  }, [loadCart]);

  const addItem = useCallback(async (merchandiseId: string, quantity = 1) => {
    setLoading(true);
    try {
      const { createCart, addToCart } = await import('@/lib/shopify');
      const line: CartLineInput = { merchandiseId, quantity };
      const cartId = localStorage.getItem('cartId');

      let updatedCart: Cart;
      if (!cartId) {
        updatedCart = await createCart([line]);
        localStorage.setItem('cartId', updatedCart.id);
      } else {
        updatedCart = await addToCart(cartId, [line]);
      }
      setCart(updatedCart);
      setIsOpen(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateItem = useCallback(async (lineId: string, quantity: number) => {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) return;
    setLoading(true);
    try {
      if (quantity === 0) {
        const { removeFromCart } = await import('@/lib/shopify');
        const updatedCart = await removeFromCart(cartId, [lineId]);
        setCart(updatedCart);
      } else {
        const { updateCart } = await import('@/lib/shopify');
        const line: CartLineUpdateInput = { id: lineId, quantity };
        const updatedCart = await updateCart(cartId, [line]);
        setCart(updatedCart);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const removeItem = useCallback(async (lineId: string) => {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) return;
    setLoading(true);
    try {
      const { removeFromCart } = await import('@/lib/shopify');
      const updatedCart = await removeFromCart(cartId, [lineId]);
      setCart(updatedCart);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        totalQuantity: cart?.totalQuantity ?? 0,
        isOpen,
        openDrawer: () => setIsOpen(true),
        closeDrawer: () => setIsOpen(false),
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
