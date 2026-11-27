# Master Plan: Bhagwati Caterers

_Version 1, 2026-11-27. Based on the three research reports in `docs/research/`. Items marked **[OWNER]** need an answer from the owner; items marked **[VERIFY]** need checking before launch._

## 1. Positioning

"30+ years, pure vegetarian, Maharashtrian, South Indian and Rajasthani specialist, FSSAI licensed, serving Latur and nearby areas."

We position as a specialist, not a generic all-cuisine caterer. Research found that local listings are thin (only one Latur caterer surfaced, with hidden terms and no reviews) and that Marathi search for caterers appears largely unserved **[VERIFY by searching Google from Latur]**. Our edge is a Marathi-first site, clear order types, clear terms, and real trust signals.

## 2. Two order types (core feature)

Shown as two large cards with a comparison table:

| | We bring everything | You provide ingredients, we cook |
|---|---|---|
| Marathi label (draft) | सर्व साहित्यासह | आपले साहित्य, आमचा स्वयंपाक |
| Who buys ingredients | Bhagwati Caterers | Customer |
| Pricing basis | Per plate **[OWNER]** | Labour / per head or per quantity **[OWNER]** |

The owner must define both precisely before launch. A third small card covers **home-style prepared food on order**.

## 3. Technology (see `research/03-architecture-and-hosting.md`)

- **Public site:** Astro static site on Cloudflare Pages. Marathi default at `/`, English at `/en/`, Hindi at `/hi/`, with hreflang.
- **Dashboard (Phase 2):** installable web app (PWA) at `/admin`, Supabase for database and login, nightly backup job.
- **Forms:** custom quote form, Cloudflare Turnstile and a hidden trap field, server validation, owner notified by email, WhatsApp message prefilled for the customer.
- **WhatsApp:** free click-to-chat links only at launch.
- **Payments:** UPI QR and link, owner marks payments received by hand. No gateway at launch.
- **Domain:** .in (and .com if cheap), registered in the owner's name **[OWNER]**, DNS on Cloudflare.
- **Performance budget:** page under about 1 MB, hero image under about 150 KB, Largest Contentful Paint 2.0 s or less on Slow 4G, almost no JavaScript on public pages.

## 4. Sitemap (public site)

1. Home
2. Our Services: weddings, events and parties, puja and religious functions, home-style food on order
3. Menus: Maharashtrian, South Indian, Rajasthani, with dietary tags (Jain, no onion/garlic, fasting/upvas)
4. Packages and how ordering works (the two order types)
5. Get a Quote (short form, opens WhatsApp prefilled)
6. Gallery (owner's photos)
7. About us (30+ years, Shanti Lal Maharaj, FSSAI, kitchen)
8. Testimonials (only with permission)
9. FAQ and terms (advance, cancellation, minimum guests) **[OWNER]**
10. Service areas: Latur first; Udgir, Ausa, Nilanga etc. only when real events can be shown
11. Contact (phone, WhatsApp, map)
12. Credits (image and font licences)
13. Blog / festival guides (Phase 1b, for search traffic)

## 5. Phases

### Phase 0: Plan (done in this commit)
Research, master plan, design guide, content plan, image-credit process.

### Phase 1: Public website (target: first working version)
- Foundation: repo structure, design tokens, layout, multilingual setup, performance and Lighthouse checks
- Original SVG art kit (border, Warli-inspired scene, kalash, toran, rangoli, thali, dish icons)
- All pages above in Marathi, with English and Hindi following
- Quote form, WhatsApp and call buttons, schema.org markup, sitemap, robots
- Accessibility pass and real low-end Android check
- Deploy preview, owner review, then launch

### Phase 1b: Get found
- Google Business Profile, Instagram and Facebook created with the same name and phone number
- Review collection by WhatsApp after every event (no incentives)
- 4 to 6 starter blog posts

### Phase 2: Owner dashboard
Lead pipeline, quote builder, event calendar, kitchen prep, shopping and packing sheets, staff assignment, event task checklists, payment tracking, CSV export.

### Phase 3: Growth
Payment gateway if volume justifies it, review automation, loyalty and referral offers, festival campaigns, reports.

## 6. Agent team and folder ownership

Agents never edit the same files at once. The lead agent merges.

| Agent | Owns | Phase |
|---|---|---|
| Lead / coordinator | `docs/`, merges, task board | all |
| Foundation | `apps/site` config, layout, i18n, CI | 1 |
| Design and art | `apps/site/src/assets/art`, `design-guide.md`, `image-credits.md` | 1 |
| Content | `apps/site/src/content`, `content-plan.md` | 1 |
| Pages | `apps/site/src/pages`, components | 1 |
| Forms and integrations | `functions/`, WhatsApp, Turnstile | 1 |
| SEO and performance | schema, sitemap, Lighthouse budget | 1 |
| QA | tests, accessibility, device checks | all |
| Dashboard, database | `apps/admin`, `supabase/migrations` | 2 |

Repository layout: `apps/site`, `apps/admin`, `functions`, `packages/shared`, `supabase/migrations`, `docs`.
Working rules: small commits, Conventional Commits, required checks before merge, human review for login, payment and database changes, no secrets in the repo.

## 7. Compliance notes (not legal advice)

- FSSAI licence number goes in the site footer, on quotes, invoices and receipts. Invoices and receipts require it; showing it on the website is our recommendation, not a confirmed rule **[VERIFY with FSSAI or a professional]**.
- Avoid hygiene or health superlatives ("100% hygienic", "healthiest").
- Use "inspired by" wording for Paithani and Warli styles. No deity icons without the owner's approval.
- Testimonials only with permission. Do not mark up our own testimonials as star ratings in schema.
- Phone numbers collected by the form: collect the minimum, show a short privacy notice, and re-check India's DPDP Rules dates **[VERIFY]**.

## 8. Key risks

See the risk table in `research/03-architecture-and-hosting.md`. The main ones for the owner: accounts must be in the owner's name with recovery codes, and the free database plan needs the nightly backup job.

## 9. What we need from the owner before launch
See `open-questions.md`. The most important are: FSSAI number, photos, menus, prices or price bands, service area, address, and the definition of the two order types.
