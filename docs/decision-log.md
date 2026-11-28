# Decision Log

| Date | Decision | Reason |
|---|---|---|
| 2026-11-27 | Build a website first (not a mobile app) | Customers find caterers through Google search and WhatsApp links; events are occasional purchases. The owner dashboard will be a mobile-friendly web page. |
| 2026-11-27 | Marathi is the default language, with English and Hindi | Customers are in Latur and nearby areas. |
| 2026-11-27 | Research before building: visuals and image licensing, Latur market and SEO, architecture | Plan everything first, avoid copyright and rework problems. |
| 2026-11-27 | Stack: Astro static site on Cloudflare Pages; Supabase for the Phase 2 dashboard | Cheapest option that stays fast on low-end phones; free tiers fit a small business. Vercel free plan reportedly non-commercial. |
| 2026-11-27 | Payments at launch: UPI QR and link, manual marking; no gateway | Keeps cost and risk low; add a gateway later if volume grows. |
| 2026-11-27 | WhatsApp click-to-chat only at launch | Business API is charged per message and not needed yet. |
| 2026-11-27 | Images: owner photos first, then original SVG art, then food-only stock without faces or brands | Avoids copyright and consent risk. |
| 2026-11-27 | Do not publish prices until the owner supplies them | Local price data was low-confidence. |
| 2026-11-27 | Cities beyond Latur get their own pages only when real events can be shown | Avoids thin, doorway-style SEO pages. |
| 2026-11-27 | FSSAI licence no. 21526049010527 shown in footer, quotes and invoices | Provided by owner. Number to be re-checked against the licence certificate before launch. |
| 2026-11-27 | Service areas: Latur, Ausa, Nilanga, Renapur, Tuljapur, Ambajogai and nearby | Provided by owner. |
| 2026-11-27 | Use free-licence stock photos for now, labelled "representative image"; replace with the owner's own photos as they arrive | Owner asked for internet photos. Direct downloads are blocked from the agent workspace, so the download route is still to be decided. |
| 2026-11-27 | 25 Pexels photos shown in Gallery, all labelled "representative image"; 3 rejected after visual review (thali-top: possible non-veg item; thali-sweets: label mismatch; buffet-indoor: possible logo) | Photos were chosen from page text only, so each was checked by eye after download. |
| 2026-11-27 | CI size budget counts code and art only, not photos | Photos are lazy-loaded and served at 800 px on phones. |
| 2026-11-27 | No genuine free photo found for puran poli, bhakri-pithla, shrikhand, masale bhat, dal baati churma, rangoli | Owner photos needed first for these. Wrong-dish substitutes are not used. |

## Phase 2 (dashboard)
- Local-first PWA at /admin; Supabase optional (single `records` table, RLS + allowlist, no service-role key, publishable key pre-filled).
- Default titles/towns follow the UI language (fixed after e2e testing).
- Not verified here: real Supabase calls (network blocked), real phone taps, wa.me on devices. See docs/supabase-setup.md.

## 2026-11-27 owner details
- Address: Julhelal Marg, Narayan Nagar, Latur 413531. Hours: open at all times (call/WhatsApp any time). WhatsApp = 9057264895. Email: later. Domain: not bought; SITE_URL stays a placeholder.
- Original kalash logo replaces the temporary lotus mark; favicon and PWA icons regenerated.
- Six dish photos with no Pexels match taken from Wikimedia Commons (open CC licences) via the photo-candidates workflow, vetted by eye. Masale bhat is the closest match, not exact: replace with an owner photo.

## 2026-11-27 owner corrections (round 1)
- FAQ removed from header nav (still in footer). FSSAI number only in footer; elsewhere "FSSAI Certified" (also removed from JSON-LD and FAQ answers). The dashboard still adds the number to customer quote messages (owner can change in Settings).
- Menu: 150+ example dishes in 12 sections, trilingual, with jump links and live search (src/content/menu-items.ts). Names are drafts for the owner to confirm.
- Quote page redesigned (side panel, numbered steps, pill choices); form logic unchanged.
- About: owner section with photo slot (/photos/owner-800.webp etc.). Placeholder shows the logo until the photo arrives.

## 2026-11-27 content and dashboard reviews
- Hours wording: "Call or WhatsApp any time"; no 24h opening hours in schema.
- Public copy audited and rewritten (docs/content-review.md); 13 questions open for the owner.
- Dashboard reviewed and improved (docs/admin-review.md): global search, duplicate-phone warning, global undo, safer restore with automatic safety copy, kitchen-sheet guest scaling (no prices), wage tracking, Today priorities. Only additive field: Payment.staffId.

