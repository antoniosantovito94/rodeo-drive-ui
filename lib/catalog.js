import { createClient } from "@supabase/supabase-js";

const fallbackProducts = [
  createFallbackProduct({
    id: "vestito-lungo",
    slug: "vestito-cotone-rosso",
    image: "vestito_lungo.png",
    alt: "Vestito lungo",
    name: "Vestito cotone rosso",
    productType: "vestiti",
    isNewArrival: true,
    description: "Vestito in cotone rosso dalla linea essenziale.",
    priceCents: 2990,
    variants: [
      ["S", "Rosso", 3],
      ["M", "Rosso", 3],
      ["L", "Rosso", 2],
    ],
  }),
  createFallbackProduct({
    id: "vestito-fiore",
    slug: "vestito-fiore-paris",
    image: "vestito_fiore.png",
    alt: "Vestito Fiore Paris",
    name: "Vestito Fiore Paris",
    productType: "vestiti",
    isNewArrival: true,
    description: "Vestito fantasia floreale con taglio leggero.",
    priceCents: 2990,
    variants: [
      ["S", "Fiore", 2],
      ["M", "Fiore", 3],
    ],
  }),
  createFallbackProduct({
    id: "corpetto",
    slug: "corpetto-linea-paris",
    image: "corpetto.png",
    alt: "Corpetto",
    name: "Corpetto Linea Paris",
    productType: "maglie",
    isNewArrival: true,
    isOnSale: true,
    description: "Corpetto linea Paris in saldo.",
    priceCents: 990,
    compareAtPriceCents: 1990,
    variants: [
      ["S", "Nero", 2],
      ["M", "Nero", 2],
    ],
  }),
  createFallbackProduct({
    id: "jeans-vita-alta-chiaro",
    slug: "jeans-vita-alta-chiaro",
    image: "jeans-vita-alta-chiaro.png",
    alt: "Jeans vita alta chiaro",
    name: "Jeans vita alta chiaro",
    productType: "jeans",
    isNewArrival: true,
    description: "Jeans denim chiaro a vita alta con gamba dritta.",
    priceCents: 3490,
    variants: [
      ["38", "Denim chiaro", 3],
      ["40", "Denim chiaro", 4],
      ["42", "Denim chiaro", 2],
    ],
  }),
  createFallbackProduct({
    id: "jeans-wide-leg-stone",
    slug: "jeans-wide-leg-stone",
    image: "jeans-wide-leg-stone.png",
    alt: "Jeans wide leg stone",
    name: "Jeans wide leg stone",
    productType: "jeans",
    isOnSale: true,
    description: "Jeans wide leg con lavaggio stone, vita regolare e linea morbida.",
    priceCents: 2490,
    compareAtPriceCents: 3990,
    variants: [
      ["38", "Stone", 2],
      ["40", "Stone", 2],
      ["42", "Stone", 1],
    ],
  }),
  createFallbackProduct({
    id: "jeans-slim-denim-scuro",
    slug: "jeans-slim-denim-scuro",
    image: "jeans-slim-denim-scuro.png",
    alt: "Jeans slim denim scuro",
    name: "Jeans slim denim scuro",
    productType: "jeans",
    description: "Jeans slim in denim scuro con taglio essenziale e facile da abbinare.",
    priceCents: 3290,
    variants: [
      ["38", "Denim scuro", 3],
      ["40", "Denim scuro", 3],
      ["42", "Denim scuro", 2],
    ],
  }),
  createFallbackProduct({
    id: "pantalone-palazzo-nero",
    slug: "pantalone-palazzo-nero",
    image: "pantalone-palazzo-nero.png",
    alt: "Pantalone palazzo nero",
    name: "Pantalone palazzo nero",
    productType: "pantaloni",
    isNewArrival: true,
    description: "Pantalone palazzo nero con gamba ampia, ideale per look giorno e sera.",
    priceCents: 3490,
    variants: [
      ["S", "Nero", 3],
      ["M", "Nero", 4],
      ["L", "Nero", 2],
    ],
  }),
  createFallbackProduct({
    id: "pantalone-tailleur-sabbia",
    slug: "pantalone-tailleur-sabbia",
    image: "pantalone-tailleur-sabbia.png",
    alt: "Pantalone tailleur sabbia",
    name: "Pantalone tailleur sabbia",
    productType: "pantaloni",
    isOnSale: true,
    description: "Pantalone stile tailleur color sabbia con piega frontale e vestibilita' elegante.",
    priceCents: 1990,
    compareAtPriceCents: 3490,
    variants: [
      ["S", "Sabbia", 2],
      ["M", "Sabbia", 2],
      ["L", "Sabbia", 1],
    ],
  }),
  createFallbackProduct({
    id: "pantalone-cargo-oliva",
    slug: "pantalone-cargo-oliva",
    image: "pantalone-cargo-oliva.png",
    alt: "Pantalone cargo oliva",
    name: "Pantalone cargo oliva",
    productType: "pantaloni",
    description: "Pantalone cargo color oliva con tasche applicate e fit rilassato.",
    priceCents: 2990,
    variants: [
      ["S", "Oliva", 3],
      ["M", "Oliva", 3],
      ["L", "Oliva", 2],
    ],
  }),
  createFallbackProduct({
    id: "shorts-denim-vita-alta",
    slug: "shorts-denim-vita-alta",
    image: "shorts-denim-vita-alta.png",
    alt: "Shorts denim vita alta",
    name: "Shorts denim vita alta",
    productType: "shorts",
    isNewArrival: true,
    description: "Shorts in denim a vita alta con fondo sfrangiato e linea essenziale.",
    priceCents: 2290,
    variants: [
      ["38", "Denim", 3],
      ["40", "Denim", 3],
      ["42", "Denim", 2],
    ],
  }),
  createFallbackProduct({
    id: "shorts-sartoriale-nero",
    slug: "shorts-sartoriale-nero",
    image: "shorts-sartoriale-nero.png",
    alt: "Shorts sartoriale nero",
    name: "Shorts sartoriale nero",
    productType: "shorts",
    isOnSale: true,
    description: "Shorts nero con pinces frontali e taglio sartoriale.",
    priceCents: 1490,
    compareAtPriceCents: 2490,
    variants: [
      ["S", "Nero", 2],
      ["M", "Nero", 2],
      ["L", "Nero", 1],
    ],
  }),
  createFallbackProduct({
    id: "shorts-lino-beige",
    slug: "shorts-lino-beige",
    image: "shorts-lino-beige.png",
    alt: "Shorts lino beige",
    name: "Shorts lino beige",
    productType: "shorts",
    description: "Shorts beige effetto lino con elastico in vita e vestibilita' leggera.",
    priceCents: 2190,
    variants: [
      ["S", "Beige", 3],
      ["M", "Beige", 3],
      ["L", "Beige", 2],
    ],
  }),
  createFallbackProduct({
    id: "vestito-midi-satin-verde",
    slug: "vestito-midi-satin-verde",
    image: "vestito-midi-satin-verde.png",
    alt: "Vestito midi satin verde",
    name: "Vestito midi satin verde",
    productType: "vestiti",
    isOnSale: true,
    description: "Vestito midi effetto satin verde con spallina sottile e linea morbida.",
    priceCents: 1990,
    compareAtPriceCents: 3490,
    variants: [
      ["S", "Verde", 2],
      ["M", "Verde", 2],
      ["L", "Verde", 1],
    ],
  }),
  createFallbackProduct({
    id: "maglia-righe-morbida",
    slug: "maglia-righe-morbida",
    image: "maglia-righe-morbida.png",
    alt: "Maglia righe morbida",
    name: "Maglia righe morbida",
    productType: "maglie",
    description: "Maglia a righe dalla vestibilita' morbida, pensata per look quotidiani.",
    priceCents: 1990,
    variants: [
      ["S", "Righe", 3],
      ["M", "Righe", 3],
      ["L", "Righe", 2],
    ],
  }),
  createFallbackProduct({
    id: "top-costine-bianco",
    slug: "top-costine-bianco",
    image: "top-costine-bianco.png",
    alt: "Top costine bianco",
    name: "Top costine bianco",
    productType: "maglie",
    description: "Top bianco a costine con linea aderente e tessuto elasticizzato.",
    priceCents: 1590,
    variants: [
      ["S", "Bianco", 3],
      ["M", "Bianco", 4],
      ["L", "Bianco", 2],
    ],
  }),
  createFallbackProduct({
    id: "borsa-tracolla-nera",
    slug: "borsa-tracolla-nera",
    image: "borsa-tracolla-nera.png",
    alt: "Borsa tracolla nera",
    name: "Borsa tracolla nera",
    productType: "borse",
    description: "Borsa nera compatta con tracolla regolabile e chiusura frontale.",
    priceCents: 2990,
    variants: [["Unica", "Nero", 4]],
  }),
  createFallbackProduct({
    id: "anello-cuore-acciaio",
    slug: "anello-cuore-acciaio",
    image: "anello-cuore-acciaio.png",
    alt: "Anello cuore acciaio",
    name: "Anello cuore acciaio",
    productType: "accessori",
    description: "Anello in acciaio con piccolo dettaglio cuore, taglia regolabile.",
    priceCents: 990,
    variants: [["Unica", "Acciaio", 6]],
  }),
  createFallbackProduct({
    id: "sciarpa-leggera-fantasia",
    slug: "sciarpa-leggera-fantasia",
    image: "sciarpa-leggera-fantasia.png",
    alt: "Sciarpa leggera fantasia",
    name: "Sciarpa leggera fantasia",
    productType: "accessori",
    description: "Sciarpa leggera con stampa fantasia, ideale per completare look di stagione.",
    priceCents: 1290,
    variants: [["Unica", "Fantasia", 5]],
  }),
];

