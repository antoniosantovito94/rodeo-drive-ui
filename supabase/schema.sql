create extension if not exists pgcrypto;

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id) on delete set null,
  slug text not null unique,
  name text not null,
  short_description text,
  description text,
  product_type text,
  price_cents integer not null check (price_cents >= 0),
  compare_at_price_cents integer check (compare_at_price_cents >= 0),
  currency text not null default 'EUR',
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  featured boolean not null default false,
  is_new_arrival boolean not null default false,
  is_on_sale boolean not null default false,
  badge_label text,
  badge_tone text check (badge_tone in ('blue', 'red')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table products
  add column if not exists product_type text;

alter table products
  add column if not exists is_new_arrival boolean not null default false;

alter table products
  add column if not exists is_on_sale boolean not null default false;

create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  url text not null,
  alt text,
  sort_order integer not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  sku text unique,
  size text,
  color text,
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists inventory (
  id uuid primary key default gen_random_uuid(),
  product_variant_id uuid not null unique references product_variants(id) on delete cascade,
  quantity integer not null default 0 check (quantity >= 0),
  reserved_quantity integer not null default 0 check (reserved_quantity >= 0),
  updated_at timestamptz not null default now(),
  check (reserved_quantity <= quantity)
);

create index if not exists products_status_featured_idx on products(status, featured);
create index if not exists products_status_new_arrival_idx on products(status, is_new_arrival);
create index if not exists products_status_sale_idx on products(status, is_on_sale);
create index if not exists products_category_type_idx on products(category_id, product_type);
create index if not exists products_sort_order_idx on products(sort_order);
create index if not exists product_images_product_id_idx on product_images(product_id);
create index if not exists product_variants_product_id_idx on product_variants(product_id);
create index if not exists inventory_variant_id_idx on inventory(product_variant_id);

grant usage on schema public to anon, authenticated;
grant select on categories to anon, authenticated;
grant select on products to anon, authenticated;
grant select on product_images to anon, authenticated;
grant select on product_variants to anon, authenticated;
grant select on inventory to anon, authenticated;

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = excluded.public;

alter table categories enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table product_variants enable row level security;
alter table inventory enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'categories'
      and policyname = 'Public can read categories'
  ) then
    create policy "Public can read categories"
      on categories for select
      using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'products'
      and policyname = 'Public can read published products'
  ) then
    create policy "Public can read published products"
      on products for select
      using (status = 'published');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'product_images'
      and policyname = 'Public can read images for published products'
  ) then
    create policy "Public can read images for published products"
      on product_images for select
      using (
        exists (
          select 1
          from products
          where products.id = product_images.product_id
            and products.status = 'published'
        )
      );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'product_variants'
      and policyname = 'Public can read variants for published products'
  ) then
    create policy "Public can read variants for published products"
      on product_variants for select
      using (
        active = true
        and exists (
          select 1
          from products
          where products.id = product_variants.product_id
            and products.status = 'published'
        )
      );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'inventory'
      and policyname = 'Public can read inventory for published products'
  ) then
    create policy "Public can read inventory for published products"
      on inventory for select
      using (
        exists (
          select 1
          from product_variants
          join products on products.id = product_variants.product_id
          where product_variants.id = inventory.product_variant_id
            and product_variants.active = true
            and products.status = 'published'
        )
      );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Public can read product images'
  ) then
    create policy "Public can read product images"
      on storage.objects for select
      using (bucket_id = 'product-images');
  end if;
end $$;
