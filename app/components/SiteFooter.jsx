import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <Link className="brand-mark footer-brand" href="/" aria-label="Michele Evangelista home">
          <img src="/assets/michele-evangelista-logo-light.svg" alt="Michele Evangelista" />
        </Link>
        <p>&copy; 2026 Michele Evangelista. Tutti i diritti riservati.</p>
        <nav aria-label="Link footer">
          <Link href="/#privacy">Privacy Policy</Link>
          <Link href="/#termini">Termini e Condizioni</Link>
          <Link href="/#spedizioni">Spedizioni</Link>
          <Link href="/#resi">Resi</Link>
          <Link href="/#contatti">Contatti</Link>
        </nav>
      </div>
    </footer>
  );
}
