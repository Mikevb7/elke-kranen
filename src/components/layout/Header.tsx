'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, Search, ChevronDown } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { useCart } from '@/components/cart/CartProvider';
import { cn } from '@/lib/utils';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenu, setMegaMenu] = useState<string | null>(null);
  const { totalQuantity, openDrawer } = useCart();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-shadow duration-300',
          scrolled ? 'bg-white shadow-sm' : 'bg-white'
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="font-display text-lg font-bold tracking-[0.15em] text-[#1A1A1A] uppercase"
            >
              Elke Kranen
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => 'children' in link ? setMegaMenu(link.href) : undefined}
                  onMouseLeave={() => setMegaMenu(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-sm font-medium text-[#1A1A1A] hover:text-[#C9A96E] transition-colors"
                  >
                    {link.label}
                    {'children' in link && <ChevronDown size={14} />}
                  </Link>

                  {'children' in link && megaMenu === link.href && (
                    <div className="absolute top-full left-0 pt-2 min-w-[200px]">
                      <div className="rounded-xl border border-[#E7E5E1] bg-white py-2 shadow-xl">
                        {(link as typeof link & { children: { label: string; href: string }[] }).children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-[#1A1A1A] hover:bg-[#F6F5F3] hover:text-[#C9A96E] transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                aria-label="Zoeken"
                className="p-2 text-[#1A1A1A] hover:text-[#C9A96E] transition-colors"
              >
                <Search size={20} />
              </button>

              <button
                aria-label={`Winkelwagen (${totalQuantity} items)`}
                onClick={openDrawer}
                className="relative p-2 text-[#1A1A1A] hover:text-[#C9A96E] transition-colors"
              >
                <ShoppingBag size={20} />
                {totalQuantity > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#C9A96E] text-[10px] font-bold text-white">
                    {totalQuantity > 9 ? '9+' : totalQuantity}
                  </span>
                )}
              </button>

              <button
                className="p-2 lg:hidden text-[#1A1A1A]"
                onClick={() => setMobileOpen(true)}
                aria-label="Menu openen"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E7E5E1] p-4">
              <span className="font-display font-bold tracking-[0.15em] text-sm uppercase">
                Elke Kranen
              </span>
              <button onClick={() => setMobileOpen(false)} aria-label="Sluiten">
                <X size={20} />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-3 text-sm font-semibold text-[#1A1A1A] border-b border-[#E7E5E1]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {'children' in link && (
                    <div className="pl-4 pb-2">
                      {(link as typeof link & { children: { label: string; href: string }[] }).children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-2 text-sm text-[#5A5A5A] hover:text-[#C9A96E]"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
