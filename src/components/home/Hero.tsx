import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-[#F6F5F3]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1A1A1A" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gold accent line */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent opacity-60" />

      <div className="relative mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A96E]">
            MONZA · TIVOLI
          </p>
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            Kranen die<br />
            <span className="text-[#C9A96E]">spreken voor</span><br />
            zich.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#5A5A5A] sm:text-lg">
            Premium badkamerkranen in tijdloze afwerkingen. Ontworpen om te duren,
            gemaakt om op te vallen.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/kranen">
              <Button size="lg" className="gap-2">
                Ontdek het assortiment
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/collecties">
              <Button size="lg" variant="outline">
                Bekijk collecties
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
