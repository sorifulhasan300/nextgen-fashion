"use client";

import Link from "next/link";

interface Collection {
  title: string;
  subtitle: string;
  category: string;
  image: string;
}

const collections: Collection[] = [
  {
    title: "The Panjabi Edit",
    subtitle: "Timeless traditional wear reimagined.",
    category: "Panjabi",
    image: "https://images.unsplash.com/photo-1595231712607-4c8e17383aa6?w=1200&q=80",
  },
  {
    title: "Casual Essentials",
    subtitle: "Smart shirts for your everyday hustle.",
    category: "Casual Shirts",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1200&q=80",
  },
  {
    title: "Urban Streetwear",
    subtitle: "Comfort meets contemporary style.",
    category: "T-shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80",
  },
  {
    title: "Outerwear Edit",
    subtitle: "Layered sophistication for every season.",
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&q=80",
  },
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <section className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 pt-16 pb-10 md:pt-24 md:pb-14">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-5xl">
            Our Collections
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-500 md:text-lg">
            Thoughtfully curated selections that embody our commitment to
            craftsmanship, quality materials, and timeless design.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
          {collections.map((collection) => (
            <Link
              key={collection.category}
              href={`/shop?category=${encodeURIComponent(collection.category)}`}
              className="group relative block h-[400px] md:h-[500px] overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${collection.image})` }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-500 group-hover:from-black/90 group-hover:via-black/50" />

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {collection.title}
                </h2>
                <p className="mt-1.5 text-sm text-neutral-300 md:text-base">
                  {collection.subtitle}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-white transition-all duration-300 group-hover:gap-3">
                  Explore Collection
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
