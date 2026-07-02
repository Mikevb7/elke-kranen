import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getAllProducts } from '@/lib/shopify';
import { Container } from '@/components/ui/Container';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { SERIES } from '@/lib/constants';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return SERIES.map((s) => ({ serie: s.toLowerCase() }));
}

interface Props { params: Promise<{ serie: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serie } = await params;
  const name = serie.toUpperCase();
  return {
    title: `Collectie ${name}`,
    description: `Ontdek de ${name}-serie van Elke Kranen.`,
  };
}

async function SerieProducts({ serieUpper }: { serieUpper: string }) {
  const products = await getAllProducts();
  const filtered = products.filter((p) => p.serie?.toUpperCase() === serieUpper);
  return <ProductGrid products={filtered} />;
}

export default async function SeriePage({ params }: Props) {
  const { serie } = await params;
  const serieUpper = serie.toUpperCase() as (typeof SERIES)[number];
  if (!SERIES.includes(serieUpper)) notFound();

  return (
    <div className="py-10 lg:py-14">
      <Container>
        <nav className="mb-8 flex items-center gap-1.5 text-xs text-[#5A5A5A]">
          <Link href="/" className="hover:text-[#1A1A1A]">Home</Link>
          <ChevronRight size={12} />
          <Link href="/collecties" className="hover:text-[#1A1A1A]">Collecties</Link>
          <ChevronRight size={12} />
          <span className="text-[#1A1A1A] font-medium">{serieUpper}</span>
        </nav>

        <div className="mb-10">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#C9A96E]">Serie</p>
          <h1 className="text-3xl font-bold lg:text-4xl">{serieUpper}</h1>
          <p className="mt-3 text-sm text-[#5A5A5A] max-w-2xl">
            {serieUpper === 'MONZA'
              ? 'Strak en tijdloos design voor de moderne badkamer. Beschikbaar in meerdere afwerkingen.'
              : 'Elegant en verfijnd — de TIVOLI-serie voor wie het verschil wil maken.'}
          </p>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          }
        >
          <SerieProducts serieUpper={serieUpper} />
        </Suspense>
      </Container>
    </div>
  );
}
