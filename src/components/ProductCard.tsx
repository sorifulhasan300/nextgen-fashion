"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-[#F5F2ED] border border-neutral-100 transition-all duration-500 ease-out">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-x-0 top-3 flex items-start justify-between px-3">
            <span className="rounded-full border border-neutral-200/60 bg-white/80 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-neutral-600 uppercase backdrop-blur-sm">
              {product.category}
            </span>
            {!product.inStock && (
              <span className="rounded-full border border-neutral-200/60 bg-white/80 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-neutral-400 uppercase backdrop-blur-sm">
                Sold Out
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-3.5 space-y-1.5">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              strokeWidth={1.5}
              className={`size-3 ${
                star <= Math.round(product.rating)
                  ? "fill-[#C9A96E] text-[#C9A96E]"
                  : "text-neutral-300"
              }`}
            />
          ))}
          <span className="ml-1 text-[11px] text-neutral-400">
            {product.rating.toFixed(1)}
          </span>
        </div>
        <h3 className="text-[14px] font-medium leading-snug text-neutral-800 group-hover:text-neutral-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-[13px] text-neutral-500">
            ${product.price.toFixed(2)}
          </p>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium tracking-[0.08em] text-neutral-500 uppercase transition-colors group-hover:text-neutral-800">
            View Details
            <ArrowRight strokeWidth={1.5} className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
