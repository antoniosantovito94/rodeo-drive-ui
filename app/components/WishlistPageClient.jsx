"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import {
  readWishlistItems,
  removeWishlistItem,
  subscribeToWishlistChanges,
} from "./wishlistStorage";

export default function WishlistPageClient() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const syncItems = () => setItems(readWishlistItems());
    syncItems();
    return subscribeToWishlistChanges(syncItems);
  }, []);

  if (items.length === 0) {
    return (
      <main className="placeholder-page">
        <section className="placeholder-shell">
          <p className="eyebrow">Wishlist</p>
          <h1>La tua wishlist</h1>
          <p>Non hai ancora salvato capi.</p>
          <Link className="button button-outline" href="/prodotti">
            Scopri i prodotti
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="wishlist-page">
      <section className="products section-shell">
        <div className="section-heading heading-row">
          <h1>Wishlist</h1>
          <Link href="/prodotti">Continua &rarr;</Link>
        </div>

        <div className="product-grid">
          {items.map((product) => (
            <div className="wishlist-card-shell" key={product.id}>
              <ProductCard product={product} />
              <button type="button" onClick={() => removeWishlistItem(product.id)}>
                Rimuovi
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
