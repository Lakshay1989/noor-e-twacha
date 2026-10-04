// Prices are integer paise. Ingredient lists and actives are INCI-style DRAFTS: the contract manufacturer must
// confirm every list, percentage and claim before launch. See docs/PRICING.md for how prices were set.
export type Concern = 'acne' | 'dullness' | 'oil' | 'dryness' | 'sun'
export type Category = 'cleanser' | 'serum' | 'moisturiser' | 'sunscreen' | 'lips' | 'kit'
export type Shape = 'pump' | 'dropper' | 'tube' | 'jar' | 'stick' | 'kit'
export type Role = 'hero' | 'core' | 'value'

export interface Theme {
  bg: [string, string] // backdrop gradient
  glass: string // container colour
  cap: string
  accent: string // label ink
}

export interface Product {
  slug: string
  name: string // full SEO name
  shortName: string
  tagline: string // one useful line for cards
  description: string
  size: string
  price: number
  mrp: number
  category: Category
  role: Role
  shape: Shape
  theme: Theme
  label: { title: string[]; big: string }
  concerns: Concern[]
  benefits: string[]
  how: string
  ingredients: string
  keyActives: string[]
  skinTypes: string
  includes?: string[]
  badge?: string // only badges that are verifiably true (no "bestseller" until there is sales data)
}

export const concernLabels: Record<Concern, string> = {
  acne: 'Acne & blackheads',
  dullness: 'Dullness & tan',
  oil: 'Oil & pores',
  dryness: 'Dryness',
  sun: 'Sun protection',
}

