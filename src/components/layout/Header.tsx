'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { useCart } from '@/components/cart/CartProvider';
import { cn } from '@/lib/utils';

type NavLink = (typeof NAV_LINKS)[number];
type NavLinkWithChildren = NavLink & { children: readonly { label: string; href: string }[] };
function hasChildren(link: NavLink): link is NavLinkWithChildren {
  return 'children' in link;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [megaMenu, setMegaMenu] = useState<string | null>(null);
  const { totalQuantity, openDrawer } = useCart();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header className={cn(
        'sticky top-0 z-40 w-full bg-white transition-shadow duration-300',
        scrolled && 'shadow-sm'
      )}>
        <Container>
          <div className="relative flex h-14 items-center lg:h-16">

            {/* Mobile: hamburger left */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Menu openen"
              className="flex h-12 w-12 items-center justify-center text-[#1A1A1A] lg:hidden"
            >
              <Menu size={22} />
            </button>

            {/* Logo — centered on mobile, left on desktop */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 font-display text-base font-bold tracking-[0.15em] text-[#1A1A1A] uppercase whitespace-nowrap lg:static lg:translate-x-0 lg:text-lg"
            >
              Elke Kranen
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8 ml-10">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => hasChildren(link) ? setMegaMenu(link.href) : undefined}
                  onMouseLeave={() => setMegaMenu(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-sm font-medium text-[#1A1A1A] hover:text-[#C9A96E] transition-colors py-1"
                  >
                    {link.label}
                    {hasChildren(link) && <ChevronDown size={13} />}
                  </Link>

                  {hasChildren(link) && megaMenu === link.href && (
                    <div className="absolute top-full left-0 pt-2 min-w-[200px]">
                      <div className="rounded-xl border border-[#E7E5E1] bg-white py-2 shadow-xl">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-[#1A1A1A] hover:bg-[#F6F5F3] hover:text-[#C9A96E] transition-colors"
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

            {/* Actions — right side */}
            <div className="ml-auto flex items-center">
              <button
                aria-label="Zoeken"
                className="flex h-12 w-12 items-center justify-center text-[#1A1A1A] hover:text-[#C9A96E] transition-colors"
              >
                <Search size={20} />
              </button>

              <button
                aria-label={`Winkelwagen${totalQuantity > 0 ? ` (${totalQuantity})` : ''}`}
                onClick={openDrawer}
                className="relative flex h-12 w-12 items-center justify-center text-[#1A1A1A] hover:text-[#C9A96E] transition-colors"
              >
                <ShoppingBag size={20} />
                {totalQuantity > 0 && (
                  <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#C9A96E] text-[10px] font-bold text-white leading-none">
                    {totalQuantity > 9 ? '9+' : totalQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden transition-all duration-300',
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-black/50 transition-opacity duration-300',
            mobileOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />

        {/* Drawer panel */}
        <div
          className={cn(
            'absolute left-0 top-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col',
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {/* Drawer header */}
          <div className="flex h-14 items-center justify-between border-b border-[#E7E5E1] px-4">
            <Link
              href="/"
              className="font-display font-bold tracking-[0.15em] text-sm uppercase"
              onClick={() => setMobileOpen(false)}
            >
              Elke Kranen
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-10 items-center justify-center text-[#5A5A5A] hover:text-[#1A1A1A]"
              aria-label="Menu sluiten"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav items */}
          <nav className="flex-1 overflow-y-auto py-2">
            {NAV_LINKS.map((link) => (
              <div key={link.href}>
                <div className="flex items-center">
                  <Link
                    href={link.href}
                    className="flex-1 px-5 py-3.5 text-sm font-semibold text-[#1A1A1A] min-h-[48px] flex items-center"
                    onClick={() => { if (!hasChildren(link)) setMobileOpen(false); }}
                  >
                    {link.label}
                  </Link>
                  {hasChildren(link) && (
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === link.href ? null : link.href)}
                      className="flex h-12 w-12 items-center justify-center text-[#5A5A5A]"
                      aria-label={`${link.label} submenu`}
                    >
                      <ChevronRight
                        size={16}
                        className={cn('transition-transform duration-200', mobileExpanded === link.href && 'rotate-90')}
                      />
                    </button>
                  )}
                </div>

                {hasChildren(link) && mobileExpanded === link.href && (
                  <div className="border-t border-[#E7E5E1] bg-[#F6F5F3]">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center min-h-[48px] px-8 py-3 text-sm text-[#5A5A5A] hover:text-[#C9A96E] border-b border-[#E7E5E1] last:border-0"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}

                <div className="mx-5 border-b border-[#E7E5E1]" />
              </div>
            ))}
          </nav>

          {/* Drawer footer */}
          <div className="border-t border-[#E7E5E1] p-5">
            <p className="text-[11px] text-[#5A5A5A]">✦ Gratis verzending v.a. €150</p>
          </div>
        </div>
      </div>
    </>
  );
}
