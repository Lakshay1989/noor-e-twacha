'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/lib/cart'
import { quote, type PaymentMethod } from '@/lib/quote'
import { formatMoney } from '@/lib/money'

interface Done { id: string; total: number; whatsappUrl: string; payment: PaymentMethod }

export default function Checkout() {
  const { items, ready, clear } = useCart()
  const [payment, setPayment] = useState<PaymentMethod>('upi')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState<Done | null>(null)
  const q = quote(items, payment)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...f, payment, items }),
    }).catch(() => null)
    const data = res ? await res.json().catch(() => null) : null
    setBusy(false)
    if (!res?.ok || !data) return setError(data?.error ?? 'Something went wrong. Please try again.')
    clear()
    setDone({ ...data, payment })
  }

  if (done)
    return (
      <div className="container-x max-w-xl py-20 text-center">
        <h1 className="text-4xl text-moss">Thank you! 🌿</h1>
        <p className="mt-3">Your order <b>{done.id}</b> for {formatMoney(done.total)} is placed.</p>
        <p className="mt-2 text-mist">
          Tap below to confirm it on WhatsApp. {done.payment === 'upi' ? 'We will send a UPI payment link there.' : 'You will pay when it arrives.'}
        </p>
        <a href={done.whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-primary mt-6">Confirm on WhatsApp</a>
        <div className="mt-4"><Link href="/shop" className="text-sm text-mist underline">Continue shopping</Link></div>
      </div>
    )

  if (!ready) return <div className="container-x py-20 text-mist">Loading…</div>
  if (items.length === 0)
    return (
      <div className="container-x py-24 text-center">
        <h1 className="text-3xl text-moss">Nothing to check out yet</h1>
        <Link href="/shop" className="btn btn-primary mt-6">Browse products</Link>
      </div>
    )

  return (
    <form onSubmit={submit} className="container-x grid gap-10 py-12 lg:grid-cols-[1fr_22rem]">
      <div className="space-y-8">
        <h1 className="text-4xl text-moss">Checkout</h1>
        <section className="space-y-3">
          <h2 className="text-xl">Delivery details</h2>
          <input name="name" required placeholder="Full name" autoComplete="name" className="field" />
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="phone" required inputMode="numeric" maxLength={10} placeholder="Mobile number" autoComplete="tel-national" className="field" />
            <input name="email" type="email" placeholder="Email (optional)" autoComplete="email" className="field" />
          </div>
          <textarea name="address" required rows={2} placeholder="House no., street, area" autoComplete="street-address" className="field" />
          <div className="grid gap-3 sm:grid-cols-3">
            <input name="pincode" required inputMode="numeric" maxLength={6} placeholder="Pincode" autoComplete="postal-code" className="field" />
            <input name="city" required placeholder="City" autoComplete="address-level2" className="field" />
            <input name="state" required placeholder="State" autoComplete="address-level1" className="field" />
          </div>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl">Payment</h2>
          {([
            ['upi', 'Pay by UPI', 'Save 5%. We send a payment link on WhatsApp.'],
            ['cod', 'Cash on delivery', 'Pay when it arrives (+ small handling fee).'],
          ] as const).map(([v, t, d]) => (
            <label key={v} className={`flex cursor-pointer gap-3 rounded-xl border p-4 ${payment === v ? 'border-moss bg-moss/5' : 'border-ink/15 bg-white'}`}>
              <input type="radio" name="pay" checked={payment === v} onChange={() => setPayment(v)} className="mt-1 accent-[#2f4a3a]" />
              <span><span className="block font-medium">{t}</span><span className="text-sm text-mist">{d}</span></span>
            </label>
          ))}
        </section>
      </div>
      <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl text-moss">Order summary</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {q.lines.map((l) => (
            <li key={l.slug} className="flex justify-between gap-3"><span>{l.qty} × {l.name}</span><span>{formatMoney(l.total)}</span></li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 border-t border-ink/10 pt-4 text-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatMoney(q.subtotal)}</dd></div>
          {q.upiDiscount > 0 && <div className="flex justify-between text-moss"><dt>UPI discount</dt><dd>−{formatMoney(q.upiDiscount)}</dd></div>}
          <div className="flex justify-between"><dt>Shipping</dt><dd>{q.shipping ? formatMoney(q.shipping) : 'Free'}</dd></div>
          {q.codFee > 0 && <div className="flex justify-between"><dt>COD fee</dt><dd>{formatMoney(q.codFee)}</dd></div>}
          <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-semibold"><dt>Total</dt><dd>{formatMoney(q.total)}</dd></div>
        </dl>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
        <button disabled={busy} className="btn btn-primary mt-5 w-full">{busy ? 'Placing order…' : 'Place order'}</button>
      </aside>
    </form>
  )
}
