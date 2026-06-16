import Link from "next/link";

export const metadata = {
  title: "Ordine confermato | Michele Evangelista",
  description: "Pagamento completato.",
};

export default function CheckoutSuccessPage() {
  return (
    <main className="placeholder-page">
      <section className="placeholder-shell">
        <p className="eyebrow">Checkout</p>
        <h1>Ordine confermato</h1>
        <p>
          Questa pagina mostrera' il riepilogo ordine dopo il pagamento Stripe.
        </p>
        <Link className="button button-outline" href="/">
          Torna alla home
        </Link>
      </section>
    </main>
  );
}
