"use client";

import { useRef } from "react";
import ProductCard from "./ProductCard";

export default function RelatedProductsCarousel({ products }) {
  const trackRef = useRef(null);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="related-products section-shell" aria-labelledby="related-products-title">
      <div className="section-heading heading-row related-products-heading">
        <h2 id="related-products-title">Potrebbero piacerti anche</h2>
        <div className="carousel-controls" aria-label="Naviga prodotti consigliati">
          <button type="button" onClick={() => scrollCarousel(-1)} aria-label="Prodotti precedenti">
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_back
            </span>
          </button>
          <button type="button" onClick={() => scrollCarousel(1)} aria-label="Prodotti successivi">
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      <div className="related-products-track" ref={trackRef}>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );

  function scrollCarousel(direction) {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    track.scrollBy({
      left: direction * track.clientWidth * 0.82,
      behavior: "smooth",
    });
  }
}
