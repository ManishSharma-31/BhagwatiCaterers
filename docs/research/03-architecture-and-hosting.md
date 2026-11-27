# Bhagwati Caterers - Architecture, Hosting and Integrations Research

Date of research: 2026-11-27. Confidence labels: [VERIFIED] = read on a vendor/official page this session; [REPORTED] = third-party article; [UNCERTAIN] = from memory or not confirmed, recheck before committing. Prices change often; re-verify before purchase.

## 0. Recommendation in one paragraph

Build the public site with **Astro (static output, Marathi default, English and Hindi) on Cloudflare Pages**, and build the owner dashboard as a **separate small app in the same repo** (Astro island/SPA or Svelte/Preact, installable as a PWA) backed by **Supabase (Postgres + Auth + Row Level Security)** on the free plan, with a nightly GitHub Actions backup job (which also doubles as keep-alive so the free project never pauses). Quote form posts to a **Cloudflare Pages Function** that checks Turnstile, writes the lead to Supabase and sends an email/WhatsApp-link notification. WhatsApp = free click-to-chat links (no Business API at launch). UPI = static QR + deep link (no payment gateway at launch). Estimated recurring cost: domain only (about Rs 700 to 1,200 per year for .in or .com), everything else Rs 0.

Alternative if the owner dislikes Supabase pausing risk or wants one vendor: Cloudflare Workers + D1 (also free, no pausing) but weaker auth and RLS story (see section 3).

---

## 1. Candidate stacks

Scores 1 (poor) to 5 (excellent). Weights are not applied; it is a judgment table.

| Criterion | (a) Astro static + Supabase (or CF D1/Workers) | (b) Next.js full-stack on Vercel | (c) SvelteKit on Cloudflare | (d) Plain HTML/JS + Google Sheets/Apps Script |
|---|---|---|---|---|
| Cost for small Indian business | 5 (free tiers; domain only) | 3 (Hobby plan is for non-commercial use per Vercel terms [REPORTED/UNCERTAIN]; Pro is paid per seat, about $20/user/month [VERIFIED]) | 5 (Cloudflare free) | 5 (free) |
| Speed on low-end phones/slow nets | 5 (zero JS by default, static HTML on CDN) | 3 (React hydration, heavier JS, even with RSC) | 4 (small JS bundles, SSR at edge) | 4 (light, but Apps Script calls are slow, 1-3 s cold) |
| Ease for non-technical owner | 4 (owner uses dashboard only; content edits by agents via GitHub, optional Decap/Git CMS later) | 3 | 3 | 5 for data (owner already knows Sheets), 2 for building a real dashboard/auth |
| Marathi/Hindi/English i18n | 5 (Astro has built-in i18n routing: locales, defaultLocale, fallback, prefix control [VERIFIED docs.astro.build]) | 4 (next-intl/i18n routing works, more config) | 4 (paraglide/svelte-i18n) | 2 (hand-rolled, error prone, hreflang by hand) |
| SEO | 5 (pure static HTML, sitemap, hreflang, schema.org easy) | 4-5 | 4-5 (SSR/prerender) | 3 (possible but weak tooling) |
| Auth for owner dashboard | 4 (Supabase Auth with RLS; or Cloudflare Access free for up to 50 users [UNCERTAIN, verify]) | 4 (NextAuth/Supabase) | 4 | 2 (Apps Script web app with Google sign-in works but clunky, quotas, hard to secure by role) |
| Long-term maintainability by AI agents | 5 (small, typed, file-based content, great docs) | 4 (fast-moving framework, frequent breaking changes) | 4 (smaller ecosystem) | 2 (Apps Script editor is outside git unless clasp; no tests; spaghetti risk) |
| **Total (of 35)** | **33** | 24 | 28 | 23 |

Notes:
- Astro is built for content sites and ships little JavaScript; its i18n routing config and fallback options were confirmed in the official docs: https://docs.astro.build/en/guides/internationalization/ [VERIFIED].
- Vercel Hobby: included usage is generous (100 GB fast data transfer, 1M requests, 100 deployments per day) per https://vercel.com/docs/plans/hobby [VERIFIED], but Vercel's terms restrict Hobby to personal/non-commercial use (see https://vercel.com/docs/limits/fair-use-guidelines and community threads) [REPORTED]. A catering business is commercial, so (b) would likely need Pro. This alone disqualifies (b) on a near-zero budget.
- Google Sheets/Apps Script (d) is fine as a **bridge/backup** (e.g., append every lead to a Sheet as a read-only copy for the owner) but not as the system of record.
- Astro vs SvelteKit on the public pages: both fine; Astro wins on content/i18n/blog tooling (content collections, MDX, RSS, sitemap integrations).

