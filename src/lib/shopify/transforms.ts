import type { ShopifyProductRaw, ShopifyVariantRaw, Product, Variant, Cart, CartLine } from './types';

export function isPurchasable(v: Pick<Variant, 'availableForSale' | 'price' | 'barcode'>): boolean {
  return v.availableForSale && Number(v.price.amount) > 0 && !!v.barcode;
}

function transformVariant(v: ShopifyVariantRaw): Variant {
  const finishOption = v.selectedOptions.find((o) => o.name === 'Afwerking');
  return {
    id: v.id,
    title: v.title ?? '',
    availableForSale: v.availableForSale,
    quantityAvailable: v.quantityAvailable,
    sku: v.sku,
    barcode: v.barcode,
    price: v.price,
    compareAtPrice: v.compareAtPrice,
    selectedOptions: v.selectedOptions,
    image: v.image,
    finish: finishOption?.value,
    isPurchasable: isPurchasable(v),
  };
}

export function transformProduct(raw: ShopifyProductRaw): Product {
  const variants = raw.variants.nodes.map(transformVariant);
  const finishes = [
    ...new Set(
      variants
        .map((v) => v.finish)
        .filter((f): f is string => !!f)
    ),
  ];

  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    descriptionHtml: raw.descriptionHtml,
    productType: raw.productType,
    vendor: raw.vendor,
    seo: raw.seo,
    featuredImage: raw.featuredImage,
    images: raw.images.nodes,
    priceRange: raw.priceRange,
    options: raw.options,
    montagewijze: raw.montagewijze?.value,
    serie: raw.serie?.value,
    materiaal: raw.materiaal?.value,
    levertijd: raw.levertijd?.value,
    variants,
    finishes,
  };
}

export function transformCart(raw: {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: { amount: string; currencyCode: string }; totalAmount: { amount: string; currencyCode: string } };
  lines: { nodes: unknown[] };
}): Cart {
  const lines = (raw.lines.nodes as Record<string, unknown>[]).map((line): CartLine => {
    const merchandise = line.merchandise as Record<string, unknown>;
    return {
      id: line.id as string,
      quantity: line.quantity as number,
      cost: line.cost as CartLine['cost'],
      merchandise: {
        id: merchandise.id as string,
        title: merchandise.title as string,
        sku: merchandise.sku as string | undefined,
        price: merchandise.price as CartLine['merchandise']['price'],
        image: merchandise.image as CartLine['merchandise']['image'],
        selectedOptions: merchandise.selectedOptions as CartLine['merchandise']['selectedOptions'],
        product: merchandise.product as CartLine['merchandise']['product'],
      },
    };
  });

  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    totalQuantity: raw.totalQuantity,
    cost: raw.cost,
    lines,
  };
}
