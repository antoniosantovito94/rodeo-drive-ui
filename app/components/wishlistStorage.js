"use client";

const WISHLIST_STORAGE_KEY = "rodeo-drive-wishlist-v1";
const WISHLIST_CHANGE_EVENT = "rodeo-drive-wishlist-change";

export function readWishlistItems() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawWishlist = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    return rawWishlist ? JSON.parse(rawWishlist) : [];
  } catch {
    return [];
  }
}

export function writeWishlistItems(items) {
  window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(WISHLIST_CHANGE_EVENT));
}

export function isWishlistItem(productId) {
  return readWishlistItems().some((item) => item.id === productId);
}

export function toggleWishlistItem(product) {
  const items = readWishlistItems();
  const exists = items.some((item) => item.id === product.id);

  if (exists) {
    writeWishlistItems(items.filter((item) => item.id !== product.id));
    return false;
  }

  writeWishlistItems([
    ...items,
    {
      id: product.id,
      slug: product.slug,
      href: product.href,
      image: product.image,
      alt: product.alt,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice ?? null,
    },
  ]);

  return true;
}

export function removeWishlistItem(productId) {
  writeWishlistItems(readWishlistItems().filter((item) => item.id !== productId));
}

export function getWishlistCount(items) {
  return items.length;
}

export function subscribeToWishlistChanges(callback) {
  window.addEventListener(WISHLIST_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(WISHLIST_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
