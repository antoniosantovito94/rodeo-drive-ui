import Link from "next/link";
import ProductCard from "../components/ProductCard";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import {
  getAllProducts,
  getNewArrivalProducts,
  getProductsByCategory,
  getSaleProducts,
} from "../../lib/catalog";

export const metadata = {
  title: "Catalogo | Rodeo Drive",
  description: "Catalogo prodotti Rodeo Drive.",
};

const categoryLabels = {
  donna: "Donna",
  uomo: "Uomo",
};

const typeFiltersByCategory = {
  donna: [
    { label: "Tutto", value: "" },
    { label: "Jeans", value: "jeans" },
    { label: "Pantaloni", value: "pantaloni" },
    { label: "Shorts", value: "shorts" },
    { label: "Vestiti", value: "vestiti" },
    { label: "Maglie", value: "maglie" },
    { label: "Borse", value: "borse" },
    { label: "Accessori", value: "accessori" },
  ],
  uomo: [
    { label: "Tutto", value: "" },
    { label: "Jeans", value: "jeans" },
    { label: "Pantaloni", value: "pantaloni" },
    { label: "Maglie", value: "maglie" },
    { label: "Camicie", value: "camicie" },
    { label: "Accessori", value: "accessori" },
  ],
};

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const categorySlug = normalizeCategory(params?.categoria);
  const selection = normalizeSelection(params?.selezione);
  const typeFilters = typeFiltersByCategory[categorySlug] ?? [];
  const productType = normalizeProductType(params?.tipo, typeFilters);
  const products = await getProducts({ categorySlug, productType, selection });
  const title = getPageTitle({ categorySlug, selection });
  const headingLink = getHeadingLink({ categorySlug, selection });

  return (
    <>
      <SiteHeader current="products" />
      <main className="catalog-page">
        <section className="products section-shell">
          <div className="section-heading heading-row">
            <h1>{title}</h1>
            {headingLink ? (
              <Link href={headingLink.href}>
                {headingLink.label} &rarr;
              </Link>
            ) : null}
          </div>

          {categorySlug ? (
            <nav className="catalog-filter" aria-label="Filtra per tipo capo">
              {typeFilters.map((filter) => {
                const href = filter.value
                  ? `/prodotti?categoria=${categorySlug}&tipo=${filter.value}`
                  : `/prodotti?categoria=${categorySlug}`;

                return (
                  <Link
                    className={filter.value === productType ? "is-active" : ""}
                    href={href}
                    key={filter.label}
                    aria-current={filter.value === productType ? "page" : undefined}
                  >
                    {filter.label}
                  </Link>
                );
              })}
            </nav>
          ) : null}

          {products.length > 0 ? (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          ) : (
            <div className="catalog-empty">
              <h2>Nessun capo disponibile</h2>
              <p>Questa selezione sara' aggiornata appena carichiamo nuovi prodotti.</p>
              <Link className="button button-outline" href="/prodotti">
                Vedi tutto
              </Link>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function normalizeCategory(category) {
  const value = Array.isArray(category) ? category[0] : category;

  if (value === "donna" || value === "uomo") {
    return value;
  }

  return "";
}

function normalizeProductType(type, typeFilters) {
  const value = Array.isArray(type) ? type[0] : type;
  const validTypes = typeFilters.map((filter) => filter.value).filter(Boolean);

  return validTypes.includes(value) ? value : "";
}

function normalizeSelection(selection) {
  const value = Array.isArray(selection) ? selection[0] : selection;
  return value === "nuovi-arrivi" || value === "sale" ? value : "";
}

function getPageTitle({ categorySlug, selection }) {
  if (selection === "nuovi-arrivi") {
    return "Nuovi arrivi";
  }

  if (selection === "sale") {
    return "Sale";
  }

  return categorySlug ? categoryLabels[categorySlug] : "Catalogo";
}

function getHeadingLink({ categorySlug, selection }) {
  if (categorySlug) {
    return null;
  }

  if (selection) {
    return {
      href: "/prodotti",
      label: "Tutto il catalogo",
    };
  }

  return {
    href: "/",
    label: "Torna alla home",
  };
}

async function getProducts({ categorySlug, productType, selection }) {
  if (selection === "nuovi-arrivi") {
    return getNewArrivalProducts();
  }

  if (selection === "sale") {
    return getSaleProducts();
  }

  if (categorySlug) {
    return getProductsByCategory(categorySlug, productType);
  }

  return getAllProducts();
}
