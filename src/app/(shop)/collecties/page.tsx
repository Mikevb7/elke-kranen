import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SERIES } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Collecties',
  description: 'Ontdek de MONZA en TIVOLI collecties van Elke Kranen.',
};

export default function CollectiesPage() {
  return (
    <div className="py-14">
      <Container>
        <div className="mb-12">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#C9A96E]">Design</p>
          <h1 className="text-3xl font-bold lg:text-4xl">Collecties</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {SERIES.map((serie) => (
            <Link
              key={serie}
              href={`/collecties/${serie.toLowerCase()}`}
              className="group relative overflow-hidden rounded-2xl bg-[#F6F5F3] p-10 transition-all duration-300 hover:bg-[#1A1A1A] min-h-[280px] flex flex-col justify-end"
            >
              <div className="absolute right-8 top-8 text-[120px] font-black leading-none opacity-5 group-hover:opacity-10 transition-opacity select-none">
                {serie[0]}
              </div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C9A96E]">
                Serie
              </p>
              <h2 className="text-3xl font-bold text-[#1A1A1A] group-hover:text-white transition-colors">
                {serie}
              </h2>
              <p className="mt-2 text-sm text-[#5A5A5A] group-hover:text-white/60 transition-colors max-w-xs">
                {serie === 'MONZA'
                  ? 'Tijdloos en strak — voor de moderne badkamer.'
                  : 'Elegant en verfijnd — voor wie het verschil wil maken.'}
              </p>
              <span className="mt-4 flex items-center gap-1.5 text-sm font-medium text-[#5A5A5A] group-hover:text-[#C9A96E] transition-colors">
                Bekijk collectie <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
