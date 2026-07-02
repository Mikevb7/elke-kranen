import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1920&q=80';

export function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-[#1A1A1A]">
      {/* Background image */}
      <Image
        src={HERO_IMAGE}
        alt="Moderne badkamer met premium kraan"
        fill
        sizes="100vw"
        className="object-cover object-center opacity-40"
        priority
      />

      {/* Dark gradient overlay — tekst links leesbaar houden */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      {/* Gold accent line */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent opacity-60" />

      <div className="relative mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C9A96E] sm:text-xs">
            MONZA · TIVOLI
          </p>
          <h1 className="text-[2.75rem] font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            Kranen die<br />
            <span className="text-[#C9A96E]">spreken voor</span><br />
            zich.
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base sm:mt-6 lg:text-lg">
            Premium badkamerkranen in tijdloze afwerkingen. Ontworpen om te duren,
            gemaakt om op te vallen.
          </p>
          {/* CTA: gestapeld + vol-breed op mobiel, naast elkaar op desktop */}
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Link href="/kranen" className="sm:flex-none">
              <Button size="lg" variant="secondary" className="w-full gap-2 sm:w-auto">
                Ontdek het assortiment
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/collecties" className="sm:flex-none">
              <Button
                size="lg"
                className="w-full border border-white/30 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
              >
                Bekijk collecties
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
