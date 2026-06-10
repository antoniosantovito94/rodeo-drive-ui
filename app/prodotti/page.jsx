import Link from "next/link";
import ProductCard from "../components/ProductCard";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { getAllProducts, getProductsByCategory } from "../../lib/catalog";

export const metadata = {
  title: "Prodotti | Rodeo Drive",
  description: "Catalogo prodotti Rodeo Drive.",
};

const categoryLabels = {
  donna: "Donna",
  uomo: "Uomo",
};

const typeFilters = [
  { label: "Tutto", value: "" },
  { label: "Jeans", value: "jeans" },
  { label: "Vestiti", value: "vestiti" },
  { label: "Maglie", value: "maglie" },
  { label: "Borse", value: "borse" },
];

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const categorySlug = normalizeCategory(params?.categoria);
  const productType = normalizeProductType(params?.tipo);
  const products = categorySlug
    ? await getProductsByCategory(categorySlug, productType)
    : await getAllProducts();
  const title = categorySlug ? categoryLabels[categorySlug] : "Prodotti";

  return (
    <>
      <SiteHeader current="products" />
      <main className="catalog-page">
        <section className="products section-shell">
          <div className="section-heading heading-row">
            <h1>{title}</h1>
            <Link href={categorySlug ? "/prodotti" : "/"}>
              {categorySlug ? "Tutti i prodotti" : "Torna alla home"} &rarr;
            </Link>
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

function normalizeProductType(type) {
  const value = Array.isArray(type) ? type[0] : type;
  const validTypes = typeFilters.map((filter) => filter.value).filter(Boolean);

  return validTypes.includes(value) ? value : "";
}