function createFallbackProduct({
  id,
  slug,
  image,
  alt,
  name,
  categorySlug = "donna",
  categoryName = "Donna",
  productType,
  featured = true,
  isNewArrival = false,
  isOnSale = false,
  description,
  priceCents,
  compareAtPriceCents = null,
  badgeLabel = null,
  badgeTone = null,
  variants = [],
}) {
  const badge = badgeLabel ?? (isOnSale ? "Sale" : isNewArrival ? "Nuovo" : null);
  const normalizedVariants = variants.map(([size, color, stockQuantity]) => ({
    id: `${slug}-${slugifyValue(size)}-${slugifyValue(color)}`,
    sku: `RD-${slugifyValue(slug).toUpperCase()}-${slugifyValue(size).toUpperCase()}`,
    size,
    color,
    stockQuantity,
  }));

  return {
    id,
    slug,
    href: `/prodotti/${slug}`,
    image: `/assets/${image}`,
    alt,
    name,
    categorySlug,
    categoryName,
    productType,
    featured,
    isNewArrival,
    isOnSale,
    description,
    price: formatPrice(priceCents),
    oldPrice: compareAtPriceCents ? formatPrice(compareAtPriceCents) : null,
    priceCents,
    compareAtPriceCents,
    badge,
    badgeClass: badge
      ? getBadgeClass(badgeTone ?? (badge === "Sale" ? "red" : "blue"))
      : "",
    variants: normalizedVariants,
    sizes: uniqueValues(normalizedVariants.map((variant) => variant.size)),
    colors: uniqueValues(normalizedVariants.map((variant) => variant.color)),
    stockQuantity: normalizedVariants.reduce(
      (total, variant) => total + variant.stockQuantity,
      0,
    ),
  };
}

