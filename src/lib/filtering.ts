import type { Product } from './shopify/types';

export interface Facets {
  finishes: string[];
  mounts: string[];
  series: string[];
  minPrice: number;
  maxPrice: number;
}

export interface ActiveFilters {
  afwerking: string[];
  montage: string[];
  serie: string[];
  minPrijs?: number;
  maxPrijs?: number;
  sort: string;
}

export function deriveFacets(products: Product[]): Facets {
  const finishes = [...new Set(products.flatMap((p) => p.finishes))].sort();
  const mounts = [...new Set(products.map((p) => p.montagewijze).filter((m): m is string => !!m))].sort();
  const series = [...new Set(products.map((p) => p.serie).filter((s): s is string => !!s))].sort();

  const prices = products.flatMap((p) =>
    p.variants.map((v) => Number(v.price.amount)).filter((n) => n > 0)
  );
  const minPrice = prices.length ? Math.floor(Math.min(...prices)) : 0;
  const maxPrice = prices.length ? Math.ceil(Math.max(...prices)) : 9999;

  return { finishes, mounts, series, minPrice, maxPrice };
}

export function applyFilters(products: Product[], filters: ActiveFilters): Product[] {
  let result = [...products];

  if (filters.afwerking.length) {
    result = result.filter((p) =>
      filters.afwerking.some((f) => p.finishes.includes(f))
    );
  }

  if (filters.montage.length) {
    result = result.filter((p) => p.montagewijze && filters.montage.includes(p.montagewijze));
  }

  if (filters.serie.length) {
    result = result.filter((p) => p.serie && filters.serie.includes(p.serie));
  }

  if (filters.minPrijs !== undefined || filters.maxPrijs !== undefined) {
    result = result.filter((p) => {
      const price = Number(p.priceRange.minVariantPrice.amount);
      if (filters.minPrijs !== undefined && price < filters.minPrijs) return false;
      if (filters.maxPrijs !== undefined && price > filters.maxPrijs) return false;
      return true;
    });
  }

  switch (filters.sort) {
    case 'prijs-op':
      result.sort((a, b) => Number(a.priceRange.minVariantPrice.amount) - Number(b.priceRange.minVariantPrice.amount));
      break;
    case 'prijs-neer':
      result.sort((a, b) => Number(b.priceRange.minVariantPrice.amount) - Number(a.priceRange.minVariantPrice.amount));
      break;
    case 'naam':
      result.sort((a, b) => a.title.localeCompare(b.title, 'nl'));
      break;
    default:
      break;
  }

  return result;
}

export function parseFiltersFromParams(params: URLSearchParams): ActiveFilters {
  return {
    afwerking: params.get('afwerking')?.split(',').filter(Boolean) ?? [],
    montage: params.get('montage')?.split(',').filter(Boolean) ?? [],
    serie: params.get('serie')?.split(',').filter(Boolean) ?? [],
    minPrijs: params.get('minPrijs') ? Number(params.get('minPrijs')) : undefined,
    maxPrijs: params.get('maxPrijs') ? Number(params.get('maxPrijs')) : undefined,
    sort: params.get('sort') ?? 'aanbevolen',
  };
}

export function filtersToParams(filters: ActiveFilters): URLSearchParams {
  const p = new URLSearchParams();
  if (filters.afwerking.length) p.set('afwerking', filters.afwerking.join(','));
  if (filters.montage.length) p.set('montage', filters.montage.join(','));
  if (filters.serie.length) p.set('serie', filters.serie.join(','));
  if (filters.minPrijs !== undefined) p.set('minPrijs', String(filters.minPrijs));
  if (filters.maxPrijs !== undefined) p.set('maxPrijs', String(filters.maxPrijs));
  if (filters.sort && filters.sort !== 'aanbevolen') p.set('sort', filters.sort);
  return p;
}
