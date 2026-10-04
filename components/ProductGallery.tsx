'use client'
import { useState } from 'react'
import clsx from 'clsx'
import type { Product } from '@/data/products'
import { ProductArt } from './ProductArt'

/** Three consistent 4:5 views per product: packshot, key actives, how to use. */
export function ProductGallery({ product: p }: { product: Product }) {
  const [i, setI] = useState(0)
  const tile = (children: React.ReactNode) => (
    <div className="flex h-full w-full flex-col justify-center p-8 sm:p-12" style={{ background: `linear-gradient(135deg, ${p.theme.bg[0]}, ${p.theme.bg[1]})` }}>
      {children}
    </div>
  )
  const views = [
    { label: 'Pack', node: <ProductArt product={p} className="h-full w-full" /> },
    {
      label: 'Key actives',
      node: tile(
        <>
          <p className="eyebrow">Key actives</p>
          <ul className="mt-4 space-y-3">
            {p.keyActives.map((a) => <li key={a} className="font-serif text-2xl text-ink sm:text-3xl" style={{ color: p.theme.accent }}>{a}</li>)}
          </ul>
          <p className="mt-6 text-sm text-ink/70">{p.skinTypes}</p>
        </>,
      ),
    },
    {
      label: 'How to use',
      node: tile(
        <>
          <p className="eyebrow">How to use</p>
          <p className="mt-4 font-serif text-xl leading-snug text-ink sm:text-2xl">{p.how}</p>
        </>,
      ),
    },
  ]
  return (
    <div>
      <div className="mx-auto aspect-[4/5] w-[min(100%,calc(46vh*0.8))] overflow-hidden rounded-3xl md:w-full">{views[i].node}</div>
      <div className="mt-3 grid grid-cols-3 gap-3" role="tablist" aria-label="Product views">
        {views.map((v, n) => (
          <button
            key={v.label}
            role="tab"
            aria-selected={i === n}
            onClick={() => setI(n)}
            className={clsx('min-h-11 rounded-xl border text-sm', i === n ? 'border-moss bg-moss text-cream' : 'border-ink/15 bg-white text-ink hover:border-moss')}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  )
}
