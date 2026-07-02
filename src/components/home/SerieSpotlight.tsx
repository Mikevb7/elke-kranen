import Link from 'next/link';
import type { Product } from '@/lib/shopify/types';
import { ProductCard } from '@/components/product/ProductCard';
import { ArrowRight } from 'lucide-react';

interface SerieSpotlightProps {
  products: Product[];
  serie: string;
}

export function SerieSpotlight({ products, serie }: SerieSpotlightProps) {
  const serieProducts = products.filter((p) => p.serie === serie).slice(0, 4);
  if (serieProducts.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-[#F6F5F3]">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#C9A96E]">
              Collectie
            </p>
            <h2 className="text-2xl font-bold lg:text-3xl">Serie {serie}</h2>
            <p className="mt-2 text-sm text-[#5A5A5A] max-w-md">
              {serie === 'MONZA'
                ? 'Strak en tijdloos. De MONZA-serie combineert hedendaags design met uitstekende kwaliteit.'
                : 'Elegant en verfijnd. De TIVOLI-serie voor de badkamer die iets extra\'s verdient.'}
            </p>
          </div>
          <Link
            href={`/collecties/${serie.toLowerCase()}`}
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-[#5A5A5A] hover:text-[#C9A96E] transition-colors shrink-0"
          >
            Hele serie <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {serieProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link
            href={`/collecties/${serie.toLowerCase()}`}
            className="flex items-center justify-center gap-1 text-sm font-medium text-[#5A5A5A] hover:text-[#C9A96E] transition-colors"
          >
            Bekijk hele serie <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
