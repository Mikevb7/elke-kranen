import type { Product } from '@/lib/shopify/types';
import { DEFAULT_DELIVERY } from '@/lib/constants';

export function SpecsTable({ product }: { product: Product }) {
  const specs: [string, string][] = [
    ['Producttype', product.productType],
    product.montagewijze ? ['Montagewijze', product.montagewijze] : null,
    product.serie ? ['Serie', product.serie] : null,
    product.materiaal ? ['Materiaal', product.materiaal] : null,
    ['Afwerkingen', product.finishes.join(', ') || '—'],
    ['Leverancier', product.vendor],
    ['Levertijd', product.levertijd ?? DEFAULT_DELIVERY],
  ].filter((row): row is [string, string] => row !== null);

  return (
    <dl className="divide-y divide-[#E7E5E1]">
      {specs.map(([label, value]) => (
        <div key={label} className="flex justify-between gap-4 py-3">
          <dt className="text-sm font-medium text-[#5A5A5A] shrink-0">{label}</dt>
          <dd className="text-sm text-[#1A1A1A] text-right">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
