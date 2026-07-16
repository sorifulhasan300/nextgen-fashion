"use client";

import Link from "next/link";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleMoveToCart = (productId: number) => {
    const product = wishlistItems.find((p) => p.id === productId);
    if (!product) return;
    if (!product.inStock) {
      showToast({
        message: "This item is currently out of stock",
        label: "UNAVAILABLE",
        type: "info",
      });
      return;
    }
    addToCart(product, product.sizes[0], product.colors[0]);
    removeFromWishlist(productId);
    showToast({
      message: `${product.name} moved to cart`,
      label: "MOVED TO CART",
      type: "cart",
    });
  };

  const handleRemove = (productId: number) => {
    const product = wishlistItems.find((p) => p.id === productId);
    removeFromWishlist(productId);
    if (product) {
      showToast({
        message: `${product.name} removed from wishlist`,
        label: "REMOVED",
        type: "wishlist",
      });
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#FAF8F5] px-4">
        <div className="text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full border border-neutral-200 bg-white">
            <Heart strokeWidth={1.5} className="size-7 text-neutral-300" />
          </div>
          <h1 className="text-2xl font-medium text-neutral-800 mb-2">
            Your wishlist is empty
          </h1>
          <p className="text-sm text-neutral-500 mb-8 max-w-xs mx-auto">
            Save items you love for later. Browse our collection and tap the heart icon to add them here.
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
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-neutral-800">
            Your Wishlist
            <span className="ml-2 text-base font-normal text-neutral-400">
              ({wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"})
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlistItems.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => handleMoveToCart(product.id)}
                  disabled={!product.inStock}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[11px] font-semibold tracking-[0.1em] text-neutral-700 uppercase transition-colors hover:border-neutral-800 hover:text-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ShoppingBag strokeWidth={1.5} className="size-3.5" />
                  {product.inStock ? "Move to Cart" : "Out of Stock"}
                </button>
                <button
                  onClick={() => handleRemove(product.id)}
                  className="inline-flex items-center justify-center rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[11px] font-semibold tracking-[0.1em] text-neutral-500 uppercase transition-colors hover:border-neutral-800 hover:text-neutral-800"
                  aria-label={`Remove ${product.name} from wishlist`}
                >
                  <ArrowRight strokeWidth={1.5} className="size-3.5 rotate-180" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-neutral-500 uppercase transition-colors hover:text-neutral-800"
          >
            Continue Shopping
            <ArrowRight strokeWidth={1.5} className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
