import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/shopify/types';
import { ProductCard } from '@/components/product/ProductCard';
import { ArrowRight } from 'lucide-react';

const BANNER_IMAGE = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80';

interface SerieSpotlightProps {
  products: Product[];
  serie: string;
}

export function SerieSpotlight({ products, serie }: SerieSpotlightProps) {
  const serieProducts = products.filter((p) => p.serie === serie).slice(0, 4);
  const hasProducts = serieProducts.length > 0;

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
                : "Elegant en verfijnd. De TIVOLI-serie voor de badkamer die iets extra's verdient."}
            </p>
          </div>
          <Link
            href={`/collecties/${serie.toLowerCase()}`}
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-[#5A5A5A] hover:text-[#C9A96E] transition-colors shrink-0"
          >
            Hele serie <ArrowRight size={14} />
          </Link>
        </div>

        {hasProducts ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {serieProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          /* Placeholder banner tot Shopify-producten live zijn */
          <Link href={`/collecties/${serie.toLowerCase()}`} className="group block">
            <div className="relative overflow-hidden rounded-2xl aspect-[21/9]">
              <Image
                src={BANNER_IMAGE}
                alt={`Serie ${serie} — premium badkamerkranen`}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A96E]">
                  Serie
                </p>
                <p className="text-3xl font-bold text-white sm:text-4xl">{serie}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/70 group-hover:text-[#C9A96E] transition-colors">
                  Bekijk collectie <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </Link>
        )}

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
