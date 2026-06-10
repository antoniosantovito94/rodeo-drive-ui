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
  product_type,
  price_cents,
  compare_at_price_cents,
  status,
  featured,
  is_new_arrival,
  is_on_sale,
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
  product.product_type,
  product.price_cents,
  product.compare_at_price_cents,
  product.status,
  product.featured,
  product.is_new_arrival,
  product.is_on_sale,
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
      'vestiti',
      2990,
      null::integer,
      'published',
      true,
      true,
      false,
      'Nuovo',
      'blue',
      10
    ),
    (
      'vestito-fiore-paris',
      'Vestito Fiore Paris',
      'Vestito fantasia floreale con taglio leggero.',
      'Vestito fantasia floreale con taglio leggero e vestibilita'' quotidiana.',
      'vestiti',
      2990,
      null::integer,
      'published',
      true,
      true,
      false,
      null,
      null,
      20
    ),
    (
      'corpetto-linea-paris',
      'Corpetto Linea Paris',
      'Corpetto linea Paris in saldo.',
      'Corpetto linea Paris con vestibilita'' aderente.',
      'maglie',
      990,
      1990,
      'published',
      true,
      true,
      true,
      'Sale',
      'red',
      30
    ),
    (
      'jeans-vita-alta-chiaro',
      'Jeans vita alta chiaro',
      'Jeans denim chiaro a vita alta con gamba dritta.',
      'Jeans in denim chiaro con vita alta, gamba dritta e vestibilita'' quotidiana.',
      'jeans',
      3490,
      null::integer,
      'published',
      true,
      true,
      false,
      'Nuovo',
      'blue',
      40
    ),
    (
      'jeans-wide-leg-stone',
      'Jeans wide leg stone',
      'Jeans wide leg lavaggio stone in saldo.',
      'Jeans wide leg con lavaggio stone, vita regolare e linea morbida.',
      'jeans',
      2490,
      3990,
      'published',
      true,
      false,
      true,
      'Sale',
      'red',
      50
    ),
    (
      'jeans-slim-denim-scuro',
      'Jeans slim denim scuro',
      'Jeans slim in denim scuro dalla linea pulita.',
      'Jeans slim in denim scuro con taglio essenziale e facile da abbinare.',
      'jeans',
      3290,
      null::integer,
      'published',
      true,
      false,
      false,
      null,
      null,
      60
    ),
    (
      'pantalone-palazzo-nero',
      'Pantalone palazzo nero',
      'Pantalone palazzo nero con linea fluida.',
      'Pantalone palazzo nero con gamba ampia, ideale per look giorno e sera.',
      'pantaloni',
      3490,
      null::integer,
      'published',
      true,
      true,
      false,
      'Nuovo',
      'blue',
      70
    ),
    (
      'pantalone-tailleur-sabbia',
      'Pantalone tailleur sabbia',
      'Pantalone sartoriale color sabbia in saldo.',
      'Pantalone stile tailleur color sabbia con piega frontale e vestibilita'' elegante.',
      'pantaloni',
      1990,
      3490,
      'published',
      true,
      false,
      true,
      'Sale',
      'red',
      80
    ),
    (
      'pantalone-cargo-oliva',
      'Pantalone cargo oliva',
      'Pantalone cargo color oliva con tasche laterali.',
      'Pantalone cargo color oliva con tasche applicate e fit rilassato.',
      'pantaloni',
      2990,
      null::integer,
      'published',
      true,
      false,
      false,
      null,
      null,
      90
    ),
    (
      'shorts-denim-vita-alta',
      'Shorts denim vita alta',
      'Shorts denim a vita alta nuovo arrivo.',
      'Shorts in denim a vita alta con fondo sfrangiato e linea essenziale.',
      'shorts',
      2290,
      null::integer,
      'published',
      true,
      true,
      false,
      'Nuovo',
      'blue',
      100
    ),
    (
      'shorts-sartoriale-nero',
      'Shorts sartoriale nero',
      'Shorts nero sartoriale in saldo.',
      'Shorts nero con pinces frontali e taglio sartoriale.',
      'shorts',
      1490,
      2490,
      'published',
      true,
      false,
      true,
      'Sale',
      'red',
      110
    ),
    (
      'shorts-lino-beige',
      'Shorts lino beige',
      'Shorts beige effetto lino con cintura morbida.',
      'Shorts beige effetto lino con elastico in vita e vestibilita'' leggera.',
      'shorts',
      2190,
      null::integer,
      'published',
      true,
      false,
      false,
      null,
      null,
      120
    ),
    (
      'vestito-midi-satin-verde',
      'Vestito midi satin verde',
      'Vestito midi satin verde in saldo.',
      'Vestito midi effetto satin verde con spallina sottile e linea morbida.',
      'vestiti',
      1990,
      3490,
      'published',
      true,
      false,
      true,
      'Sale',
      'red',
      130
    ),
    (
      'maglia-righe-morbida',
      'Maglia righe morbida',
      'Maglia a righe con mano morbida.',
      'Maglia a righe dalla vestibilita'' morbida, pensata per look quotidiani.',
      'maglie',
      1990,
      null::integer,
      'published',
      true,
      false,
      false,
      null,
      null,
      140
    ),
    (
      'top-costine-bianco',
      'Top costine bianco',
      'Top bianco a costine essenziale.',
      'Top bianco a costine con linea aderente e tessuto elasticizzato.',
      'maglie',
      1590,
      null::integer,
      'published',
      true,
      false,
      false,
      null,
      null,
      150
    ),
    (
      'borsa-tracolla-nera',
      'Borsa tracolla nera',
      'Borsa nera compatta con tracolla.',
      'Borsa nera compatta con tracolla regolabile e chiusura frontale.',
      'borse',
      2990,
      null::integer,
      'published',
      true,
      false,
      false,
      null,
      null,
      160
    ),
    (
      'anello-cuore-acciaio',
      'Anello cuore acciaio',
      'Anello acciaio con dettaglio cuore.',
      'Anello in acciaio con piccolo dettaglio cuore, taglia regolabile.',
      'accessori',
      990,
      null::integer,
      'published',
      true,
      false,
      false,
      null,
      null,
      170
    ),
    (
      'sciarpa-leggera-fantasia',
      'Sciarpa leggera fantasia',
      'Sciarpa leggera con stampa fantasia.',
      'Sciarpa leggera con stampa fantasia, ideale per completare look di stagione.',
      'accessori',
      1290,
      null::integer,
      'published',
      true,
      false,
      false,
      null,
      null,
      180
    )
) as product(
  slug,
  name,
  short_description,
  description,
  product_type,
  price_cents,
  compare_at_price_cents,
  status,
  featured,
  is_new_arrival,
  is_on_sale,
  badge_label,
  badge_tone,
  sort_order
)
on conflict (slug) do update
set category_id = excluded.category_id,
    name = excluded.name,
    short_description = excluded.short_description,
    description = excluded.description,
    product_type = excluded.product_type,
    price_cents = excluded.price_cents,
    compare_at_price_cents = excluded.compare_at_price_cents,
    status = excluded.status,
    featured = excluded.featured,
    is_new_arrival = excluded.is_new_arrival,
    is_on_sale = excluded.is_on_sale,
    badge_label = excluded.badge_label,
    badge_tone = excluded.badge_tone,
    sort_order = excluded.sort_order,
    updated_at = now();

