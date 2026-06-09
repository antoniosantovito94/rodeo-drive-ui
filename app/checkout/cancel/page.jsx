import Link from "next/link";

export const metadata = {
  title: "Checkout annullato | Rodeo Drive",
  description: "Pagamento annullato.",
};

export default function CheckoutCancelPage() {
  return (
    <main className="placeholder-page">
      <section className="placeholder-shell">
        <p className="eyebrow">Checkout</p>
        <h1>Checkout annullato</h1>
        <p>
          Il pagamento non e' stato completato. Potrai tornare al carrello e
          riprovare.
        </p>
        <Link className="button button-outline" href="/carrello">
          Torna al carrello
        </Link>
      </section>
    </main>
  );
}