function slugifyValue(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const productSelect = `
  id,
  slug,
  name,
  short_description,
  description,
  product_type,
  price_cents,
  compare_at_price_cents,
  badge_label,
  badge_tone,
  featured,
  is_new_arrival,
  is_on_sale,
  sort_order,
  categories (
    slug,
    name
  ),
  product_images (
    url,
    alt,
    sort_order,
    is_primary
  ),
  product_variants (
    id,
    sku,
    size,
    color,
    stock_quantity
  )
`;

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publicKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !publicKey) {
    return null;
  }

  return createClient(url, publicKey, {
    auth: {
      persistSession: false,
    },
  });
}

export async function getFeaturedProducts() {
  const products = await getPublishedProducts({ featuredOnly: true, newArrivalOnly: true });
  return products.length > 0 ? products : fallbackProducts;
}

export async function getAllProducts() {
  const products = await getPublishedProducts();
  return products.length > 0 ? products : fallbackProducts;
}

export async function getProductsByCategory(categorySlug, productType = "") {
  const products = await getPublishedProducts({ categorySlug, productType });
  return products;
}

export async function getNewArrivalProducts() {
  const products = await getPublishedProducts({ newArrivalOnly: true });
  return products;
}

export async function getSaleProducts() {
  const products = await getPublishedProducts({ saleOnly: true });
  return products;
}

export async function getProductBySlug(slug) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return fallbackProducts.find((product) => product.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Supabase product fetch failed", error);
    return fallbackProducts.find((product) => product.slug === slug) ?? null;
  }

  return data
    ? normalizeProduct(data)
    : fallbackProducts.find((product) => product.slug === slug) ?? null;
}

