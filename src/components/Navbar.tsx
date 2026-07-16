"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search,
  User,
  ShoppingBag,
  Heart,
  Truck,
  Menu,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const cartCount = useCart().getCartCount();
  const wishlistCount = useWishlist().getWishlistCount();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-[#FAF8F5]">
      {!announcementDismissed && (
        <div className="relative border-b border-neutral-200 bg-[#FAF8F5]">
          <div className="flex items-center justify-center gap-2 px-4 py-2 text-[11px] tracking-[0.15em] text-neutral-500 uppercase">
            <Truck strokeWidth={1.5} className="size-3.5 shrink-0" />
            <span>Complimentary shipping on all orders over $200</span>
          </div>
          <button
            onClick={() => setAnnouncementDismissed(true)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-neutral-600"
            aria-label="Dismiss announcement"
          >
            <X strokeWidth={1.5} className="size-3.5" />
          </button>
        </div>
      )}

      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-8 lg:px-12">
        <div className="flex items-center">
          <Drawer swipeDirection="up">
            <DrawerTrigger className="mr-4 flex items-center justify-center lg:hidden">
              <Menu strokeWidth={1.5} className="size-5" />
            </DrawerTrigger>
            <DrawerContent className="h-[100dvh] [--drawer-content-height:100dvh]">
              <DrawerHeader className="sr-only">
                <DrawerTitle>Menu</DrawerTitle>
              </DrawerHeader>
              <nav className="flex flex-1 flex-col items-center justify-center gap-8 px-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[22px] font-extrabold tracking-[0.2em] text-neutral-500 uppercase transition-colors hover:text-neutral-800"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <DrawerClose className="absolute right-4 top-4 text-neutral-400 transition-colors hover:text-neutral-600">
                <X strokeWidth={1.5} className="size-5" />
              </DrawerClose>
            </DrawerContent>
          </Drawer>
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label="NextGen Fashion Home"
          >
            <span className="text-[12px] font-bold tracking-[0.25em] text-neutral-800 uppercase">
              NextGen
            </span>
            <span className="hidden h-px w-4 bg-neutral-300 sm:block" />
            <span className="hidden text-[11px] font-semibold tracking-[0.2em] text-neutral-400 uppercase sm:block">
              Fashion
            </span>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-[12px] font-bold tracking-[0.18em] text-neutral-500 uppercase transition-colors hover:text-neutral-800"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-neutral-800 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-neutral-500 hover:text-neutral-800"
            aria-label="Search"
          >
            <Search strokeWidth={1.5} className="size-[18px]" />
          </Button>
          <Link
            href="/account"
            className="flex h-9 w-9 items-center justify-center text-neutral-500 transition-colors hover:text-neutral-800"
            aria-label="Account"
          >
            <User strokeWidth={1.5} className="size-[18px]" />
          </Link>
          <Link
            href="/wishlist"
            className="relative flex h-9 w-9 items-center justify-center text-neutral-500 transition-colors hover:text-neutral-800"
            aria-label="Wishlist"
          >
            <Heart strokeWidth={1.5} className="size-[18px]" />
            {wishlistCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-800 text-[9px] font-medium leading-none text-white">
                {wishlistCount > 9 ? "9+" : wishlistCount}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            className="relative flex h-9 w-9 items-center justify-center text-neutral-500 transition-colors hover:text-neutral-800"
            aria-label="Shopping bag"
          >
            <ShoppingBag strokeWidth={1.5} className="size-[18px]" />
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-800 text-[9px] font-medium leading-none text-white"
              >
                {cartCount > 9 ? "9+" : cartCount}
              </motion.span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
