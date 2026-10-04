import Link from 'next/link'
import type { Product } from '@/data/products'
import { formatMoney } from '@/lib/money'
import { ProductArt } from './ProductArt'

export function ProductCard({ product: p }: { product: Product }) {
  const off = Math.round(((p.mrp - p.price) / p.mrp) * 100)
  return (
    <Link href={`/product/${p.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-sand/70 p-6 transition group-hover:bg-sand">
        {(p.badge || p.preorder) && (
          <span className="absolute left-3 top-3 rounded-full bg-cream px-3 py-1 text-xs font-medium text-moss">
            {p.preorder ? 'Pre-order' : p.badge}
          </span>
        )}
        <ProductArt product={p} className="mx-auto h-56 transition duration-500 group-hover:scale-105" />
      </div>
      <h3 className="mt-4 text-lg leading-snug">{p.name}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-mist">{p.short}</p>
      <p className="mt-2 text-sm">
        <span className="font-semibold">{formatMoney(p.price)}</span>{' '}
        <span className="text-mist line-through">{formatMoney(p.mrp)}</span>{' '}
        <span className="text-clay">{off}% off</span>
        <span className="text-mist"> · {p.size}</span>
      </p>
    </Link>
  )
}
