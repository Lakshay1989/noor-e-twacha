import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Our story' }

const principles = [
  ['Ingredients you can read', 'We list every active and its percentage. If an ingredient is not doing a job, it is not in the bottle.'],
  ['Made for our climate', 'Most skincare is designed for cold, dry Western weather. Ours is tested for monsoon humidity, summer heat and city air.'],
  ['Fewer steps, better habits', 'A routine you follow beats a 10-step one you abandon. We keep it to cleanse, treat, moisturise, protect.'],
  ['No fear-selling', 'We will never tell you your skin is broken. Skincare should feel calm.'],
]

export default function About() {
  return (
    <div className="container-x max-w-3xl py-16">
      <p className="text-sm uppercase tracking-[0.25em] text-clay">Our story</p>
      <h1 className="mt-3 text-5xl text-moss">Ojas means radiance from within.</h1>
      <p className="mt-6 text-lg leading-relaxed text-mist">
        We started Ojas because good skincare in India was either imported and expensive, or cheap and confusing. We wanted a middle path: effective formulas, clear labels and fair prices, for the skin and weather we actually live with.
      </p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {principles.map(([t, d]) => (
          <div key={t}><h2 className="text-xl text-moss">{t}</h2><p className="mt-2 text-sm leading-relaxed text-mist">{d}</p></div>
        ))}
      </div>
      <Link href="/shop" className="btn btn-primary mt-12">Shop the range</Link>
    </div>
  )
}
