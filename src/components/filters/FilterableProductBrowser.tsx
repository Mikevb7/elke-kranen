'use client';

import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Product } from '@/lib/shopify/types';
import { applyFilters, deriveFacets, parseFiltersFromParams, filtersToParams, type ActiveFilters } from '@/lib/filtering';
import { FINISH_HEX } from '@/lib/constants';
import { ProductGrid } from '@/components/product/ProductGrid';
import { cn } from '@/lib/utils';
import { X, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

interface FilterableProductBrowserProps {
  products: Product[];
}

function FinishSwatch({ finish, active, onClick }: { finish: string; active: boolean; onClick: () => void }) {
  const hex = FINISH_HEX[finish];
  const isGradient = hex?.includes('gradient');
  return (
    <button
      onClick={onClick}
      title={finish}
      aria-pressed={active}
      className="relative flex h-12 w-12 items-center justify-center"
    >
      <span
        className={cn(
          'relative block h-8 w-8 rounded-full border-2 transition-all overflow-hidden',
          active ? 'border-[#1A1A1A] scale-110 shadow-md' : 'border-transparent ring-1 ring-[#E7E5E1]'
        )}
        style={isGradient ? { background: hex } : { backgroundColor: hex ?? '#ccc' }}
      >
        <span
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.32) 0%, transparent 55%)' }}
        />
      </span>
      {active && (
        <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[#1A1A1A] ring-offset-1" />
      )}
    </button>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-[#E7E5E1] pb-5 last:border-0">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">{title}</p>
      {children}
    </div>
  );
}

function CheckboxFilter({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex min-h-[48px] cursor-pointer items-center gap-3 py-1" onClick={onChange}>
      <span
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors',
          checked ? 'border-[#1A1A1A] bg-[#1A1A1A]' : 'border-[#E7E5E1]'
        )}
      >
        {checked && (
          <svg viewBox="0 0 10 8" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M1 4l3 3 5-6" />
          </svg>
        )}
      </span>
      <span className="text-sm text-[#1A1A1A]">{label}</span>
    </label>
  );
}

export function FilterableProductBrowser({ products }: FilterableProductBrowserProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filters = useMemo(() => parseFiltersFromParams(searchParams), [searchParams]);
  const facets = useMemo(() => deriveFacets(products), [products]);
  const filtered = useMemo(() => applyFilters(products, filters), [products, filters]);

  const updateFilters = useCallback(
    (update: Partial<ActiveFilters>) => {
      const next = { ...filters, ...update };
      const params = filtersToParams(next);
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [filters, router]
  );

  const toggleArrayFilter = useCallback(
    (key: 'afwerking' | 'montage' | 'serie', value: string) => {
      const current = filters[key];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      updateFilters({ [key]: next });
    },
    [filters, updateFilters]
  );

  const activeCount = filters.afwerking.length + filters.montage.length + filters.serie.length;

  const FilterPanel = () => (
    <div className="space-y-5">
      {/* Sort */}
      <FilterSection title="Sorteren">
        <select
          value={filters.sort}
          onChange={(e) => updateFilters({ sort: e.target.value })}
          className="w-full rounded-lg border border-[#E7E5E1] bg-white px-3 py-2 text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
        >
          <option value="aanbevolen">Aanbevolen</option>
          <option value="prijs-op">Prijs oplopend</option>
          <option value="prijs-neer">Prijs aflopend</option>
          <option value="naam">Naam</option>
        </select>
      </FilterSection>

      {/* Afwerking */}
      {facets.finishes.length > 0 && (
        <FilterSection title="Afwerking">
          <div className="flex flex-wrap gap-2">
            {facets.finishes.map((f) => (
              <FinishSwatch
                key={f}
                finish={f}
                active={filters.afwerking.includes(f)}
                onClick={() => toggleArrayFilter('afwerking', f)}
              />
            ))}
          </div>
          {filters.afwerking.length > 0 && (
            <p className="mt-2 text-xs text-[#5A5A5A]">{filters.afwerking.join(', ')}</p>
          )}
        </FilterSection>
      )}

      {/* Montagewijze */}
      {facets.mounts.length > 0 && (
        <FilterSection title="Montagewijze">
          {facets.mounts.map((m) => (
            <CheckboxFilter
              key={m}
              label={m}
              checked={filters.montage.includes(m)}
              onChange={() => toggleArrayFilter('montage', m)}
            />
          ))}
        </FilterSection>
      )}

      {/* Serie */}
      {facets.series.length > 0 && (
        <FilterSection title="Serie">
          {facets.series.map((s) => (
            <CheckboxFilter
              key={s}
              label={s}
              checked={filters.serie.includes(s)}
              onChange={() => toggleArrayFilter('serie', s)}
            />
          ))}
        </FilterSection>
      )}

      {/* Reset */}
      {activeCount > 0 && (
        <button
          onClick={() => updateFilters({ afwerking: [], montage: [], serie: [] })}
          className="text-xs font-medium text-[#C9A96E] hover:text-[#8A6D3B] transition-colors"
        >
          Wis alle filters ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="flex gap-8 lg:gap-12">
      {/* Desktop filter sidebar */}
      <aside className="hidden w-52 shrink-0 lg:block">
        <div className="sticky top-24">
          <FilterPanel />
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-[#5A5A5A]">
            <span className="font-semibold text-[#1A1A1A]">{filtered.length}</span> producten
          </p>

          <div className="flex items-center gap-3">
            {/* Active filter chips */}
            {filters.afwerking.map((f) => (
              <button
                key={f}
                onClick={() => toggleArrayFilter('afwerking', f)}
                className="hidden sm:flex items-center gap-1 rounded-full bg-[#F6F5F3] px-2.5 py-1 text-xs font-medium text-[#1A1A1A] hover:bg-[#E7E5E1] transition-colors"
              >
                {f} <X size={10} />
              </button>
            ))}

            {/* Mobile filter btn */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex min-h-[44px] items-center gap-2 rounded-lg border border-[#E7E5E1] px-4 text-sm font-medium text-[#1A1A1A] lg:hidden"
            >
              <SlidersHorizontal size={15} />
              Filters{activeCount > 0 ? ` (${activeCount})` : ''}
            </button>
          </div>
        </div>

        <ProductGrid
          products={filtered}
          activeFinish={filters.afwerking.length === 1 ? filters.afwerking[0] : undefined}
        />
      </div>

      {/* Mobile filter drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFilterOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-display font-bold">Filters</p>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <FilterPanel />
            <div className="mt-6" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full rounded-xl bg-[#1A1A1A] py-4 text-sm font-semibold text-white min-h-[52px]"
              >
                Toon {filtered.length} product{filtered.length !== 1 ? 'en' : ''}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
