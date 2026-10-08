import Link from 'next/link'
import type { Metadata } from 'next'
import { products, bySlug, separatePrice, concernLabels, type Concern } from '@/data/products'
import { collections } from '@/lib/collections'
import { commerce, whatsappLink } from '@/config/brand'
import { formatMoney } from '@/lib/money'
import { ProductCard } from '@/components/ProductCard'
import { ProductArt } from '@/components/ProductArt'
import { Price } from '@/components/Price'
import { QuickAdd } from '@/components/QuickAdd'

export const metadata: Metadata = {
  title: 'Noor-e-Twacha | Honest skincare for Indian weather: serums, sunscreen & moisturiser',
  description:
    'Niacinamide 10%, Vitamin C 10%, salicylic acid 2%, ceramide moisturiser and SPF 50 sunscreen. Every active and its percentage is printed on the pack. Pre-orders open.',
  alternates: { canonical: '/' },
}

const heroes = products.filter((p) => p.role === 'hero')
const essentials = products.filter((p) => !p.includes && p.role !== 'hero')
const kits = products.filter((p) => p.includes)

const trust = [
  ['Every active, with its %', 'Percentages are printed on the pack and listed on each product page.'],
  [`${commerce.upiDiscountPct}% off on UPI`, 'Pay by UPI and the discount is applied at checkout automatically.'],
  ['Cash on delivery', 'Prefer to pay on arrival? COD is available across serviceable pincodes.'],
  ['Routine help on WhatsApp', 'Not sure what to pick? Message us and we will suggest a simple routine.'],
]

const actives = [
  { name: 'Niacinamide', does: 'Helps balance oil, refine the look of pores and even out tone.', when: 'Morning or night', slug: 'niacinamide-10-zinc-serum' },
  { name: 'Vitamin C', does: 'An antioxidant that helps brighten dull, tanned-looking skin.', when: 'Morning, before sunscreen', slug: 'vitamin-c-10-serum' },
  { name: 'Salicylic acid', does: 'A BHA that works inside pores to help clear blackheads and breakouts.', when: 'Evening, start every other night', slug: 'salicylic-acid-2-serum' },
  { name: 'Ceramides', does: 'Skin-identical lipids that support the barrier and lock in hydration.', when: 'Morning and night', slug: 'ceramide-gel-moisturiser' },
]

const concernIcons: Record<Concern, string> = {
  acne: 'M12 3a9 9 0 100 18 9 9 0 000-18zm-3 7h.01M15 10h.01M9 15c1 1 5 1 6 0',
  dullness: 'M12 3v2m0 14v2M5 12H3m18 0h-2M6 6l1.4 1.4m9.2 9.2L18 18M18 6l-1.4 1.4M7.4 16.6L6 18M12 8a4 4 0 100 8 4 4 0 000-8z',
  oil: 'M12 3s6 6.5 6 11a6 6 0 11-12 0c0-4.5 6-11 6-11z',
  dryness: 'M12 4c-3 4-6 6-6 10a6 6 0 0012 0c0-4-3-6-6-10zM9 15a3 3 0 003 3',
  sun: 'M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
}

