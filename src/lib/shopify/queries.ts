import { PRODUCT_CARD_FRAGMENT } from './fragments';

export const GET_ALL_PRODUCTS = `
  ${PRODUCT_CARD_FRAGMENT}
  query GetAllProducts($first: Int = 100) {
    products(first: $first, sortKey: TITLE) {
      nodes { ...ProductCard }
    }
  }
`;

export const GET_PRODUCTS_BY_TYPE = `
  ${PRODUCT_CARD_FRAGMENT}
  query GetProductsByType($query: String!, $first: Int = 100) {
    products(first: $first, query: $query, sortKey: TITLE) {
      nodes { ...ProductCard }
    }
  }
`;

export const GET_PRODUCT = `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      descriptionHtml
      productType
      vendor
      seo { title description }
      featuredImage { url altText width height }
      images(first: 12) { nodes { url altText width height } }
      options { name values }
      montagewijze: metafield(namespace: "custom", key: "montagewijze") { value }
      serie: metafield(namespace: "custom", key: "serie") { value }
      materiaal: metafield(namespace: "custom", key: "materiaal") { value }
      levertijd: metafield(namespace: "custom", key: "levertijd") { value }
      priceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
      variants(first: 20) {
        nodes {
          id
          title
          availableForSale
          quantityAvailable
          sku
          barcode
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }
          image { url altText width height }
        }
      }
    }
  }
`;

export const GET_ALL_HANDLES = `
  query GetAllHandles($first: Int = 100) {
    products(first: $first) {
      nodes { handle updatedAt }
    }
  }
`;

export const GET_CART = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      cost {
        subtotalAmount { amount currencyCode }
        totalAmount { amount currencyCode }
      }
      lines(first: 100) {
        nodes {
          id
          quantity
          cost { totalAmount { amount currencyCode } }
          merchandise {
            ... on ProductVariant {
              id
              title
              sku
              price { amount currencyCode }
              image { url altText width height }
              selectedOptions { name value }
              product { handle title }
            }
          }
        }
      }
    }
  }
`;

export const PREDICTIVE_SEARCH = `
  query PredictiveSearch($query: String!) {
    predictiveSearch(query: $query, limit: 6, types: [PRODUCT]) {
      products {
        handle
        title
        featuredImage { url altText }
        priceRange { minVariantPrice { amount currencyCode } }
      }
    }
  }
`;
