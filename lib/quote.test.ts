import { describe, expect, it } from 'vitest'
import { quote } from './quote'

describe('quote', () => {
  it('charges shipping and COD fee on a small order', () => {
    const q = quote([{ slug: 'kesar-lip-balm', qty: 1 }], 'cod')
    expect(q.subtotal).toBe(19900)
    expect(q.shipping).toBe(6900)
    expect(q.codFee).toBe(4000)
    expect(q.total).toBe(30800)
  })
  it('gives free shipping above the threshold and a UPI discount', () => {
    const q = quote([{ slug: 'vitamin-c-glow-serum', qty: 1 }, { slug: 'kesar-lip-balm', qty: 1 }], 'upi')
    expect(q.shipping).toBe(0)
    expect(q.upiDiscount).toBe(Math.round(79800 * 0.05))
    expect(q.codFee).toBe(0)
  })
  it('ignores unknown products and clamps quantity', () => {
    const q = quote([{ slug: 'nope', qty: 2 }, { slug: 'kesar-lip-balm', qty: 99 }], 'upi')
    expect(q.lines).toHaveLength(1)
    expect(q.lines[0].qty).toBe(10)
  })
})
