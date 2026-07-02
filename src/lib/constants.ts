export const SITE_NAME = 'Elke Kranen';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://elkekranen.nl';

export const ANNOUNCEMENT = '✦ Gratis verzending vanaf €150 · 14 dagen bedenktijd · 2 jaar garantie';

export const FREE_SHIPPING_THRESHOLD = 150;
export const WARRANTY_YEARS = 2;
export const RETURN_DAYS = 14;
export const DEFAULT_DELIVERY = '3–5 werkdagen';

export const FINISH_HEX: Record<string, string> = {
  Chroom:
    'linear-gradient(135deg, #c8c8c8 0%, #efefef 22%, #ffffff 38%, #eaeaea 50%, #c4c4c4 66%, #d8d8d8 100%)',
  Matzwart: '#1A1A1A',
  'Gunmetal zwart':
    'linear-gradient(135deg, #2a2a2a 0%, #484848 20%, #606060 36%, #525252 50%, #3e3e3e 66%, #2a2a2a 100%)',
  'Geborsteld goud':
    'linear-gradient(100deg, #7A5800 0%, #B8860B 12%, #D4A017 22%, #FFD700 32%, #EFCB44 40%, #D4A017 50%, #C9A020 60%, #FFD700 70%, #D4A017 80%, #B8860B 90%, #7A5800 100%)',
  'Rosé goud':
    'linear-gradient(135deg, #8C5048 0%, #C4847A 22%, #D8A09A 38%, #EDCAC4 52%, #D8A09A 64%, #C4847A 78%, #9E6860 100%)',
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
