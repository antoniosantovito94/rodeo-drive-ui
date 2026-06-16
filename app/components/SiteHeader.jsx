"use client";

import { useState } from "react";
import Link from "next/link";
import CartIconLink from "./CartIconLink";
import WishlistIconLink from "./WishlistIconLink";

export default function SiteHeader({ current = "" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Navigazione principale">
        <button
          className="mobile-menu"
          type="button"
          aria-label="Apri menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsMenuOpen((value) => !value)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="nav-links nav-left">
          <Link href="/prodotti?categoria=donna">Donna</Link>
          <Link href="/prodotti?categoria=uomo">Uomo</Link>
          <Link href="/#nuovi-arrivi" aria-current={current === "products" ? "page" : undefined}>
            Nuovi arrivi
          </Link>
          <Link href="/#sale">Sale</Link>
        </div>

        <Link className="brand-mark nav-brand" href="/" aria-label="Michele Evangelista home">
          <img src="/assets/michele-evangelista-logo-light.svg" alt="Michele Evangelista" />
        </Link>

        <div className="nav-actions" aria-label="Azioni">
          <WishlistIconLink />
          <CartIconLink />
          <Link className="desktop-only" href="/#account" aria-label="Account">
            Me
          </Link>
        </div>
      </nav>

      <div
        className={`mobile-nav${isMenuOpen ? " is-open" : ""}`}
        id="mobile-nav"
        aria-hidden={!isMenuOpen}
      >
        <Link href="/prodotti?categoria=donna" onClick={closeMenu}>
          Donna
        </Link>
        <Link href="/prodotti?categoria=uomo" onClick={closeMenu}>
          Uomo
        </Link>
        <Link href="/#nuovi-arrivi" onClick={closeMenu}>
          Nuovi arrivi
        </Link>
        <Link href="/#sale" onClick={closeMenu}>
          Sale
        </Link>
        <Link href="/#mercati" onClick={closeMenu}>
          Dove siamo
        </Link>
        <Link href="/#contatti" onClick={closeMenu}>
          Contatti
        </Link>
        <Link href="/prodotti" onClick={closeMenu}>
          Catalogo
        </Link>
        <Link href="/carrello" onClick={closeMenu}>
          Carrello
        </Link>
        <Link href="/wishlist" onClick={closeMenu}>
          Wishlist
        </Link>
      </div>
    </header>
  );
}
