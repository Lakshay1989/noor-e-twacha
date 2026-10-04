import { products, concernLabels, type Concern, type Product } from '@/data/products'

export interface Collection {
  slug: string
  title: string
  seoTitle: string
  description: string
  intro: string
  items: Product[]
}

const concernCopy: Record<Concern, { seoTitle: string; description: string; intro: string }> = {
  acne: {
    seoTitle: 'Skincare for Acne & Blackheads',
    description: 'Salicylic acid, niacinamide and gentle basics for acne-prone and blackhead-prone skin. Simple routines, full ingredient lists.',
    intro: 'Clogged pores and breakouts respond best to a calm, consistent routine. Start with salicylic acid a few nights a week, and always finish the day with moisturiser and the morning with sunscreen.',
  },
  dullness: {
    seoTitle: 'Brightening Skincare for Dullness & Tan',
    description: 'Vitamin C, niacinamide and daily sunscreen to brighten dull, tanned skin. Ingredient percentages printed on the pack.',
    intro: 'Dullness and tan usually come down to sun exposure and uneven tone. A morning Vitamin C serum plus sunscreen is the most effective place to start.',
  },
  oil: {
    seoTitle: 'Skincare for Oily Skin & Large-Looking Pores',
    description: 'Niacinamide, salicylic acid and light gel textures for oily and combination skin in humid weather.',
    intro: 'Oily skin still needs hydration. We pair oil-balancing actives with gel textures that never feel heavy, even in monsoon humidity.',
  },
  dryness: {
    seoTitle: 'Hydrating Skincare for Dry Skin',
    description: 'Ceramide and hyaluronic acid moisturiser, a gentle cleanser and shea lip balm for dry, tight skin.',
    intro: 'Dry skin needs gentle cleansing and a moisturiser that supports the barrier. Ceramides, squalane and hyaluronic acid do exactly that.',
  },
  sun: {
    seoTitle: 'Sunscreen & Sun Care for Indian Skin',
    description: 'Lightweight SPF 50 PA++++ daily sunscreen for face. Broad-spectrum UVA and UVB protection.',
    intro: 'If you do one thing for your skin, wear sunscreen daily. Ours is a lightweight fluid made for everyday wear.',
  },
}

export const collections: Collection[] = [
  ...(Object.keys(concernLabels) as Concern[]).map((c) => ({
    slug: c,
    title: concernLabels[c],
    ...concernCopy[c],
    items: products.filter((p) => !p.includes && p.concerns.includes(c)),
  })),
  {
    slug: 'serums',
    title: 'Serums',
    seoTitle: 'Face Serums: Niacinamide, Vitamin C & Salicylic Acid',
    description: 'Targeted face serums with clearly labelled actives: 10% niacinamide, 10% vitamin C and 2% salicylic acid.',
    intro: 'Serums deliver concentrated actives. Pick one for your main concern and add a second only when your skin is comfortable.',
    items: products.filter((p) => p.category === 'serum'),
  },
  {
    slug: 'routine-kits',
    title: 'Routine kits',
    seoTitle: 'Skincare Routine Kits',
    description: 'Complete 4-step skincare routines in one box, priced below the products bought separately.',
    intro: 'Not sure where to begin? A kit gives you a complete routine at a lower price than buying the products one by one.',
    items: products.filter((p) => p.includes),
  },
]

export const collectionBySlug = (slug: string) => collections.find((c) => c.slug === slug)
