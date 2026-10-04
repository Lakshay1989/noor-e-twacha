# Ojas — skincare store

A standalone D2C skincare brand site. Next.js 15 · TypeScript · Tailwind v4. No database: orders are validated and priced on the
server, then sent to your WhatsApp (and optionally a Google Sheet via webhook).

```bash
npm install
cp .env.example .env.local   # set your WhatsApp number
npm run dev                  # http://localhost:3000
npm test && npm run typecheck && npx next build
```

## Where things live
- `config/brand.ts` — name, tagline, contact, shipping/COD/UPI rules. Rename the brand here.
- `data/products.ts` — the whole catalogue (prices in paise). Add a product = add an object.
- `lib/quote.ts` — server-side pricing; the only source of truth for totals.
- `app/api/order/route.ts` — validates an order, prices it, fires the optional webhook, returns the WhatsApp link.
- `components/ProductArt.tsx` — drawn packaging until real photos exist.

## Before you take real orders (needs the founder)
1. **Brand name:** "Ojas" is a placeholder. Check trademark (IP India search, class 3) and the domain.
2. **Real WhatsApp number** in `.env.local` / Vercel env (`NEXT_PUBLIC_WHATSAPP`).
3. **Manufacturer:** a licensed cosmetics contract manufacturer must confirm every formula, percentage and ingredient list in
   `data/products.ts` and handle the state cosmetics licence and BIS/label rules. Do not sell on drafts.
4. **Sunscreen:** keep it as pre-order until an independent lab reports the SPF/PA numbers; edit the claim to match the report.
5. **Prices / margins:** update to your real landed cost. Rule of thumb: price at 4–5x product cost so each order is profitable after shipping, COD fees and returns.
6. **Real photos** replace `ProductArt`; **real policies** reviewed (starter text in `app/policy/[slug]`).
7. Deploy: push to GitHub, import in Vercel, set the env vars, point the domain.

## Later
Razorpay for online payment, a database/admin for orders, reviews, subscriptions, email flows.
