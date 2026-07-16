# Nextgen Fashion

Next.js fashion e-commerce app with React 19, TypeScript, Tailwind CSS v4, and shadcn/ui.

## Tech Stack

- Next.js 16.2.10
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4
- shadcn/ui
- Framer Motion 12
- Lucide React

## Folder Structure

```
src/
  app/                  # Next.js App Router pages
    layout.tsx          # Root layout
    page.tsx            # Home page
    shop/               # Shop page
    collections/        # Collections page
    product/[id]/       # Dynamic product page
    cart/               # Cart page
    wishlist/           # Wishlist page
    contact/            # Contact page
    about/              # About page
    globals.css         # Global styles

  components/
    ui/                 # Reusable shadcn/ui components
    HeroSection.tsx
    Navbar.tsx
    Footer.tsx
    ProductCard.tsx
    ProductExplorer.tsx
    ProductSkeleton.tsx
    AnimatedPage.tsx
    ToastContainer.tsx
    drawer.tsx

  context/              # React context providers
    CartContext.tsx
    WishlistContext.tsx
    ToastContext.tsx

  data/
    products.ts         # Product data

  types/
    product.ts          # TypeScript types

  lib/
    utils.ts            # Utility functions
```

## Setup

```bash
pnpm install
pnpm dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
