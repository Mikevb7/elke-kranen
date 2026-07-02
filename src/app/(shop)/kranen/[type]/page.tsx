import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getProductsByType } from '@/lib/shopify';
import { Container } from '@/components/ui/Container';
import { FilterableProductBrowser } from '@/components/filters/FilterableProductBrowser';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { PRODUCT_TYPE_SLUGS, PRODUCT_TYPES } from '@/lib/constants';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  try {
    return PRODUCT_TYPES.map((t) => ({ type: t.slug }));
  } catch {
    return [];
  }
}

interface Props { params: Promise<{ type: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const label = PRODUCT_TYPES.find((t) => t.slug === type)?.label;
  if (!label) return {};
  return {
    title: label,
    description: `Ontdek onze ${label.toLowerCase()} — premium kwaliteit in meerdere afwerkingen.`,
  };
}

async function ProductBrowser({ type }: { type: string }) {
  const productType = PRODUCT_TYPE_SLUGS[type];
  const products = await getProductsByType(productType).catch(() => []);
  return <FilterableProductBrowser products={products} />;
}

export default async function KranenTypePage({ params }: Props) {
  const { type } = await params;
  const typeInfo = PRODUCT_TYPES.find((t) => t.slug === type);
  if (!typeInfo) notFound();

  return (
    <div className="py-10 lg:py-14">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-1.5 text-xs text-[#5A5A5A]">
          <Link href="/" className="hover:text-[#1A1A1A]">Home</Link>
          <ChevronRight size={12} />
          <Link href="/kranen" className="hover:text-[#1A1A1A]">Kranen</Link>
          <ChevronRight size={12} />
          <span className="text-[#1A1A1A] font-medium">{typeInfo.label}</span>
        </nav>

        <div className="mb-10">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#C9A96E]">Collectie</p>
          <h1 className="text-3xl font-bold lg:text-4xl">{typeInfo.label}</h1>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <ProductBrowser type={type} />
        </Suspense>
      </Container>
    </div>
  );
}
