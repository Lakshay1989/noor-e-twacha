import { NextResponse } from 'next/server'
import { z } from 'zod'
import { brand } from '@/config/brand'
import { quote } from '@/lib/quote'
import { formatMoney } from '@/lib/money'

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string().email().optional().or(z.literal('')),
  address: z.string().trim().min(8).max(300),
  city: z.string().trim().min(2).max(60),
  state: z.string().trim().min(2).max(60),
  pincode: z.string().regex(/^\d{6}$/, 'Enter a 6-digit pincode'),
  payment: z.enum(['cod', 'upi']),
  items: z.array(z.object({ slug: z.string(), qty: z.number().int().min(1).max(10) })).min(1).max(20),
})

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid order' }, { status: 400 })
  }
  const o = parsed.data
  const q = quote(o.items, o.payment)
  if (q.lines.length === 0) return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })

  const id = `OJ-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`
  const text = [
    `New order ${id}`,
    ...q.lines.map((l) => `• ${l.qty} x ${l.name} (${formatMoney(l.total)})`),
    `Payment: ${o.payment === 'cod' ? 'Cash on delivery' : 'UPI'}`,
    `Total: ${formatMoney(q.total)}`,
    `Name: ${o.name}`,
    `Phone: ${o.phone}`,
    `Address: ${o.address}, ${o.city}, ${o.state} ${o.pincode}`,
  ].join('\n')

  const hook = process.env.ORDER_WEBHOOK_URL
  if (hook) {
    // Best effort: a webhook failure must never lose the customer's order confirmation.
    await fetch(hook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id, createdAt: new Date().toISOString(), ...o, quote: q }),
    }).catch((e) => console.error('order webhook failed', e))
  }
  console.log('ORDER', id, JSON.stringify({ ...o, total: q.total }))

  return NextResponse.json({
    id,
    total: q.total,
    whatsappUrl: `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(text)}`,
  })
}
