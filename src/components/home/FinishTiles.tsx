import Link from 'next/link';
import { FINISH_HEX } from '@/lib/constants';

const FINISHES = Object.entries(FINISH_HEX);

export function FinishTiles() {
  return (
    <section className="bg-[#F6F5F3] py-16 lg:py-24">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#C9A96E]">Stijl</p>
          <h2 className="text-2xl font-bold lg:text-3xl">Shop op afwerking</h2>
          <p className="mt-3 text-sm text-[#5A5A5A]">Elke afwerking is een statement.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {FINISHES.map(([finish, hex]) => {
            const isGradient = hex.includes('gradient');
            return (
              <Link
                key={finish}
                href={`/kranen?afwerking=${encodeURIComponent(finish)}`}
                className="group flex flex-col items-center gap-3 transition-transform hover:-translate-y-1"
              >
                <div
                  className="h-16 w-16 rounded-full ring-4 ring-transparent ring-offset-2 ring-offset-[#F6F5F3] transition-all duration-300 group-hover:ring-[#C9A96E] shadow-md"
                  style={isGradient ? { background: hex } : { backgroundColor: hex }}
                />
                <span className="text-xs font-medium text-[#1A1A1A] text-center max-w-[80px]">
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
