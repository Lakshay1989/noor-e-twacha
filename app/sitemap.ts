import type { MetadataRoute } from 'next'
import { brand } from '@/config/brand'
import { products } from '@/data/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/shop', '/about', '/faq', '/policy/shipping', '/policy/returns', '/policy/privacy']
  return [
    ...pages.map((p) => ({ url: `${brand.siteUrl}${p}` })),
    ...products.map((p) => ({ url: `${brand.siteUrl}/product/${p.slug}` })),
  ]
}
