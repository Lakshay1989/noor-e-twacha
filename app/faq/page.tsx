import type { Metadata } from 'next'
import { brand, commerce } from '@/config/brand'
import { formatMoney } from '@/lib/money'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'FAQ: routines, ingredients, pre-orders & shipping',
  description: 'Answers on using niacinamide with Vitamin C, sunscreen, patch testing, pre-orders, shipping and payments.',
  alternates: { canonical: '/faq' },
}

const faqs: [string, string][] = [
  ['Can I use Vitamin C and Niacinamide together?', 'Many people do: Vitamin C in the morning and niacinamide at night, or layered. Start with one active at a time and add the second once your skin is comfortable.'],
  ['Do I need sunscreen if I am indoors most of the day?', 'If you sit near a window or step out at all, yes. UV exposure is the biggest driver of tan and uneven tone, and sunscreen protects the gains from actives like Vitamin C.'],
  ['How do I patch test?', 'Apply a small amount on your inner forearm or behind the ear, wait 24 hours, and check for redness or itching. Do not use a product that irritates your skin.'],
  ['How often should I use salicylic acid?', 'Start every other evening, then increase if your skin is comfortable. Always wear sunscreen the next morning.'],
  ['When will I see results?', 'Hydration shows quickly. For tone, oil and texture, consistent use for four to eight weeks is a realistic window. Results vary by person.'],
  ['What does pre-order mean?', 'Our first batch is open for pre-order. When you order, we confirm your dispatch date on WhatsApp. You can cancel before dispatch for a full refund.'],
  ['How do I pay?', `Pay by UPI and get ${commerce.upiDiscountPct}% off, or choose cash on delivery (a ${formatMoney(commerce.codFee)} handling fee applies). After you place an order, you confirm it on WhatsApp.`],
  ['What does shipping cost?', `Free over ${formatMoney(commerce.freeShippingOver)}, otherwise ${formatMoney(commerce.shippingFee)}.`],
  ['Are these medicines?', 'No. They are cosmetic products. For persistent acne, eczema or any skin condition, please see a dermatologist.'],
]

export default function FAQ() {
  return (
    <div className="container-x max-w-3xl py-14 md:py-20">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
        }}
      />
      <h1 className="text-4xl text-moss md:text-5xl">Questions, answered</h1>
      <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
        {faqs.map(([q, a]) => (
          <details key={q} className="py-5">
            <summary className="cursor-pointer text-lg">{q}</summary>
            <p className="mt-2 text-mist">{a}</p>
          </details>
        ))}
      </div>
      <p className="mt-8 text-sm text-mist">Still unsure? Message us on WhatsApp or write to <a className="underline" href={`mailto:${brand.email}`}>{brand.email}</a>.</p>
    </div>
  )
}
