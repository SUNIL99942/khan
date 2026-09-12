# Architecture

Browser → Next.js App Router → API routes → Prisma → PostgreSQL

External integrations:
- Razorpay: online payments + webhook
- Cloudinary: product/banner media
- Map/geocoding provider: address selection/search
- Shiprocket (adapter): courier/AWB tracking

Business content is stored in the database instead of being hard-coded. This is the key to changing products, variants, categories, banners, homepage sections and site settings from an admin interface without redeploying for every content edit.

For larger scale, add Redis caching, a dedicated search engine (Typesense/Meilisearch/Elastic), queue workers, object storage CDN, observability and edge rate limiting without changing the core domain model.
