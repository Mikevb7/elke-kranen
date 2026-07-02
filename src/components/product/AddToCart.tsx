'use client';

import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { Button } from '@/components/ui/Button';
import type { Variant } from '@/lib/shopify/types';
import { cn } from '@/lib/utils';

interface AddToCartProps {
  variant: Variant | null;
}

export function AddToCart({ variant }: AddToCartProps) {
  const { addItem, loading } = useCart();
  const [added, setAdded] = useState(false);

  const purchasable = variant?.isPurchasable ?? false;

  const handleAdd = async () => {
    if (!variant || !purchasable || loading) return;
    await addItem(variant.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  let label = 'Selecteer een afwerking';
  if (variant && !purchasable) label = 'Binnenkort beschikbaar';
  if (variant && purchasable) label = added ? 'Toegevoegd!' : 'In winkelwagen';

  return (
    <div className="space-y-3">
      {/* Desktop */}
      <Button
        onClick={handleAdd}
        disabled={!purchasable || loading}
        className={cn(
          'w-full transition-all duration-300',
          added && 'bg-green-700 hover:bg-green-700'
        )}
        size="lg"
      >
        {added ? <Check size={18} /> : <ShoppingBag size={18} />}
        {label}
      </Button>

      {/* Sticky mobile bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#E7E5E1] bg-white px-4 pb-safe pt-3 sm:hidden">
        <Button
          onClick={handleAdd}
          disabled={!purchasable || loading}
          className={cn(
            'w-full transition-all duration-300',
            added && 'bg-green-700 hover:bg-green-700'
          )}
          size="lg"
        >
          {added ? <Check size={18} /> : <ShoppingBag size={18} />}
          {label}
        </Button>
      </div>
    </div>
  );
}
