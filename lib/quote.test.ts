import { describe, expect, it } from 'vitest'
import { quote } from './quote'
import { products, separatePrice, discountPct } from '@/data/products'

describe('quote', () => {
  it('charges shipping and COD fee on a small order', () => {
    const q = quote([{ slug: 'kesar-lip-balm', qty: 1 }], 'cod')
    expect(q.subtotal).toBe(14900)
    expect(q.shipping).toBe(6900)
    expect(q.codFee).toBe(4000)
    expect(q.total).toBe(25800)
  })
  it('gives free shipping above the threshold and a UPI discount', () => {
    const q = quote([{ slug: 'vitamin-c-10-serum', qty: 1 }, { slug: 'kesar-lip-balm', qty: 1 }], 'upi')
    expect(q.shipping).toBe(0)
    expect(q.upiDiscount).toBe(Math.round(64800 * 0.05))
    expect(q.codFee).toBe(0)
  })
  it('ignores unknown products and clamps quantity', () => {
    const q = quote([{ slug: 'nope', qty: 2 }, { slug: 'kesar-lip-balm', qty: 99 }], 'upi')
    expect(q.lines).toHaveLength(1)
    expect(q.lines[0].qty).toBe(10)
  })
})

describe('catalogue integrity', () => {
  it('has unique slugs and sane pricing', () => {
    expect(new Set(products.map((p) => p.slug)).size).toBe(products.length)
    for (const p of products) {
      expect(p.price).toBeGreaterThan(0)
      expect(p.mrp).toBeGreaterThanOrEqual(p.price)
      expect(discountPct(p)).toBeLessThanOrEqual(35) // no inflated-MRP discounts
    }
  })
  it('prices every kit below its parts', () => {
    for (const k of products.filter((p) => p.includes)) expect(k.price).toBeLessThan(separatePrice(k))
  })
})
