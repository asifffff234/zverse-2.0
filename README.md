# Z Verse

Premium technical streetwear storefront — React + Vite + Tailwind CSS.

## Run it locally

Requires [Node.js](https://nodejs.org) 18 or later.

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

The `dist/` folder that `npm run build` produces can be deployed as-is to Vercel, Netlify, GitHub Pages, or any static host.

## What's fully working

- Full routing: home, shop with filters, product detail, cart, checkout, account
- Cart state (add/remove/quantity) persisted in the browser via localStorage
- Category, type, price-range filtering and sorting on the shop page
- Live search in the navbar
- Working promo code demo — try **ZVERSE10** in the cart for 10% off
- Responsive down to mobile, keyboard-focus states, and `prefers-reduced-motion` support

## What's intentionally a demo

There's no backend, so a few things are simulated for the UI and clearly labeled as such on-screen:

- **Checkout** — the form collects real input but doesn't call a payment processor. Wire it to Stripe/Razorpay to go live.
- **Account** — login/signup forms don't create real accounts. Wire to an auth provider (Clerk, Auth0, Supabase Auth, etc.).
- **Product imagery** — every product uses a placeholder tile (a large initial on a dark card) instead of a photo. Swap these for real photography — see below.

## Swapping in real product photos

Product images are rendered inline inside `ProductCard.jsx`, `ProductDetail.jsx`, and `Cart.jsx` as placeholder blocks. Each product in `src/data/products.js` is a good place to add an `image` field (e.g. `image: '/products/zv-001-front.jpg'`) once you have real photography, then swap the placeholder `<div>` in those three files for an `<img src={product.image} />`.

## Project structure

```
src/
  components/   Navbar, Footer, ProductCard, Toast, TickerStrip, ScrollToTop
  context/      CartContext (cart state + localStorage)
  data/         products.js — the full product catalog
  hooks/        useReveal — scroll-triggered fade-in
  pages/        Home, Shop, ProductDetail, Cart, Checkout, Account, NotFound
```

## Design system

- **Colors** — `ink` (background), `paper` (text), `steel` (secondary text/borders), `signal` (electric blue — the one accent, used for CTAs, prices, active states), `hazard` (used only for sale tags/alerts)
- **Type** — Space Grotesk for headlines, Inter for body text, JetBrains Mono for prices, product codes, and labels
- All of this lives in `tailwind.config.js` — change the hex values there to re-theme the whole site
