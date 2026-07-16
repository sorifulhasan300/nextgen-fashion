"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, Leaf, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const values = [
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "Every piece is meticulously crafted from the finest materials, ensuring durability and a luxurious feel that stands the test of time.",
  },
  {
    icon: Leaf,
    title: "Sustainable Fashion",
    description:
      "We are committed to environmentally responsible practices, using eco-friendly materials and ethical manufacturing processes.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Your satisfaction drives everything we do, from personalized styling advice to seamless shopping experiences.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="relative flex items-center justify-center overflow-hidden bg-neutral-800 py-32 md:py-40 lg:py-48">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558171813-4c088753afef?w=1600&q=80"
            alt="Premium clothing workshop"
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/40 to-neutral-900/70" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 text-center"
        >
          <span className="text-[11px] font-bold tracking-[0.25em] text-neutral-300 uppercase">
            Our Story
          </span>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-[3.5rem] leading-[1.1]">
            Crafting Elegance<br className="hidden sm:block" /> Since 2024
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-neutral-300">
            Where timeless craftsmanship meets modern design — elevating everyday essentials into wardrobe staples.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-2 lg:order-1 relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
              <Image
                src="https://images.unsplash.com/photo-1528459105426-b9548367069b?w=800&q=80"
                alt="Premium fabric close-up"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-1 lg:order-2 space-y-6"
          >
            <span className="text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
              Who We Are
            </span>
            <h2 className="text-3xl font-medium tracking-tight text-neutral-800 md:text-4xl lg:text-[2.75rem] leading-[1.15]">
              A legacy of quality,<br />woven with passion
            </h2>
            <p className="text-[15px] leading-relaxed text-neutral-500">
              Born from a deep appreciation for exceptional craftsmanship, NextGen Fashion was founded with a singular vision: to create clothing that transcends seasons and trends. We source only the finest fabrics, partner with skilled artisans, and obsess over every stitch to deliver garments you&apos;ll reach for again and again.
            </p>
            <p className="text-[15px] leading-relaxed text-neutral-500">
              From our first collection to today, our commitment to quality, sustainability, and our community of customers remains unwavering. We believe that true luxury lies in the details — and that exceptional design should feel as good as it looks.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 py-16 md:py-24 lg:py-32">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
            What Drives Us
          </span>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-neutral-800 md:text-4xl lg:text-[2.75rem] leading-[1.15]">
            Our Core Values
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {values.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              className="group rounded-[1.25rem] bg-muted/50 p-8 md:p-10 transition-all duration-300 hover:bg-muted hover:shadow-sm"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-neutral-100 transition-colors duration-300 group-hover:bg-neutral-200">
                <Icon strokeWidth={1.5} className="size-5.5 text-neutral-700" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-neutral-800">
                {title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-neutral-500">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 py-16 md:py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center justify-center rounded-[2rem] bg-neutral-800 px-6 py-16 text-center md:py-20 lg:py-24"
        >
          <h2 className="text-3xl font-medium tracking-tight text-white md:text-4xl lg:text-[2.75rem] leading-[1.15]">
            Experience the difference
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-neutral-300">
            Discover our curated collection of modern essentials, designed with intention and crafted with care.
          </p>
          <Link href="/shop">
            <Button
              size="lg"
              className="mt-8 h-10 rounded-lg bg-white px-8 text-[12px] font-semibold tracking-[0.1em] text-neutral-800 uppercase hover:bg-neutral-100"
            >
              Explore Our Shop
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