async function getPublishedProducts({
  featuredOnly = false,
  newArrivalOnly = false,
  saleOnly = false,
  categorySlug = "",
  productType = "",
} = {}) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return filterFallbackProducts({
      featuredOnly,
      newArrivalOnly,
      saleOnly,
      categorySlug,
      productType,
    });
  }

  let query = supabase
    .from("products")
    .select(categorySlug ? productSelect.replace("categories (", "categories!inner (") : productSelect)
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (featuredOnly) {
    query = query.eq("featured", true);
  }

  if (newArrivalOnly) {
    query = query.eq("is_new_arrival", true);
  }

  if (saleOnly) {
    query = query.eq("is_on_sale", true);
  }

  if (categorySlug) {
    query = query.eq("categories.slug", categorySlug);
  }

  if (productType) {
    query = query.eq("product_type", productType);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Supabase catalog fetch failed", error);
    return filterFallbackProducts({
      featuredOnly,
      newArrivalOnly,
      saleOnly,
      categorySlug,
      productType,
    });
  }

  return mergeWithFallbackProducts(
    data.map(normalizeProduct),
    {
      featuredOnly,
      newArrivalOnly,
      saleOnly,
      categorySlug,
      productType,
    },
  );
}

function normalizeProduct(product) {
  const images = [...(product.product_images ?? [])].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1;
    if (!a.is_primary && b.is_primary) return 1;
    return (a.sort_order ?? 0) - (b.sort_order ?? 0);
  });
  const primaryImage = images[0];
  const variants = product.product_variants ?? [];
  const normalizedVariants = variants.map((variant) => ({
    id: variant.id,
    sku: variant.sku,
    size: variant.size,
    color: variant.color,
    stockQuantity: Number(variant.stock_quantity ?? 0),
  }));
  const sizes = uniqueValues(normalizedVariants.map((variant) => variant.size));
  const colors = uniqueValues(normalizedVariants.map((variant) => variant.color));
  const stockQuantity = normalizedVariants.reduce(
    (total, variant) => total + variant.stockQuantity,
    0,
  );
  const isNewArrival = Boolean(product.is_new_arrival);
  const isOnSale = Boolean(product.is_on_sale);
  const badge = product.badge_label ?? (isOnSale ? "Sale" : isNewArrival ? "Nuovo" : null);

  return {
    id: product.id,
    slug: product.slug,
    href: `/prodotti/${product.slug}`,
    image: primaryImage?.url ?? "/assets/rodeo-drive-official.jpg",
    alt: primaryImage?.alt ?? product.name,
    name: product.name,
    categorySlug: product.categories?.slug ?? "",
    categoryName: product.categories?.name ?? "",
    productType: product.product_type ?? "",
    featured: Boolean(product.featured),
    isNewArrival,
    isOnSale,
    description: product.description ?? product.short_description ?? "",
    price: formatPrice(product.price_cents),
    oldPrice: product.compare_at_price_cents
      ? formatPrice(product.compare_at_price_cents)
      : null,
    priceCents: product.price_cents,
    compareAtPriceCents: product.compare_at_price_cents,
    badge,
    badgeClass: getBadgeClass(
      product.badge_tone ?? (badge === "Sale" ? "red" : badge === "Nuovo" ? "blue" : ""),
    ),
    variants: normalizedVariants,
    sizes,
    colors,
    stockQuantity,
  };
}

function formatPrice(cents) {
  return new Intl.NumberFormat("it-IT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(cents ?? 0) / 100);
}

function uniqueValues(values) {
  return [...new Set(values.filter(Boolean))];
}

function getBadgeClass(tone) {
  if (tone === "red") {
    return "badge-red";
  }

  return "badge-blue";
}

function mergeWithFallbackProducts(products, filters) {
  const productSlugs = new Set(products.map((product) => product.slug));
  const missingMockupProducts = filterFallbackProducts(filters).filter(
    (product) => !productSlugs.has(product.slug),
  );

  return [...products, ...missingMockupProducts];
}

function filterFallbackProducts({
  featuredOnly = false,
  newArrivalOnly = false,
  saleOnly = false,
  categorySlug = "",
  productType = "",
} = {}) {
  return fallbackProducts.filter((product) => {
    if (featuredOnly && !product.featured) {
      return false;
    }

    if (newArrivalOnly && !product.isNewArrival) {
      return false;
    }

    if (saleOnly && !product.isOnSale) {
      return false;
    }

    if (categorySlug && product.categorySlug !== categorySlug) {
      return false;
    }

    if (productType && product.productType !== productType) {
      return false;
    }

    return true;
  });
}
