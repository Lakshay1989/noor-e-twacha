import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our story: why we make skincare for Indian weather',
  description: 'Noor-e-Twacha makes simple, honest skincare for heat, humidity and pollution, with every active and percentage on the pack.',
  alternates: { canonical: '/about' },
}

const principles = [
  ['Ingredients you can read', 'We print every active and its percentage on the pack and on the product page, so you can compare us properly with anyone else.'],
  ['Designed for our climate', 'Most skincare is designed for cold, dry weather. We favour gels, fluids and light creams that stay comfortable in heat and humidity.'],
  ['Fewer steps, better habits', 'A routine you follow beats a ten-step one you abandon. We keep it to four: cleanse, treat, moisturise, protect.'],
  ['No fear-selling', 'We will not tell you your skin is broken or promise overnight results. Skincare should feel calm and honest.'],
]

export default function About() {
  return (
    <div className="container-x max-w-3xl py-14 md:py-20">
      <p className="eyebrow">Our story</p>
      <h1 className="mt-3 text-4xl text-moss md:text-5xl">Noor-e-Twacha means the light of the skin: noor is light, twacha is skin.</h1>
      <p className="mt-6 text-lg leading-relaxed text-mist">
        Good skincare in India tends to be either imported and expensive, or inexpensive and confusing. We are building a middle path: effective formulas, clear labels and fair prices, made for the skin and the weather we actually live with.
      </p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {principles.map(([t, d]) => (
          <div key={t}><h2 className="text-xl text-moss">{t}</h2><p className="mt-2 text-sm leading-relaxed text-mist">{d}</p></div>
        ))}
      </div>
      <p className="mt-12 rounded-2xl bg-sand/60 p-5 text-sm text-mist">
        We are a new brand and our first batch is open for pre-order. We would rather tell you that plainly than pretend to a history we do not have.
      </p>
      <Link href="/shop" className="btn btn-primary mt-8">Shop the range</Link>
    </div>
  )
}
