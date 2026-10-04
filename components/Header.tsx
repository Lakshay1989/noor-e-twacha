'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { commerce } from '@/config/brand'
import { useCart } from '@/lib/cart'
import { formatMoney } from '@/lib/money'
import { Logo } from './Logo'

const links = [
  { href: '/shop', label: 'Shop all' },
  { href: '/collections/serums', label: 'Serums' },
  { href: '/collections/sun', label: 'Sun care' },
  { href: '/collections/routine-kits', label: 'Routine kits' },
  { href: '/about', label: 'Our story' },
]

export function Header() {
  const { count } = useCart()
  const [open, setOpen] = useState(false)
  const path = usePathname()
  useEffect(() => setOpen(false), [path])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
      <div className="bg-moss px-4 py-2 text-center text-xs text-cream">
        Pre-orders open · {commerce.upiDiscountPct}% off when you pay by UPI · Free shipping over {formatMoney(commerce.freeShippingOver)}
      </div>
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/95 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <button
            className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
          <Link href="/" aria-label="Ojas home" className="text-moss"><Logo /></Link>
          <nav aria-label="Main" className="hidden items-center gap-7 text-sm md:flex">
            {links.map((l) => <Link key={l.href} href={l.href} className="hover:text-clay">{l.label}</Link>)}
          </nav>
          <Link href="/cart" aria-label={`Cart, ${count} items`} className="relative -mr-2 flex h-11 items-center gap-2 rounded-full px-3 text-moss hover:bg-moss/5">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 8h14l-1.2 11H6.2L5 8z" /><path d="M9 8V6a3 3 0 016 0v2" />
            </svg>
            {count > 0 && <span className="absolute right-0 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-clay px-1 text-[11px] font-semibold text-white">{count}</span>}
          </Link>
        </div>
        {open && (
          <nav id="mobile-menu" aria-label="Mobile" className="fixed inset-x-0 top-[calc(2rem+4rem+1px)] bottom-0 z-40 overflow-y-auto bg-cream px-4 py-6 md:hidden">
            <ul className="divide-y divide-ink/10">
              {links.map((l) => (
                <li key={l.href}><Link href={l.href} className="flex min-h-14 items-center font-serif text-2xl">{l.label}</Link></li>
              ))}
              <li><Link href="/faq" className="flex min-h-14 items-center font-serif text-2xl">FAQ</Link></li>
            </ul>
          </nav>
        )}
      </header>
    </>
  )
}
