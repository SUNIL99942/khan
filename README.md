# Atoz Shopping — Production Full-Stack Build

A production-oriented, database-driven e-commerce foundation for Atoz Shopping. It is designed so business content is editable through the admin CMS instead of hard-coded into pages.

## Included
- Responsive customer storefront (desktop/tablet/mobile)
- Search, categories, product detail and variants
- Size/color/attribute variants with variant-level SKU, price, sale price, stock and image
- Customer accounts with secure HTTP-only JWT session cookie
- Private saved delivery addresses with interactive map pin
- Address search proxy using Nominatim/OpenStreetMap
- Cart persistence in browser and checkout flow foundation
- PostgreSQL + Prisma data model for products, categories, carts, orders, payments, shipments, reviews, coupons, banners, home sections, settings and audit logs
- Razorpay order creation, signature verification and webhook endpoint
- COD order path
- Shiprocket AWB tracking adapter
- Cloudinary image upload endpoint (JPG/PNG/WebP)
- Admin dashboard pages and CRUD API foundations
- Scheduled/ordered banner model and CMS-ready homepage sections
- Health endpoint
- Security-conscious environment configuration

## Production requirements
External services require the store owner's own accounts/credentials: PostgreSQL, Razorpay, Cloudinary, map/tile/geocoding provider and shipping provider. The application does not fabricate payment, courier or map data.

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and set production secrets.
3. `npx prisma generate`
4. `npm run db:push` (or use migrations for a controlled production workflow)
5. `npm run db:seed`
6. `npm run dev`
7. Before launch: configure Razorpay webhooks, Cloudinary, shipping provider, map provider, domain, HTTPS, backups, monitoring and email/SMS provider.

## Deploy
Recommended: GitHub + Render (web service) + managed PostgreSQL, with Cloudinary for media. Put all secrets in the hosting provider's environment settings. Never commit `.env`.

## Important honesty note
This repository is intentionally structured for real integrations, but a live store cannot be fully operational until the merchant supplies their own payment, database, media, maps and shipping credentials and completes provider verification. No fake payment or fake tracking is used.
