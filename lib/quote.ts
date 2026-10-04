import { commerce } from '@/config/brand'
import { bySlug } from '@/data/products'

export type PaymentMethod = 'cod' | 'upi'
export interface CartLine {
  slug: string
  qty: number
}

export interface Quote {
  lines: { slug: string; name: string; qty: number; unit: number; total: number }[]
  subtotal: number
  upiDiscount: number
  shipping: number
  codFee: number
  total: number
  freeShippingGap: number
}

// Server-side source of truth for totals. The client uses it only to preview.
export function quote(items: CartLine[], payment: PaymentMethod = 'cod'): Quote {
  const lines = items.flatMap((i) => {
    const p = bySlug(i.slug)
    const qty = Math.min(Math.max(Math.floor(i.qty), 1), 10)
    return p ? [{ slug: p.slug, name: p.name, qty, unit: p.price, total: p.price * qty }] : []
  })
  const subtotal = lines.reduce((s, l) => s + l.total, 0)
  const upiDiscount = payment === 'upi' ? Math.round((subtotal * commerce.upiDiscountPct) / 100) : 0
  const shipping = subtotal === 0 || subtotal >= commerce.freeShippingOver ? 0 : commerce.shippingFee
  const codFee = payment === 'cod' && subtotal > 0 ? commerce.codFee : 0
  return {
    lines,
    subtotal,
    upiDiscount,
    shipping,
    codFee,
    total: subtotal - upiDiscount + shipping + codFee,
    freeShippingGap: Math.max(commerce.freeShippingOver - subtotal, 0),
  }
}