## 2026-11-27 legal pages
- Added Terms (/terms/), Privacy (/privacy/), Cookies (/cookies/) in mr/en/hi, linked from footer legal row and quote form note. Written from verified data practices (no cookies, no analytics, form only builds a WhatsApp message). No cookie banner (nothing to consent to). General policy, not legal advice: owner to have a Latur advocate review (docs/legal-review.md has sources and open questions).
- Re-check when: analytics, forms posting to a server, email or payments are added; DPDP Rules timeline (core duties expected May 2027, re-verify).

## 2026-11-27 owner photo and email
- Owner photo added to About (owner-supplied, 375x666 source, cropped 4:5 and upscaled 2x, so slightly soft; ask for a higher-resolution original later). Owner consented by supplying it.
- Email set to manishsharmadota@gmail.com "for now" (site.ts `email`); shown on Contact, footer, legal pages and JSON-LD.

## 2026-11-27 "representative image" wording
- Owner asked to remove all "representative / not our own dish" wording except the photo clause in the Terms (section 5). Removed from image captions, Gallery note and meta description, and Credits intro. Credits page keeps the photographer, source and licence table (needed for CC BY-SA attribution).

## 2026-11-27 dish cart
- Menu dishes are tap-to-select (no prices, no quantities: catering is by guest count). Selection kept in sessionStorage (`bc-cart`), cleared when the tab closes; never sent to a server. Quote page lists the selection (removable) and adds it to the WhatsApp message, which opens on submit as before.
- Privacy and Cookie pages updated to disclose the session-storage cart (they previously said nothing is stored). Re-check them if the cart moves to localStorage or the server.


## Printed menu merged (PDF from owner)
- Transcribed the owner's printed menu (9 pages) into `menu-items.ts`: 410 new dishes added, 55 skipped as duplicates; now about 600 dishes in new groups (main course, sweets, chaat/snacks, Indo-Chinese). Names as printed are used for both Marathi and Hindi; English names are transliterations.
- 27 sections got a Wikimedia Commons photo (800px). Credits page reads processed.json, so attribution appears automatically.
- Not changed: phone, address, brand name. The printed menu shows other numbers and a different address; waiting for owner to confirm.
- Skipped or unclear: items that were unreadable or looked non-vegetarian were left out; owner should review the list.

## Admin login required
- /admin/ now uses cloud mode with login by default (DEFAULT_CLOUD_URL/KEY), so every new device meets the login screen. Local-only is a deliberate switch inside Settings > Cloud > Disconnect (flag bc:local-only). Removed the "use on this phone only" button from the public login screen; hid header search and tabs while signed out.
- Honest limit: the dashboard page and code are static and public; data protection is Supabase login + row-level security + sign-ups off.

## Admin redesign
- Desktop (>=960px): left sidebar with all sections, wider pages, two-column Today and lead lists. Mobile keeps bottom tabs.
- Today: summary tiles (new leads, follow-ups, events in 7 days, to collect, received and net this month), lead pipeline strip, compact quick actions, backup alert moved below.
- Leads list and Today follow-ups: one-tap Call and WhatsApp buttons.
- No data-model change.

## Admin UX review round 2 (docs/admin-ux-review-2.md)
Done: login centring, due-today first on Today, pipeline hidden on phone, 44px tap targets (back links, call/WhatsApp, scale chips), one-line brand, no FAB/toast overlap, autofocus on new lead name and payment amount, focus first invalid field, skip link, Lock now in sidebar, friendlier 404, Latin digits in Marathi dates.
Not done yet: sticky Save bars and Delete placement (F08, F10), shorter lead form (F05 grouping), print layout (F12, F13), calendar day badges (F19), Settings card hints (F20).

## Enquiries, quote validation, testimonials (latest batch)
- Quote form: past dates rejected (min = today), guests must be a whole number >= 1 (no upper limit). WhatsApp still opens even if saving fails.
- Website enquiries go to WhatsApp AND to Supabase table `enquiries` (insert-only for the public; only signed-in owner/team can read). Admin imports them into Leads (source "website"). Requires running `supabase/migrations/0002_enquiries.sql` once.
- Privacy/legal text updated in mr/en/hi to describe this.
- No prices anywhere on the website: owner/team quote manually.
- Testimonials slider built but list is empty by design (real, consented reviews only). Add to `src/content/testimonials.ts`; photos in `public/photos/testimonials/`.
- UAT fixes: stable seed menu ids, payment amount cap, nav label, footer tap targets, branded 404.
