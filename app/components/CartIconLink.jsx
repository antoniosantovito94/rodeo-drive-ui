"use client";

import { useEffect, useState } from "react";
import { getCartCount, readCartItems, subscribeToCartChanges } from "./cartStorage";

export default function CartIconLink() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const syncCount = () => setCount(getCartCount(readCartItems()));
    syncCount();
    return subscribeToCartChanges(syncCount);
  }, []);

  return (
    <a className="nav-icon-link cart-icon-link" href="/carrello" aria-label="Carrello">
      <span className="material-symbols-outlined" aria-hidden="true">
        shopping_bag
      </span>
      {count > 0 ? <strong>{count}</strong> : null}
    </a>
  );
}
