'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ShopifyImage } from '@/lib/shopify/types';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryProps {
  images: ShopifyImage[];
  title: string;
  activeImage?: ShopifyImage | null;
}

export function Gallery({ images, title, activeImage }: GalleryProps) {
  const allImages = activeImage
    ? [activeImage, ...images.filter((i) => i.url !== activeImage.url)]
    : images;
  const [current, setCurrent] = useState(0);
  const displayed = allImages[current] ?? null;

  const prev = () => setCurrent((c) => (c - 1 + allImages.length) % allImages.length);
  const next = () => setCurrent((c) => (c + 1) % allImages.length);

  return (
    <div className="flex flex-col gap-3">
      {/* Main */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#F6F5F3]">
        {displayed ? (
          <Image
            src={displayed.url}
            alt={displayed.altText ?? title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-6"
            priority
          />
        ) : (
          <PlaceholderImage title={title} className="absolute inset-0 h-full w-full" />
        )}

        {allImages.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow backdrop-blur hover:bg-white transition-colors"
              aria-label="Vorige"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow backdrop-blur hover:bg-white transition-colors"
              aria-label="Volgende"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allImages.map((img, i) => (
            <button
              key={img.url}
              onClick={() => setCurrent(i)}
              className={cn(
                'relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                i === current ? 'border-[#1A1A1A]' : 'border-transparent ring-1 ring-[#E7E5E1] hover:ring-[#1A1A1A]'
              )}
            >
              <Image
                src={img.url}
                alt={img.altText ?? `${title} afbeelding ${i + 1}`}
                fill
                sizes="64px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