const base: Product[] = [
  {
    slug: 'niacinamide-10-zinc-serum',
    name: '10% Niacinamide + 1% Zinc PCA Face Serum',
    shortName: 'Niacinamide 10% Serum',
    tagline: 'Balances oil, refines the look of pores and evens tone.',
    description:
      'A lightweight serum with 10% niacinamide and 1% zinc PCA, a category-standard strength for oil control and uneven tone. It has a water-light texture that layers under moisturiser and sunscreen. Start every other day if your skin is new to niacinamide.',
    size: '30 ml',
    price: 44900,
    mrp: 59900,
    category: 'serum',
    role: 'hero',
    shape: 'dropper',
    theme: { bg: ['#f6e7d3', '#ecd2b2'], glass: '#fbf3e6', cap: '#b8643c', accent: '#8a4524' },
    label: { title: ['NIACINAMIDE', '+ ZINC'], big: '10%' },
    concerns: ['oil', 'acne', 'dullness'],
    benefits: ['Helps control surface oil', 'Visibly refines pores', 'Helps even out tone'],
    how: 'After cleansing, apply 3 to 4 drops to face and neck. Follow with moisturiser, and sunscreen in the morning. Morning or night.',
    ingredients:
      'Aqua, Niacinamide, Glycerin, Zinc PCA, Panthenol, Propanediol, Sodium Hyaluronate, Xanthan Gum, Phenoxyethanol, Ethylhexylglycerin.',
    keyActives: ['Niacinamide 10%', 'Zinc PCA 1%'],
    skinTypes: 'Oily, combination and normal skin',
  },
  {
    slug: 'vitamin-c-10-serum',
    name: '10% Vitamin C + Ferulic Acid Brightening Serum',
    shortName: 'Vitamin C 10% Serum',
    tagline: 'Brightens the look of dull, tanned skin. A stable vitamin C.',
    description:
      'Made with 10% ethyl ascorbic acid, a gentler and more stable form of vitamin C, paired with ferulic acid. Helps skin look brighter and more even with regular use. Best in the morning, followed by sunscreen.',
    size: '30 ml',
    price: 49900,
    mrp: 64900,
    category: 'serum',
    role: 'hero',
    shape: 'dropper',
    theme: { bg: ['#fbe9c3', '#f3cf8c'], glass: '#fff3d6', cap: '#c47a1a', accent: '#8f520a' },
    label: { title: ['VITAMIN C', '+ FERULIC'], big: '10%' },
    concerns: ['dullness'],
    benefits: ['Brightens a dull complexion', 'Antioxidant support', 'Helps fade the look of tan'],
    how: 'Morning: apply 3 to 4 drops on clean skin, then moisturiser and sunscreen. If your skin is sensitive, start every other day.',
    ingredients:
      'Aqua, Ethyl Ascorbic Acid, Propanediol, Glycerin, Ferulic Acid, Sodium Hyaluronate, Tocopherol, Citric Acid, Phenoxyethanol.',
    keyActives: ['Ethyl ascorbic acid 10%', 'Ferulic acid'],
    skinTypes: 'All skin types',
  },
  {
    slug: 'spf-50-daily-sunscreen',
    name: 'SPF 50 PA++++ Daily Sunscreen',
    shortName: 'SPF 50 Daily Sunscreen',
    tagline: 'Lightweight, broad-spectrum protection for everyday use.',
    description:
      'A lightweight fluid sunscreen with broad-spectrum UVA and UVB filters, made for daily wear in Indian weather. Sunscreen is the single biggest step for tan and uneven tone, and it is what lets Vitamin C and salicylic acid work to their potential.',
    size: '50 g',
    price: 39900,
    mrp: 49900,
    category: 'sunscreen',
    role: 'hero',
    shape: 'tube',
    theme: { bg: ['#fdeecf', '#f7d79a'], glass: '#fff8e8', cap: '#d9902a', accent: '#8f5a0a' },
    label: { title: ['DAILY', 'SUNSCREEN'], big: 'SPF 50' },
    concerns: ['sun', 'dullness'],
    benefits: ['Broad-spectrum UVA + UVB', 'Lightweight fluid finish', 'Made for daily wear'],
    how: 'Apply two finger-lengths to face and neck as the last step of your morning routine. Reapply every 2 to 3 hours in direct sun.',
    ingredients:
      'Aqua, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Ethylhexyl Triazone, Glycerin, Niacinamide, Tocopherol, Phenoxyethanol.',
    keyActives: ['SPF 50 PA++++', 'Broad spectrum'],
    skinTypes: 'All skin types',
  },
  {
    slug: 'ceramide-gel-moisturiser',
    name: 'Ceramide + Hyaluronic Acid Gel Moisturiser',
    shortName: 'Ceramide Gel Moisturiser',
    tagline: 'Oil-free hydration that supports the skin barrier.',
    description:
      'A cooling gel-cream with three ceramides, squalane and hyaluronic acid. Hydrates and supports the skin barrier while staying weightless in humid weather. Suits oily, combination and dry skin.',
    size: '50 g',
    price: 44900,
    mrp: 59900,
    category: 'moisturiser',
    role: 'core',
    shape: 'jar',
    theme: { bg: ['#efe5f1', '#ddcbe3'], glass: '#f8f1fa', cap: '#6b4a73', accent: '#563a5d' },
    label: { title: ['CERAMIDE', '+ HA GEL'], big: '3×' },
    concerns: ['dryness', 'oil'],
    benefits: ['3 ceramides + squalane', 'Light gel texture', 'Non-sticky under sunscreen'],
    how: 'Apply on face and neck after serum, morning and night.',
    ingredients:
      'Aqua, Glycerin, Squalane, Ceramide NP, Ceramide AP, Ceramide EOP, Sodium Hyaluronate, Cholesterol, Panthenol, Carbomer, Phenoxyethanol.',
    keyActives: ['Ceramide NP, AP, EOP', 'Hyaluronic acid', 'Squalane'],
    skinTypes: 'Oily, combination, normal and dry skin',
  },
  {
    slug: 'salicylic-acid-2-serum',
    name: '2% Salicylic Acid Clarifying Serum',
    shortName: 'Salicylic Acid 2% Serum',
    tagline: 'Helps clear blackheads and clogged pores.',
    description:
      'A 2% salicylic acid (BHA) serum that works inside the pore to help clear blackheads and whiteheads. Alcohol-free, with centella and allantoin to keep skin comfortable. Use in the evening and always wear sunscreen the next day.',
    size: '30 ml',
    price: 39900,
    mrp: 49900,
    category: 'serum',
    role: 'core',
    shape: 'dropper',
    theme: { bg: ['#e2eee6', '#c4dccd'], glass: '#f1f8f3', cap: '#2f6a55', accent: '#235240' },
    label: { title: ['SALICYLIC', 'ACID'], big: '2%' },
    concerns: ['acne', 'oil'],
    benefits: ['Targets blackheads and whiteheads', 'Alcohol-free', 'With centella + allantoin'],
    how: 'Evening: apply a thin layer on clean skin, away from the eyes. Begin with every other night. Use sunscreen the next morning.',
    ingredients:
      'Aqua, Salicylic Acid, Propanediol, Glycerin, Centella Asiatica Extract, Allantoin, Panthenol, Sodium Hydroxide, Phenoxyethanol.',
    keyActives: ['Salicylic acid 2%', 'Centella'],
    skinTypes: 'Oily and acne-prone skin',
  },
  {
    slug: 'gentle-gel-cleanser',
    name: 'Gentle Gel Face Cleanser',
    shortName: 'Gentle Gel Cleanser',
    tagline: 'Cleans off sweat and sunscreen without a tight, stripped feel.',
    description:
      'A low-foam gel face wash that lifts sweat, sunscreen and city grime while leaving skin comfortable. Fragrance-free and pH-balanced for twice-daily use.',
    size: '120 ml',
    price: 29900,
    mrp: 39900,
    category: 'cleanser',
    role: 'core',
    shape: 'pump',
    theme: { bg: ['#e6efe6', '#cfe0d0'], glass: '#f4f9f4', cap: '#2f4a3a', accent: '#2f4a3a' },
    label: { title: ['GENTLE GEL', 'CLEANSER'], big: 'pH' },
    concerns: ['oil', 'dryness'],
    benefits: ['Fragrance-free', 'Low-foam, non-stripping', 'Panthenol + allantoin'],
    how: 'Massage a pump onto damp skin for 30 seconds. Rinse with lukewarm water. Morning and night.',
    ingredients:
      'Aqua, Glycerin, Coco-Glucoside, Cocamidopropyl Betaine, Panthenol, Allantoin, Sodium Hyaluronate, Citric Acid, Phenoxyethanol.',
    keyActives: ['Panthenol', 'Allantoin', 'Hyaluronic acid'],
    skinTypes: 'All skin types',
  },
  {
    slug: 'kesar-lip-balm',
    name: 'Kesar Shea Lip Balm',
    shortName: 'Kesar Lip Balm',
    tagline: 'Soft, non-sticky lip care with shea butter and saffron.',
    description:
      'A rich, non-sticky balm with shea butter and a hint of kesar (saffron). Keeps lips soft through air-conditioned rooms and dry winters.',
    size: '5 g',
    price: 14900,
    mrp: 19900,
    category: 'lips',
    role: 'value',
    shape: 'stick',
    theme: { bg: ['#f8e4cf', '#efc9a3'], glass: '#fcefdf', cap: '#b8643c', accent: '#8a4524' },
    label: { title: ['KESAR', 'LIP BALM'], big: 'Shea' },
    concerns: ['dryness'],
    benefits: ['Shea butter + saffron', 'Non-sticky finish', 'Wear day or night'],
    how: 'Apply as often as needed. Can be worn overnight.',
    ingredients:
      'Butyrospermum Parkii (Shea) Butter, Ricinus Communis Seed Oil, Cera Alba, Tocopheryl Acetate, Crocus Sativus Extract, Parfum.',
    keyActives: ['Shea butter', 'Kesar'],
    skinTypes: 'All lips',
  },
]

