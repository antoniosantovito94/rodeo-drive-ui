"use client";

import { useEffect, useState } from "react";
import { isWishlistItem, toggleWishlistItem } from "./wishlistStorage";

export default function WishlistButton({ product }) {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(isWishlistItem(product.id));
  }, [product.id]);

  return (
    <button
      className={`wishlist-button${isSelected ? " is-selected" : ""}`}
      type="button"
      aria-label={isSelected ? "Rimuovi dalla wishlist" : "Aggiungi alla wishlist"}
      aria-pressed={isSelected}
      onClick={() => setIsSelected(toggleWishlistItem(product))}
    >
      <span className="material-symbols-outlined" aria-hidden="true">
        favorite
      </span>
    </button>
  );
}
