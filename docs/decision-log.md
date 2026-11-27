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
