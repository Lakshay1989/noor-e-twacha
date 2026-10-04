import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { bySlug, products } from '@/data/products'
import { formatMoney } from '@/lib/money'
import { ProductArt } from '@/components/ProductArt'
import { ProductCard } from '@/components/ProductCard'
import { AddToCart } from '@/components/AddToCart'

export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }))

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = bySlug((await params).slug)
  return p ? { title: p.name, description: p.short } : {}
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = bySlug((await params).slug)
  if (!p) notFound()
  const off = Math.round(((p.mrp - p.price) / p.mrp) * 100)
  const inKit = p.includes?.map((s) => bySlug(s)!).filter(Boolean)
  const related = products.filter((x) => x.slug !== p.slug && !x.includes && x.concerns.some((c) => p.concerns.includes(c))).slice(0, 4)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    offers: { '@type': 'Offer', priceCurrency: 'INR', price: p.price / 100, availability: p.preorder ? 'https://schema.org/PreOrder' : 'https://schema.org/InStock' },
  }
  return (
    <div className="container-x py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="text-sm text-mist"><Link href="/shop" className="hover:text-clay">Shop</Link> / {p.name}</p>
      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="rounded-3xl bg-sand/70 p-10">
          <ProductArt product={p} className="mx-auto h-80 md:h-[28rem]" />
        </div>
        <div>
          {p.preorder && <p className="mb-2 inline-block rounded-full bg-clay/15 px-3 py-1 text-xs font-medium text-clay">Pre-order · {p.preorder}</p>}
          <h1 className="text-4xl text-moss">{p.name}</h1>
          <p className="mt-2 text-mist">{p.short}</p>
          <p className="mt-5 text-3xl">
            {formatMoney(p.price)} <span className="text-lg text-mist line-through">{formatMoney(p.mrp)}</span>{' '}
            <span className="text-base text-clay">{off}% off</span>
          </p>
          <p className="text-xs text-mist">Inclusive of all taxes · {p.size}</p>
          <div className="mt-6 max-w-sm"><AddToCart slug={p.slug} preorder={!!p.preorder} /></div>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.keyActives.map((a) => <span key={a} className="rounded-full border border-moss/25 px-3 py-1 text-xs text-moss">{a}</span>)}
          </div>
          <p className="mt-8 leading-relaxed">{p.description}</p>

          {inKit && (
            <div className="mt-8">
              <h2 className="text-xl text-moss">In this kit</h2>
              <ul className="mt-3 space-y-2">
                {inKit.map((k) => (
                  <li key={k.slug}><Link href={`/product/${k.slug}`} className="text-sm underline decoration-clay/50 underline-offset-4 hover:text-clay">{k.name}</Link> <span className="text-xs text-mist">· {k.size}</span></li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
            <details className="py-4" open>
              <summary className="cursor-pointer font-medium">How to use</summary>
              <p className="mt-2 text-sm text-mist">{p.how}</p>
            </details>
            <details className="py-4">
              <summary className="cursor-pointer font-medium">Ingredients</summary>
              <p className="mt-2 text-sm text-mist">{p.ingredients}</p>
            </details>
            <details className="py-4">
              <summary className="cursor-pointer font-medium">Shipping & returns</summary>
              <p className="mt-2 text-sm text-mist">Dispatched in 1 to 2 working days, delivered in 3 to 7 days across India. 7-day returns on unused products. See our <Link href="/policy/returns" className="underline">returns policy</Link>.</p>
            </details>
          </div>
          <p className="mt-4 text-xs text-mist">Patch test on your inner arm before first use. Cosmetic product, not a medicine.</p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="pt-20">
          <h2 className="mb-6 text-2xl text-moss">Pairs well with</h2>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">{related.map((r) => <ProductCard key={r.slug} product={r} />)}</div>
        </section>
      )}
    </div>
  )
}
