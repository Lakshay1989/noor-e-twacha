'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/lib/cart'

export function AddToCart({ slug, preorder }: { slug: string; preorder?: boolean }) {
  const { add } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="flex items-center rounded-full border border-ink/15 bg-white">
          <button aria-label="Less" className="h-12 w-10 text-lg" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
          <span className="w-6 text-center text-sm">{qty}</span>
          <button aria-label="More" className="h-12 w-10 text-lg" onClick={() => setQty((q) => Math.min(10, q + 1))}>+</button>
        </div>
        <button
          className="btn btn-primary flex-1"
          onClick={() => {
            add(slug, qty)
            setAdded(true)
            setTimeout(() => setAdded(false), 2500)
          }}
        >
          {preorder ? 'Pre-order now' : 'Add to cart'}
        </button>
      </div>
      {added && (
        <p className="text-sm text-moss">
          Added. <Link href="/cart" className="underline">View cart</Link>
        </p>
      )}
    </div>
  )
}
