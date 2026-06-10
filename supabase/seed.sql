insert into categories (name, slug, sort_order)
values
  ('Donna', 'donna', 10),
  ('Uomo', 'uomo', 20)
on conflict (slug) do update
set name = excluded.name,
    sort_order = excluded.sort_order;

with donna as (
  select id from categories where slug = 'donna'
)
insert into products (
  category_id,
  slug,
  name,
  short_description,
  description,
  price_cents,
  compare_at_price_cents,
  status,
  featured,
  badge_label,
  badge_tone,
  sort_order
)
select
  donna.id,
  product.slug,
  product.name,
  product.short_description,
  product.description,
  product.price_cents,
  product.compare_at_price_cents,
  product.status,
  product.featured,
  product.badge_label,
  product.badge_tone,
  product.sort_order
from donna
cross join (
  values
    (
      'vestito-cotone-rosso',
      'Vestito cotone rosso',
      'Vestito in cotone rosso dalla linea essenziale.',
      'Vestito in cotone rosso dalla linea essenziale. Ideale per la stagione estiva.',
      2990,
      null::integer,
      'published',
      true,
      'Nuovo',
      'blue',
      10
    ),
    (
      'vestito-fiore-paris',
      'Vestito Fiore Paris',
      'Vestito fantasia floreale con taglio leggero.',
      'Vestito fantasia floreale con taglio leggero e vestibilita'' quotidiana.',
      2990,
      3990,
      'published',
      true,
      null,
      null,
      20
    ),
    (
      'corpetto-linea-paris',
      'Corpetto Linea Paris',
      'Corpetto linea Paris in saldo.',
      'Corpetto linea Paris con vestibilita'' aderente.',
      1990,
      990,
      'published',
      true,
      'Sale',
      'red',
      30
    )
) as product(
  slug,
  name,
  short_description,
  description,
  price_cents,
  compare_at_price_cents,
  status,
  featured,
  badge_label,
  badge_tone,
  sort_order
)
on conflict (slug) do update
set category_id = excluded.category_id,
    name = excluded.name,
    short_description = excluded.short_description,
    description = excluded.description,
    price_cents = excluded.price_cents,
    compare_at_price_cents = excluded.compare_at_price_cents,
    status = excluded.status,
    featured = excluded.featured,
    badge_label = excluded.badge_label,
    badge_tone = excluded.badge_tone,
    sort_order = excluded.sort_order,
    updated_at = now();

with product_rows as (
  select id, slug from products
  where slug in (
    'vestito-cotone-rosso',
    'vestito-fiore-paris',
    'corpetto-linea-paris'
  )
)
insert into product_images (product_id, url, alt, sort_order, is_primary)
select
  product_rows.id,
  image.url,
  image.alt,
  image.sort_order,
  image.is_primary
from product_rows
join (
  values
    ('vestito-cotone-rosso', '/assets/vestito_lungo.png', 'Vestito lungo', 10, true),
    ('vestito-fiore-paris', '/assets/vestito_fiore.png', 'Vestito Fiore Paris', 10, true),
    ('corpetto-linea-paris', '/assets/corpetto.png', 'Corpetto Linea Paris', 10, true)
) as image(slug, url, alt, sort_order, is_primary)
  on image.slug = product_rows.slug
where not exists (
  select 1
  from product_images
  where product_images.product_id = product_rows.id
    and product_images.url = image.url
);

with product_rows as (
  select id, slug from products
  where slug in (
    'vestito-cotone-rosso',
    'vestito-fiore-paris',
    'corpetto-linea-paris'
  )
)
insert into product_variants (product_id, sku, size, color, stock_quantity, active)
select
  product_rows.id,
  variant.sku,
  variant.size,
  variant.color,
  variant.stock_quantity,
  true
from product_rows
join (
  values
    ('vestito-cotone-rosso', 'RD-VCR-S-ROSSO', 'S', 'Rosso', 3),
    ('vestito-cotone-rosso', 'RD-VCR-M-ROSSO', 'M', 'Rosso', 3),
    ('vestito-cotone-rosso', 'RD-VCR-L-ROSSO', 'L', 'Rosso', 2),
    ('vestito-fiore-paris', 'RD-VFP-S-FIORE', 'S', 'Fiore', 2),
    ('vestito-fiore-paris', 'RD-VFP-M-FIORE', 'M', 'Fiore', 3),
    ('corpetto-linea-paris', 'RD-CLP-S-NERO', 'S', 'Nero', 2),
    ('corpetto-linea-paris', 'RD-CLP-M-NERO', 'M', 'Nero', 2)
) as variant(slug, sku, size, color, stock_quantity)
  on variant.slug = product_rows.slug
on conflict (sku) do update
set size = excluded.size,
    color = excluded.color,
    stock_quantity = excluded.stock_quantity,
    active = excluded.active,
    updated_at = now();

insert into inventory (product_variant_id, quantity, reserved_quantity)
select id, stock_quantity, 0
from product_variants
where sku in (
  'RD-VCR-S-ROSSO',
  'RD-VCR-M-ROSSO',
  'RD-VCR-L-ROSSO',
  'RD-VFP-S-FIORE',
  'RD-VFP-M-FIORE',
  'RD-CLP-S-NERO',
  'RD-CLP-M-NERO'
)
on conflict (product_variant_id) do update
set quantity = excluded.quantity,
    reserved_quantity = excluded.reserved_quantity,
    updated_at = now();
