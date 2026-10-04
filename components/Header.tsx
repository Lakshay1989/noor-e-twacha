'use client'
import Link from 'next/link'
import { brand, commerce } from '@/config/brand'
import { useCart } from '@/lib/cart'
import { formatMoney } from '@/lib/money'

export function Header() {
  const { count } = useCart()
  return (
    <>
      <div className="bg-moss py-2 text-center text-xs text-cream">
        Free shipping over {formatMoney(commerce.freeShippingOver)} · Cash on delivery available · {commerce.upiDiscountPct}% off on UPI
      </div>
      <header className="sticky top-0 z-30 border-b border-ink/10 bg-cream/90 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-semibold tracking-[0.18em] text-moss">
            {brand.name.toUpperCase()}
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/shop" className="hover:text-clay">Shop</Link>
            <Link href="/about" className="hidden hover:text-clay sm:block">Our story</Link>
            <Link href="/faq" className="hidden hover:text-clay sm:block">FAQ</Link>
            <Link href="/cart" className="relative rounded-full border border-moss/30 px-4 py-1.5 text-moss hover:bg-moss/5">
              Cart
              {count > 0 && (
                <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-clay px-1 text-xs text-white">{count}</span>
              )}
            </Link>
          </nav>
        </div>
      </header>
    </>
  )
}
