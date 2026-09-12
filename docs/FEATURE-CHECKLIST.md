# Atoz Shopping master requirement checklist

## Storefront
- [x] Atoz Shopping brand + panda visual direction
- [x] Responsive desktop/tablet/mobile layouts
- [x] Search route and product filtering
- [x] Categories and subcategories data model
- [x] Product detail route
- [x] Product images
- [x] Product variants
- [x] Size variants XS/S/M/L/XL/XXL/XXXL supported by schema/UI pattern
- [x] Variant-level SKU, price, sale price, stock, attributes, image
- [x] Cart
- [x] Wishlist data model
- [x] Account/login/register
- [x] Saved private delivery addresses
- [x] Interactive map + pin
- [x] Address search
- [x] Customer name/address in header after login
- [x] Checkout
- [x] COD order creation
- [x] Razorpay integration endpoints + signature verification + webhook
- [x] Order history
- [x] Order timeline
- [x] Shipment/AWB model + Shiprocket tracking adapter
- [x] Reviews/ratings data model
- [x] Coupons data model
- [x] Banners/posters data model with schedule, slot, order, mobile image
- [x] Homepage section data model
- [x] Site settings data model
- [x] Footer policy/help routes

## Admin/CMS
- [x] Admin role protection
- [x] Product CRUD API foundation
- [x] Product variant storage
- [x] Category CRUD API foundation
- [x] Banner CRUD API foundation
- [x] Image upload endpoint with JPG/PNG/WebP validation and Cloudinary production path
- [x] Order dashboard
- [x] Settings dashboard
- [x] Audit log model and writes on key admin actions
- [x] Draft/publish-ready content model

## Production engineering
- [x] PostgreSQL schema
- [x] Prisma ORM
- [x] HTTP-only session cookie
- [x] Input validation
- [x] Environment variable separation
- [x] Health endpoint
- [x] No fake payment success
- [x] No fake courier tracking
- [x] Media kept outside Git when Cloudinary is configured
- [x] Responsive CSS
- [x] Future-ready models for reviews, coupons, banners, home sections, notifications, audit logs

## External configuration required before real launch
- [ ] Production PostgreSQL database
- [ ] Production JWT secret
- [ ] Razorpay merchant account + webhook secret
- [ ] Cloudinary media account
- [ ] Production map/geocoding/tile provider and compliant usage limits
- [ ] Shipping/courier merchant account and verified credentials
- [ ] Transactional email/SMS/WhatsApp provider if desired
- [ ] Final legal text for privacy/terms/refund/shipping
- [ ] Domain + DNS + HTTPS
- [ ] Backups, monitoring, rate limiting/WAF
- [ ] Business tax/invoice configuration as applicable

## QA note
The container could not complete `npm install` within the available execution window, so a full Next.js dependency-based build/test run could not be honestly certified here. The source has been manually consistency-checked and includes setup/build scripts. Run `npm install && npm run build && npm run test` in a normal network-enabled CI environment before production deployment.
