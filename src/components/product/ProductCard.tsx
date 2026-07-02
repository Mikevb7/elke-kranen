import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/shopify/types';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { Price } from '@/components/ui/Price';
import { Badge } from '@/components/ui/Badge';
import { FINISH_HEX } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  activeFinish?: string;
  className?: string;
}

function FinishSwatch({ finish, size = 'sm' }: { finish: string; size?: 'sm' | 'md' }) {
  const hex = FINISH_HEX[finish];
  const isGradient = hex?.includes('gradient');
  return (
    <span
      title={finish}
      className={cn(
        'rounded-full border border-white ring-1 ring-[#E7E5E1] inline-block shrink-0',
        size === 'sm' ? 'h-3.5 w-3.5' : 'h-5 w-5'
      )}
      style={isGradient ? { background: hex } : { backgroundColor: hex ?? '#ccc' }}
    />
  );
}

export function ProductCard({ product, activeFinish, className }: ProductCardProps) {
  const variantImage = activeFinish
    ? product.variants.find((v) => v.finish === activeFinish)?.image
    : null;
  const displayImage = variantImage ?? product.featuredImage;
  const minVariant = product.variants.find((v) => v.isPurchasable);
  const lowestPrice = product.priceRange.minVariantPrice;
  const hasDiscount = product.variants.some((v) => v.compareAtPrice && Number(v.compareAtPrice.amount) > Number(v.price.amount));

  return (
    <article className={cn('group', className)}>
      <Link href={`/product/${product.handle}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden rounded-xl bg-[#F6F5F3] aspect-square">
          {displayImage ? (
            <Image
              src={displayImage.url}
              alt={displayImage.altText ?? product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <PlaceholderImage title={product.title} className="absolute inset-0 h-full w-full" />
          )}
          {hasDiscount && (
            <span className="absolute left-3 top-3">
              <Badge variant="gold">Aanbieding</Badge>
            </span>
          )}
        </div>

        {/* Info */}
        <div className="mt-3 space-y-1.5">
          {product.serie && (
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#C9A96E]">
              {product.serie}
            </p>
          )}
          <h3 className="text-sm font-semibold text-[#1A1A1A] leading-snug group-hover:text-[#C9A96E] transition-colors line-clamp-2">
            {product.title}
          </h3>
          <p className="text-xs text-[#5A5A5A]">{product.productType}</p>

          <div className="flex items-center justify-between gap-2">
            <Price
              amount={minVariant?.price.amount ?? lowestPrice.amount}
              currencyCode={lowestPrice.currencyCode}
              compareAtAmount={minVariant?.compareAtPrice?.amount}
              size="sm"
            />
            {product.finishes.length > 0 && (
              <div className="flex items-center gap-1">
                {product.finishes.slice(0, 4).map((finish) => (
                  <FinishSwatch key={finish} finish={finish} />
                ))}
                {product.finishes.length > 4 && (
                  <span className="text-[10px] text-[#5A5A5A]">+{product.finishes.length - 4}</span>
                )}
              </div>
            )}
          </div>

          {!minVariant && (
            <p className="text-[10px] font-medium uppercase tracking-wider text-[#5A5A5A]">
              Binnenkort beschikbaar
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
