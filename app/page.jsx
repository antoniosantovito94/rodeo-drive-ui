import HomePageClient from "./components/HomePageClient";
import { getFeaturedProducts, getSaleProducts } from "../lib/catalog";

export default async function Home() {
  const products = await getFeaturedProducts();
  const saleProducts = await getSaleProducts();

  return <HomePageClient products={products} saleProducts={saleProducts} />;
}
