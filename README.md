# PrimeGadget Store

A modern, responsive gadget e-commerce **front-end** built with **Vue 3 + Vite**.  
Products, cart, orders, auth, and admin tools run entirely in the browser via **localStorage** (no backend).

## Features

- **Storefront** — Home, Shop (search, category filter, pagination), product detail modal  
- **Cart & checkout** — quantity controls, 5% tax, free shipping, consistent totals  
- **Orders** — history, status tracking, estimated delivery (5 business days)  
- **Auth** — register/login, Google Sign-In demo, per-user cart / orders / wishlist  
- **Wishlist** — favorites synced per account  
- **Admin portal** — dashboard, products & categories CRUD, image upload, hero editor (live preview), order status
  <!-- - Demo admin: `admin@primegadget.com` / `admin123`   -->
- **Support** — Contact, FAQ, Privacy pages  

## Tech stack

- Vue 3 (Composition API)  
- Vue Router  
- Vite  
- localStorage for persistence  
- Bootstrap Icons  

## Getting started

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

```bash
npm run build    # production build → dist/
npm run preview  # preview production build
```

## Project structure (high level)

```
src/
  components/   # UI (Hero, ProductCard, Navbar, …)
  pages/        # Routes (Home, Shop, Cart, Checkout, Admin, …)
  stores/       # Reactive localStorage state
  layouts/      # Main + Admin shells
  utils/        # Pricing & delivery helpers
  assets/       # CSS, images, seed products
```

## Notes

- Data lives in **your browser only**. Clearing site data resets the demo.  
- Admin and customer sessions share the same origin storage keys (scoped by email where applicable).  
- This is a **portfolio / learning** project.

## License

Copyright © 2026 Naima Rahman. All rights reserved.

This project was built for educational and portfolio demonstration purposes. Personal review and non-commercial inspection are welcome, but redistribution, duplication, or commercial use of this codebase without prior permission is not permitted.
