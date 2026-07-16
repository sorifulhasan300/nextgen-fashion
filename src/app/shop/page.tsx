"use client";

import ProductExplorer from "@/components/ProductExplorer";
import { Suspense } from "react";

function ProductExplorerSkeleton() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-neutral-100 rounded-lg h-[320px]" />
        ))}
      </div>
    </section>
  );
}

export default function Shop() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<ProductExplorerSkeleton />}>
        <ProductExplorer />
      </Suspense>
    </div>
  );
}
