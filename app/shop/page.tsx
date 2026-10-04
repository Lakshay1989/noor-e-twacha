import Link from 'next/link'
import clsx from 'clsx'
import type { Metadata } from 'next'
import { products, concernLabels, type Concern } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'

export const metadata: Metadata = { title: 'Shop' }

export default async function Shop({ searchParams }: { searchParams: Promise<{ concern?: string }> }) {
  const { concern } = await searchParams
  const active = concern && concern in concernLabels ? (concern as Concern) : null
  const list = active ? products.filter((p) => p.concerns.includes(active)) : products
  return (
    <div className="container-x py-12">
      <h1 className="text-4xl text-moss">{active ? concernLabels[active] : 'All products'}</h1>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link href="/shop" className={clsx('rounded-full border px-4 py-2 text-sm', !active ? 'border-moss bg-moss text-cream' : 'border-moss/30 text-moss')}>All</Link>
        {(Object.keys(concernLabels) as Concern[]).map((c) => (
          <Link key={c} href={`/shop?concern=${c}`} className={clsx('rounded-full border px-4 py-2 text-sm', active === c ? 'border-moss bg-moss text-cream' : 'border-moss/30 text-moss')}>
            {concernLabels[c]}
          </Link>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {list.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </div>
  )
}
