import { createClient } from "@supabase/supabase-js";

const fallbackProducts = [
  {
    id: "vestito-lungo",
    slug: "vestito-cotone-rosso",
    href: "/prodotti/vestito-cotone-rosso",
    image: "/assets/vestito_lungo.png",
    alt: "Vestito lungo",
    name: "Vestito cotone rosso",
    description: "Vestito in cotone rosso dalla linea essenziale.",
    price: "29,90",
    priceCents: 2990,
    badge: "Nuovo",
    badgeClass: "badge-blue",
    sizes: [],
    colors: [],
    stockQuantity: null,
  },
  {
    id: "vestito-fiore",
    slug: "vestito-fiore-paris",
    href: "/prodotti/vestito-fiore-paris",
    image: "/assets/vestito_fiore.png",
    alt: "Vestito Fiore Paris",
    name: "Vestito Fiore Paris",
    description: "Vestito fantasia floreale con taglio leggero.",
    price: "29,90",
    oldPrice: "39,90",
    priceCents: 2990,
    compareAtPriceCents: 3990,
    sizes: [],
    colors: [],
    stockQuantity: null,
  },
  {
    id: "corpetto",
    slug: "corpetto-linea-paris",
    href: "/prodotti/corpetto-linea-paris",
    image: "/assets/corpetto.png",
    alt: "Corpetto",
    name: "Corpetto Linea Paris",
    description: "Corpetto linea Paris in saldo.",
    price: "19,90",
    oldPrice: "9,90",
    priceCents: 1990,
    compareAtPriceCents: 990,
    badge: "Sale",
    badgeClass: "badge-red",
    sizes: [],
    colors: [],
    stockQuantity: null,
  },
];

const productSelect = `
  id,
  slug,
  name,
  short_description,
  description,
  price_cents,
  compare_at_price_cents,
  badge_label,
  badge_tone,
  featured,
  sort_order,
  product_images (
    url,
    alt,
    sort_order,
    is_primary
  ),
  product_variants (
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
  const products = await getPublishedProducts({ featuredOnly: true });
  return products.length > 0 ? products : fallbackProducts;
}

export async function getAllProducts() {
  const products = await getPublishedProducts();
  return products.length > 0 ? products : fallbackProducts;
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

  return data ? normalizeProduct(data) : null;
}

async function getPublishedProducts({ featuredOnly = false } = {}) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return fallbackProducts;
  }

  let query = supabase
    .from("products")
    .select(productSelect)
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (featuredOnly) {
    query = query.eq("featured", true);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Supabase catalog fetch failed", error);
    return fallbackProducts;
  }

  return data.map(normalizeProduct);
}

function normalizeProduct(product) {
  const images = [...(product.product_images ?? [])].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1;
    if (!a.is_primary && b.is_primary) return 1;
    return (a.sort_order ?? 0) - (b.sort_order ?? 0);
  });
  const primaryImage = images[0];
  const variants = product.product_variants ?? [];
  const sizes = uniqueValues(variants.map((variant) => variant.size));
  const colors = uniqueValues(variants.map((variant) => variant.color));
  const stockQuantity = variants.reduce(
    (total, variant) => total + Number(variant.stock_quantity ?? 0),
    0,
  );

  return {
    id: product.id,
    slug: product.slug,
    href: `/prodotti/${product.slug}`,
    image: primaryImage?.url ?? "/assets/rodeo-drive-official.jpg",
    alt: primaryImage?.alt ?? product.name,
    name: product.name,
    description: product.description ?? product.short_description ?? "",
    price: formatPrice(product.price_cents),
    oldPrice: product.compare_at_price_cents
      ? formatPrice(product.compare_at_price_cents)
      : null,
    priceCents: product.price_cents,
    compareAtPriceCents: product.compare_at_price_cents,
    badge: product.badge_label,
    badgeClass: getBadgeClass(product.badge_tone),
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
