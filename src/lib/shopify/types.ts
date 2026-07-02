export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

export interface ShopifyVariantRaw {
  id: string;
  title?: string;
  availableForSale: boolean;
  quantityAvailable?: number;
  sku?: string;
  barcode?: string | null;
  price: ShopifyMoney;
  compareAtPrice?: ShopifyMoney | null;
  selectedOptions: ShopifySelectedOption[];
  image?: ShopifyImage | null;
}

export interface ShopifyProductRaw {
  id: string;
  handle: string;
  title: string;
  descriptionHtml?: string;
  productType: string;
  vendor: string;
  seo?: { title: string; description: string };
  featuredImage?: ShopifyImage | null;
  images: { nodes: ShopifyImage[] };
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  options: { name: string; values: string[] }[];
  montagewijze?: { value: string } | null;
  serie?: { value: string } | null;
  materiaal?: { value: string } | null;
  levertijd?: { value: string } | null;
  variants: { nodes: ShopifyVariantRaw[] };
}

export interface Variant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable?: number;
  sku?: string;
  barcode?: string | null;
  price: ShopifyMoney;
  compareAtPrice?: ShopifyMoney | null;
  selectedOptions: ShopifySelectedOption[];
  image?: ShopifyImage | null;
  finish?: string;
  isPurchasable: boolean;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  descriptionHtml?: string;
  productType: string;
  vendor: string;
  seo?: { title: string; description: string };
  featuredImage?: ShopifyImage | null;
  images: ShopifyImage[];
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  options: { name: string; values: string[] }[];
  montagewijze?: string;
  serie?: string;
  materiaal?: string;
  levertijd?: string;
  variants: Variant[];
  finishes: string[];
}

export interface CartLine {
  id: string;
  quantity: number;
  cost: { totalAmount: ShopifyMoney };
  merchandise: {
    id: string;
    title: string;
    sku?: string;
    price: ShopifyMoney;
    image?: ShopifyImage | null;
    selectedOptions: ShopifySelectedOption[];
    product: { handle: string; title: string };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
  };
  lines: CartLine[];
}

export interface CartLineInput {
  merchandiseId: string;
  quantity: number;
}

export interface CartLineUpdateInput {
  id: string;
  quantity: number;
}
