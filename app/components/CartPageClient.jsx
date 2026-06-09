"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  readCartItems,
  removeCartItem,
  subscribeToCartChanges,
  updateCartItemQuantity,
} from "./cartStorage";

export default function CartPageClient() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const syncItems = () => setItems(readCartItems());
    syncItems();
    return subscribeToCartChanges(syncItems);
  }, []);

  const totalCents = useMemo(
    () => items.reduce((total, item) => total + item.priceCents * item.quantity, 0),
    [items],
  );

  if (items.length === 0) {
    return (
      <main className="placeholder-page">
        <section className="placeholder-shell">
          <p className="eyebrow">Carrello</p>
          <h1>Il tuo carrello</h1>
          <p>Il carrello e' vuoto.</p>
          <Link className="button button-outline" href="/prodotti">
            Continua lo shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <section className="cart-shell section-shell">
        <div className="section-heading heading-row">
          <h1>Carrello</h1>
          <Link href="/prodotti">Continua &rarr;</Link>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <article className="cart-item" key={item.key}>
                <img src={item.image} alt={item.alt} />
                <div>
                  <h2>{item.name}</h2>
                  {item.variant ? (
                    <p>
                      {item.variant.size ? `Taglia ${item.variant.size}` : ""}
                      {item.variant.size && item.variant.color ? " / " : ""}
                      {item.variant.color ?? ""}
                    </p>
                  ) : null}
                  <strong>&euro; {item.price}</strong>
                </div>
                <input
                  min="1"
                  max={item.variant?.stockQuantity ?? 99}
                  type="number"
                  value={item.quantity}
                  onChange={(event) =>
                    updateCartItemQuantity(item.key, Number(event.target.value))
                  }
                  aria-label={`Quantita' ${item.name}`}
                />
                <button type="button" onClick={() => removeCartItem(item.key)}>
                  Rimuovi
                </button>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Totale</h2>
            <p>&euro; {formatPrice(totalCents)}</p>
            <button className="button button-dark" type="button" disabled>
              Vai al checkout
            </button>
          </aside>
        </div>
      </section>
    </main>
  );
}

function formatPrice(cents) {
  return new Intl.NumberFormat("it-IT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}
