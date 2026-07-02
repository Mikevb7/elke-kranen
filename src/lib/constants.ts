export const SITE_NAME = 'Elke Kranen';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://elkekranen.nl';

export const ANNOUNCEMENT = '✦ Gratis verzending vanaf €150 · 14 dagen bedenktijd · 2 jaar garantie';

export const FREE_SHIPPING_THRESHOLD = 150;
export const WARRANTY_YEARS = 2;
export const RETURN_DAYS = 14;
export const DEFAULT_DELIVERY = '3–5 werkdagen';

export const FINISH_HEX: Record<string, string> = {
  Chroom: 'linear-gradient(135deg, #e8e8e8 0%, #ffffff 40%, #c0c0c0 60%, #a8a8a8 100%)',
  Matzwart: '#1A1A1A',
  'Gunmetal zwart': '#3D3D3D',
  'Geborsteld goud': '#C9A96E',
  'Rosé goud': '#B76E79',
};

export const PRODUCT_TYPES = [
  { label: 'Douchekranen', slug: 'douchekranen', value: 'Douchekranen' },
  { label: 'Wastafelkranen', slug: 'wastafelkranen', value: 'Wastafelkranen' },
  { label: 'Badkranen', slug: 'badkranen', value: 'Badkranen' },
  { label: 'Accessoires', slug: 'badkameraccessoires', value: 'Badkameraccessoires' },
] as const;

export const SERIES = ['MONZA', 'TIVOLI'] as const;
export type Serie = (typeof SERIES)[number];

export const MOUNT_OPTIONS = ['Opbouw', 'Inbouw'] as const;

export const NAV_LINKS = [
  {
    label: 'Kranen',
    href: '/kranen',
    children: PRODUCT_TYPES.map((t) => ({ label: t.label, href: `/kranen/${t.slug}` })),
  },
  { label: 'Collecties', href: '/collecties', children: [
    { label: 'MONZA', href: '/collecties/monza' },
    { label: 'TIVOLI', href: '/collecties/tivoli' },
  ]},
  { label: 'Keuzehulp', href: '/keuzehulp' },
] as const;

export const USPS = [
  { icon: 'truck', text: `Gratis verzending v.a. €${FREE_SHIPPING_THRESHOLD}` },
  { icon: 'shield', text: `${WARRANTY_YEARS} jaar garantie` },
  { icon: 'rotate-ccw', text: `${RETURN_DAYS} dagen retour` },
  { icon: 'headphones', text: 'Vakkundige service' },
] as const;

export const PRODUCT_TYPE_SLUGS: Record<string, string> = {
  douchekranen: 'Douchekranen',
  wastafelkranen: 'Wastafelkranen',
  badkranen: 'Badkranen',
  badkameraccessoires: 'Badkameraccessoires',
};
