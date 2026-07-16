"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, SlidersHorizontal, ArrowRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { products } from "@/data/products";

const categories = Array.from(new Set(products.map((p) => p.category)));

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (sortOrder === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchQuery, activeCategory, sortOrder]);

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory(null);
    setSortOrder(null);
  };

  return (
    <div className="min-h-screen">
      <HeroSection />

      <section className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20">
        <div className="mb-8 md:mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
                Curated Picks To Elevate
              </h2>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-[11px] font-medium tracking-[0.08em] text-neutral-500 uppercase transition-colors hover:text-neutral-800"
              >
                View All
                <ArrowRight strokeWidth={1.5} className="size-3" />
              </button>
            </div>
            <div className="mt-2 h-px w-12 bg-neutral-200" />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="relative">
              <Search
                strokeWidth={1.5}
                className="absolute left-0 top-1/2 -translate-y-1/2 size-4 text-neutral-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-transparent pl-7 pr-4 pb-2 pt-1 text-[14px] text-neutral-700 placeholder:text-neutral-300 outline-none border-b border-neutral-200 focus:border-neutral-400 transition-colors sm:w-64"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className={`inline-flex items-center rounded-full border px-4 py-1.5 text-[11px] font-semibold tracking-[0.1em] uppercase transition-all ${
                  activeCategory === null
                    ? "border-neutral-800 bg-neutral-800 text-white"
                    : "border-neutral-200 bg-transparent text-neutral-500 hover:border-neutral-300"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() =>
                    setActiveCategory((prev) =>
                      prev === cat ? null : cat
                    )
                  }
                  className={`inline-flex items-center rounded-full border px-4 py-1.5 text-[11px] font-semibold tracking-[0.1em] uppercase transition-all ${
                    activeCategory === cat
                      ? "border-neutral-800 bg-neutral-800 text-white"
                      : "border-neutral-200 bg-transparent text-neutral-500 hover:border-neutral-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:ml-auto">
              <SlidersHorizontal strokeWidth={1.5} className="size-4 text-neutral-400" />
              <select
                value={sortOrder ?? ""}
                onChange={(e) =>
                  setSortOrder(e.target.value ? (e.target.value as "asc" | "desc") : null)
                }
                className="bg-transparent border-b border-neutral-200 pb-2 pt-1 text-[13px] text-neutral-600 outline-none focus:border-neutral-400 transition-colors cursor-pointer"
              >
                <option value="">Sort by Price</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {(searchQuery || activeCategory || sortOrder) && (
          <div className="mb-6 flex items-center gap-3">
            <span className="text-[11px] tracking-[0.1em] text-neutral-400 uppercase">
              Active Filters:
            </span>
            {searchQuery && (
              <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-[11px] tracking-[0.08em] text-neutral-600 uppercase">
                Search: "{searchQuery}"
              </span>
            )}
            {activeCategory && (
              <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-[11px] tracking-[0.08em] text-neutral-600 uppercase">
                {activeCategory}
              </span>
            )}
            {sortOrder && (
              <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-[11px] tracking-[0.08em] text-neutral-600 uppercase">
                {sortOrder === "asc" ? "Price ↑" : "Price ↓"}
              </span>
            )}
            <button
              type="button"
              onClick={clearFilters}
              className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase underline-offset-4 hover:text-neutral-700 hover:underline transition-colors"
            >
              Clear All
            </button>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-[14px] text-neutral-400">
              No products match your criteria.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-3 text-[12px] font-medium tracking-[0.08em] text-neutral-600 uppercase underline-offset-4 hover:text-neutral-800 hover:underline transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
