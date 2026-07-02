import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getProduct, getAllHandles, getAllProducts } from '@/lib/shopify';
import { Container } from '@/components/ui/Container';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SITE_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface Props { params: Promise<{ handle: string }> }

export async function generateStaticParams() {
  try {
    const handles = await getAllHandles();
    return handles.map((h) => ({ handle: h.handle }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle).catch(() => null);
  if (!product) return {};

  return {
    title: product.seo?.title ?? product.title,
    description: product.seo?.description ?? `Ontdek de ${product.title} bij ${SITE_NAME}. Premium kwaliteit in meerdere afwerkingen.`,
    openGraph: {
      title: product.seo?.title ?? product.title,
      images: product.featuredImage ? [{ url: product.featuredImage.url }] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const [product, allProducts] = await Promise.all([
    getProduct(handle).catch(() => null),
    getAllProducts().catch(() => []),
  ]);

  if (!product) notFound();

  const related = allProducts
    .filter((p) => p.handle !== handle && (p.serie === product.serie || p.productType === product.productType))
    .slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    brand: { '@type': 'Brand', name: SITE_NAME },
    description: product.seo?.description ?? product.title,
    image: product.images.map((i) => i.url),
    offers: product.variants.filter((v) => v.isPurchasable).map((v) => ({
      '@type': 'Offer',
      price: v.price.amount,
      priceCurrency: v.price.currencyCode,
      availability: v.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${handle}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="py-8 lg:py-12">
        <Container>
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-1.5 text-xs text-[#5A5A5A]">
            <Link href="/" className="hover:text-[#1A1A1A]">Home</Link>
            <ChevronRight size={12} />
            <Link href="/kranen" className="hover:text-[#1A1A1A]">Kranen</Link>
            <ChevronRight size={12} />
            <span className="text-[#1A1A1A] font-medium line-clamp-1">{product.title}</span>
          </nav>

          <ProductInfo product={product} />

          {/* Cross-sell */}
          {related.length > 0 && (
            <section className="mt-20 border-t border-[#E7E5E1] pt-14">
              <h2 className="mb-8 text-xl font-bold">Combineert goed met</h2>
              <ProductGrid products={related} />
            </section>
          )}
        </Container>
      </div>
    </>
  );
}
