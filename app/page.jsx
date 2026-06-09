import HomePageClient from "./components/HomePageClient";
import { getFeaturedProducts } from "../lib/catalog";

export default async function Home() {
  const products = await getFeaturedProducts();

  return <HomePageClient products={products} />;
}
