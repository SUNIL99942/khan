import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=process.cwd();
const required=[
'package.json','next.config.ts','tsconfig.json','prisma/schema.prisma','prisma/seed.ts',
'app/page.tsx','app/products/page.tsx','app/product/[slug]/page.tsx','app/cart/page.tsx','app/checkout/page.tsx',
'app/account/page.tsx','app/orders/page.tsx','app/orders/[id]/page.tsx','app/login/page.tsx','app/register/page.tsx',
'app/api/auth/login/route.ts','app/api/auth/register/route.ts','app/api/auth/me/route.ts','app/api/address/route.ts',
'app/api/address/search/route.ts','app/api/orders/route.ts','app/api/payments/create/route.ts','app/api/payments/verify/route.ts','app/api/payments/webhook/route.ts',
'app/api/shipping/track/route.ts','app/api/admin/products/route.ts','app/api/admin/categories/route.ts','app/api/admin/banners/route.ts','app/api/admin/upload/route.ts',
'app/admin/page.tsx','app/admin/products/page.tsx','app/admin/categories/page.tsx','app/admin/banners/page.tsx','app/admin/settings/page.tsx',
'components/Header.tsx','components/MapPicker.tsx','components/CheckoutClient.tsx','lib/auth.ts','lib/prisma.ts','lib/razorpay.ts','lib/shipping.ts'
];
for(const f of required) assert(fs.existsSync(path.join(root,f)),`Missing required file: ${f}`);
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
for(const s of ['dev','build','start']) assert(pkg.scripts?.[s],`Missing npm script: ${s}`);
const schema=fs.readFileSync(path.join(root,'prisma/schema.prisma'),'utf8');
for(const model of ['User','Address','Category','Product','ProductVariant','Cart','CartItem','Order','OrderItem','Payment','Shipment','OrderEvent','Review','WishlistItem','Coupon','Banner','HomeSection','SiteSetting','AuditLog','Notification']) assert(schema.includes(`model ${model}`),`Missing Prisma model: ${model}`);
const auth=fs.readFileSync(path.join(root,'lib/auth.ts'),'utf8'); assert(auth.includes('httpOnly:true'),'Session cookie must be httpOnly'); assert(auth.includes('sameSite:\'lax\''),'Session cookie must set SameSite');
const order=fs.readFileSync(path.join(root,'app/api/orders/route.ts'),'utf8'); assert(order.includes('addressId'),'Order endpoint must bind address to user'); assert(order.includes('stock'),'Order endpoint must validate stock');
const upload=fs.readFileSync(path.join(root,'app/api/admin/upload/route.ts'),'utf8'); for(const t of ['image/jpeg','image/png','image/webp']) assert(upload.includes(t),`Upload type missing: ${t}`);
const map=fs.readFileSync(path.join(root,'components/MapPicker.tsx'),'utf8'); assert(map.includes('MapContainer')&&map.includes('Marker'),'Interactive map missing');
console.log(`PASS: ${required.length} required project files and core contracts verified.`);
