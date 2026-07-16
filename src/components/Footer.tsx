"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  Share2,
  Leaf,
  ShieldCheck,
  Recycle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const shopLinks = [
  { href: "/shop", label: "New Arrivals" },
  { href: "/shop", label: "Bestsellers" },
  { href: "/collections", label: "Collections" },
  { href: "/shop", label: "Sale" },
  { href: "/shop", label: "Lookbook" },
];

const customerCareLinks = [
  { href: "/contact", label: "Contact Us" },
  { href: "/about", label: "Shipping & Returns" },
  { href: "/about", label: "Size Guide" },
  { href: "/about", label: "FAQ" },
  { href: "/about", label: "Privacy Policy" },
];

const trustBadges = [
  { icon: Leaf, label: "Sustainably Sourced" },
  { icon: ShieldCheck, label: "Quality Guaranteed" },
  { icon: Recycle, label: "Ethically Made" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="mt-auto border-t border-neutral-200 bg-[#FAF8F5]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="text-[12px] font-bold tracking-[0.25em] text-neutral-800 uppercase">
                NextGen
              </span>
              <span className="h-px w-4 bg-neutral-300" />
              <span className="text-[11px] font-semibold tracking-[0.2em] text-neutral-400 uppercase">
                Fashion
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-neutral-500">
              Curated essentials for the modern wardrobe. Designed with intention,
              crafted with care.
            </p>
            <div className="mt-6 flex items-center gap-5">
              {trustBadges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 text-neutral-400"
                >
                  <Icon strokeWidth={1.5} className="size-4.5" />
                  <span className="text-[9px] tracking-[0.12em] uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
              Shop
            </h3>
            <ul className="mt-4 space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-neutral-500 transition-colors hover:text-neutral-800"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
              Customer Care
            </h3>
            <ul className="mt-4 space-y-2.5">
              {customerCareLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-neutral-500 transition-colors hover:text-neutral-800"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
              Newsletter
            </h3>
            <p className="mt-4 text-[14px] leading-relaxed text-neutral-500">
              Receive early access to new collections and exclusive offers.
            </p>
            {subscribed ? (
              <p className="mt-4 text-[14px] text-neutral-600 italic">
                Thank you for subscribing.
              </p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="mt-4 flex gap-0 border border-neutral-200 bg-white"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 bg-transparent px-3.5 py-2.5 text-[14px] text-neutral-700 placeholder:text-neutral-300 outline-none"
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="h-auto w-10 shrink-0 rounded-none border-l border-neutral-200 bg-transparent text-neutral-500 hover:text-neutral-800 hover:bg-transparent"
                  aria-label="Subscribe"
                >
                  <ArrowRight strokeWidth={1.5} className="size-4" />
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-200 py-5 md:flex-row">
          <p className="text-[12px] tracking-[0.1em] text-neutral-400">
            &copy; {new Date().getFullYear()} NextGen Fashion. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[
              { icon: Mail, label: "Email", href: "mailto:hello@oxivos.com" },
              { icon: Phone, label: "Phone", href: "tel:+1234567890" },
              { icon: Share2, label: "Share", href: "#" },
            ].map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="text-neutral-400 transition-colors hover:text-neutral-800"
              >
                <Icon strokeWidth={1.5} className="size-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
