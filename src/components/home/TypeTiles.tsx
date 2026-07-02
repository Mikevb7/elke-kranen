import Link from 'next/link';
import { PRODUCT_TYPES } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

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
              className="group relative overflow-hidden rounded-2xl bg-[#F6F5F3] p-6 transition-all duration-300 hover:bg-[#1A1A1A] hover:shadow-xl aspect-[3/4]"
            >
              {/* Placeholder visual */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 group-hover:opacity-10">
                <svg viewBox="0 0 120 120" className="h-3/4 w-3/4">
                  <circle cx="60" cy="60" r="50" stroke="#1A1A1A" strokeWidth="1" fill="none" />
                  <circle cx="60" cy="60" r="30" stroke="#1A1A1A" strokeWidth="1" fill="none" />
                  <line x1="60" y1="10" x2="60" y2="35" stroke="#1A1A1A" strokeWidth="2" />
                  <circle cx="60" cy="42" r="7" stroke="#1A1A1A" strokeWidth="2" fill="none" />
                </svg>
              </div>

              <div className="relative mt-auto flex flex-col h-full justify-end">
                <span className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A96E]">
                  0{i + 1}
                </span>
                <h3 className="font-display text-base font-bold text-[#1A1A1A] group-hover:text-white leading-snug transition-colors">
                  {type.label}
                </h3>
                <span className="mt-2 flex items-center gap-1 text-xs text-[#5A5A5A] group-hover:text-[#C9A96E] transition-colors">
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
