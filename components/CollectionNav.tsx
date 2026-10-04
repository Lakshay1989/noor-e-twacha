import Link from 'next/link'
import clsx from 'clsx'
import type { Collection } from '@/lib/collections'

export function CollectionNav({ active, collections }: { active: string; collections: Collection[] }) {
  const chip = (on: boolean) =>
    clsx('inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-sm', on ? 'border-moss bg-moss text-cream' : 'border-moss/30 text-moss hover:bg-moss/5')
  return (
    <nav aria-label="Collections" className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
      <Link href="/shop" className={chip(active === 'all')} aria-current={active === 'all' ? 'page' : undefined}>All</Link>
      {collections.map((c) => (
        <Link key={c.slug} href={`/collections/${c.slug}`} className={chip(active === c.slug)} aria-current={active === c.slug ? 'page' : undefined}>{c.title}</Link>
      ))}
    </nav>
  )
}
