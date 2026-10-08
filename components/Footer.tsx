import Link from 'next/link'
import { brand, whatsappLink } from '@/config/brand'
import { Logo } from './Logo'

const col = 'text-sm'
const link = 'block py-1.5 hover:text-cream'

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-cream/75">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <Logo className="text-cream" />
          <p className="mt-4 max-w-xs text-sm">{brand.description}</p>
          <a href={whatsappLink('Hi Noor-e-Twacha, I need help choosing a routine.')} target="_blank" rel="noreferrer" className="btn mt-5 border border-cream/30 text-cream hover:bg-cream/10">
            Chat on WhatsApp
          </a>
        </div>
        <nav aria-label="Shop" className={col}>
          <p className="font-medium text-cream">Shop</p>
          <Link href="/shop" className={link}>All products</Link>
          <Link href="/collections/serums" className={link}>Serums</Link>
          <Link href="/collections/sun" className={link}>Sun care</Link>
          <Link href="/collections/routine-kits" className={link}>Routine kits</Link>
        </nav>
        <nav aria-label="Concerns" className={col}>
          <p className="font-medium text-cream">Shop by concern</p>
          <Link href="/collections/acne" className={link}>Acne & blackheads</Link>
          <Link href="/collections/dullness" className={link}>Dullness & tan</Link>
          <Link href="/collections/oil" className={link}>Oil & pores</Link>
          <Link href="/collections/dryness" className={link}>Dryness</Link>
        </nav>
        <nav aria-label="Help" className={col}>
          <p className="font-medium text-cream">Help</p>
          <Link href="/about" className={link}>Our story</Link>
          <Link href="/faq" className={link}>FAQ</Link>
          <Link href="/policy/shipping" className={link}>Shipping</Link>
          <Link href="/policy/returns" className={link}>Returns & refunds</Link>
          <Link href="/policy/privacy" className={link}>Privacy</Link>
          <a href={`mailto:${brand.email}`} className={link}>{brand.email}</a>
        </nav>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-xs">
        <p>© {new Date().getFullYear()} {brand.name}. Cosmetic products, not medicines. Patch test before first use.</p>
      </div>
    </footer>
  )
}
