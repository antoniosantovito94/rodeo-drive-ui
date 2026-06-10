import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import WishlistPageClient from "../components/WishlistPageClient";

export const metadata = {
  title: "Wishlist | Rodeo Drive",
  description: "Capi salvati nella wishlist Rodeo Drive.",
};

export default function WishlistPage() {
  return (
    <>
      <SiteHeader />
      <WishlistPageClient />
      <SiteFooter />
    </>
  );
}
