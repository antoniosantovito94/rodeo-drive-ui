"use client";

import { useMemo, useState } from "react";
import { addCartItem } from "./cartStorage";

export default function ProductPurchaseForm({ product }) {
  const firstVariant = product.variants[0] ?? null;
  const [selectedVariantId, setSelectedVariantId] = useState(firstVariant?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const selectedVariant = useMemo(
    () => product.variants.find((variant) => variant.id === selectedVariantId) ?? firstVariant,
    [firstVariant, product.variants, selectedVariantId],
  );
  const maxQuantity = selectedVariant?.stockQuantity ?? 99;
  const canAdd = !selectedVariant || maxQuantity > 0;

  const handleAddToCart = () => {
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

    setMessage("Aggiunto al carrello");
  };

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
                  setMessage("");
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
            setMessage("");
          }}
        />
      </label>

      <button className="button button-dark" type="button" onClick={handleAddToCart} disabled={!canAdd}>
        Aggiungi al carrello
      </button>

      {message ? <p className="cart-feedback">{message}</p> : null}
    </div>
  );
}
