import Link from "next/link";
import ProductCard from "../components/ProductCard";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { getAllProducts } from "../../lib/catalog";

export const metadata = {
  title: "Prodotti | Rodeo Drive",
  description: "Catalogo prodotti Rodeo Drive.",
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <>
      <SiteHeader current="products" />
      <main className="catalog-page">
        <section className="products section-shell">
          <div className="section-heading heading-row">
            <h1>Prodotti</h1>
            <Link href="/">Torna alla home &rarr;</Link>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
