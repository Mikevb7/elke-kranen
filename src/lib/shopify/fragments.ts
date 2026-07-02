export const PRODUCT_CARD_FRAGMENT = `
  fragment ProductCard on Product {
    id
    handle
    title
    productType
    vendor
    featuredImage { url altText width height }
    images(first: 2) { nodes { url altText width height } }
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    options { name values }
    montagewijze: metafield(namespace: "custom", key: "montagewijze") { value }
    serie: metafield(namespace: "custom", key: "serie") { value }
    variants(first: 20) {
      nodes {
        id
        availableForSale
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        barcode
        image { url altText width height }
        selectedOptions { name value }
      }
    }
  }
`;
