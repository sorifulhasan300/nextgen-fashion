"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type ToastType = "cart" | "wishlist" | "info";

interface Toast {
  id: string;
  message: string;
  label?: string;
  type?: ToastType;
}

interface ToastContextValue {
  toasts: Toast[];
  showToast: (options: {
    message: string;
    label?: string;
    type?: ToastType;
  }) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    ({
      message,
      label,
      type = "info",
    }: {
      message: string;
      label?: string;
      type?: ToastType;
    }) => {
      const id =
        Date.now().toString() + Math.random().toString(36).slice(2, 7);
      setToasts((prev) => [...prev, { id, message, label, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
