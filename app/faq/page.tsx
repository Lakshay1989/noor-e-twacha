import type { Metadata } from 'next'
import { brand } from '@/config/brand'

export const metadata: Metadata = { title: 'FAQ' }

const faqs = [
  ['Will it suit my skin type?', 'Our range is built to suit oily, combination and dry skin. Every product is fragrance-free except the lip balm. Patch test on your inner arm before first use.'],
  ['Can I use Vitamin C and Niacinamide together?', 'Yes. Many people use Vitamin C in the morning and Niacinamide at night, or layer them. Start slowly and see how your skin responds.'],
  ['Do I really need sunscreen indoors?', 'If you sit near windows or step out at all, yes. UV is the biggest cause of tan and uneven tone. It is also what makes Vitamin C and salicylic acid work better.'],
  ['When will I see results?', 'Hydration is immediate. For tone and texture, expect 4 to 8 weeks of consistent use. Skin renews on its own schedule.'],
  ['How long does delivery take?', 'We dispatch in 1 to 2 working days. Delivery takes 3 to 7 days depending on your pincode.'],
  ['What does pre-order mean?', 'Pre-order products are in their final testing or production. We tell you the expected ship time on the product page, and you can cancel any time before dispatch for a full refund.'],
  ['Are your products cruelty-free?', 'We do not test on animals.'],
  ['Are these products medicines?', 'No. They are cosmetic products. For persistent acne, eczema or other skin conditions, please see a dermatologist.'],
]

export default function FAQ() {
  return (
    <div className="container-x max-w-3xl py-16">
      <h1 className="text-4xl text-moss">Questions, answered</h1>
      <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
        {faqs.map(([q, a]) => (
          <details key={q} className="py-5">
            <summary className="cursor-pointer text-lg">{q}</summary>
            <p className="mt-2 text-mist">{a}</p>
          </details>
        ))}
      </div>
      <p className="mt-8 text-sm text-mist">Still unsure? WhatsApp us or write to <a className="underline" href={`mailto:${brand.email}`}>{brand.email}</a>.</p>
    </div>
  )
}
