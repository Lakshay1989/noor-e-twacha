import { discountPct, type Product } from '@/data/products'
import { formatMoney } from '@/lib/money'

export function Price({ product: p, size = 'md' }: { product: Pick<Product, 'price' | 'mrp'>; size?: 'md' | 'lg' }) {
  const off = discountPct(p)
  return (
    <p className="flex flex-wrap items-baseline gap-x-2">
      <span className={size === 'lg' ? 'text-3xl font-semibold' : 'text-lg font-semibold'}>{formatMoney(p.price)}</span>
      {p.mrp > p.price && (
        <>
          <span className="text-sm text-mist">MRP <s>{formatMoney(p.mrp)}</s></span>
          <span className="rounded bg-moss/10 px-1.5 py-0.5 text-xs font-semibold text-moss">{off}% off</span>
        </>
      )}
    </p>
  )
}