with product_rows as (
  select id, slug from products
  where slug in (
    'vestito-cotone-rosso',
    'vestito-fiore-paris',
    'corpetto-linea-paris',
    'jeans-vita-alta-chiaro',
    'jeans-wide-leg-stone',
    'jeans-slim-denim-scuro',
    'pantalone-palazzo-nero',
    'pantalone-tailleur-sabbia',
    'pantalone-cargo-oliva',
    'shorts-denim-vita-alta',
    'shorts-sartoriale-nero',
    'shorts-lino-beige',
    'vestito-midi-satin-verde',
    'maglia-righe-morbida',
    'top-costine-bianco',
    'borsa-tracolla-nera',
    'anello-cuore-acciaio',
    'sciarpa-leggera-fantasia'
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
    ('corpetto-linea-paris', '/assets/corpetto.png', 'Corpetto Linea Paris', 10, true),
    ('jeans-vita-alta-chiaro', '/assets/jeans-vita-alta-chiaro.png', 'Jeans vita alta chiaro', 10, true),
    ('jeans-wide-leg-stone', '/assets/jeans-wide-leg-stone.png', 'Jeans wide leg stone', 10, true),
    ('jeans-slim-denim-scuro', '/assets/jeans-slim-denim-scuro.png', 'Jeans slim denim scuro', 10, true),
    ('pantalone-palazzo-nero', '/assets/pantalone-palazzo-nero.png', 'Pantalone palazzo nero', 10, true),
    ('pantalone-tailleur-sabbia', '/assets/pantalone-tailleur-sabbia.png', 'Pantalone tailleur sabbia', 10, true),
    ('pantalone-cargo-oliva', '/assets/pantalone-cargo-oliva.png', 'Pantalone cargo oliva', 10, true),
    ('shorts-denim-vita-alta', '/assets/shorts-denim-vita-alta.png', 'Shorts denim vita alta', 10, true),
    ('shorts-sartoriale-nero', '/assets/shorts-sartoriale-nero.png', 'Shorts sartoriale nero', 10, true),
    ('shorts-lino-beige', '/assets/shorts-lino-beige.png', 'Shorts lino beige', 10, true),
    ('vestito-midi-satin-verde', '/assets/vestito-midi-satin-verde.png', 'Vestito midi satin verde', 10, true),
    ('maglia-righe-morbida', '/assets/maglia-righe-morbida.png', 'Maglia righe morbida', 10, true),
    ('top-costine-bianco', '/assets/top-costine-bianco.png', 'Top costine bianco', 10, true),
    ('borsa-tracolla-nera', '/assets/borsa-tracolla-nera.png', 'Borsa tracolla nera', 10, true),
    ('anello-cuore-acciaio', '/assets/anello-cuore-acciaio.png', 'Anello cuore acciaio', 10, true),
    ('sciarpa-leggera-fantasia', '/assets/sciarpa-leggera-fantasia.png', 'Sciarpa leggera fantasia', 10, true)
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
    'corpetto-linea-paris',
    'jeans-vita-alta-chiaro',
    'jeans-wide-leg-stone',
    'jeans-slim-denim-scuro',
    'pantalone-palazzo-nero',
    'pantalone-tailleur-sabbia',
    'pantalone-cargo-oliva',
    'shorts-denim-vita-alta',
    'shorts-sartoriale-nero',
    'shorts-lino-beige',
    'vestito-midi-satin-verde',
    'maglia-righe-morbida',
    'top-costine-bianco',
    'borsa-tracolla-nera',
    'anello-cuore-acciaio',
    'sciarpa-leggera-fantasia'
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
    ('corpetto-linea-paris', 'RD-CLP-M-NERO', 'M', 'Nero', 2),
    ('jeans-vita-alta-chiaro', 'RD-JVAC-38-CHIARO', '38', 'Denim chiaro', 3),
    ('jeans-vita-alta-chiaro', 'RD-JVAC-40-CHIARO', '40', 'Denim chiaro', 4),
    ('jeans-vita-alta-chiaro', 'RD-JVAC-42-CHIARO', '42', 'Denim chiaro', 2),
    ('jeans-wide-leg-stone', 'RD-JWLS-38-STONE', '38', 'Stone', 2),
    ('jeans-wide-leg-stone', 'RD-JWLS-40-STONE', '40', 'Stone', 2),
    ('jeans-wide-leg-stone', 'RD-JWLS-42-STONE', '42', 'Stone', 1),
    ('jeans-slim-denim-scuro', 'RD-JSDS-38-SCURO', '38', 'Denim scuro', 3),
    ('jeans-slim-denim-scuro', 'RD-JSDS-40-SCURO', '40', 'Denim scuro', 3),
    ('jeans-slim-denim-scuro', 'RD-JSDS-42-SCURO', '42', 'Denim scuro', 2),
    ('pantalone-palazzo-nero', 'RD-PPN-S-NERO', 'S', 'Nero', 3),
    ('pantalone-palazzo-nero', 'RD-PPN-M-NERO', 'M', 'Nero', 4),
    ('pantalone-palazzo-nero', 'RD-PPN-L-NERO', 'L', 'Nero', 2),
    ('pantalone-tailleur-sabbia', 'RD-PTS-S-SABBIA', 'S', 'Sabbia', 2),
    ('pantalone-tailleur-sabbia', 'RD-PTS-M-SABBIA', 'M', 'Sabbia', 2),
    ('pantalone-tailleur-sabbia', 'RD-PTS-L-SABBIA', 'L', 'Sabbia', 1),
    ('pantalone-cargo-oliva', 'RD-PCO-S-OLIVA', 'S', 'Oliva', 3),
    ('pantalone-cargo-oliva', 'RD-PCO-M-OLIVA', 'M', 'Oliva', 3),
    ('pantalone-cargo-oliva', 'RD-PCO-L-OLIVA', 'L', 'Oliva', 2),
    ('shorts-denim-vita-alta', 'RD-SDVA-38-DENIM', '38', 'Denim', 3),
    ('shorts-denim-vita-alta', 'RD-SDVA-40-DENIM', '40', 'Denim', 3),
    ('shorts-denim-vita-alta', 'RD-SDVA-42-DENIM', '42', 'Denim', 2),
    ('shorts-sartoriale-nero', 'RD-SSN-S-NERO', 'S', 'Nero', 2),
    ('shorts-sartoriale-nero', 'RD-SSN-M-NERO', 'M', 'Nero', 2),
    ('shorts-sartoriale-nero', 'RD-SSN-L-NERO', 'L', 'Nero', 1),
    ('shorts-lino-beige', 'RD-SLB-S-BEIGE', 'S', 'Beige', 3),
    ('shorts-lino-beige', 'RD-SLB-M-BEIGE', 'M', 'Beige', 3),
    ('shorts-lino-beige', 'RD-SLB-L-BEIGE', 'L', 'Beige', 2),
    ('vestito-midi-satin-verde', 'RD-VMSV-S-VERDE', 'S', 'Verde', 2),
    ('vestito-midi-satin-verde', 'RD-VMSV-M-VERDE', 'M', 'Verde', 2),
    ('vestito-midi-satin-verde', 'RD-VMSV-L-VERDE', 'L', 'Verde', 1),
    ('maglia-righe-morbida', 'RD-MRM-S-RIGHE', 'S', 'Righe', 3),
    ('maglia-righe-morbida', 'RD-MRM-M-RIGHE', 'M', 'Righe', 3),
    ('maglia-righe-morbida', 'RD-MRM-L-RIGHE', 'L', 'Righe', 2),
    ('top-costine-bianco', 'RD-TCB-S-BIANCO', 'S', 'Bianco', 3),
    ('top-costine-bianco', 'RD-TCB-M-BIANCO', 'M', 'Bianco', 4),
    ('top-costine-bianco', 'RD-TCB-L-BIANCO', 'L', 'Bianco', 2),
    ('borsa-tracolla-nera', 'RD-BTN-U-NERO', 'Unica', 'Nero', 4),
    ('anello-cuore-acciaio', 'RD-ACA-U-ACCIAIO', 'Unica', 'Acciaio', 6),
    ('sciarpa-leggera-fantasia', 'RD-SLF-U-FANTASIA', 'Unica', 'Fantasia', 5)
) as variant(slug, sku, size, color, stock_quantity)
  on variant.slug = product_rows.slug
on conflict (sku) do update
set size = excluded.size,
    color = excluded.color,
    stock_quantity = excluded.stock_quantity,
    active = excluded.active,
    updated_at = now();

with product_rows as (
  select id from products
  where slug in (
    'vestito-cotone-rosso',
    'vestito-fiore-paris',
    'corpetto-linea-paris',
    'jeans-vita-alta-chiaro',
    'jeans-wide-leg-stone',
    'jeans-slim-denim-scuro',
    'pantalone-palazzo-nero',
    'pantalone-tailleur-sabbia',
    'pantalone-cargo-oliva',
    'shorts-denim-vita-alta',
    'shorts-sartoriale-nero',
    'shorts-lino-beige',
    'vestito-midi-satin-verde',
    'maglia-righe-morbida',
    'top-costine-bianco',
    'borsa-tracolla-nera',
    'anello-cuore-acciaio',
    'sciarpa-leggera-fantasia'
  )
)
insert into inventory (product_variant_id, quantity, reserved_quantity)
select product_variants.id, product_variants.stock_quantity, 0
from product_variants
join product_rows on product_rows.id = product_variants.product_id
on conflict (product_variant_id) do update
set quantity = excluded.quantity,
    reserved_quantity = excluded.reserved_quantity,
    updated_at = now();
