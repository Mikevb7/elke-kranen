import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { PRODUCT_TYPES, SERIES, USPS } from '@/lib/constants';
import { Truck, Shield, RotateCcw, Headphones } from 'lucide-react';

const ICONS = { truck: Truck, shield: Shield, 'rotate-ccw': RotateCcw, headphones: Headphones } as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#E7E5E1] bg-[#F6F5F3]">
      {/* USP strip */}
      <div className="border-b border-[#E7E5E1] bg-white">
        <Container>
          <div className="grid grid-cols-2 gap-4 py-8 md:grid-cols-4">
            {USPS.map((usp) => {
              const Icon = ICONS[usp.icon as keyof typeof ICONS];
              return (
                <div key={usp.text} className="flex items-center gap-3">
                  <Icon size={20} className="shrink-0 text-[#C9A96E]" />
                  <span className="text-sm font-medium text-[#1A1A1A]">{usp.text}</span>
                </div>
              );
            })}
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid gap-8 py-12 md:grid-cols-4">
          <div>
            <p className="mb-4 font-display font-bold tracking-[0.15em] text-sm uppercase">
              Elke Kranen
            </p>
            <p className="text-sm leading-relaxed text-[#5A5A5A]">
              Premium kranen voor de moderne badkamer. Kwaliteit en design in perfecte balans.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">Collectie</p>
            <ul className="space-y-2">
              {PRODUCT_TYPES.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/kranen/${t.slug}`}
                    className="text-sm text-[#5A5A5A] hover:text-[#C9A96E] transition-colors"
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">Series</p>
            <ul className="space-y-2">
              {SERIES.map((s) => (
                <li key={s}>
                  <Link
                    href={`/collecties/${s.toLowerCase()}`}
                    className="text-sm text-[#5A5A5A] hover:text-[#C9A96E] transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">Service</p>
            <ul className="space-y-2">
              {[
                ['Keuzehulp', '/keuzehulp'],
                ['Verzending', '/verzending'],
                ['Retour', '/retour'],
                ['Garantie', '/garantie'],
                ['Over ons', '/over-ons'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#5A5A5A] hover:text-[#C9A96E] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#E7E5E1] py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#5A5A5A]">
            © {new Date().getFullYear()} Elke Kranen. Alle rechten voorbehouden.
          </p>
          <p className="text-xs text-[#5A5A5A]">
            Prijzen incl. 21% btw
          </p>
        </div>
      </Container>
    </footer>
  );
}