const by = (slug: string) => base.find((p) => p.slug === slug)!

function kit(p: Omit<Product, 'mrp' | 'size' | 'category' | 'shape' | 'skinTypes' | 'keyActives' | 'ingredients'> & { includes: string[] }): Product {
  return {
    ...p,
    size: `${p.includes.length} products`,
    category: 'kit',
    shape: 'kit',
    mrp: p.includes.reduce((s, slug) => s + by(slug).mrp, 0),
    keyActives: p.includes.map((s) => by(s).shortName),
    skinTypes: 'See each product',
    ingredients: 'See each product page for the full ingredient list.',
  }
}

const kits: Product[] = [
  kit({
    slug: 'daily-glow-kit',
    name: 'Daily Glow Kit: Cleanser, Vitamin C, Moisturiser & SPF 50',
    shortName: 'Daily Glow Kit',
    tagline: 'A complete 4-step morning routine for brighter-looking skin.',
    description:
      'Everything for a bright, protected morning in one box: cleanse, Vitamin C, moisturise, then sunscreen. Priced below the four products bought separately.',
    price: 139900,
    role: 'value',
    theme: { bg: ['#f3e6d2', '#e6cfae'], glass: '#faf1e2', cap: '#2f4a3a', accent: '#2f4a3a' },
    label: { title: ['DAILY GLOW', 'KIT'], big: '4' },
    concerns: ['dullness', 'sun'],
    benefits: ['Complete AM routine', 'Four full-size products', 'Priced below buying separately'],
    how: 'Cleanse, Vitamin C serum, moisturiser, then sunscreen. Every morning.',
    includes: ['gentle-gel-cleanser', 'vitamin-c-10-serum', 'ceramide-gel-moisturiser', 'spf-50-daily-sunscreen'],
  }),
  kit({
    slug: 'clear-skin-kit',
    name: 'Clear Skin Kit: Cleanser, Salicylic Serum, Moisturiser & SPF 50',
    shortName: 'Clear Skin Kit',
    tagline: 'A simple, gentle routine for oily and breakout-prone skin.',
    description:
      'A calm routine for oily and acne-prone skin: cleanse, treat with salicylic acid in the evening, moisturise and protect with sunscreen. Priced below the four products bought separately.',
    price: 129900,
    role: 'value',
    theme: { bg: ['#e0ece4', '#c3dbca'], glass: '#f0f7f2', cap: '#2f6a55', accent: '#235240' },
    label: { title: ['CLEAR SKIN', 'KIT'], big: '4' },
    concerns: ['acne', 'oil'],
    benefits: ['Complete AM + PM routine', 'Four full-size products', 'Priced below buying separately'],
    how: 'Morning: cleanse, moisturiser, sunscreen. Evening: cleanse, salicylic serum (every other night to start), moisturiser.',
    includes: ['gentle-gel-cleanser', 'salicylic-acid-2-serum', 'ceramide-gel-moisturiser', 'spf-50-daily-sunscreen'],
  }),
]

export const products: Product[] = [...base, ...kits]
export const bySlug = (slug: string) => products.find((p) => p.slug === slug)

export const discountPct = (p: Pick<Product, 'price' | 'mrp'>) => Math.round(((p.mrp - p.price) / p.mrp) * 100)
export const savings = (p: Pick<Product, 'price' | 'mrp'>) => p.mrp - p.price
// What a kit would cost bought as separate products at our selling prices.
export const separatePrice = (p: Product) => (p.includes ?? []).reduce((s, slug) => s + bySlug(slug)!.price, 0)
