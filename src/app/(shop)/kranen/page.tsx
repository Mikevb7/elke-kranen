import { Suspense } from 'react';
import { getAllProducts } from '@/lib/shopify';
import { Container } from '@/components/ui/Container';
import { FilterableProductBrowser } from '@/components/filters/FilterableProductBrowser';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Alle kranen',
  description: 'Ontdek ons complete assortiment premium badkamerkranen. Filter op afwerking, montagewijze en serie.',
};

async function ProductBrowser() {
  const products = await getAllProducts();
  return <FilterableProductBrowser products={products} />;
}

export default function KranenPage() {
  return (
    <div className="py-10 lg:py-14">
      <Container>
        <div className="mb-10">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#C9A96E]">Collectie</p>
          <h1 className="text-3xl font-bold lg:text-4xl">Alle kranen</h1>
          <p className="mt-3 text-sm text-[#5A5A5A] max-w-2xl">
            Premium kranen voor douche, wastafel en bad. Kies uit meerdere afwerkingen en series.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <ProductBrowser />
        </Suspense>
      </Container>
    </div>
  );
}
