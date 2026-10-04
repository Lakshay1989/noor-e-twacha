import Link from 'next/link'
import type { Product } from '@/data/products'
import { commerce } from '@/config/brand'
import { ProductArt } from './ProductArt'
import { Price } from './Price'
import { QuickAdd } from './QuickAdd'

export function ProductCard({ product: p }: { product: Product }) {
  return (
    <article className="flex h-full flex-col">
      <Link href={`/product/${p.slug}`} className="group flex flex-1 flex-col">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <ProductArt product={p} className="h-full w-full transition duration-500 group-hover:scale-[1.03]" />
          {(p.badge || commerce.preorder) && (
            <span className="absolute left-3 top-3 rounded-full bg-cream/95 px-2.5 py-1 text-[11px] font-semibold text-moss">
              {p.badge ?? 'Pre-order'}
            </span>
          )}
        </div>
        <p className="mt-3 text-xs text-mist">{p.size}</p>
        <h3 className="mt-0.5 text-base leading-snug sm:text-lg">{p.shortName}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-mist">{p.tagline}</p>
        <div className="mt-auto pt-3"><Price product={p} /></div>
      </Link>
      <QuickAdd slug={p.slug} name={p.shortName} />
    </article>
  )
}
