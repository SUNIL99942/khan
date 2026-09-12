# Production launch checklist
1. Create PostgreSQL and set DATABASE_URL.
2. Set a random JWT_SECRET.
3. Create admin credentials and run `npm run db:push` + `npm run db:seed`.
4. Configure Razorpay keys and webhook URL `/api/payments/webhook`.
5. Configure Cloudinary and verify JPG/PNG/WebP uploads.
6. Choose a production map/geocoding provider and set its limits/terms.
7. Configure shipping provider credentials and test an AWB lookup.
8. Replace placeholder legal pages with approved business policies.
9. Add transactional email/SMS provider if required.
10. Deploy behind HTTPS, enable backups, monitoring, rate limits and WAF.
11. Run end-to-end tests for signup, address, cart, COD, Razorpay test payment, webhook, stock decrement and tracking.
12. Switch payment gateway from test to live only after successful staging QA.
