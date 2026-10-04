// The only place the brand lives. Rename here and it changes everywhere.
export const brand = {
  name: 'Ojas',
  tagline: 'Skincare, made for Indian weather.',
  description:
    'Simple, honest skincare for heat, humidity and pollution. Short ingredient lists, clear percentages, fair prices.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ojasskin.in',
  // Country code + number, no "+". Replace with the real business WhatsApp number.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? '919999999999',
  email: 'hello@ojasskin.in',
  instagram: 'ojas.skin',
} as const

export const commerce = {
  freeShippingOver: 59900, // paise
  shippingFee: 6900,
  codFee: 4000,
  upiDiscountPct: 5, // small nudge towards prepaid
} as const