export default function Home() {
  const concernCollections = collections.filter((c) => c.slug in concernLabels)
  return (
    <>
      {/* HERO */}
      <section className="overflow-hidden bg-gradient-to-b from-sand/60 to-cream">
        <div className="container-x grid items-center gap-8 py-10 md:grid-cols-[1.05fr_1fr] md:py-20">
          <div>
            <p className="eyebrow">Pre-orders open</p>
            <h1 className="mt-3 text-[2.6rem] leading-[1.05] text-moss sm:text-6xl">
              Skincare that keeps up with <em className="text-clay">Indian weather.</em>
            </h1>
            <p className="mt-5 max-w-md text-lg text-mist">
              Niacinamide, Vitamin C, ceramides and SPF 50, each with its percentage printed on the pack. Light textures for heat, humidity and pollution.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#heroes" className="btn btn-primary">Shop our hero products</Link>
              <a href={whatsappLink('Hi Noor-e-Twacha, help me pick a routine for my skin.')} target="_blank" rel="noreferrer" className="btn btn-ghost">Get a routine on WhatsApp</a>
            </div>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist">
              <li>✓ Full ingredient lists</li><li>✓ {commerce.upiDiscountPct}% off on UPI</li><li>✓ Cash on delivery</li>
            </ul>
          </div>
          <div className="relative mx-auto grid w-full max-w-md grid-cols-[1fr_1.15fr_1fr] md:max-w-xl items-end gap-2 sm:gap-3">
            <ProductArt product={heroes[1]} className="aspect-[4/5] w-full translate-y-3 rounded-2xl shadow-lg" />
            <ProductArt product={heroes[0]} className="aspect-[4/5] w-full rounded-2xl shadow-xl" />
            <ProductArt product={heroes[2]} className="aspect-[4/5] w-full translate-y-6 rounded-2xl shadow-lg" />
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section aria-label="Why shop with us" className="border-y border-ink/10 bg-white/60">
        <div className="container-x grid grid-cols-2 gap-x-5 gap-y-6 py-8 lg:grid-cols-4">
          {trust.map(([t, d]) => (
            <div key={t}>
              <h2 className="font-sans text-sm font-semibold tracking-normal text-moss">{t}</h2>
              <p className="mt-1 text-xs leading-relaxed text-mist sm:text-sm">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HEROES */}
      <section id="heroes" className="container-x scroll-mt-20 pt-16 md:pt-24">
        <p className="eyebrow">Start here</p>
        <h2 className="mt-2 text-3xl text-moss md:text-4xl">Our hero products</h2>
        <p className="mt-2 max-w-xl text-mist">The three steps that do the most for tone, oil and protection in Indian conditions.</p>
        <div className="rail rail-3 mt-8 !gap-5">
          {heroes.map((p) => (
            <article key={p.slug} className="flex flex-col rounded-3xl bg-white p-4 shadow-sm ring-1 ring-ink/5 sm:p-5">
              <Link href={`/product/${p.slug}`} className="group block">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                  <ProductArt product={p} className="h-full w-full transition duration-500 group-hover:scale-[1.03]" />
                </div>
                <h3 className="mt-4 text-xl text-moss">{p.shortName}</h3>
                <p className="mt-1 text-sm text-mist">{p.tagline}</p>
              </Link>
              <ul className="mt-3 space-y-1 text-sm">
                {p.benefits.map((b) => <li key={b} className="text-ink/80">✓ {b}</li>)}
              </ul>
              <div className="mt-4 flex items-end justify-between gap-3">
                <Price product={p} /><span className="text-xs text-mist">{p.size}</span>
              </div>
              <QuickAdd slug={p.slug} name={p.shortName} />
            </article>
          ))}
        </div>
      </section>

      {/* CONCERNS */}
      <section className="container-x pt-16 md:pt-24">
        <h2 className="text-3xl text-moss md:text-4xl">What is your skin asking for?</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {concernCollections.map((c) => (
            <Link key={c.slug} href={`/collections/${c.slug}`} className="group flex min-h-28 flex-col justify-between rounded-2xl bg-sand/70 p-4 transition hover:bg-moss hover:text-cream">
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-clay group-hover:text-cream" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={concernIcons[c.slug as Concern]} />
              </svg>
              <span><span className="block font-medium leading-tight">{c.title}</span><span className="text-xs opacity-70">{c.items.length} products</span></span>
            </Link>
          ))}
        </div>
      </section>

      {/* ESSENTIALS */}
      <section className="container-x pt-16 md:pt-24">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-3xl text-moss md:text-4xl">Complete your routine</h2>
          <Link href="/shop" className="inline-flex min-h-11 shrink-0 items-center text-sm font-medium text-clay underline underline-offset-4">View all</Link>
        </div>
        <div className="rail">{essentials.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
      </section>

      {/* KITS */}
      <section className="container-x pt-16 md:pt-24">
        <div className="rounded-[2rem] bg-moss p-6 text-cream sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f1c27d]">Routine kits</p>
          <h2 className="mt-2 text-3xl md:text-4xl">Four steps, one box, a lower price</h2>
          <p className="mt-2 max-w-xl text-cream/75">Kits cost less than buying the same four products separately.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {kits.map((k) => {
              const parts = k.includes!.map((s) => bySlug(s)!)
              return (
                <div key={k.slug} className="flex flex-col rounded-2xl bg-cream p-5 text-ink">
                  <Link href={`/product/${k.slug}`} className="flex gap-4">
                    <div className="w-28 shrink-0 overflow-hidden rounded-xl sm:w-36"><ProductArt product={k} className="aspect-[4/5] w-full" /></div>
                    <div>
                      <h3 className="text-xl text-moss">{k.shortName}</h3>
                      <p className="mt-1 text-sm text-mist">{k.tagline}</p>
                      <ul className="mt-2 space-y-0.5 text-xs text-mist">{parts.map((s) => <li key={s.slug}>· {s.shortName}</li>)}</ul>
                    </div>
                  </Link>
                  <div className="mt-4 flex flex-wrap items-baseline gap-x-3">
                    <span className="text-2xl font-semibold">{formatMoney(k.price)}</span>
                    <span className="text-sm text-mist">vs <s>{formatMoney(separatePrice(k))}</s> separately</span>
                    <span className="rounded bg-moss/10 px-1.5 py-0.5 text-xs font-semibold text-moss">Save {formatMoney(separatePrice(k) - k.price)}</span>
                  </div>
                  <QuickAdd slug={k.slug} name={k.shortName} />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* KNOW YOUR ACTIVES */}
      <section className="container-x pt-16 md:pt-24">
        <p className="eyebrow">Know your actives</p>
        <h2 className="mt-2 text-3xl text-moss md:text-4xl">What each ingredient does, in plain words</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {actives.map((a) => (
            <Link key={a.name} href={`/product/${a.slug}`} className="group rounded-2xl border border-ink/10 bg-white p-5 transition hover:border-moss">
              <h3 className="text-xl text-moss">{a.name}</h3>
              <p className="mt-1 text-sm text-mist">{a.does}</p>
              <p className="mt-3 text-xs"><span className="font-semibold">Use:</span> {a.when} · <span className="text-clay underline underline-offset-2 group-hover:text-moss">Shop</span></p>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY DIRECT */}
      <section className="container-x pt-16 md:pt-24">
        <h2 className="text-3xl text-moss md:text-4xl">Why buy from Noor-e-Twacha directly</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [`${commerce.upiDiscountPct}% off on UPI`, 'Our direct-store discount, applied automatically at checkout.'],
            ['Kits you cannot build elsewhere', 'Routine boxes priced below the products bought one by one.'],
            ['A real person on WhatsApp', 'Ask about your skin and your routine before you buy.'],
            ['Nothing hidden', 'Full ingredient lists, actives and how-to-use on every product page.'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl bg-sand/60 p-5"><h3 className="text-lg text-moss">{t}</h3><p className="mt-1 text-sm text-mist">{d}</p></div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x pt-16 md:pt-24">
        <div className="rounded-[2rem] bg-sand p-8 text-center sm:p-12">
          <h2 className="text-3xl text-moss md:text-4xl">Not sure where to start?</h2>
          <p className="mx-auto mt-2 max-w-md text-mist">Tell us your skin type and your main concern. We will suggest a simple routine, no pressure.</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={whatsappLink('Hi Noor-e-Twacha, my skin type is ___ and my main concern is ___.')} target="_blank" rel="noreferrer" className="btn btn-primary">Message us on WhatsApp</a>
            <Link href="/faq" className="btn btn-ghost">Read the FAQ</Link>
          </div>
        </div>
      </section>
    </>
  )
}
