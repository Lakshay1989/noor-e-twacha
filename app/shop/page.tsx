import type { Metadata } from 'next'
import { products } from '@/data/products'
import { collections } from '@/lib/collections'
import { ProductCard } from '@/components/ProductCard'
import { CollectionNav } from '@/components/CollectionNav'

export const metadata: Metadata = {
  title: 'Shop all skincare: serums, sunscreen, moisturiser & kits',
  description: 'Browse every Noor-e-Twacha product: niacinamide, vitamin C and salicylic acid serums, ceramide moisturiser, SPF 50 sunscreen, cleanser and routine kits.',
  alternates: { canonical: '/shop' },
}

export default function Shop() {
  return (
    <div className="container-x py-10 md:py-14">
      <h1 className="text-4xl text-moss md:text-5xl">All products</h1>
      <p className="mt-2 max-w-xl text-mist">{products.length} products. Each active and its percentage is listed on the product page.</p>
      <CollectionNav active="all" collections={collections} />
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 lg:grid-cols-4">
        {products.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </div>
  )
}
