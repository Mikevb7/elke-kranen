'use client';

import { useState } from 'react';
import type { Product, Variant } from '@/lib/shopify/types';
import { Gallery } from './Gallery';
import { VariantSwatches } from './VariantSwatches';
import { AddToCart } from './AddToCart';
import { SpecsTable } from './SpecsTable';
import { Price } from '@/components/ui/Price';
import { Badge } from '@/components/ui/Badge';
import { DEFAULT_DELIVERY } from '@/lib/constants';
import { Truck, Shield, RotateCcw } from 'lucide-react';

interface ProductInfoProps {
  product: Product;
}

const TABS = ['Omschrijving', 'Specificaties', 'Montage'] as const;

export function ProductInfo({ product }: ProductInfoProps) {
  const purchasableVariants = product.variants.filter((v) => v.isPurchasable);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    purchasableVariants[0] ?? product.variants[0] ?? null
  );
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('Omschrijving');

  const activeImage = selectedVariant?.image;

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Gallery */}
      <Gallery images={product.images} title={product.title} activeImage={activeImage} />

      {/* Info column */}
      <div className="space-y-6 pb-24 sm:pb-0">
        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {product.serie && <Badge variant="gold">{product.serie}</Badge>}
          {product.montagewijze && <Badge variant="muted">{product.montagewijze}</Badge>}
          {selectedVariant && !selectedVariant.isPurchasable && (
            <Badge variant="muted">Binnenkort beschikbaar</Badge>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold leading-snug lg:text-3xl">{product.title}</h1>

        {/* Price */}
        <Price
          amount={selectedVariant?.price.amount ?? product.priceRange.minVariantPrice.amount}
          currencyCode={selectedVariant?.price.currencyCode ?? product.priceRange.minVariantPrice.currencyCode}
          compareAtAmount={selectedVariant?.compareAtPrice?.amount}
          size="lg"
        />
        <p className="text-xs text-[#5A5A5A]">Incl. 21% btw</p>

        {/* Swatches */}
        <VariantSwatches
          variants={product.variants}
          selectedVariantId={selectedVariant?.id ?? null}
          onSelect={setSelectedVariant}
        />

        {/* Add to cart */}
        <AddToCart variant={selectedVariant} />

        {/* Delivery */}
        <div className="flex items-center gap-2 text-sm text-[#5A5A5A]">
          <Truck size={16} className="text-[#C9A96E] shrink-0" />
          <span>{product.levertijd ?? DEFAULT_DELIVERY}</span>
        </div>

        {/* Trust */}
        <div className="border-t border-[#E7E5E1] pt-5 space-y-2">
          <div className="flex items-center gap-2 text-xs text-[#5A5A5A]">
            <Shield size={14} className="text-[#C9A96E] shrink-0" />
            <span>2 jaar fabrieksgarantie</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#5A5A5A]">
            <RotateCcw size={14} className="text-[#C9A96E] shrink-0" />
            <span>14 dagen bedenktijd</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-[#E7E5E1] pt-6">
          <div className="flex gap-0 border-b border-[#E7E5E1]">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-[#1A1A1A] text-[#1A1A1A]'
                    : 'text-[#5A5A5A] hover:text-[#1A1A1A]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="pt-5">
            {activeTab === 'Omschrijving' && (
              <div
                className="prose prose-sm max-w-none text-[#1A1A1A]"
                dangerouslySetInnerHTML={{
                  __html: product.descriptionHtml ?? '<p>Geen omschrijving beschikbaar.</p>',
                }}
              />
            )}
            {activeTab === 'Specificaties' && <SpecsTable product={product} />}
            {activeTab === 'Montage' && (
              <p className="text-sm text-[#5A5A5A]">
                Montage-instructies zijn beschikbaar in de meegeleverde documentatie.
                Neem contact op voor professionele installatiehulp.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
