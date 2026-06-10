"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getWishlistCount,
  readWishlistItems,
  subscribeToWishlistChanges,
} from "./wishlistStorage";

export default function WishlistIconLink() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const syncCount = () => setCount(getWishlistCount(readWishlistItems()));
    syncCount();
    return subscribeToWishlistChanges(syncCount);
  }, []);

  return (
    <Link className="nav-icon-link wishlist-icon-link" href="/wishlist" aria-label="Wishlist">
      <span className="material-symbols-outlined" aria-hidden="true">
        favorite
      </span>
      {count > 0 ? <strong>{count}</strong> : null}
    </Link>
  );
}
