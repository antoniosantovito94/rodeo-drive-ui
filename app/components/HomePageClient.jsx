"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

const markets = [
  ["Luned&igrave;", "Andria"],
  ["Marted&igrave;", "Bitonto"],
  ["Mercoled&igrave;", "Cerignola"],
  ["Gioved&igrave;", "Canosa"],
  ["Venerd&igrave;", "S. G. Rotondo"],
  ["Sabato", "Corato"],
];

export default function HomePageClient({ products }) {
  const [isProductGridExpanded, setIsProductGridExpanded] = useState(false);

  return (
    <>
      <SiteHeader current="products" />

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
            <Link href="/prodotti?selezione=nuovi-arrivi">Vedi tutti &rarr;</Link>
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

      <SiteFooter />
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
