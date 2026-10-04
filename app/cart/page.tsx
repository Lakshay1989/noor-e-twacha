'use client'
import Link from 'next/link'
import { useCart } from '@/lib/cart'
import { quote } from '@/lib/quote'
import { bySlug } from '@/data/products'
import { commerce } from '@/config/brand'
import { formatMoney } from '@/lib/money'
import { ProductArt } from '@/components/ProductArt'

export default function CartPage() {
  const { items, ready, setQty } = useCart()
  const q = quote(items, 'upi')
  const cod = quote(items, 'cod')
  if (!ready) return <div className="container-x py-20 text-mist">Loading your cart…</div>
  if (items.length === 0)
    return (
      <div className="container-x py-24 text-center">
        <h1 className="text-3xl text-moss">Your cart is empty</h1>
        <p className="mt-2 text-mist">Start with one of our hero products.</p>
        <Link href="/shop" className="btn btn-primary mt-6">Browse products</Link>
      </div>
    )
  const progress = Math.min(100, Math.round((cod.subtotal / commerce.freeShippingOver) * 100))
  return (
    <div className="container-x grid gap-10 py-10 lg:grid-cols-[1fr_22rem]">
      <div>
        <h1 className="text-4xl text-moss">Your cart</h1>
        <div className="mt-5 rounded-xl bg-sand/70 p-4 text-sm">
          {cod.freeShippingGap > 0 ? <p>Add <b>{formatMoney(cod.freeShippingGap)}</b> more for free shipping.</p> : <p className="font-medium text-moss">You have free shipping 🎉</p>}
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Progress to free shipping">
            <div className="h-full rounded-full bg-moss transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <ul className="mt-4 divide-y divide-ink/10">
          {items.map((i) => {
            const p = bySlug(i.slug)
            if (!p) return null
            return (
              <li key={i.slug} className="flex gap-4 py-5">
                <Link href={`/product/${p.slug}`} className="w-24 shrink-0 overflow-hidden rounded-xl"><ProductArt product={p} className="aspect-[4/5] w-full" /></Link>
                <div className="flex-1">
                  <Link href={`/product/${p.slug}`} className="font-medium leading-snug hover:text-clay">{p.shortName}</Link>
                  <p className="text-sm text-mist">{p.size}{commerce.preorder ? ' · Pre-order' : ''}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex items-center rounded-full border border-ink/20 bg-white text-sm">
                      <button aria-label={`Decrease ${p.shortName}`} className="h-11 w-11" onClick={() => setQty(i.slug, i.qty - 1)}>−</button>
                      <span className="w-5 text-center">{i.qty}</span>
                      <button aria-label={`Increase ${p.shortName}`} className="h-11 w-11" onClick={() => setQty(i.slug, i.qty + 1)}>+</button>
                    </div>
                    <button className="min-h-11 text-sm text-mist underline" onClick={() => setQty(i.slug, 0)}>Remove</button>
                  </div>
                </div>
                <p className="font-medium">{formatMoney(p.price * i.qty)}</p>
              </li>
            )
          })}
        </ul>
      </div>
      <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5 lg:sticky lg:top-24">
        <h2 className="text-xl text-moss">Summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatMoney(q.subtotal)}</dd></div>
          <div className="flex justify-between"><dt>Shipping</dt><dd>{q.shipping ? formatMoney(q.shipping) : 'Free'}</dd></div>
          <div className="flex justify-between text-moss"><dt>UPI discount ({commerce.upiDiscountPct}%)</dt><dd>−{formatMoney(q.upiDiscount)}</dd></div>
        </dl>
        <p className="mt-3 text-xs text-mist">Totals shown for UPI. Cash on delivery adds a {formatMoney(commerce.codFee)} handling fee. Final amount is confirmed at checkout.</p>
        <Link href="/checkout" className="btn btn-primary mt-5 w-full">Continue to checkout</Link>
      </aside>
    </div>
  )
}
