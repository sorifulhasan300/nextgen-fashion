"use client";

import { useToast } from "@/context/ToastContext";
import { X, Check } from "lucide-react";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3 shadow-sm"
        >
          <Check strokeWidth={1.5} className="size-4 text-neutral-600" />
          <span className="text-sm text-neutral-700">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 text-neutral-400 hover:text-neutral-600"
          >
            <X strokeWidth={1.5} className="size-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