**Recommended: (a) with Supabase.** Cloudflare D1 variant noted below.

### Supabase vs Cloudflare D1/Workers for the backend

| Item | Supabase Free | Cloudflare D1 + Workers Free |
|---|---|---|
| DB size | 500 MB per project [VERIFIED supabase.com/pricing.md] | 5 GB total, 10 DBs [VERIFIED developers.cloudflare.com/d1/platform/pricing] |
| Limits | 50,000 monthly active auth users, 1 GB file storage, 5 GB egress [VERIFIED] | 5M rows read/day, 100,000 rows written/day [VERIFIED] |
| Auth | Built in (email/magic link, Google, phone OTP; RLS ties to it) | None built in: roll your own or use Cloudflare Access/another IdP |
| Row-level security | Native Postgres RLS | Not available (enforce in Worker code) |
| Pausing | Free project pauses after about a week of inactivity [VERIFIED supabase.com/kb/faqs/platform/free-project-pausing] | No pausing |
| Backups | No automatic backups on Free [VERIFIED]; use pg_dump from CI | Time Travel/export available [UNCERTAIN on free-plan retention] |
| Upgrade path | Pro from $25/month [VERIFIED] | Workers Paid about $5/month [UNCERTAIN] |

Mitigation for Supabase pausing: a GitHub Actions cron (daily) runs a read query and a pg_dump to an artifact/private repo; real owner usage during events also counts as activity.

---

## 2. Hosting, domain, email, forms

### Static hosting free tiers (late 2026)

| Host | Free tier highlights | Caveats |
|---|---|---|
| **Cloudflare Pages** | 500 builds/month, 1 concurrent build, 20-minute build timeout, 20,000 files per site, 25 MiB max file, 100 custom domains per project; no bandwidth cap listed on the limits page [VERIFIED developers.cloudflare.com/pages/platform/limits]. Pages Functions run on Workers free quota. | Cloudflare is steering new projects toward Workers with static assets; Pages still works. [UNCERTAIN on long-term roadmap, check docs when scaffolding.] India edge presence is good. |
| Netlify | Credit-based free plan; form submissions are now free and unlimited as of April 2026, but bandwidth/compute credit rates doubled; free plan still has one team member [VERIFIED netlify.com/changelog/2026-04-14-pricing-updates-april-2026] | Credits can run out and pause the site; less predictable |
| Vercel Hobby | 100 GB transfer, 1M CDN requests, 100 deployments/day [VERIFIED] | Non-commercial-use clause [REPORTED] |
| GitHub Pages | Free for public repos, static only, soft limits about 1 GB site and 100 GB/month bandwidth [UNCERTAIN, from memory] | No server functions, no redirects/headers control, repo must be public for free (private needs paid plan) |

Pick Cloudflare Pages: unmetered static bandwidth, functions for the form, same vendor as DNS, Turnstile and (optionally) D1.

### Domain

