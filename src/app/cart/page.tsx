"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } =
    useCart();
  const { showToast } = useToast();
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());

  const getCartItemKey = (productId: number, size: string, color: string) =>
    `${productId}-${size}-${color}`;

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  const handleQuantityChange = (
    productId: number,
    size: string,
    color: string,
    delta: number
  ) => {
    const key = getCartItemKey(productId, size, color);
    const item = cartItems.find((i) => getCartItemKey(i.product.id, i.size, i.color) === key);
    if (!item) return;
    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) return;
    updateQuantity(productId, size, color, newQuantity);
  };

  const handleRemove = (productId: number, size: string, color: string) => {
    const key = getCartItemKey(productId, size, color);
    setRemovingIds((prev) => new Set(prev).add(key));
    setTimeout(() => {
      removeFromCart(productId, size, color);
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
      showToast({ message: "Item removed from cart", label: "REMOVED", type: "cart" });
    }, 300);
  };

  const handleCheckout = () => {
    showToast({ message: "Order simulation successful!", label: "SUCCESS", type: "cart" });
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#FAF8F5] px-4">
        <div className="text-center">
          <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full border border-neutral-200 bg-white">
            <ShoppingBag strokeWidth={1.5} className="size-9 text-neutral-300" />
          </div>
          <h1 className="text-2xl font-medium text-neutral-800 mb-2">
            Your cart is empty
          </h1>
          <p className="text-sm text-neutral-500 mb-8 max-w-xs mx-auto">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Link href="/">
            <Button variant="default" size="lg" className="rounded-full px-8">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <h1 className="text-2xl font-medium text-neutral-800 mb-8">
          Shopping Cart
          <span className="ml-2 text-base font-normal text-neutral-400">
            ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const key = getCartItemKey(item.product.id, item.size, item.color);
              const isRemoving = removingIds.has(key);
              const lineTotal = item.product.price * item.quantity;

              return (
                <div
                  key={key}
                  className={`flex gap-4 rounded-2xl border border-neutral-200 bg-white p-4 transition-all duration-300 ${
                    isRemoving ? "opacity-0 translate-x-4" : "opacity-100"
                  }`}
                >
                  <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-[#F5F2ED]">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-neutral-800 leading-snug">
                          {item.product.name}
                        </h3>
                        <p className="mt-1 text-xs text-neutral-500">
                          Size:{" "}
                          <span className="font-medium text-neutral-700">
                            {item.size}
                          </span>
                        </p>
                        <p className="text-xs text-neutral-500">
                          Color:{" "}
                          <span className="font-medium text-neutral-700">
                            {item.color}
                          </span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-neutral-800">
                          ${lineTotal.toFixed(2)}
                        </p>
                        <p className="text-xs text-neutral-400">
                          ${item.product.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.product.id,
                              item.size,
                              item.color,
                              -1
                            )
                          }
                          className="flex size-8 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-50"
                          aria-label="Decrease quantity"
                        >
                          <Minus strokeWidth={1.5} className="size-3.5" />
                        </button>
                        <span className="flex h-8 w-8 items-center justify-center text-sm font-medium text-neutral-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.product.id,
                              item.size,
                              item.color,
                              1
                            )
                          }
                          className="flex size-8 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-50"
                          aria-label="Increase quantity"
                        >
                          <Plus strokeWidth={1.5} className="size-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          handleRemove(item.product.id, item.size, item.color)
                        }
                        className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 transition-colors hover:text-neutral-700"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 strokeWidth={1.5} className="size-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white p-6">
              <h2 className="text-[11px] font-semibold tracking-[0.15em] text-neutral-500 uppercase mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="font-medium text-neutral-800">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-neutral-100 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">Shipping</span>
                    <span
                      className={`font-medium ${
                        shipping === 0
                          ? "text-neutral-800"
                          : "text-neutral-800"
                      }`}
                    >
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="mt-1 text-[11px] text-neutral-400">
                      Free shipping on orders over $100
                    </p>
                  )}
                </div>

                <div className="border-t border-neutral-100 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-neutral-800">
                      Total
                    </span>
                    <span className="text-lg font-medium text-neutral-800">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                size="lg"
                className="mt-6 w-full rounded-xl py-4 text-sm font-medium tracking-wide"
              >
                Proceed to Checkout
              </Button>

              <Link
                href="/"
                className="mt-4 flex items-center justify-center text-xs font-medium text-neutral-500 uppercase tracking-wide transition-colors hover:text-neutral-800"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
