import { USPS, WARRANTY_YEARS, RETURN_DAYS, FREE_SHIPPING_THRESHOLD } from '@/lib/constants';
import { Truck, Shield, RotateCcw, Headphones } from 'lucide-react';

const ICONS = { truck: Truck, shield: Shield, 'rotate-ccw': RotateCcw, headphones: Headphones } as const;

export function TrustBlock() {
  return (
    <section className="py-16 lg:py-20 border-y border-[#E7E5E1]">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#C9A96E]">Waarom Elke Kranen</p>
          <h2 className="text-2xl font-bold lg:text-3xl">Zekerheid bij elke bestelling</h2>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {USPS.map((usp) => {
            const Icon = ICONS[usp.icon as keyof typeof ICONS];
            return (
              <div key={usp.text} className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F6F5F3]">
                  <Icon size={24} className="text-[#C9A96E]" />
                </div>
                <p className="text-sm font-semibold text-[#1A1A1A]">{usp.text}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl bg-[#1A1A1A] p-8 text-center text-white">
          <p className="text-lg font-bold">
            Gratis verzending bij bestellingen vanaf €{FREE_SHIPPING_THRESHOLD}
          </p>
          <p className="mt-2 text-sm text-white/60">
            {RETURN_DAYS} dagen retour · {WARRANTY_YEARS} jaar garantie · Vakkundige service
          </p>
        </div>
      </div>
    </section>
  );
}
