import Link from 'next/link';
import { FINISH_HEX } from '@/lib/constants';

const FINISHES = Object.entries(FINISH_HEX);

export function FinishTiles() {
  return (
    <section className="bg-[#F6F5F3] py-14 lg:py-24">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-10">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#C9A96E]">Stijl</p>
          <h2 className="text-2xl font-bold lg:text-3xl">Shop op afwerking</h2>
          <p className="mt-2 text-sm text-[#5A5A5A]">Elke afwerking is een statement.</p>
        </div>

        {/* Mobiel: horizontaal snap-scroll; desktop: gewone flex-wrap */}
        <div className="
          flex gap-5 overflow-x-auto snap-x snap-mandatory pb-3
          scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]
          sm:flex-wrap sm:justify-center sm:overflow-x-visible sm:pb-0 sm:gap-6
        ">
          {FINISHES.map(([finish, hex]) => {
            const isGradient = hex.includes('gradient');
            return (
              <Link
                key={finish}
                href={`/kranen?afwerking=${encodeURIComponent(finish)}`}
                className="group flex shrink-0 snap-center flex-col items-center gap-3 transition-transform active:scale-95 sm:hover:-translate-y-1 sm:transition-transform"
              >
                {/* Swatch met metallic shine */}
                <div className="relative">
                  <div
                    className="h-[72px] w-[72px] rounded-full shadow-md ring-4 ring-transparent ring-offset-2 ring-offset-[#F6F5F3] transition-all duration-300 group-hover:ring-[#C9A96E] sm:h-16 sm:w-16"
                    style={isGradient ? { background: hex } : { backgroundColor: hex }}
                  />
                  {/* Gloss overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{
                      background:
                        'linear-gradient(160deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 40%, transparent 60%)',
                    }}
                  />
                </div>
                <span className="text-xs font-medium text-[#1A1A1A] text-center w-20 leading-tight">
                  {finish}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
