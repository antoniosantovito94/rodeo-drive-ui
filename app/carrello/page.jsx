import CartPageClient from "../components/CartPageClient";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "Carrello | Rodeo Drive",
  description: "Carrello Rodeo Drive.",
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
