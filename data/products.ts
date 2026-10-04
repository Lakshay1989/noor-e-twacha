// Prices are integer paise. Ingredient lists are INCI-style drafts: have your manufacturer confirm
// every list, percentage and claim before launch.
export type Concern = 'acne' | 'dullness' | 'oil' | 'dryness' | 'sun' | 'basics'
export type Shape = 'pump' | 'dropper' | 'tube' | 'jar' | 'stick' | 'kit'

export interface Product {
  slug: string
  name: string
  short: string
  description: string
  size: string
  price: number
  mrp: number
  shape: Shape
  color: string // bottle colour
  accent: string // label colour
  concerns: Concern[]
  how: string
  ingredients: string
  keyActives: string[]
  preorder?: string // ships-in note, if not in stock yet
  includes?: string[] // slugs, for bundles
  badge?: string
}

export const concernLabels: Record<Concern, string> = {
  acne: 'Acne & blackheads',
  dullness: 'Dullness & tan',
  oil: 'Oil & pores',
  dryness: 'Dryness',
  sun: 'Sun protection',
  basics: 'Daily basics',
}

export const products: Product[] = [
  {
    slug: 'barrier-cloud-cleanser',
    name: 'Barrier Cloud Cleanser',
    short: 'Gentle gel cleanser that rinses clean without squeaky tightness.',
    description:
      'A low-foam gel cleanser for face. Lifts sweat, sunscreen and city grime while leaving your skin barrier comfortable. Fragrance-free and pH-balanced for daily use, morning and night.',
    size: '120 ml',
    price: 34900,
    mrp: 42900,
    shape: 'pump',
    color: '#e8efe6',
    accent: '#2f4a3a',
    concerns: ['basics', 'dryness', 'oil'],
    how: 'Massage a pump onto damp skin for 30 seconds. Rinse with lukewarm water. Morning and night.',
    ingredients:
      'Aqua, Glycerin, Coco-Glucoside, Cocamidopropyl Betaine, Panthenol (Vitamin B5), Allantoin, Sodium Hyaluronate, Citric Acid, Phenoxyethanol.',
    keyActives: ['Panthenol', 'Allantoin', 'Hyaluronic acid'],
    badge: 'Bestseller',
  },
  {
    slug: 'niacinamide-zinc-serum',
    name: 'Niacinamide 5% + Zinc Serum',
    short: 'Lightweight serum for oil balance, visible pores and uneven tone.',
    description:
      'A water-light serum with 5% niacinamide and 0.5% zinc PCA. Sinks in without stickiness, even in humid weather. Works well under sunscreen and makeup.',
    size: '30 ml',
    price: 49900,
    mrp: 59900,
    shape: 'dropper',
    color: '#f3e3c8',
    accent: '#b8643c',
    concerns: ['oil', 'acne', 'dullness'],
    how: 'After cleansing, apply 3 to 4 drops to face and neck. Follow with moisturiser. Morning and night.',
    ingredients:
      'Aqua, Niacinamide (5%), Glycerin, Zinc PCA (0.5%), Panthenol, Propanediol, Sodium Hyaluronate, Xanthan Gum, Phenoxyethanol, Ethylhexylglycerin.',
    keyActives: ['Niacinamide 5%', 'Zinc PCA 0.5%'],
    badge: 'Most loved',
  },
  {
    slug: 'vitamin-c-glow-serum',
    name: 'Vitamin C 10% Glow Serum',
    short: 'Brightening serum for tan, dullness and sun-dulled skin.',
    description:
      'Made with 10% ethyl ascorbic acid, a gentler and more stable form of vitamin C, plus ferulic acid. Helps skin look brighter and more even over time. Best used in the morning before sunscreen.',
    size: '30 ml',
    price: 59900,
    mrp: 74900,
    shape: 'dropper',
    color: '#f6d9a8',
    accent: '#9a4a1c',
    concerns: ['dullness'],
    how: 'Morning: 3 to 4 drops on clean skin, then moisturiser and sunscreen. Start every other day if your skin is sensitive.',
    ingredients:
      'Aqua, Ethyl Ascorbic Acid (10%), Propanediol, Glycerin, Ferulic Acid, Sodium Hyaluronate, Tocopherol, Citric Acid, Phenoxyethanol.',
    keyActives: ['Ethyl ascorbic acid 10%', 'Ferulic acid'],
  },
  {
    slug: 'salicylic-clear-serum',
    name: 'Salicylic Acid 2% Clear Serum',
    short: 'Targets blackheads, clogged pores and breakouts.',
    description:
      'A 2% salicylic acid (BHA) serum that works inside the pore to help clear blackheads and whiteheads. Alcohol-free and soothing with centella and allantoin.',
    size: '30 ml',
    price: 44900,
    mrp: 54900,
    shape: 'dropper',
    color: '#dce8e0',
    accent: '#2f6a55',
    concerns: ['acne', 'oil'],
    how: 'Evening: apply a thin layer on clean skin, away from eyes. Use every other night to begin. Always use sunscreen the next morning.',
    ingredients:
      'Aqua, Salicylic Acid (2%), Propanediol, Glycerin, Centella Asiatica Extract, Allantoin, Panthenol, Sodium Hydroxide, Phenoxyethanol.',
    keyActives: ['Salicylic acid 2%', 'Centella'],
  },
  {
    slug: 'ceramide-gel-moisturiser',
    name: 'Ceramide + Hyaluronic Gel Moisturiser',
    short: 'Oil-free gel cream that hydrates without heaviness.',
    description:
      'A cooling gel-cream with ceramides and three weights of hyaluronic acid. Hydrates deeply and supports the skin barrier, yet feels weightless in the Indian summer. Suits oily, combination and dry skin.',
    size: '50 g',
    price: 44900,
    mrp: 54900,
    shape: 'jar',
    color: '#efe6f0',
    accent: '#6b4a73',
    concerns: ['dryness', 'basics', 'oil'],
    how: 'Apply on face and neck after serum, morning and night.',
    ingredients:
      'Aqua, Glycerin, Squalane, Ceramide NP, Ceramide AP, Ceramide EOP, Sodium Hyaluronate, Cholesterol, Panthenol, Carbomer, Phenoxyethanol.',
    keyActives: ['3 ceramides', 'Hyaluronic acid', 'Squalane'],
    badge: 'Bestseller',
  },
  {
    slug: 'daily-sunscreen-spf50',
    name: 'Invisible Daily Sunscreen SPF 50 PA++++',
    short: 'No white cast, no greasy shine. Made for brown skin.',
    description:
      'A lightweight, fluid sunscreen with broad-spectrum UVA and UVB filters. Designed with no white cast on Indian skin tones, and sits well under makeup. Available as pre-order while the first batch completes independent SPF testing.',
    size: '50 g',
    price: 54900,
    mrp: 64900,
    shape: 'tube',
    color: '#fbe7c6',
    accent: '#c47a1a',
    concerns: ['sun', 'basics'],
    how: 'Apply two finger-lengths to face and neck as the last step of your morning routine. Reapply every 2 to 3 hours in direct sun.',
    ingredients:
      'Aqua, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Ethylhexyl Triazone, Glycerin, Niacinamide, Tocopherol, Phenoxyethanol.',
    keyActives: ['Broad-spectrum filters', 'Niacinamide'],
    preorder: 'Ships in about 3 weeks',
  },
  {
    slug: 'kesar-lip-balm',
    name: 'Kesar Lip Balm',
    short: 'Soft, shea-rich lip care with a hint of saffron.',
    description:
      'A rich, non-sticky balm with shea butter, ghee-derived fatty acids and a whisper of kesar. Keeps lips soft through AC rooms and dry winters.',
    size: '5 g',
    price: 19900,
    mrp: 24900,
    shape: 'stick',
    color: '#f4d9b8',
    accent: '#b8643c',
    concerns: ['dryness', 'basics'],
    how: 'Apply as often as needed. Safe to wear overnight.',
    ingredients:
      'Butyrospermum Parkii (Shea) Butter, Ricinus Communis Seed Oil, Cera Alba, Tocopheryl Acetate, Crocus Sativus Extract, Parfum.',
    keyActives: ['Shea butter', 'Kesar'],
  },
  {
    slug: 'daily-glow-kit',
    name: 'Daily Glow Kit',
    short: 'Cleanser + Vitamin C + moisturiser + sunscreen. A full AM routine.',
    description:
      'Everything for a bright, protected morning routine, four steps in one box. Saves about 18% compared with buying separately.',
    size: '4 products',
    price: 159900,
    mrp: 194600,
    shape: 'kit',
    color: '#f2e9dc',
    accent: '#2f4a3a',
    concerns: ['dullness', 'sun', 'basics'],
    how: 'Cleanse, Vitamin C serum, moisturiser, then sunscreen. Every morning.',
    ingredients: 'See each product page for full ingredient lists.',
    keyActives: ['4-step routine'],
    includes: ['barrier-cloud-cleanser', 'vitamin-c-glow-serum', 'ceramide-gel-moisturiser', 'daily-sunscreen-spf50'],
    preorder: 'Ships in about 3 weeks',
    badge: 'Save 18%',
  },
  {
    slug: 'clear-skin-kit',
    name: 'Clear Skin Kit',
    short: 'Cleanser + Salicylic serum + moisturiser + sunscreen for breakout-prone skin.',
    description:
      'A simple, gentle routine for acne-prone and oily skin. Four steps in one box. Saves about 19% compared with buying separately.',
    size: '4 products',
    price: 144900,
    mrp: 179600,
    shape: 'kit',
    color: '#e3ece6',
    accent: '#2f6a55',
    concerns: ['acne', 'oil'],
    how: 'Morning: cleanse, moisturiser, sunscreen. Evening: cleanse, salicylic serum (every other night), moisturiser.',
    ingredients: 'See each product page for full ingredient lists.',
    keyActives: ['4-step routine'],
    includes: ['barrier-cloud-cleanser', 'salicylic-clear-serum', 'ceramide-gel-moisturiser', 'daily-sunscreen-spf50'],
    preorder: 'Ships in about 3 weeks',
    badge: 'Save 19%',
  },
]

export const bySlug = (slug: string) => products.find((p) => p.slug === slug)
