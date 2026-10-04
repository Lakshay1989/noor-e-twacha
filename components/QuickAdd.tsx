'use client'
import { useState } from 'react'
import { useCart } from '@/lib/cart'

export function QuickAdd({ slug, name }: { slug: string; name: string }) {
  const { add } = useCart()
  const [done, setDone] = useState(false)
  return (
    <button
      type="button"
      aria-label={`Add ${name} to cart`}
      className="btn btn-primary mt-3 w-full"
      onClick={() => {
        add(slug)
        setDone(true)
        setTimeout(() => setDone(false), 1800)
      }}
    >
      {done ? 'Added ✓' : 'Add to cart'}
    </button>
  )
}
