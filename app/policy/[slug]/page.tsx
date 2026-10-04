import { notFound } from 'next/navigation'
import { brand } from '@/config/brand'

// Starter policies. Have them reviewed before you take real orders.
const policies: Record<string, { title: string; body: string[] }> = {
  shipping: {
    title: 'Shipping policy',
    body: [
      'We ship across India. Orders are dispatched within 1 to 2 working days; pre-order items ship on the date shown on the product page.',
      'Delivery usually takes 3 to 7 days. Shipping is free on orders above ₹599, otherwise ₹69. Cash on delivery carries a ₹40 handling fee.',
      `You will get tracking details on WhatsApp or email. Questions? ${brand.email}.`,
    ],
  },
  returns: {
    title: 'Returns & refunds',
    body: [
      'If your product arrives damaged, leaks, or is not the one you ordered, contact us within 48 hours of delivery with a photo and we will replace it or refund you.',
      'If a product does not suit your skin, tell us within 7 days of delivery. We will refund or replace it, even if opened, for the first use. Please stop using any product that irritates your skin.',
      'Refunds go to the original payment method (or UPI) within 5 to 7 working days. Pre-orders can be cancelled any time before dispatch.',
    ],
  },
  privacy: {
    title: 'Privacy policy',
    body: [
      'We collect only what we need to deliver your order: name, phone, address and optional email.',
      'We use your details to fulfil and support your order, and to message you about it. We do not sell your data. Delivery partners receive only what is needed to reach you.',
      `To see or delete your data, write to ${brand.email}.`,
    ],
  },
}

export const generateStaticParams = () => Object.keys(policies).map((slug) => ({ slug }))

export default async function Policy({ params }: { params: Promise<{ slug: string }> }) {
  const p = policies[(await params).slug]
  if (!p) notFound()
  return (
    <div className="container-x max-w-2xl py-16">
      <h1 className="text-4xl text-moss">{p.title}</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-mist">{p.body.map((t) => <p key={t}>{t}</p>)}</div>
    </div>
  )
}
