'use client'
import Link from 'next/link'
import { useCart } from '@/lib/cart'
import { quote } from '@/lib/quote'
import { bySlug } from '@/data/products'
import { formatMoney } from '@/lib/money'
import { ProductArt } from '@/components/ProductArt'

export default function CartPage() {
  const { items, ready, setQty } = useCart()
  const q = quote(items, 'upi')
  const cod = quote(items, 'cod')
  if (!ready) return <div className="container-x py-20 text-mist">Loading…</div>
  if (items.length === 0)
    return (
      <div className="container-x py-24 text-center">
        <h1 className="text-3xl text-moss">Your cart is empty</h1>
        <Link href="/shop" className="btn btn-primary mt-6">Browse products</Link>
      </div>
    )
  return (
    <div className="container-x grid gap-10 py-12 lg:grid-cols-[1fr_22rem]">
      <div>
        <h1 className="text-4xl text-moss">Your cart</h1>
        {cod.freeShippingGap > 0 && (
          <p className="mt-4 rounded-xl bg-clay/10 px-4 py-3 text-sm text-clay">
            Add {formatMoney(cod.freeShippingGap)} more for free shipping.
          </p>
        )}
        <ul className="mt-6 divide-y divide-ink/10">
          {items.map((i) => {
            const p = bySlug(i.slug)
            if (!p) return null
            return (
              <li key={i.slug} className="flex gap-4 py-5">
                <Link href={`/product/${p.slug}`} className="w-24 shrink-0 rounded-xl bg-sand/70 p-2"><ProductArt product={p} className="h-24 w-full" /></Link>
                <div className="flex-1">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-mist">{p.size}{p.preorder ? ` · Pre-order, ${p.preorder.toLowerCase()}` : ''}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex items-center rounded-full border border-ink/15 bg-white text-sm">
                      <button aria-label="Less" className="h-9 w-9" onClick={() => setQty(i.slug, i.qty - 1)}>−</button>
                      <span className="w-5 text-center">{i.qty}</span>
                      <button aria-label="More" className="h-9 w-9" onClick={() => setQty(i.slug, i.qty + 1)}>+</button>
                    </div>
                    <button className="text-sm text-mist underline" onClick={() => setQty(i.slug, 0)}>Remove</button>
                  </div>
                </div>
                <p className="font-medium">{formatMoney(p.price * i.qty)}</p>
              </li>
            )
          })}
        </ul>
      </div>
      <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl text-moss">Summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatMoney(q.subtotal)}</dd></div>
          <div className="flex justify-between"><dt>Shipping</dt><dd>{q.shipping ? formatMoney(q.shipping) : 'Free'}</dd></div>
          <div className="flex justify-between text-mist"><dt>Pay on UPI</dt><dd>−{formatMoney(q.upiDiscount)}</dd></div>
        </dl>
        <p className="mt-3 text-xs text-mist">Final total is shown at checkout (COD adds a small handling fee).</p>
        <Link href="/checkout" className="btn btn-primary mt-5 w-full">Checkout</Link>
      </aside>
    </div>
  )
}
