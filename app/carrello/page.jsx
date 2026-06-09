import Link from "next/link";

export const metadata = {
  title: "Carrello | Rodeo Drive",
  description: "Carrello Rodeo Drive.",
};

export default function CartPage() {
  return (
    <main className="placeholder-page">
      <section className="placeholder-shell">
        <p className="eyebrow">Carrello</p>
        <h1>Il tuo carrello</h1>
        <p>
          Il carrello persistente verra' implementato dopo il catalogo prodotti.
        </p>
        <Link className="button button-outline" href="/">
          Continua lo shopping
        </Link>
      </section>
    </main>
  );
}
