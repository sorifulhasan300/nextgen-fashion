"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Product } from "@/types/product";

export interface CartItem {
  product: Product;
  color: string;
  size: string;
  quantity: number;
}

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (productId: number, size: string, color: string) => void;
  updateQuantity: (
    productId: number,
    size: string,
    color: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const getCartItemKey = (productId: number, size: string, color: string) =>
  `${productId}-${size}-${color}`;

export const CartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback(
    (product: Product, size: string, color: string) => {
      setCartItems((prev) => {
        const key = getCartItemKey(product.id, size, color);
        const existingIndex = prev.findIndex(
          (item) =>
            getCartItemKey(item.product.id, item.size, item.color) === key
        );

        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + 1,
          };
          return updated;
        }

        return [...prev, { product, color, size, quantity: 1 }];
      });
    },
    []
  );

  const removeFromCart = useCallback(
    (productId: number, size: string, color: string) => {
      setCartItems((prev) =>
        prev.filter(
          (item) =>
            getCartItemKey(item.product.id, item.size, item.color) !==
            getCartItemKey(productId, size, color)
        )
      );
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: number, size: string, color: string, quantity: number) => {
      setCartItems((prev) => {
        if (quantity <= 0) {
          return prev.filter(
            (item) =>
              getCartItemKey(item.product.id, item.size, item.color) !==
              getCartItemKey(productId, size, color)
          );
        }

        return prev.map((item) =>
          getCartItemKey(item.product.id, item.size, item.color) ===
          getCartItemKey(productId, size, color)
            ? { ...item, quantity }
            : item
        );
      });
    },
    []
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
  }, []);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }, [cartItems]);

  const getCartCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
    }),
    [
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
    ]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
