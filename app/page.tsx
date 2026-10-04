import Link from 'next/link'
import { products, concernLabels, type Concern } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'
import { ProductArt } from '@/components/ProductArt'

const promises = [
  ['Short, honest ingredient lists', 'Every active, with its percentage, printed on the front of the pack.'],
  ['Built for Indian weather', 'Light textures that stay comfortable in 35°C heat and 80% humidity.'],
  ['Fair prices', 'Roughly half the price of imported brands, with no gimmicks.'],
  ['Easy returns', 'Not happy? Tell us within 7 days of delivery and we will make it right.'],
]

export default function Home() {
  const hero = products.find((p) => p.slug === 'niacinamide-zinc-serum')!
  const picks = products.filter((p) => !p.includes).slice(0, 4)
  const kits = products.filter((p) => p.includes)
  return (
    <>
      <section className="container-x grid items-center gap-10 py-14 md:grid-cols-2 md:py-24">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-clay">Skincare for Indian skin</p>
          <h1 className="mt-4 text-5xl leading-[1.05] text-moss md:text-6xl">
            Skin that feels good in <em className="text-clay">every season.</em>
          </h1>
          <p className="mt-5 max-w-md text-lg text-mist">
            Simple routines, proven ingredients and honest prices, made for heat, humidity and pollution.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className="btn btn-primary">Shop the range</Link>
            <Link href="#routine" className="btn btn-ghost">Find my routine</Link>
          </div>
        </div>
        <div className="relative rounded-[2rem] bg-sand p-10">
          <ProductArt product={hero} className="mx-auto h-72 md:h-96" />
          <span className="absolute bottom-6 left-6 rounded-full bg-cream px-4 py-2 text-xs font-medium text-moss">
            Niacinamide 5% + Zinc
          </span>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-white/50">
        <div className="container-x grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map(([t, d]) => (
            <div key={t}>
              <h3 className="text-lg text-moss">{t}</h3>
              <p className="mt-1 text-sm text-mist">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x pt-20">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl text-moss">Start here</h2>
          <Link href="/shop" className="text-sm text-clay underline">See everything</Link>
        </div>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {picks.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      <section id="routine" className="container-x pt-24">
        <h2 className="text-3xl text-moss">What is your skin asking for?</h2>
        <p className="mt-2 text-mist">Pick a concern and we will show you what works.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {(Object.keys(concernLabels) as Concern[]).map((c) => (
            <Link key={c} href={`/shop?concern=${c}`} className="rounded-full border border-moss/30 bg-white px-5 py-2.5 text-sm text-moss transition hover:bg-moss hover:text-cream">
              {concernLabels[c]}
            </Link>
          ))}
        </div>
      </section>

      <section className="container-x pt-24">
        <h2 className="text-3xl text-moss">Complete routines, in one box</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {kits.map((k) => (
            <Link key={k.slug} href={`/product/${k.slug}`} className="flex items-center gap-6 rounded-2xl bg-sand/70 p-6 transition hover:bg-sand">
              <ProductArt product={k} className="h-36 shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-widest text-clay">{k.badge}</p>
                <h3 className="mt-1 text-xl text-moss">{k.name}</h3>
                <p className="mt-1 text-sm text-mist">{k.short}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
