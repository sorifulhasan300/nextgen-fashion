"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Star, ArrowLeft, Check, Heart } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/ui/button";

const colorMap: Record<string, string> = {
  Cream: "#F5F1E6",
  Ivory: "#FFFFF0",
  "Light Gold": "#E6D5A8",
  White: "#FFFFFF",
  "Sky Blue": "#87CEEB",
  Beige: "#D4C5B5",
  Black: "#1a1a1a",
  Charcoal: "#36454F",
  Navy: "#1B2838",
  Olive: "#6B8E23",
  Camel: "#C19A6B",
  "Light Pink": "#FFB6C1",
  Sage: "#BCB88A",
  Burgundy: "#722F37",
  Maroon: "#800000",
  Emerald: "#50C878",
  Grey: "#808080",
  "Faded Black": "#2F2F2F",
  "Striped Blue": "#4A7BA7",
  "Off White": "#FAF9F6",
  "Light Blue": "#ADD8E6",
};

export default function ProductPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const product = products.find((p) => p.id === productId);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isWishlistTapped, setIsWishlistTapped] = useState(false);

  if (isNaN(productId) || !product) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FAF8F5] px-4">
        <div className="text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full border border-neutral-200 bg-white">
            <svg
              className="size-8 text-neutral-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-medium text-neutral-800 mb-2">
            Product Not Found
          </h1>
          <p className="text-sm text-neutral-500 mb-8 max-w-xs mx-auto">
            We couldn&apos;t find the item you&apos;re looking for. It may
            have been removed or the link may be incorrect.
          </p>
          <Link href="/">
            <Button variant="default" size="lg" className="rounded-full px-8">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!product.inStock) return;
    if (!selectedSize) {
      showToast({ message: "Please select a size", type: "info" });
      return;
    }
    if (!selectedColor) {
      showToast({ message: "Please select a color", type: "info" });
      return;
    }
    addToCart(product, selectedSize, selectedColor);
    showToast({ message: "Added to cart", label: "ADDED TO CART", type: "cart" });
  };

  const wishlisted = isInWishlist(product.id);

  const handleWishlistToggle = () => {
    setIsWishlistTapped(true);
    setTimeout(() => setIsWishlistTapped(false), 150);
    if (wishlisted) {
      removeFromWishlist(product.id);
      showToast({
        message: `${product.name} removed from wishlist`,
        label: "REMOVED",
        type: "wishlist",
      });
    } else {
      addToWishlist(product);
      showToast({
        message: `${product.name} saved for later`,
        label: "WISHLIST",
        type: "wishlist",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-neutral-500 uppercase transition-colors hover:text-neutral-800"
        >
          <ArrowLeft strokeWidth={1.5} className="size-3.5" />
          Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-[#F5F2ED] p-4 sm:p-6">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="mb-4 w-fit rounded-full border border-neutral-200 bg-white px-3 py-1 text-[10px] font-semibold tracking-[0.15em] text-neutral-600 uppercase">
              {product.category}
            </span>

            <div className="mb-3 flex items-start gap-3">
              <h1 className="text-2xl sm:text-3xl font-medium text-neutral-800">
                {product.name}
              </h1>
              {!product.inStock && (
                <span className="mt-1.5 shrink-0 rounded-full border border-neutral-200 bg-white px-2.5 py-0.5 text-[9px] font-semibold tracking-[0.15em] text-neutral-400 uppercase">
                  Out of Stock
                </span>
              )}
            </div>

            <p className="text-xl text-neutral-500 mb-4">
              ${product.price.toFixed(2)}
            </p>

            <div className="flex items-center gap-1.5 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  strokeWidth={1.5}
                  className={`size-4 ${
                    star <= Math.round(product.rating)
                      ? "fill-[#C9A96E] text-[#C9A96E]"
                      : "text-neutral-300"
                  }`}
                />
              ))}
              <span className="ml-1.5 text-xs text-neutral-400">
                {product.rating.toFixed(1)}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-neutral-500 mb-8">
              {product.description}
            </p>

            <div className="mb-6">
              <p className="text-[11px] font-semibold tracking-[0.15em] text-neutral-500 uppercase mb-3">
                Size
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 w-10 rounded-lg border text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "border-neutral-800 bg-neutral-800 text-white"
                        : "border-neutral-200 text-neutral-600 hover:border-neutral-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-[11px] font-semibold tracking-[0.15em] text-neutral-500 uppercase mb-3">
                Color
              </p>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => {
                  const hex = colorMap[color] || "#CCCCCC";
                  return (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <div className="relative">
                        <div
                          className="size-8 rounded-full border-2 border-neutral-200"
                          style={{ backgroundColor: hex }}
                        />
                        {selectedColor === color && (
                          <div className="absolute -inset-1 rounded-full border-2 border-neutral-800" />
                        )}
                      </div>
                      <span className="text-[10px] font-medium tracking-[0.1em] text-neutral-500 uppercase">
                        {color}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={handleWishlistToggle}
                className={`flex h-11 items-center justify-center rounded-xl border px-4 text-sm font-medium tracking-wide transition-all duration-300 ${
                  wishlisted
                    ? "border-rose-200 bg-rose-50 text-rose-500"
                    : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-800 hover:text-neutral-800"
                } ${isWishlistTapped ? "scale-95" : "scale-100"}`}
              >
                <Heart
                  strokeWidth={1.5}
                  className={`size-4 transition-colors duration-300 ${
                    wishlisted
                      ? "fill-rose-400 text-rose-400"
                      : "text-neutral-600"
                  }`}
                />
              </button>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              size="lg"
              className="w-full rounded-xl py-4 text-sm font-medium tracking-wide disabled:opacity-50"
            >
              {product.inStock ? (
                <span className="inline-flex items-center gap-2">
                  <Check strokeWidth={1.5} className="size-4" />
                  Add to Cart
                </span>
              ) : (
                "Out of Stock"
              )}
            </Button>

            {!product.inStock && (
              <p className="mt-3 text-center text-[10px] font-semibold tracking-[0.15em] text-neutral-400 uppercase">
                Out of Stock
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
