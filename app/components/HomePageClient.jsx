"use client";

import { useState } from "react";
import Link from "next/link";
import CartIconLink from "./CartIconLink";
import ProductCard from "./ProductCard";

const markets = [
  ["Luned&igrave;", "Andria"],
  ["Marted&igrave;", "Bitonto"],
  ["Mercoled&igrave;", "Cerignola"],
  ["Gioved&igrave;", "Canosa"],
  ["Venerd&igrave;", "S. G. Rotondo"],
  ["Sabato", "Corato"],
];

export default function HomePageClient({ products }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductGridExpanded, setIsProductGridExpanded] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
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
            <a href="#donna">Donna</a>
            <a href="#uomo">Uomo</a>
            <a href="#nuovi-arrivi" aria-current="page">
              Nuovi arrivi
            </a>
            <a href="#sale">Sale</a>
          </div>

          <Link className="brand-mark nav-brand" href="/" aria-label="Rodeo Drive home">
            <img src="/assets/rodeo-drive-logo.svg" alt="Rodeo Drive" />
          </Link>

          <div className="nav-actions" aria-label="Azioni">
            <a className="nav-icon-link" href="#wishlist" aria-label="Wishlist">
              <span className="material-symbols-outlined" aria-hidden="true">
                favorite
              </span>
            </a>
            <CartIconLink />
            <a className="desktop-only" href="#account" aria-label="Account">
              Me
            </a>
          </div>
        </nav>

        <div
          className={`mobile-nav${isMenuOpen ? " is-open" : ""}`}
          id="mobile-nav"
          aria-hidden={!isMenuOpen}
        >
          <a href="#donna" onClick={closeMenu}>
            Donna
          </a>
          <a href="#uomo" onClick={closeMenu}>
            Uomo
          </a>
          <a href="#nuovi-arrivi" onClick={closeMenu}>
            Nuovi arrivi
          </a>
          <a href="#sale" onClick={closeMenu}>
            Sale
          </a>
          <a href="#mercati" onClick={closeMenu}>
            Dove siamo
          </a>
          <a href="#contatti" onClick={closeMenu}>
            Contatti
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="shape shape-red" aria-hidden="true"></div>
          <div className="shape shape-green" aria-hidden="true"></div>

          <div className="hero-card">
            <div className="hero-logo">
              <img src="/assets/rodeo-drive-official.jpg" alt="Rodeo Drive di Vito Attimonelli" />
            </div>
            <p className="eyebrow">Nuova collezione - Estate 2026</p>
            <h1>
              Stile senza <span>compromessi</span>
            </h1>
            <p className="hero-copy">Abbigliamento donna &amp; uomo</p>
            <a className="button button-dark" href="#nuovi-arrivi">
              Scopri la collezione
            </a>
          </div>
        </section>

        <section className="trust-bar" aria-label="Servizi">
          <TrustItem icon="local_shipping" label="Spedizione Rapida" />
          <TrustItem icon="lock" label="Pagamento sicuro" />
          <TrustItem icon="currency_exchange" label="Reso semplice" />
        </section>

        <section className="story-intro" aria-labelledby="story-intro-title">
          <div className="story-intro-card">
            <h2 id="story-intro-title">6 mercati, una passione, ora anche online.</h2>
            <p>
              Da Andria a San Giovanni Rotondo, ogni settimana portiamo moda e
              qualit&agrave; in tutta la provincia. Ora puoi avere i nostri capi
              direttamente a casa tua, ovunque tu sia.
            </p>
          </div>
        </section>

        <section className="markets section-shell" id="mercati">
          <div className="section-heading">
            <h2>Dove ci trovi ogni settimana</h2>
          </div>
          <div className="market-grid">
            {markets.map(([day, city]) => (
              <article className="market-card" key={city}>
                <span dangerouslySetInnerHTML={{ __html: day }} />
                <h3>{city}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="products section-shell" id="nuovi-arrivi">
          <div className="section-heading heading-row">
            <h2>Nuovi arrivi</h2>
            <Link href="/prodotti">Vedi tutti &rarr;</Link>
          </div>

          <div className={`product-grid${isProductGridExpanded ? " is-expanded" : ""}`}>
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>

          {!isProductGridExpanded && products.length > 2 ? (
            <button
              className="button button-outline mobile-load"
              type="button"
              onClick={() => setIsProductGridExpanded(true)}
            >
              Carica altri
            </button>
          ) : null}
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-shell">
          <Link className="brand-mark footer-brand" href="/" aria-label="Rodeo Drive home">
            <span>Rodeo Drive</span>
          </Link>
          <p>&copy; 2026 Rodeo Drive. Tutti i diritti riservati.</p>
          <nav aria-label="Link footer">
            <a href="#privacy">Privacy Policy</a>
            <a href="#termini">Termini e Condizioni</a>
            <a href="#spedizioni">Spedizioni</a>
            <a href="#resi">Resi</a>
            <a href="#contatti">Contatti</a>
          </nav>
        </div>
      </footer>
    </>
  );
}

function TrustItem({ icon, label }) {
  return (
    <div className="trust-item">
      <span className="material-symbols-outlined trust-icon" aria-hidden="true">
        {icon}
      </span>
      <span>{label}</span>
    </div>
  );
}
