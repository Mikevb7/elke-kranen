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

      <div className="relative mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A96E]">
            MONZA · TIVOLI
          </p>
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            Kranen die<br />
            <span className="text-[#C9A96E]">spreken voor</span><br />
            zich.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            Premium badkamerkranen in tijdloze afwerkingen. Ontworpen om te duren,
            gemaakt om op te vallen.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/kranen">
              <Button size="lg" variant="secondary" className="gap-2">
                Ontdek het assortiment
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/collecties">
              <Button size="lg" className="border border-white/30 bg-white/10 text-white hover:bg-white/20">
                Bekijk collecties
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
