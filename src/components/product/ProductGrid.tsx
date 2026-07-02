import type { Product } from '@/lib/shopify/types';
import { ProductCard } from './ProductCard';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  activeFinish?: string;
  className?: string;
}

export function ProductGrid({ products, activeFinish, className }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-semibold text-[#1A1A1A]">Geen producten gevonden</p>
        <p className="mt-2 text-sm text-[#5A5A5A]">Pas je filters aan om meer resultaten te zien.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4',
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} activeFinish={activeFinish} />
      ))}
    </div>
  );
}
