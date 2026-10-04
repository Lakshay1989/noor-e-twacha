# Audit and what changed (iteration 2)

## Problems found in v1, and fixes

**Honesty and credibility (highest priority)**
- "Bestseller" / "Most loved" badges with no sales behind them → removed. Badges now only state verifiable facts.
- Claimed products were in stock and promised "dispatch in 1–2 days, delivered in 3–7 days" → everything is an explicit
  **pre-order** (`commerce.preorder` in `config/brand.ts`); no stock or dispatch-date promises. Flip the flag when real inventory exists.
- "Half the price of imported brands", "Made in India", "We do not test on animals", "no white cast on Indian skin",
  "ghee-derived fatty acids" (not in the ingredient list) → removed. They were unverified.
- Invented Instagram handle in structured data → removed.
- Inflated MRPs (up to 40%+ off) → MRPs reset to category norms, max 35%, enforced by a test.
- No fake reviews, ratings, awards or certifications anywhere. Reviews UI intentionally absent until real ones exist.

**Product and merchandising**
- All products shown equally → hierarchy: **3 hero products** (niacinamide, Vitamin C, SPF 50), **core essentials**, **value** (kits, lip balm).
- Weak hero spec (niacinamide 5%) vs market-standard 10% → upgraded to 10% niacinamide + 1% zinc (**manufacturer must confirm**).
- Generic names → search-friendly names ("10% Niacinamide + 1% Zinc PCA Face Serum"), descriptive URLs.
- Prices re-based on Amazon.in research (see `PRICING.md`); kit savings now computed, never hard-coded.

**Imagery**
- Flat, inconsistent icon-like art → original studio-style packshots: consistent 4:5 frame, gradient backdrop, glass/cap
  highlights, real label (name, active %, size). Product pages have a 3-view gallery (pack, key actives, how to use).
- Third-party/Amazon/brand photos were **not** reused (copyright). Replace with your own photography when available.

**Design and UX**
- New logo mark and wordmark, consistent brand tokens, typography, price block, buttons.
- Header: real mobile hamburger menu, cart icon with count, skip link; announcement bar shows only true offers.
- Homepage rebuilt: hero → trust facts → hero products → shop by concern → essentials rail → routine kits with savings →
  "know your actives" → why buy direct → WhatsApp help CTA.
- Product cards: image, size, name, one-line benefit, MRP / price / % off, Add to cart. Swipeable rails on mobile.
- Product page: price above the fold on mobile, sticky mobile buy bar, UPI price line, kit cross-sell, accordion details.
- Cart: free-shipping progress bar, larger touch targets. Checkout inputs use 16px text (no iOS zoom).

**SEO**
- Unique titles and meta descriptions per page, canonical URLs, one H1 per page, descriptive alt/aria labels.
- JSON-LD: Organization, WebSite, Product (+PreOrder availability, no fake ratings), BreadcrumbList, FAQPage.
- New collection pages (`/collections/acne`, `dullness`, `oil`, `dryness`, `sun`, `serums`, `routine-kits`) for internal linking
  and long-tail search; sitemap includes all; cart/checkout set to noindex; OG image and favicon generated.

**Code**
- Removed unused styles, added vitest alias, catalogue-integrity tests (unique slugs, MRP sanity, kits cheaper than parts).

## Needs a human (I cannot do these)
1. Confirm every formula, % and ingredient list with the manufacturer, including the new 10% niacinamide.
2. Independent SPF/PA test before dispatching sunscreen; edit the claim to the report.
3. Real WhatsApp number, domain, mailbox, trademark check for "Ojas".
4. Real product photography (replace `ProductArt`) and real customer reviews once they exist.
5. Confirm return window and COD fee in `config/brand.ts` and `app/policy/[slug]`.
6. Re-check Amazon prices live; send me landed costs to finalise margins.
