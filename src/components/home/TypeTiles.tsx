import Image from 'next/image';
import Link from 'next/link';
import { PRODUCT_TYPES } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

const TYPE_IMAGES: Record<string, string> = {
  douchekranen:        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
  wastafelkranen:      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  badkranen:           'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80',
  badkameraccessoires: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
};

export function TypeTiles() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#C9A96E]">Collectie</p>
            <h2 className="text-2xl font-bold lg:text-3xl">Shop per categorie</h2>
          </div>
          <Link
            href="/kranen"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-[#5A5A5A] hover:text-[#C9A96E] transition-colors"
          >
            Alle kranen <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {PRODUCT_TYPES.map((type, i) => (
            <Link
              key={type.slug}
              href={`/kranen/${type.slug}`}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] bg-[#F6F5F3]"
            >
              {/* Photo */}
              <Image
                src={TYPE_IMAGES[type.slug]}
                alt={type.label}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Text */}
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <span className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A96E]">
                  0{i + 1}
                </span>
                <h3 className="font-display text-base font-bold text-white leading-snug">
                  {type.label}
                </h3>
                <span className="mt-2 flex items-center gap-1 text-xs text-white/60 group-hover:text-[#C9A96E] transition-colors">
                  Bekijken <ArrowRight size={11} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