- .in: cheap first year at some registrars (GoDaddy promo about $1 first year, one.com about $2) but renewal differs a lot: GoDaddy about $13, some budget registrars about $6 per year [REPORTED, https://domainoffer.net/tld/in, snapshot Nov 2026]. Always compare **renewal**, not first-year promo.
- .com is typically about $10 to 12 per year at wholesale registrars; Cloudflare Registrar sells at cost with no markup [UNCERTAIN, verify]. Buying at Cloudflare keeps DNS, SSL and registrar in one place. .in is supported by Cloudflare Registrar? [UNCERTAIN - Cloudflare supports a limited TLD list; check]. If not, buy .in at a budget registrar (Namecheap, Spaceship, a reputable Indian registrar) and point nameservers to Cloudflare.
- Recommendation: register **both** bhagwaticaterers.in (primary for local trust) and, if available, .com redirect. Put the domain in the **owner's** name/account, not an agent's, with 2FA.
- Keep registrar account email as the owner's.

### Email and forms

- Business email: Cloudflare Email Routing (free) forwards info@yourdomain to the owner's Gmail; reply-from-Gmail via SMTP is possible with "send as" [UNCERTAIN about reliability; test]. Zoho Mail free plan for custom-domain mailbox exists but has limits and web-only access in some regions [UNCERTAIN].
- Quote form: custom form posts to a Pages Function; it validates, verifies Turnstile, inserts into Supabase `leads`, and emails the owner using Resend (free tier about 3,000 emails/month [UNCERTAIN]) or MailChannels/Cloudflare email send. Also show a prefilled WhatsApp link after submit.
- Fallback with zero code: Netlify Forms (free, unlimited submissions per April 2026 changelog) or Formspree; but a custom form avoids vendor lock and feeds the dashboard directly.

### GitHub connection

- Cloudflare Pages: connect GitHub repo in dashboard (OAuth app), pick production branch (`main`); every PR branch gets a preview URL; environment variables set in dashboard, never in repo. Build: `npm ci && npm run build`, output `dist`. [VERIFIED in general behavior; exact UI steps UNCERTAIN]
- Alternative: GitHub Actions builds and deploys with `wrangler pages deploy` using a scoped API token stored in GitHub Secrets. This gives CI gating (tests must pass before deploy) and is preferred for agent workflows.

---

## 3. Backend and data for the dashboard

### Auth options
1. **Supabase Auth** (recommended): email magic link or email+password for the owner, plus optional staff accounts with a `role` claim. Phone OTP needs an SMS provider (costs) so avoid; use email magic link or Google sign-in. Enforce 2FA (TOTP) for owner.
2. Cloudflare Access (Zero Trust free for up to 50 users [UNCERTAIN, verify]) in front of `/admin` route: zero auth code, Google login. Good second layer even with Supabase.
3. Avoid shared passwords or Google Sheets sharing links as access control.

### Schema outline (Postgres; all tables have `id uuid pk`, `created_at`, `updated_at`, `created_by`)

- `profiles(user_id fk auth.users, role enum[owner, manager, staff], name, phone)`
- `customers(name, phone, alt_phone, email, address, city, notes, source, consent_at, consent_text_version)`
- `leads(customer_id, event_type, event_date, guests_min, guests_max, service_mode enum[with_material, without_material], diet_prefs text[] (jain, no_onion_garlic, satvik, sugar_free...), venue, budget_hint, language, status enum[new, contacted, quoted, negotiating, won, lost], lost_reason, next_followup_at, assigned_to, utm_source, honeypot_flag)`
- `lead_activities(lead_id, kind[call, whatsapp, note, status_change], body, at, by)`
- `menu_items(name_mr, name_en, name_hi, category, description_*, is_jain_ok, no_onion_garlic_ok, unit, cost_per_unit, image_url, active)`
- `packages(name_*, description_*, price_per_plate, min_guests, includes, active)`, `package_items(package_id, menu_item_id, qty_per_plate)`
- `quotes(lead_id, version, valid_until, subtotal, discount, gst_pct, total, status[draft, sent, accepted, rejected], pdf_url, terms)`, `quote_lines(quote_id, menu_item_id nullable, description, qty, unit_price, amount)`
- `events(quote_id, lead_id, customer_id, date, start_time, venue, guests_confirmed, status[confirmed, in_prep, done, cancelled], notes)`
- `event_menu(event_id, menu_item_id, qty_total)` (drives prep, shopping and packing sheets)
- `ingredients(name_*, unit, default_price)`, `recipes(menu_item_id, ingredient_id, qty_per_100_guests)`
- `shopping_list_items` / `packing_list_items` (generated per event, editable, with `checked`)
- `staff(name, phone, role[cook, helper, server, driver], daily_rate, active)`, `event_staff(event_id, staff_id, role, shift_start, shift_end, wage, paid)`
- `tasks(event_id nullable, title, due_at, assignee, status, checklist jsonb)`
- `payments(event_id, quote_id, kind[advance, balance, refund], amount, mode[upi, cash, bank], reference, received_at, note)`; computed view `event_balance`
- `testimonials`, `gallery_items`, `blog_posts` can stay in git as content files (Markdown) rather than DB, to keep the public site fully static.

Public menu/packages can be generated at build time from a JSON export of DB or kept in git; avoid public runtime DB reads for speed.

### Row-level security
- Enable RLS on every table. Policy pattern: owner/manager full access (`role in ('owner','manager')`), staff read-only on assigned events/tasks, anonymous insert-only on `leads` through the server function (service key stays server-side; do not expose anon insert directly, to avoid spam and enumeration).
- Never ship the service-role key to the browser or repo; only the anon key is public and is safe only because of RLS.
- Add a test (pgTAP or a script in CI) asserting anon cannot select from any table.

### Backups and export
- Free Supabase has no automatic backups [VERIFIED]. Run scheduled GitHub Actions: `pg_dump` (encrypted with age/gpg) to a private repo or a Cloudflare R2 bucket (R2 free tier about 10 GB [UNCERTAIN]); retention 30 daily + 12 monthly.
- Also nightly CSV export of key tables to a Google Drive folder or emailed zip so the owner can open in Excel. Dashboard should have "Download Excel/CSV" buttons per list (client-side CSV with UTF-8 BOM so Marathi text opens correctly in Excel).
- Test a restore once per quarter; record in docs.

---

## 4. India-specific integrations

### UPI
- UPI deep link scheme: `upi://pay?pa=<VPA>&pn=<name>&am=<amount>&cu=INR&tn=<note>&tr=<ref>` as per the NPCI linking specification (spec PDFs referenced at https://www.labnol.org/files/upi.pdf and NPCI circulars) [REPORTED]. Works on Android via intent; iOS support varies by app.
- Zero MDR on UPI for merchants since 2020 per PhonePe's explainer [REPORTED, https://business.phonepe.com/articles/payment-gateway-charges-in-india-complete-mdr-and-fee-breakdown]. So a personal/business VPA + QR costs nothing.
- Recommended v1: show a static UPI QR and a "Pay advance" deep-link button on the quote/payment page and in WhatsApp messages; the owner **manually marks** payments received in the dashboard (matching bank SMS). Include the quote number in `tn`.
- Caution: deep links do not confirm payment; do not auto-mark paid.

### Payment gateways
- Razorpay India standard pricing is commonly cited around 2% per domestic transaction plus GST; the razorpay.com/pricing page fetched showed only US pricing so India figures are [UNCERTAIN]. Check https://razorpay.com/pricing with an Indian IP / the India site.
- Per PhonePe's article: domestic card MDR roughly 0.4 to 2% depending on type, RuPay debit often 0, international cards about 3% or higher, chargebacks Rs 200 to 500 [REPORTED, article internally inconsistent on credit cards].
- Cashfree and PhonePe PG: similar headline rates (about 1.5 to 2% cards, UPI free or near-free) [UNCERTAIN; check each pricing page].
- Verdict: not needed for launch. Advances for events are large, and UPI/bank transfer is free. Add a gateway (payment links) only if customers ask for card/EMI or you need auto-reconciliation. Gateway onboarding needs business KYC (PAN, bank, sometimes GST/Udyam).

### WhatsApp
- **Click-to-chat**: `https://wa.me/91XXXXXXXXXX?text=<url-encoded message>` is free, needs no approval, works for both site button and dashboard "send quote on WhatsApp" buttons (opens the owner's WhatsApp with a prefilled message). Marathi text must be URL-encoded as UTF-8.
- **WhatsApp Business app** (free, phone app): catalog, labels, quick replies, away messages; ideal for this size of business.
- **WhatsApp Business Platform/API**: Meta charges per delivered message since July 2025; messages from customers are free [VERIFIED developers.facebook.com/documentation/business-messaging/whatsapp/pricing]. Reported India rates from 1 Oct 2026, before 18% GST: marketing about Rs 0.86, utility and authentication about Rs 0.115 per message [REPORTED, cashify.in]. Starting 1 Oct 2026 each number gets 1,000 free service messages per month [VERIFIED same Meta page]. Also needs a BSP (AiSensy, Wati etc.) with their own monthly fees [REPORTED, UNCERTAIN amounts], a verified Meta business account, template approval.
- When needed: automated reminders (event confirmation, payment due), bulk festival offers, multiple agents on one number. Not needed in v1; the dashboard generates click-to-chat links instead (semi-manual).

### Google Maps, Business Profile
- Maps: use a plain link to Google Maps or a lazy-loaded iframe embed (embed API for basic iframe has been free [UNCERTAIN]); load on click/scroll to avoid heavy JS on slow phones. Avoid the JS Maps API (needs billing account).
- Google Business Profile (free): claim, set category "Caterer", service areas, hours, photos, Marathi/English description, link to quote page with UTM, collect reviews; copy review count/rating onto site only as static text with consent (do not scrape). Add LocalBusiness schema.org JSON-LD matching GBP details.

### Spam protection
- **Cloudflare Turnstile**: free plan allows 20 widgets per account, 10 hostnames per widget, unlimited challenges, WCAG 2.2 AAA, 7-day analytics [VERIFIED developers.cloudflare.com/turnstile/plans]. Preferred over reCAPTCHA (lighter, no Google tracking, no cookie banner issue).
- Add a honeypot field, server-side rate limit per IP (Workers), and basic phone-number validation (10 digit Indian mobile starting 6-9).
- reCAPTCHA is acceptable but heavier; hCaptcha is an alternative [UNCERTAIN on current free limits].

### SMS
- OTP/transactional SMS in India requires DLT registration (entity, sender ID, templates) and costs about Rs 0.15 to 0.25 per SMS [UNCERTAIN]. Avoid; use email magic links for admin and WhatsApp click-to-chat for customers. If SMS is ever needed, use an Indian provider (MSG91, Fast2SMS) after DLT.

---

## 5. Performance, accessibility, fonts, PWA

### Targets (test on throttled "Slow 4G" and mid/low Android, e.g., Moto G class)
- Core Web Vitals "good" thresholds: LCP at or under 2.5 s, INP at or under 200 ms, CLS at or under 0.1 [REPORTED; stable Google thresholds; https://web.dev/articles/defining-core-web-vitals-thresholds].
- Stricter project budget: homepage under 100 KB HTML+CSS (compressed), under 30 KB JS on public pages (aim for 0), hero image under 80 KB (AVIF/WebP, responsive srcset), total first load under 300 KB excluding gallery lazy images, LCP under 2.0 s on Slow 4G, Lighthouse mobile 95+ performance/100 accessibility/100 SEO in CI (Lighthouse CI).
- Gallery: `loading="lazy"`, explicit width/height, WebP/AVIF generated at build by Astro's image service.
- No heavy sliders, no autoplay video; YouTube embeds via click-to-load facade.
- Accessibility: WCAG 2.2 AA, 48 px tap targets, contrast 4.5:1, visible focus, form labels in all languages, `lang` attribute per page (`mr`, `en`, `hi`), skip link, language switcher persistent and easy to find.

### Devanagari fonts
- Devanagari fonts are large; follow web.dev guidance: subset, WOFF2, `unicode-range`, `font-display` (swap for visible text, optional for non-critical), `size-adjust` to limit layout shift, preload only the main body font [VERIFIED https://web.dev/articles/font-best-practices].
- Options: (1) **system font stack** first (Android has Noto Sans Devanagari built in on modern devices: zero bytes, fastest), (2) self-host one variable Noto Sans Devanagari or Mukta/Hind via Fontsource (https://fontsource.org/fonts/noto-sans-devanagari) subset to needed weights (400 and 700 only), each woff2 around 30 to 80 KB per weight [UNCERTAIN on exact size; measure].
- Recommended: system stack for body text on low-end devices plus one self-hosted display font for headings (optional), with fallback metrics tuned. Test with Marathi conjuncts (jodakshare) rendering and line-height of at least 1.6 (Devanagari headers clip at tight line-heights).
- Self-hosting is not automatically faster than a third-party CDN, but removes a connection and privacy issue; web.dev says measure first [VERIFIED].

### PWA (installable dashboard)
- Make `/admin` a separate PWA scope: web manifest (name, icons 192/512, `display: standalone`, `start_url: /admin/`, `scope: /admin/`), service worker caching the app shell (Workbox or vite-plugin-pwa).
- Offline: read-only cache of today's prep/shopping/packing sheets and checklists; queue checkbox changes in IndexedDB and sync when online (kitchen/venue often has poor signal). Keep conflict rule simple: last write wins per checklist item.
- Don't make the public site a PWA beyond a manifest and light caching; avoid aggressive service worker on public pages (stale content, SEO risk).
- iOS install is manual (Add to Home Screen); Android shows install prompt.
- Print stylesheet for prep/shopping/packing sheets (A4, Marathi readable), plus "Share on WhatsApp" for the lists.

---

## 6. Security and privacy

### DPDP (high level; not legal advice)
- India's Digital Personal Data Protection Act, 2023, with Rules notified in November 2025; obligations roll out in phases over about 12 to 18 months from notification, with consent-related and notice obligations coming later in that window [REPORTED, https://yourstory.com/2025/11/digital-personal-data-protection-dpdp-rules-2025-rollout-over-18-months; https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf]. By late 2026 (now) assume major duties are near/in force; confirm the current commencement dates [UNCERTAIN].
- Practical posture for a small caterer collecting name, phone, event date: collect only what is needed (data minimization); show a short notice in Marathi/English/Hindi at the form stating what is collected, why (to prepare a quote and contact you), who sees it, retention, and how to request deletion; unticked consent checkbox or clear statement before submit; log consent timestamp and notice version; honor correction/deletion requests (give a phone/email contact); notify on breach (the law envisages notifying the Board and affected people; penalties up to Rs 250 crore for serious failures, tiered [REPORTED]).
- Retention: delete or anonymize leads not converted after e.g. 24 months; keep payment records per tax rules (typically 6+ years for accounts [UNCERTAIN, ask the CA]).
- Marketing messages (WhatsApp broadcast) need separate opt-in.
- Publish a Privacy Policy and Terms page in all three languages (agent drafts, owner/lawyer reviews).
- No analytics that identifies individuals; prefer Cloudflare Web Analytics (cookie-free) or Plausible; if Google Analytics is used, add consent banner.

### Storing phone numbers
- Treat as personal data: only in DB behind RLS, never in public JSON, never in URLs/query strings, never in logs. Mask in lists for staff roles where not needed. Encrypt backups. Don't print the owner's personal number in client-side obfuscation-free source if spam is a concern (public business number is fine and expected).

### Admin auth and app security
- MFA for owner on: Supabase, Cloudflare, GitHub, domain registrar, Google (Business Profile), email. Use a password manager; recovery codes stored offline with the owner/family member.
- GitHub: branch protection on `main`, required status checks, no force pushes, secret scanning and push protection on, Dependabot/Renovate.
- Security headers via `_headers` (CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS), HTTPS only.
- Input validation server-side (zod), output escaping, parameterized queries, CSRF protection for cookie sessions, rate limiting on form and login.
- Secrets: only in Cloudflare/GitHub secret stores; `.env.example` committed with placeholders; `.env` in `.gitignore`; gitleaks in CI; rotate any key that ever hits git history. Only the Supabase anon key and Turnstile site key may be public.
- Least privilege: separate Supabase service key only in the Pages Function; staff accounts cannot export all customers.
- Audit log table for deletes/exports of customer data.

---

## 7. Repository, workflow, CI, agent parallelism, docs

### Structure (single monorepo, npm workspaces or pnpm)

```
/
  apps/
    site/            # Astro public website (mr default, en, hi)
      src/pages/{mr,en,hi}/..., src/content/{menu,packages,blog,faq,testimonials}/
      src/i18n/{mr,en,hi}.json
    admin/           # dashboard SPA/PWA
  functions/         # Cloudflare Pages Functions (quote form, webhooks)
  packages/
    shared/          # types, zod schemas, constants, phone/UPI/WhatsApp link helpers
    ui/              # shared components/tokens (optional)
  supabase/
    migrations/      # SQL migrations (source of truth for schema)
    seed.sql
    tests/           # RLS tests
  scripts/           # backup, export, image optimization
  .github/
    workflows/ (ci.yml, deploy.yml, backup.yml, lighthouse.yml)
    CODEOWNERS, pull_request_template.md
  docs/
  AGENTS.md          # rules for AI agents (also CLAUDE.md pointing to it)
  .env.example
```

### Branching and commits
- Trunk-based: `main` always deployable; short-lived branches `feat/<area>-<slug>`, `fix/...`, `content/...`, `docs/...`; PR required, squash merge; Cloudflare gives a preview URL per PR.
- Conventional Commits (`feat(site): ...`, `fix(admin): ...`, `docs: ...`, `chore(db): ...`); scopes = folder names. Version via tags only when needed.
- DB changes only through new migration files (never edit applied migrations); owner approval label for destructive migrations.

### CI checks (GitHub Actions)
1. Install with lockfile; lint (ESLint/Biome), format check, TypeScript check (`astro check`).
2. Unit tests (Vitest) for shared helpers (UPI link, WhatsApp link, price calculation, prep sheet quantities).
3. Build site and admin; fail on broken internal links; check all three locales have the same keys (i18n key parity script); hreflang/sitemap validation.
4. Accessibility (axe/pa11y) and Lighthouse CI budgets on key pages, mobile profile.
5. Secret scan (gitleaks), dependency audit, license check.
6. Supabase migration lint + RLS test against a local/ephemeral DB.
7. E2E smoke (Playwright): quote form submits (with Turnstile test keys), admin login page loads.
8. Deploy on merge to `main`; scheduled workflows: nightly backup + keep-alive, weekly dependency PRs.

### Parallel AI agents without conflicts
- Folder ownership via CODEOWNERS and AGENTS.md; each agent works in its own branch (or git worktree) and touches only its owned paths:
  - Agent Site-UI: `apps/site/src/{components,layouts,pages}`, styles.
  - Agent Content/i18n: `apps/site/src/content`, `src/i18n/*` (the only owner of translation files; others request keys via an issue).
  - Agent SEO/Perf: `apps/site/public`, structured data, Lighthouse config (changes to pages through PRs to Site-UI owner or small agreed files).
  - Agent Backend: `supabase/`, `functions/`.
  - Agent Admin: `apps/admin/`.
  - Agent Shared/Infra: `packages/`, `.github/`, config files.
  - Agent Docs/QA: `docs/`, `tests/e2e`.
- Cross-boundary change = open an issue or a PR to the owner; shared contracts live in `packages/shared` (types/zod) and change via a small PR first, then consumers follow.
- Lockfile and config files (package.json, astro.config) are single-owner (Infra) to avoid merge conflicts; others request dependency additions.
- Keep files small and one component per file to reduce conflicts; avoid giant JSON translation files by splitting per page/namespace (`i18n/mr/home.json`).
- Rebase before PR; PRs under about 400 lines; each PR links an issue and lists checks run. A human (owner or a technical advisor) merges anything touching auth, payments, migrations or secrets.
- Use a task board (GitHub Projects) with labels per area and `AGENTS.md` "definition of done".

### Documentation set (/docs)
- `README.md` (what/why/how to run), `docs/architecture.md` (diagram, data flow), `docs/decisions/ADR-0001...` (one file per decision), `docs/data-model.md` (schema + RLS matrix), `docs/i18n-guide.md` (how to add text, glossary of Marathi food terms), `docs/content-guide.md` (add menu item, blog post, photos), `docs/design-system.md` (colors, type, components, tone), `docs/seo.md` (keywords, schema, GBP checklist), `docs/performance-budget.md`, `docs/security-and-privacy.md` (DPDP notes, retention, access list), `docs/runbook.md` (deploy, rollback, backup/restore, key rotation, outage steps), `docs/accounts-and-access.md` (which account owns what, who has MFA; no secrets), `docs/integrations.md` (UPI, WhatsApp, Turnstile, Maps), `docs/owner-guide-mr.md` (Marathi, non-technical walkthrough with screenshots), `docs/agents.md` (ownership map, workflow), `docs/changelog.md`, `docs/roadmap.md`.

---

## 8. Recommended decisions

1. Stack: Astro static site + Cloudflare Pages + Supabase (Postgres/Auth/RLS) for dashboard; Pages Functions for form endpoint. Revisit D1 only if Supabase pausing/backup burden proves annoying.
2. Languages: Marathi default at `/` (or `/mr/`), `/en/`, `/hi/`; hreflang + sitemap; Marathi copy written natively (not machine-translated), reviewed by the owner.
3. Domain: register .in (and .com if cheap) in the owner's name, compare renewal prices; DNS at Cloudflare.
4. Forms: custom form + Turnstile + honeypot + server validation; notify owner by email and show WhatsApp prefilled message.
5. WhatsApp: click-to-chat only for v1; skip Business API until volume justifies (reminders/broadcasts).
6. Payments: UPI QR + deep link, manual reconciliation in dashboard; no gateway in v1.
7. Dashboard: separate `/admin` PWA, role-based (owner, manager, staff), Marathi-first UI, large tap targets, print and WhatsApp-share for kitchen sheets, CSV export everywhere.
8. Backups: nightly encrypted pg_dump + CSV export via GitHub Actions; quarterly restore drill; this job also prevents free-plan pausing.
9. Fonts: system Devanagari stack + at most one subset self-hosted font; strict performance budget enforced in CI.
10. Process: monorepo, trunk-based, Conventional Commits, CODEOWNERS folder ownership, human approval for auth/payment/migration changes, `/docs` set above maintained as part of definition of done.

## 9. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Free-tier changes (Supabase, Cloudflare, Netlify changed credit rates in 2026) | Cost or outage | Keep portable: SQL migrations, standard Postgres, static output; budget Rs 2,000/month contingency; review limits twice a year |
| Supabase free project pauses; no automatic backups | Dashboard down, data loss | Daily keep-alive + pg_dump, restore drill, upgrade to Pro ($25/month) if business depends on it |
| Owner locked out / single point of knowledge | Business disruption | Recovery codes, second trusted admin, accounts-and-access doc, accounts in owner's name |
| Marathi/Hindi text quality and font rendering on old Android | Poor trust, bad UX | Native review, system fonts, real-device testing, line-height tests |
| DPDP compliance misunderstanding | Penalties/reputation | Minimize data, notice+consent log, retention policy, short legal review; recheck commencement dates |
| Spam/fake leads | Wasted time, DB bloat | Turnstile, honeypot, rate limits, phone validation, lead status "spam" |
| Multi-agent merge conflicts / regressions | Instability | Ownership map, small PRs, required CI, preview deployments, human merge on sensitive areas |
| Secrets leaked in repo or logs | Data breach | gitleaks, push protection, env stores, rotation runbook |
| Payment mismatches (manual UPI) | Accounting errors | Payment entries require reference no.; weekly reconcile with bank statement; add gateway later if volume grows |
| Offline/poor signal in kitchen/venue | Checklist unusable | PWA offline cache for sheets; print fallback |
| Uncertain facts in this document (marked [UNCERTAIN]) | Wrong decision | Verify: Cloudflare Registrar .in support, Razorpay India fees, Vercel Hobby wording, Cloudflare Access free limit, Resend limits, DPDP commencement dates |

## 10. Sources

- Cloudflare Pages limits: https://developers.cloudflare.com/pages/platform/limits
- Cloudflare D1 pricing/limits: https://developers.cloudflare.com/d1/platform/pricing/
- Cloudflare Turnstile plans: https://developers.cloudflare.com/turnstile/plans
- Supabase pricing: https://supabase.com/pricing.md ; pausing FAQ: https://supabase.com/kb/faqs/platform/free-project-pausing
- Vercel Hobby: https://vercel.com/docs/plans/hobby ; fair use: https://vercel.com/docs/limits/fair-use-guidelines
- Netlify April 2026 pricing changes: https://www.netlify.com/changelog/2026-04-14-pricing-updates-april-2026/
- Astro i18n: https://docs.astro.build/en/guides/internationalization/
- web.dev font practices: https://web.dev/articles/font-best-practices ; CWV thresholds: https://web.dev/articles/defining-core-web-vitals-thresholds
- Fontsource Noto Sans Devanagari: https://fontsource.org/fonts/noto-sans-devanagari
- WhatsApp Business Platform pricing: https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing ; India rates report: https://www.cashify.in/news/business-whatsapp-messages-price-revised-in-india-new-rates-explained
- Payment gateway fee explainer (PhonePe): https://business.phonepe.com/articles/payment-gateway-charges-in-india-complete-mdr-and-fee-breakdown ; Razorpay pricing: https://razorpay.com/pricing (US page only when fetched)
- UPI linking spec reference: https://www.labnol.org/files/upi.pdf
- .in domain price tracker: https://domainoffer.net/tld/in
- DPDP Rules 2025: https://yourstory.com/2025/11/digital-personal-data-protection-dpdp-rules-2025-rollout-over-18-months ; PIB doc: https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf
