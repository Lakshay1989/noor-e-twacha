import Link from 'next/link'
import { brand } from '@/config/brand'

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-cream/80">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-4">
        <div className="sm:col-span-2">
          <p className="font-serif text-2xl tracking-[0.18em] text-cream">{brand.name.toUpperCase()}</p>
          <p className="mt-3 max-w-sm text-sm">{brand.tagline} {brand.description}</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-medium text-cream">Shop</p>
          <Link href="/shop" className="block hover:text-cream">All products</Link>
          <Link href="/shop?concern=acne" className="block hover:text-cream">For acne</Link>
          <Link href="/shop?concern=dullness" className="block hover:text-cream">For dullness</Link>
          <Link href="/shop?concern=sun" className="block hover:text-cream">Sun care</Link>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-medium text-cream">Help</p>
          <Link href="/faq" className="block hover:text-cream">FAQ</Link>
          <Link href="/policy/shipping" className="block hover:text-cream">Shipping</Link>
          <Link href="/policy/returns" className="block hover:text-cream">Returns</Link>
          <Link href="/policy/privacy" className="block hover:text-cream">Privacy</Link>
          <a href={`mailto:${brand.email}`} className="block hover:text-cream">{brand.email}</a>
        </div>
      </div>
      <p className="border-t border-cream/10 py-5 text-center text-xs">© {new Date().getFullYear()} {brand.name}. Made in India. Cosmetic products, not medicines.</p>
    </footer>
  )
}
