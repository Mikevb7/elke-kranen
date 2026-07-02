'use client';

import type { Variant } from '@/lib/shopify/types';
import { FINISH_HEX } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface VariantSwatchesProps {
  variants: Variant[];
  selectedVariantId: string | null;
  onSelect: (variant: Variant) => void;
}

export function VariantSwatches({ variants, selectedVariantId, onSelect }: VariantSwatchesProps) {
  const finishVariants = variants.filter((v) => v.finish);
  if (finishVariants.length === 0) return null;

  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-[#1A1A1A]">
        Afwerking:{' '}
        <span className="font-normal text-[#5A5A5A]">
          {variants.find((v) => v.id === selectedVariantId)?.finish ?? '—'}
        </span>
      </p>
      <div className="flex flex-wrap gap-3">
        {finishVariants.map((variant) => {
          const hex = FINISH_HEX[variant.finish!];
          const isGradient = hex?.includes('gradient');
          const isSelected = variant.id === selectedVariantId;
          const purchasable = variant.isPurchasable;

          return (
            /* 48px touch target wrapper */
            <button
              key={variant.id}
              onClick={() => purchasable && onSelect(variant)}
              title={variant.finish}
              aria-label={`${variant.finish}${!purchasable ? ' — binnenkort beschikbaar' : ''}`}
              aria-pressed={isSelected}
              disabled={!purchasable}
              className={cn(
                'relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200',
                isSelected ? 'scale-110' : '',
                !purchasable && 'opacity-40 cursor-not-allowed'
              )}
            >
              {/* Swatch circle */}
              <span
                className={cn(
                  'relative block h-9 w-9 rounded-full border-2 shadow-sm transition-all duration-200',
                  isSelected
                    ? 'border-[#1A1A1A] shadow-md'
                    : 'border-transparent ring-1 ring-[#E7E5E1]'
                )}
                style={isGradient ? { background: hex } : { backgroundColor: hex ?? '#ccc' }}
              >
                {/* Gloss */}
                <span
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{
                    background:
                      'linear-gradient(160deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.06) 45%, transparent 65%)',
                  }}
                />
                {/* Doorgestreept bij niet-koopbaar */}
                {!purchasable && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="block h-px w-[140%] -rotate-45 bg-white/60" style={{ transformOrigin: 'center' }} />
                  </span>
                )}
              </span>

              {/* Actief-ring */}
              {isSelected && (
                <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[#1A1A1A] ring-offset-2" />
              )}
            </button>
          );
        })}
      </div>
      <p className="mt-1 text-xs text-[#5A5A5A]">{finishVariants.length} afwerkingen beschikbaar</p>
    </div>
  );
}
