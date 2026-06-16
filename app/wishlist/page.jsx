import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import WishlistPageClient from "../components/WishlistPageClient";

export const metadata = {
  title: "Wishlist | Michele Evangelista",
  description: "Capi salvati nella wishlist Michele Evangelista.",
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
