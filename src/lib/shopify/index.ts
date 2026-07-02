import type { Product, Cart, CartLineInput, CartLineUpdateInput, ShopifyProductRaw } from './types';
import { transformProduct, transformCart } from './transforms';
import { GET_ALL_PRODUCTS, GET_PRODUCTS_BY_TYPE, GET_PRODUCT, GET_ALL_HANDLES, GET_CART, PREDICTIVE_SEARCH } from './queries';
import { CART_CREATE, CART_LINES_ADD, CART_LINES_UPDATE, CART_LINES_REMOVE } from './mutations';

const endpoint = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/${process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION}/graphql.json`;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

type FetchOpts = {
  query: string;
  variables?: Record<string, unknown>;
  tags?: string[];
  cache?: RequestCache;
};

export async function shopifyFetch<T>({ query, variables, tags, cache = 'force-cache' }: FetchOpts): Promise<T> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    ...(tags?.length ? { next: { tags } } : {}),
  });

  if (!res.ok) {
    throw new Error(`Shopify fetch failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }
  return json.data as T;
}

export async function getAllProducts(): Promise<Product[]> {
  const data = await shopifyFetch<{ products: { nodes: ShopifyProductRaw[] } }>({
    query: GET_ALL_PRODUCTS,
    tags: ['products'],
  });
  return data.products.nodes.map(transformProduct);
}

export async function getProductsByType(productType: string): Promise<Product[]> {
  const data = await shopifyFetch<{ products: { nodes: ShopifyProductRaw[] } }>({
    query: GET_PRODUCTS_BY_TYPE,
    variables: { query: `product_type:'${productType}'` },
    tags: ['products'],
  });
  return data.products.nodes.map(transformProduct);
}

export async function getProduct(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<{ product: ShopifyProductRaw | null }>({
    query: GET_PRODUCT,
    variables: { handle },
    tags: ['products'],
  });
  return data.product ? transformProduct(data.product) : null;
}

export async function getAllHandles(): Promise<{ handle: string; updatedAt: string }[]> {
  const data = await shopifyFetch<{ products: { nodes: { handle: string; updatedAt: string }[] } }>({
    query: GET_ALL_HANDLES,
    tags: ['products'],
  });
  return data.products.nodes;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: Parameters<typeof transformCart>[0] | null }>({
    query: GET_CART,
    variables: { cartId },
    cache: 'no-store',
  });
  return data.cart ? transformCart(data.cart) : null;
}

export async function createCart(lines: CartLineInput[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: { cart: Parameters<typeof transformCart>[0]; userErrors: { message: string }[] } }>({
    query: CART_CREATE,
    variables: { lines },
    cache: 'no-store',
  });
  if (data.cartCreate.userErrors.length) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }
  return transformCart(data.cartCreate.cart);
}

export async function addToCart(cartId: string, lines: CartLineInput[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: Parameters<typeof transformCart>[0]; userErrors: { message: string }[] } }>({
    query: CART_LINES_ADD,
    variables: { cartId, lines },
    cache: 'no-store',
  });
  if (data.cartLinesAdd.userErrors.length) {
    throw new Error(data.cartLinesAdd.userErrors[0].message);
  }
  return transformCart(data.cartLinesAdd.cart);
}

export async function updateCart(cartId: string, lines: CartLineUpdateInput[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: Parameters<typeof transformCart>[0]; userErrors: { message: string }[] } }>({
    query: CART_LINES_UPDATE,
    variables: { cartId, lines },
    cache: 'no-store',
  });
  if (data.cartLinesUpdate.userErrors.length) {
    throw new Error(data.cartLinesUpdate.userErrors[0].message);
  }
  return transformCart(data.cartLinesUpdate.cart);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: Parameters<typeof transformCart>[0]; userErrors: { message: string }[] } }>({
    query: CART_LINES_REMOVE,
    variables: { cartId, lineIds },
    cache: 'no-store',
  });
  if (data.cartLinesRemove.userErrors.length) {
    throw new Error(data.cartLinesRemove.userErrors[0].message);
  }
  return transformCart(data.cartLinesRemove.cart);
}

export async function predictiveSearch(query: string): Promise<{
  handle: string;
  title: string;
  featuredImage?: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
}[]> {
  const data = await shopifyFetch<{
    predictiveSearch: {
      products: {
        handle: string;
        title: string;
        featuredImage?: { url: string; altText: string | null } | null;
        priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
      }[];
    };
  }>({
    query: PREDICTIVE_SEARCH,
    variables: { query },
    cache: 'no-store',
  });
  return data.predictiveSearch.products;
}
