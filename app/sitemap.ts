import type { MetadataRoute } from 'next'
import { brand } from '@/config/brand'
import { products } from '@/data/products'
import { collections } from '@/lib/collections'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/shop', '/about', '/faq', '/policy/shipping', '/policy/returns', '/policy/privacy']
  return [
    ...pages.map((p) => ({ url: `${brand.siteUrl}${p}`, priority: p === '' ? 1 : 0.6 })),
    ...collections.map((c) => ({ url: `${brand.siteUrl}/collections/${c.slug}`, priority: 0.8 })),
    ...products.map((p) => ({ url: `${brand.siteUrl}/product/${p.slug}`, priority: p.role === 'hero' ? 0.9 : 0.7 })),
  ]
}
