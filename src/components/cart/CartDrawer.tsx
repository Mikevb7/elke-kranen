'use client';

import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from './CartProvider';
import { Button } from '@/components/ui/Button';
import { Price } from '@/components/ui/Price';
import { formatPrice } from '@/lib/utils';

export function CartDrawer() {
  const { cart, isOpen, closeDrawer, updateItem, removeItem, loading } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeDrawer}
        aria-hidden
      />

      <div className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E7E5E1] px-6 py-4">
          <h2 className="font-display text-base font-bold">
            Winkelwagen
            {(cart?.totalQuantity ?? 0) > 0 && (
              <span className="ml-2 text-sm font-normal text-[#5A5A5A]">
                ({cart!.totalQuantity})
              </span>
            )}
          </h2>
          <button
            onClick={closeDrawer}
            className="p-1 text-[#5A5A5A] hover:text-[#1A1A1A] transition-colors"
            aria-label="Sluiten"
          >
            <X size={20} />
          </button>
        </div>

        {/* Lines */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!cart || cart.lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <ShoppingBag size={40} className="text-[#E7E5E1]" />
              <p className="text-sm text-[#5A5A5A]">Je winkelwagen is leeg.</p>
              <Link
                href="/kranen"
                onClick={closeDrawer}
                className="inline-flex items-center justify-center h-8 px-3 text-xs font-medium border border-[#E7E5E1] rounded text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors"
              >
                Ontdek kranen
              </Link>
            </div>
          ) : (
            <ul className="space-y-5">
              {cart.lines.map((line) => (
                <li key={line.id} className="flex gap-4">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-[#E7E5E1] bg-[#F6F5F3]">
                    {line.merchandise.image ? (
                      <Image
                        src={line.merchandise.image.url}
                        alt={line.merchandise.image.altText ?? line.merchandise.product.title}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                    <Link
                      href={`/product/${line.merchandise.product.handle}`}
                      className="text-sm font-medium text-[#1A1A1A] hover:text-[#C9A96E] leading-snug"
                      onClick={closeDrawer}
                    >
                      {line.merchandise.product.title}
                    </Link>
                    <p className="text-xs text-[#5A5A5A]">
                      {line.merchandise.selectedOptions.map((o) => o.value).join(' / ')}
                    </p>
                    <Price
                      amount={line.merchandise.price.amount}
                      currencyCode={line.merchandise.price.currencyCode}
                      size="sm"
                    />

                    <div className="mt-auto flex items-center gap-2">
                      <button
                        onClick={() => updateItem(line.id, line.quantity - 1)}
                        disabled={loading}
                        className="flex h-7 w-7 items-center justify-center rounded border border-[#E7E5E1] text-[#1A1A1A] hover:border-[#1A1A1A] disabled:opacity-40 transition-colors"
                        aria-label="Minder"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-5 text-center text-sm tabular-nums">{line.quantity}</span>
                      <button
                        onClick={() => updateItem(line.id, line.quantity + 1)}
                        disabled={loading}
                        className="flex h-7 w-7 items-center justify-center rounded border border-[#E7E5E1] text-[#1A1A1A] hover:border-[#1A1A1A] disabled:opacity-40 transition-colors"
                        aria-label="Meer"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        onClick={() => removeItem(line.id)}
                        disabled={loading}
                        className="ml-auto text-[#5A5A5A] hover:text-red-500 transition-colors disabled:opacity-40"
                        aria-label="Verwijderen"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart && cart.lines.length > 0 && (
          <div className="border-t border-[#E7E5E1] px-6 py-5 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#5A5A5A]">Subtotaal</span>
              <span className="font-semibold">
                {formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}
              </span>
            </div>
            <p className="text-xs text-[#5A5A5A]">Verzendkosten worden berekend bij afrekenen</p>
            <Button
              className="w-full"
              onClick={() => { window.location.href = cart.checkoutUrl; }}
              disabled={loading}
            >
              Afrekenen
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
