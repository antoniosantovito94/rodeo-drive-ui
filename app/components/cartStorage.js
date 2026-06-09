"use client";

const CART_STORAGE_KEY = "rodeo-drive-cart-v1";
const CART_CHANGE_EVENT = "rodeo-drive-cart-change";

export function readCartItems() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);
    return rawCart ? JSON.parse(rawCart) : [];
  } catch {
    return [];
  }
}

export function writeCartItems(items) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(CART_CHANGE_EVENT));
}

export function addCartItem(item) {
  const items = readCartItems();
  const existingIndex = items.findIndex((cartItem) => cartItem.key === item.key);

  if (existingIndex >= 0) {
    items[existingIndex] = {
      ...items[existingIndex],
      quantity: items[existingIndex].quantity + item.quantity,
    };
  } else {
    items.push(item);
  }

  writeCartItems(items);
}

export function updateCartItemQuantity(key, quantity) {
  const nextItems = readCartItems()
    .map((item) => (item.key === key ? { ...item, quantity } : item))
    .filter((item) => item.quantity > 0);

  writeCartItems(nextItems);
}

export function removeCartItem(key) {
  writeCartItems(readCartItems().filter((item) => item.key !== key));
}

export function getCartCount(items) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function subscribeToCartChanges(callback) {
  window.addEventListener(CART_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(CART_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
