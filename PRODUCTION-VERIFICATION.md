# Atoz Shopping — verification report

## What was actually checked in this environment

- ZIP extraction/integrity: PASS
- Required route/component/library file inventory: PASS
- Package scripts (`dev`, `build`, `start`): PASS
- Prisma model inventory: PASS
- HTTP-only + SameSite session cookie contract: PASS
- Order address ownership check present: PASS
- Variant stock validation and atomic decrement contract: PASS
- JPG/PNG/WebP upload allow-list: PASS
- Interactive map component contract: PASS
- CI workflow included for dependency install, Prisma generation and production build
- Render deployment manifest included
- Docker production build manifest included

## What cannot honestly be marked PASS here

A real payment gateway, courier account, map/geocoding provider, Cloudinary bucket, production PostgreSQL database and your domain require your own credentials/accounts. Those secrets must never be embedded in the ZIP. External-network dependency installation was unavailable in this execution environment, so a real `next build` against downloaded npm packages could not be executed here.

The project therefore does **not** falsely claim that a live merchant transaction or live courier shipment has been verified. The supplied CI workflow performs those dependency/build checks automatically on GitHub once the repository is pushed.

## Production acceptance test

1. Configure production environment variables.
2. Run database migration/seed.
3. Push to GitHub; CI must finish green.
4. Open `/api/health` and confirm HTTP 200.
5. Register a customer and save a map-selected address.
6. Create a product with multiple variants and stock.
7. Add a variant to cart and place a COD order.
8. Verify stock decreases exactly once and the order appears in the account.
9. Test Razorpay in test mode and verify webhook + signature.
10. Configure courier credentials and verify a real AWB lookup.
11. Upload JPG/PNG/WebP from admin and confirm it renders on the live storefront.
12. Change a product/banner/category from admin and confirm the storefront reflects the change.
13. Test mobile, tablet and desktop breakpoints.
14. Switch to production keys only after all sandbox tests pass.
