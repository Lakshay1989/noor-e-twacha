// The only place the brand lives. Rename here and it changes everywhere.
export const brand = {
  name: 'Noor-e-Twacha',
  tagline: 'Skincare that keeps up with Indian weather.',
  description:
    'Honest skincare for heat, humidity and pollution. Every active and its percentage is printed on the pack, with simple routines and fair prices.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://noor-e-twacha.in',
  // Country code + number, no "+". Replace with the real business WhatsApp number.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? '919999999999',
  email: 'hello@noor-e-twacha.in', // placeholder until the domain's mailbox exists
} as const

export const commerce = {
  freeShippingOver: 59900, // paise
  shippingFee: 6900,
  codFee: 4000,
  upiDiscountPct: 5, // small nudge towards prepaid
  // While true, every product is sold as a pre-order and the site never claims stock or a dispatch date.
  // Flip to false once there is real inventory.
  preorder: true,
} as const

export const whatsappLink = (text: string) => `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(text)}`
