import Link from "next/link";
import { notFound } from "next/navigation";
import ProductPurchaseForm from "../../components/ProductPurchaseForm";
import RelatedProductsCarousel from "../../components/RelatedProductsCarousel";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { getProductBySlug, getRelatedProducts } from "../../../lib/catalog";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dettaglio prodotto | Rodeo Drive",
  description: "Scheda prodotto Rodeo Drive.",
};

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product);

  return (
    <>
      <SiteHeader current="products" />
      <main className="product-detail-page">
        <section className="product-detail section-shell">
          <div className="product-detail-grid">
            <div className="product-detail-media">
              <img src={product.image} alt={product.alt} />
              {product.badge ? (
                <span className={`badge ${product.badgeClass}`}>{product.badge}</span>
              ) : null}
            </div>

            <div className="product-detail-info">
              <Link className="back-link" href="/prodotti">
                &larr; Catalogo
              </Link>
              <h1>{product.name}</h1>
              <p className="product-detail-price">
                &euro; {product.price}
                {product.oldPrice ? <span>&euro; {product.oldPrice}</span> : null}
              </p>
              <p>{product.description}</p>

              {product.sizes.length > 0 ? (
                <div className="product-option-group">
                  <span>Taglie</span>
                  <div>
                    {product.sizes.map((size) => (
                      <strong key={size}>{size}</strong>
                    ))}
                  </div>
                </div>
              ) : null}

              {product.colors.length > 0 ? (
                <div className="product-option-group">
                  <span>Colori</span>
                  <div>
                    {product.colors.map((color) => (
                      <strong key={color}>{color}</strong>
                    ))}
                  </div>
                </div>
              ) : null}

              <ProductPurchaseForm product={product} />
            </div>
          </div>
        </section>
        <RelatedProductsCarousel products={relatedProducts} />
      </main>
      <SiteFooter />
    </>
  );
}
