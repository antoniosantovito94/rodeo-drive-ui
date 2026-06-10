"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { addCartItem, getCartCount, readCartItems } from "./cartStorage";

export default function ProductPurchaseForm({ product }) {
  const firstVariant = product.variants[0] ?? null;
  const [selectedVariantId, setSelectedVariantId] = useState(firstVariant?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [cartPreviewItems, setCartPreviewItems] = useState([]);
  const [isCartPreviewOpen, setIsCartPreviewOpen] = useState(false);

  const selectedVariant = useMemo(
    () => product.variants.find((variant) => variant.id === selectedVariantId) ?? firstVariant,
    [firstVariant, product.variants, selectedVariantId],
  );
  const maxQuantity = selectedVariant?.stockQuantity ?? 99;
  const canAdd = !selectedVariant || maxQuantity > 0;

  return (
    <div className="purchase-panel">
      {product.variants.length > 0 ? (
        <div className="product-option-group">
          <span>Variante</span>
          <div className="variant-choice-grid">
            {product.variants.map((variant) => (
              <button
                className={variant.id === selectedVariantId ? "is-selected" : ""}
                type="button"
                key={variant.id}
                onClick={() => {
                  setSelectedVariantId(variant.id);
                  setQuantity(1);
                  setIsCartPreviewOpen(false);
                }}
                disabled={variant.stockQuantity <= 0}
              >
                {variant.size ? <strong>{variant.size}</strong> : null}
                {variant.color ? <span>{variant.color}</span> : null}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <label className="quantity-control">
        <span>Quantita'</span>
        <input
          min="1"
          max={maxQuantity}
          type="number"
          value={quantity}
          onChange={(event) => {
            const nextValue = Number(event.target.value);
            setQuantity(Math.min(Math.max(nextValue, 1), maxQuantity));
            setIsCartPreviewOpen(false);
          }}
        />
      </label>

      <button className="button button-dark" type="button" onClick={handleAddToCart} disabled={!canAdd}>
        Aggiungi al carrello
      </button>

      <CartAddedSheet
        isOpen={isCartPreviewOpen}
        items={cartPreviewItems}
        onClose={() => setIsCartPreviewOpen(false)}
      />
    </div>
  );

  function handleAddToCart() {
    const variantKey = selectedVariant?.id ?? "default";

    addCartItem({
      key: `${product.id}:${variantKey}`,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      alt: product.alt,
      priceCents: product.priceCents,
      price: product.price,
      quantity,
      variant: selectedVariant
        ? {
            id: selectedVariant.id,
            sku: selectedVariant.sku,
            size: selectedVariant.size,
            color: selectedVariant.color,
            stockQuantity: selectedVariant.stockQuantity,
          }
        : null,
    });

    setCartPreviewItems(readCartItems());
    setIsCartPreviewOpen(true);
  }
}

function CartAddedSheet({ isOpen, items, onClose }) {
  const itemCount = getCartCount(items);
  const subtotalCents = items.reduce(
    (total, item) => total + item.priceCents * item.quantity,
    0,
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div className="cart-sheet-backdrop" role="presentation" onClick={onClose}>
      <section
        className="cart-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Riepilogo carrello"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cart-sheet-header">
          <h2>
            Carrello <span>({itemCount})</span>
          </h2>
          <button type="button" onClick={onClose} aria-label="Chiudi riepilogo carrello">
            &times;
          </button>
        </div>

        <div className="cart-sheet-notice">Prodotto aggiunto al carrello.</div>

        <div className="cart-sheet-note">
          <span className="material-symbols-outlined" aria-hidden="true">
            receipt_long
          </span>
          <strong>Nota sull'ordine</strong>
        </div>

        <div className="cart-sheet-totals">
          <div>
            <span>Totale parziale</span>
            <strong>&euro; {formatPrice(subtotalCents)}</strong>
          </div>
          <div>
            <span>Totale:</span>
            <strong>&euro; {formatPrice(subtotalCents)}</strong>
          </div>
        </div>

        <Link className="cart-sheet-action" href="/carrello">
          Visualizza carrello
        </Link>

        <p>Tasse e spese di spedizione calcolate al checkout.</p>
      </section>
    </div>
  );
}

function formatPrice(cents) {
  return new Intl.NumberFormat("it-IT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}
