import { createClient } from "@supabase/supabase-js";

const fallbackProducts = [
  {
    id: "vestito-lungo",
    slug: "vestito-cotone-rosso",
    href: "/prodotti/vestito-cotone-rosso",
    image: "/assets/vestito_lungo.png",
    alt: "Vestito lungo",
    name: "Vestito cotone rosso",
    categorySlug: "donna",
    description: "Vestito in cotone rosso dalla linea essenziale.",
    price: "29,90",
    priceCents: 2990,
    badge: "Nuovo",
    badgeClass: "badge-blue",
    variants: [
      {
        id: "vestito-cotone-rosso-s-rosso",
        sku: "RD-VCR-S-ROSSO",
        size: "S",
        color: "Rosso",
        stockQuantity: 3,
      },
      {
        id: "vestito-cotone-rosso-m-rosso",
        sku: "RD-VCR-M-ROSSO",
        size: "M",
        color: "Rosso",
        stockQuantity: 3,
      },
      {
        id: "vestito-cotone-rosso-l-rosso",
        sku: "RD-VCR-L-ROSSO",
        size: "L",
        color: "Rosso",
        stockQuantity: 2,
      },
    ],
    sizes: ["S", "M", "L"],
    colors: ["Rosso"],
    stockQuantity: null,
  },
  {
    id: "vestito-fiore",
    slug: "vestito-fiore-paris",
    href: "/prodotti/vestito-fiore-paris",
    image: "/assets/vestito_fiore.png",
    alt: "Vestito Fiore Paris",
    name: "Vestito Fiore Paris",
    categorySlug: "donna",
    description: "Vestito fantasia floreale con taglio leggero.",
    price: "29,90",
    oldPrice: "39,90",
    priceCents: 2990,
    compareAtPriceCents: 3990,
    variants: [
      {
        id: "vestito-fiore-paris-s-fiore",
        sku: "RD-VFP-S-FIORE",
        size: "S",
        color: "Fiore",
        stockQuantity: 2,
      },
      {
        id: "vestito-fiore-paris-m-fiore",
        sku: "RD-VFP-M-FIORE",
        size: "M",
        color: "Fiore",
        stockQuantity: 3,
      },
    ],
    sizes: ["S", "M"],
    colors: ["Fiore"],
    stockQuantity: null,
  },
  {
    id: "corpetto",
    slug: "corpetto-linea-paris",
    href: "/prodotti/corpetto-linea-paris",
    image: "/assets/corpetto.png",
    alt: "Corpetto",
    name: "Corpetto Linea Paris",
    categorySlug: "donna",
    description: "Corpetto linea Paris in saldo.",
    price: "19,90",
    oldPrice: "9,90",
    priceCents: 1990,
    compareAtPriceCents: 990,
    badge: "Sale",
    badgeClass: "badge-red",
    variants: [
      {
        id: "corpetto-linea-paris-s-nero",
        sku: "RD-CLP-S-NERO",
        size: "S",
        color: "Nero",
        stockQuantity: 2,
      },
      {
        id: "corpetto-linea-paris-m-nero",
        sku: "RD-CLP-M-NERO",
        size: "M",
        color: "Nero",
        stockQuantity: 2,
      },
    ],
    sizes: ["S", "M"],
    colors: ["Nero"],
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
  const products = await getPublishedProducts({ featuredOnly: true });
  return products.length > 0 ? products : fallbackProducts;
}

export async function getAllProducts() {
  const products = await getPublishedProducts();
  return products.length > 0 ? products : fallbackProducts;
}

export async function getProductsByCategory(categorySlug) {
  const products = await getPublishedProducts({ categorySlug });
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

  return data ? normalizeProduct(data) : null;
}

async function getPublishedProducts({ featuredOnly = false, categorySlug = "" } = {}) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return filterFallbackProducts({ featuredOnly, categorySlug });
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

  if (categorySlug) {
    query = query.eq("categories.slug", categorySlug);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Supabase catalog fetch failed", error);
    return filterFallbackProducts({ featuredOnly, categorySlug });
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

  return {
    id: product.id,
    slug: product.slug,
    href: `/prodotti/${product.slug}`,
    image: primaryImage?.url ?? "/assets/rodeo-drive-official.jpg",
    alt: primaryImage?.alt ?? product.name,
    name: product.name,
    categorySlug: product.categories?.slug ?? "",
    categoryName: product.categories?.name ?? "",
    description: product.description ?? product.short_description ?? "",
    price: formatPrice(product.price_cents),
    oldPrice: product.compare_at_price_cents
      ? formatPrice(product.compare_at_price_cents)
      : null,
    priceCents: product.price_cents,
    compareAtPriceCents: product.compare_at_price_cents,
    badge: product.badge_label,
    badgeClass: getBadgeClass(product.badge_tone),
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

function filterFallbackProducts({ featuredOnly = false, categorySlug = "" } = {}) {
  return fallbackProducts.filter((product) => {
    if (featuredOnly && product.featured === false) {
      return false;
    }

    if (categorySlug && product.categorySlug !== categorySlug) {
      return false;
    }

    return true;
  });
}
