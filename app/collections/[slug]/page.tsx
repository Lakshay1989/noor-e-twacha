import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { collections, collectionBySlug } from '@/lib/collections'
import { brand } from '@/config/brand'
import { ProductCard } from '@/components/ProductCard'
import { CollectionNav } from '@/components/CollectionNav'
import { JsonLd } from '@/components/JsonLd'

export const generateStaticParams = () => collections.map((c) => ({ slug: c.slug }))

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = collectionBySlug((await params).slug)
  if (!c) return {}
  return { title: c.seoTitle, description: c.description, alternates: { canonical: `/collections/${c.slug}` } }
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = collectionBySlug((await params).slug)
  if (!c) notFound()
  return (
    <div className="container-x py-10 md:py-14">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Shop', item: `${brand.siteUrl}/shop` },
            { '@type': 'ListItem', position: 2, name: c.title, item: `${brand.siteUrl}/collections/${c.slug}` },
          ],
        }}
      />
      <h1 className="text-4xl text-moss md:text-5xl">{c.title}</h1>
      <p className="mt-3 max-w-2xl text-mist">{c.intro}</p>
      <CollectionNav active={c.slug} collections={collections} />
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 lg:grid-cols-4">
        {c.items.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </div>
  )
}
