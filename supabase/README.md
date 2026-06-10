# Supabase setup

## 1. Create project

Create a new Supabase project dedicated to Rodeo Drive ecommerce.

Recommended settings:

- Project name: `rodeo-drive-ecommerce`
- Region: Europe, preferably closest available EU region
- Database password: generate and store it in a password manager

## 2. Run SQL

In Supabase Dashboard, open SQL Editor and run:

1. `supabase/schema.sql`
2. `supabase/seed.sql`

The seed uses local image paths from `assets/` so the current UI keeps working.
Real product images can be moved later to the `product-images` storage bucket.

Current image status:

- Product data is loaded from Supabase.
- Product images are still served locally from `public/assets`.
- Before production, upload final product images to the `product-images` bucket.
- Then update `product_images.url` with the public Supabase Storage URLs.

## Product type values

Use `products.product_type` for catalog filters.

Donna:

- `jeans`
- `pantaloni`
- `shorts`
- `vestiti`
- `maglie`
- `borse`
- `accessori`

Uomo:

- `jeans`
- `pantaloni`
- `maglie`
- `camicie`
- `accessori`

## Editorial flags

Use these boolean fields to control homepage and editorial catalog sections:

- `featured`: product can appear on the homepage
- `is_new_arrival`: product appears in `/#nuovi-arrivi` and `/prodotti?selezione=nuovi-arrivi`
- `is_on_sale`: product appears in `/#sale` and `/prodotti?selezione=sale`

## 3. Configure local env

Create `.env.local` locally:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Use the Project URL and publishable key from Supabase. If your dashboard only
shows legacy keys, use `NEXT_PUBLIC_SUPABASE_ANON_KEY` instead.

## 4. Verify

Run:

```bash
npm run build
npm run dev
```

Then check:

- `/`
- `/prodotti`
- `/prodotti/vestito-cotone-rosso`
