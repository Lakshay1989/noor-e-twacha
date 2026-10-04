'use client'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { CartLine } from './quote'

interface CartCtx {
  items: CartLine[]
  count: number
  ready: boolean
  add: (slug: string, qty?: number) => void
  setQty: (slug: string, qty: number) => void
  clear: () => void
}

const Ctx = createContext<CartCtx | null>(null)
const KEY = 'ojas-cart-v2'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem(KEY, JSON.stringify(items))
    } catch {}
  }, [items, ready])

  const add = useCallback((slug: string, qty = 1) => {
    setItems((cur) =>
      cur.some((i) => i.slug === slug)
        ? cur.map((i) => (i.slug === slug ? { ...i, qty: Math.min(i.qty + qty, 10) } : i))
        : [...cur, { slug, qty }],
    )
  }, [])
  const setQty = useCallback((slug: string, qty: number) => {
    setItems((cur) => (qty <= 0 ? cur.filter((i) => i.slug !== slug) : cur.map((i) => (i.slug === slug ? { ...i, qty: Math.min(qty, 10) } : i))))
  }, [])
  const clear = useCallback(() => setItems([]), [])

  const value = useMemo(
    () => ({ items, count: items.reduce((s, i) => s + i.qty, 0), ready, add, setQty, clear }),
    [items, ready, add, setQty, clear],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCart() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useCart outside CartProvider')
  return c
}
