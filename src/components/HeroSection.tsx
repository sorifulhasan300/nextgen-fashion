"use client";

import Image from "next/image";
import Link from "next/link";
import { Leaf, Truck, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const valueProps = [
  { icon: Leaf, label: "Sustainable Materials" },
  { icon: Truck, label: "Free Returns" },
  { icon: ShieldCheck, label: "Secure Checkout" },
  { icon: Star, label: "Handpicked Quality" },
];

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 pt-8 md:pt-12 lg:pt-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="order-2 lg:order-1 space-y-6">
          <span className="text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
            New Season
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-medium leading-[1.1] tracking-tight text-neutral-800">
            Effortless Style,
            <br />
            Curated Living
          </h1>
          <p className="max-w-md text-[15px] leading-relaxed text-neutral-500">
            Discover thoughtfully designed essentials that blend comfort,
            craftsmanship, and quiet luxury for the modern wardrobe.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="h-10 rounded-lg bg-neutral-800 px-6 text-[12px] font-semibold tracking-[0.1em] text-white uppercase hover:bg-neutral-700"
            >
              <Link href="/shop">Shop Now</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-10 rounded-lg border-neutral-300 px-6 text-[12px] font-semibold tracking-[0.1em] text-neutral-700 uppercase hover:bg-neutral-50"
            >
              <Link href="/collections">Explore Collection</Link>
            </Button>
          </div>
        </div>
        <div className="order-1 lg:order-2 relative">
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
              <Image
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
                alt="Curated fashion collection"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-t border-neutral-200 pt-8 md:pt-10">
        {valueProps.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2.5 text-center"
          >
            <Icon strokeWidth={1.5} className="size-5 text-neutral-500" />
            <span className="text-[11px] font-semibold tracking-[0.12em] text-neutral-500 uppercase">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
