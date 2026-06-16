import CartPageClient from "../components/CartPageClient";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "Carrello | Michele Evangelista",
  description: "Carrello Michele Evangelista.",
};

export default function CartPage() {
  return (
    <>
      <SiteHeader />
      <CartPageClient />
      <SiteFooter />
    </>
  );
}
