import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { bySlug, products, separatePrice, concernLabels } from '@/data/products'
import { brand, commerce, whatsappLink } from '@/config/brand'
import { formatMoney } from '@/lib/money'
import { ProductCard } from '@/components/ProductCard'
import { ProductGallery } from '@/components/ProductGallery'
import { ProductArt } from '@/components/ProductArt'
import { AddToCart } from '@/components/AddToCart'
import { Price } from '@/components/Price'
import { JsonLd } from '@/components/JsonLd'

export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }))

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = bySlug((await params).slug)
  if (!p) return {}
  const title = `${p.name}, ${p.size}`
  const description = `${p.tagline} ${p.keyActives.join(', ')}. ${formatMoney(p.price)} with free shipping over ${formatMoney(commerce.freeShippingOver)}.`
  return {
    title,
    description,
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: { title, description, type: 'website', url: `/product/${p.slug}` },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = bySlug((await params).slug)
  if (!p) notFound()
  const upiPrice = p.price - Math.round((p.price * commerce.upiDiscountPct) / 100)
  const parts = p.includes?.map((s) => bySlug(s)!)
  const inKits = products.filter((k) => k.includes?.includes(p.slug))
  const related = products.filter((x) => x.slug !== p.slug && !x.includes && !p.includes?.includes(x.slug) && x.concerns.some((c) => p.concerns.includes(c))).slice(0, 4)

  return (
    <div className="container-x pb-28 pt-6 md:pb-10 md:pt-10">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: p.name,
            description: p.description,
            sku: p.slug,
            brand: { '@type': 'Brand', name: brand.name },
            category: 'Skin care',
            url: `${brand.siteUrl}/product/${p.slug}`,
            offers: {
              '@type': 'Offer',
              priceCurrency: 'INR',
              price: p.price / 100,
              url: `${brand.siteUrl}/product/${p.slug}`,
              availability: commerce.preorder ? 'https://schema.org/PreOrder' : 'https://schema.org/InStock',
              seller: { '@type': 'Organization', name: brand.name },
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Shop', item: `${brand.siteUrl}/shop` },
              { '@type': 'ListItem', position: 2, name: p.shortName, item: `${brand.siteUrl}/product/${p.slug}` },
            ],
          },
        ]}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-mist">
        <Link href="/shop" className="hover:text-clay">Shop</Link> <span aria-hidden="true">/</span> <span aria-current="page">{p.shortName}</span>
      </nav>

      <div className="mt-5 grid gap-8 md:grid-cols-2 md:gap-12">
        <ProductGallery product={p} />
        <div>
          {commerce.preorder && <p className="mb-3 inline-block rounded-full bg-clay/10 px-3 py-1 text-xs font-semibold text-clay">Pre-order · we confirm your dispatch date on WhatsApp</p>}
          <h1 className="text-3xl leading-tight text-moss md:text-4xl">{p.name}</h1>
          <p className="mt-2 text-mist">{p.tagline}</p>
          <div className="mt-5"><Price product={p} size="lg" /></div>
          <p className="mt-1 text-xs text-mist">Inclusive of all taxes · {p.size}{parts ? ` · ${formatMoney(separatePrice(p) - p.price)} less than buying separately` : ''}</p>
          <p className="mt-2 text-sm font-medium text-moss">{formatMoney(upiPrice)} when you pay by UPI ({commerce.upiDiscountPct}% off)</p>

          <div className="mt-6 max-w-md"><AddToCart slug={p.slug} name={p.shortName} price={p.price} /></div>

          <ul className="mt-6 space-y-1.5 text-sm">{p.benefits.map((b) => <li key={b}>✓ {b}</li>)}</ul>
          <p className="mt-6 leading-relaxed text-ink/90">{p.description}</p>

          {parts && (
            <div className="mt-6 rounded-2xl bg-sand/60 p-4">
              <h2 className="font-sans text-sm font-semibold tracking-normal">What is in the box</h2>
              <ul className="mt-3 grid grid-cols-2 gap-3">
                {parts.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/product/${s.slug}`} className="flex items-center gap-2">
                      <span className="w-12 shrink-0 overflow-hidden rounded-lg"><ProductArt product={s} className="aspect-[4/5] w-full" /></span>
                      <span className="text-xs leading-tight">{s.shortName}<span className="block text-mist">{s.size}</span></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {inKits.map((k) => (
            <Link key={k.slug} href={`/product/${k.slug}`} className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-moss/30 p-4 hover:bg-moss/5">
              <span className="text-sm"><b>Part of the {k.shortName}</b><br /><span className="text-mist">Get the full routine for {formatMoney(k.price)} and save {formatMoney(separatePrice(k) - k.price)}</span></span>
              <span aria-hidden="true" className="text-moss">→</span>
            </Link>
          ))}

          <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
            <details className="py-4" open><summary className="cursor-pointer font-medium">How to use</summary><p className="mt-2 text-sm text-mist">{p.how}</p></details>
            <details className="py-4"><summary className="cursor-pointer font-medium">Ingredients</summary><p className="mt-2 text-sm text-mist">{p.ingredients}</p></details>
            <details className="py-4"><summary className="cursor-pointer font-medium">Best for</summary>
              <p className="mt-2 text-sm text-mist">{p.skinTypes}. Targets: {p.concerns.map((c) => concernLabels[c].toLowerCase()).join(', ')}.</p></details>
            <details className="py-4"><summary className="cursor-pointer font-medium">Shipping & returns</summary>
              <p className="mt-2 text-sm text-mist">Free shipping over {formatMoney(commerce.freeShippingOver)}. Full details in our <Link href="/policy/shipping" className="underline">shipping</Link> and <Link href="/policy/returns" className="underline">returns</Link> policies.</p></details>
          </div>
          <p className="mt-4 text-xs text-mist">Patch test on your inner arm before first use. Cosmetic product, not a medicine. Questions? <a className="underline" target="_blank" rel="noreferrer" href={whatsappLink(`Hi Noor, a question about ${p.shortName}:`)}>Ask on WhatsApp</a>.</p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="pt-16">
          <h2 className="mb-6 text-2xl text-moss md:text-3xl">Pairs well with</h2>
          <div className="rail">{related.map((r) => <ProductCard key={r.slug} product={r} />)}</div>
        </section>
      )}
    </div>
  )
}
