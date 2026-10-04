import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { brand, commerce } from '@/config/brand'
import { formatMoney } from '@/lib/money'

// Starter policies: business decisions (return window, refund timing) should be confirmed by the founder.
const policies: Record<string, { title: string; body: string[] }> = {
  shipping: {
    title: 'Shipping policy',
    body: [
      'We ship across India to serviceable pincodes.',
      `Shipping is free on orders above ${formatMoney(commerce.freeShippingOver)}, otherwise ${formatMoney(commerce.shippingFee)}. Cash on delivery carries a ${formatMoney(commerce.codFee)} handling fee.`,
      'Our first batch is sold as pre-orders. After you place an order we confirm your dispatch date and tracking details on WhatsApp.',
      `Questions? Write to ${brand.email}.`,
    ],
  },
  returns: {
    title: 'Returns & refunds',
    body: [
      'If your product arrives damaged, leaks, or is not what you ordered, contact us within 48 hours of delivery with a photo and we will replace it or refund you.',
      'If a product does not suit your skin, tell us within 7 days of delivery and we will work out a refund or replacement with you. Please stop using any product that irritates your skin.',
      'Pre-orders can be cancelled before dispatch for a full refund. Refunds go back to the original payment method.',
    ],
  },
  privacy: {
    title: 'Privacy policy',
    body: [
      'We collect only what we need to deliver your order: name, phone, address and optional email.',
      'We use your details to fulfil and support your order and to message you about it. We do not sell your data. Delivery partners receive only what is needed to reach you.',
      `To see or delete your data, write to ${brand.email}.`,
    ],
  },
}

export const generateStaticParams = () => Object.keys(policies).map((slug) => ({ slug }))

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug
  const p = policies[slug]
  return p ? { title: p.title, alternates: { canonical: `/policy/${slug}` } } : {}
}

export default async function Policy({ params }: { params: Promise<{ slug: string }> }) {
  const p = policies[(await params).slug]
  if (!p) notFound()
  return (
    <div className="container-x max-w-2xl py-14 md:py-20">
      <h1 className="text-4xl text-moss">{p.title}</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-mist">{p.body.map((t) => <p key={t}>{t}</p>)}</div>
    </div>
  )
}
