import { getAllProducts } from '@/lib/shopify';
import { Hero } from '@/components/home/Hero';
import { TypeTiles } from '@/components/home/TypeTiles';
import { FinishTiles } from '@/components/home/FinishTiles';
import { SerieSpotlight } from '@/components/home/SerieSpotlight';
import { TrustBlock } from '@/components/home/TrustBlock';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const products = await getAllProducts().catch(() => []);

  return (
    <>
      <Hero />
      <TypeTiles />
      <SerieSpotlight products={products} serie="MONZA" />
      <FinishTiles />
      <TrustBlock />
    </>
  );
}
