"use client";

import { useToast } from "@/context/ToastContext";
import { Heart, ShoppingBag, Check, X } from "lucide-react";

const iconMap = {
  cart: ShoppingBag,
  wishlist: Heart,
  info: Check,
};

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => {
        const Icon = toast.type && iconMap[toast.type] ? iconMap[toast.type] : Check;
        return (
          <div
            key={toast.id}
            className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-[#FAF8F5] px-4 py-3 shadow-sm"
          >
            <Icon strokeWidth={1.5} className="mt-0.5 size-3.5 text-neutral-600" />
            <div className="flex flex-col gap-0.5">
              {toast.label && (
                <span className="text-[9px] font-semibold tracking-[0.18em] text-neutral-500 uppercase">
                  {toast.label}
                </span>
              )}
              <span className="text-[13px] text-neutral-600">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-1 mt-0.5 text-neutral-400 transition-colors hover:text-neutral-700"
              aria-label="Dismiss notification"
            >
              <X strokeWidth={1.5} className="size-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
