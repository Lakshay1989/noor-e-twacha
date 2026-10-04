'use client'
import Link from 'next/link'
import { useState } from 'react'
import { commerce } from '@/config/brand'
import { useCart } from '@/lib/cart'
import { formatMoney } from '@/lib/money'

/** Qty + add button, plus a fixed bottom bar on mobile so the buy button is always one tap away. */
export function AddToCart({ slug, name, price }: { slug: string; name: string; price: number }) {
  const { add } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const label = commerce.preorder ? 'Pre-order now' : 'Add to cart'
  const onAdd = () => {
    add(slug, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }
  return (
    <>
      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="flex items-center rounded-full border border-ink/20 bg-white" role="group" aria-label="Quantity">
            <button aria-label="Decrease quantity" className="h-12 w-11 text-lg" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
            <span className="w-6 text-center text-sm" aria-live="polite">{qty}</span>
            <button aria-label="Increase quantity" className="h-12 w-11 text-lg" onClick={() => setQty((q) => Math.min(10, q + 1))}>+</button>
          </div>
          <button className="btn btn-primary flex-1" onClick={onAdd}>{added ? 'Added ✓' : label}</button>
        </div>
        {added && <p className="text-sm text-moss" role="status">Added to your cart. <Link href="/cart" className="font-medium underline">View cart</Link></p>}
      </div>
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-ink/10 bg-cream/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-mist">{name}</p>
          <p className="font-semibold">{formatMoney(price)}</p>
        </div>
        <button className="btn btn-primary px-8" onClick={onAdd}>{added ? 'Added ✓' : label}</button>
      </div>
    </>
  )
}
