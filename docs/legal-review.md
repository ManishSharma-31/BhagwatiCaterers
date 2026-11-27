# Legal pages review: Terms, Privacy, Cookies

Prepared 27 November 2026. This is a general-purpose policy drafted for a small caterer's information website. It is not legal advice and the author is not a licensed lawyer. **The owner should have the three pages reviewed by a local advocate (Latur) before relying on them.**

Pages: `/terms/`, `/privacy/`, `/cookies/` in Marathi (default), `/en/...`, `/hi/...`. Text: `apps/site/src/content/legal.ts`. View: `apps/site/src/views/Legal.astro`. Linked from the footer "legal" row on every page and from the quote form note.

## (a) Law sources checked, with status found

| Law | Status found (as of 27 Nov 2026) | Source checked |
|---|---|---|
| Digital Personal Data Protection Act, 2023 | In force in phases through the DPDP Rules. | Khaitan & Co ERGO note 15 Nov 2025; MirvoLegal timeline "as at September 2026" |
| DPDP Rules, 2025 | Notified 13 Nov 2025. Board-establishment provisions and definitions in force at once. Consent-manager provisions from 13 Nov 2026. Core duties of data fiduciaries (notice, consent, security, rights, children) from about 13 May 2027 (18 months). | same |
| Proposal to shorten the 18 months to 12 months | Proposed by MeitY in Jan 2026 (feedback closed 4 Feb 2026). Not found as notified in the latest source I could read (Sept 2026). **Re-check before relying on the 13 May 2027 date.** | MirvoLegal; Takshashila note 26 Jan 2026 |
| IT Act 2000 s.43A and SPDI Rules 2011 | Remain in force until the 18-month period ends (about 13 May 2027), then replaced by the DPDP regime. Section 72A (disclosure in breach of lawful contract) is unaffected. Privacy page therefore does not rely on SPDI-specific duties. | Khaitan ERGO note |
| Consumer Protection Act, 2019 | Not fetched afresh; well established. Terms preserve consumer rights and the right to approach Consumer Commissions. Consumer Protection (E-Commerce) Rules, 2020 do not fit: the site sells nothing online and takes no payment, so no e-commerce disclosures were added. | general knowledge, not re-verified |
| Indian Contract Act, 1872, s.74 | Not re-fetched. Forfeiture on breach limited to reasonable compensation; used to word the cancellation clause (no figures invented). | general knowledge, not re-verified |
| Food Safety and Standards Act, 2006 and FSS (Licensing and Registration) Regulations, 2011 | Licence number must be displayed at premises and, per FSSAI order effective 1 Oct 2021, printed on invoices/bills. The site shows the number only in the footer (as the owner asked); invoices are the owner's job. | FSSAI order 01.10.2021; LiveLaw column |
| GST | No rates stated. Terms say taxes as applicable. | n/a |
| Jurisdiction | Terms: Indian law, courts at Latur, Maharashtra, without limiting the consumer's right to approach consumer commissions. | n/a |

Items marked "not re-verified" rely on stable statute text, not on a fresh fetch. The advocate should confirm.

## (b) What each page covers and why

- **Terms (18 sections):** who we are; website is information-only (no booking or payment); quotes are estimates until confirmed in writing; no prices published; advance, schedule and cancellation agreed in writing before confirmation, forfeiture limited to genuine reasonable loss (s.74), no figures invented; vegetarian only; dish lists and photos illustrative; allergens and no zero-risk guarantee unless agreed; customer-supplied material; FSSAI and food safety; headcount; timing, venue and customer duties ("to be agreed"); force majeure; liability limit that preserves non-excludable liability and CPA 2019 rights; IP and third-party photo credits; acceptable use; third-party links; changes with date; governing law and Latur courts; grievance contact. Why: a caterer's real disputes are about cancellation, headcount, allergens and customer-supplied material.
- **Privacy (15 sections):** states that the website collects nothing itself; what the owner receives by phone/WhatsApp; purposes (enquiry, quote, order, tax records, food-safety traceability); consent and "legitimate use" under DPDP s.7(a), withdrawal; no selling; sharing (WhatsApp/Meta, staff, hosting logs, authorities); admin dashboard and security measures actually in place; retention (no fixed period, owner to choose); DPDP rights (summary, correction, erasure, nomination, grievance) and how to use them; children; cross-border via WhatsApp and optional Supabase region; no tracking and what changes if analytics or forms are added; changes; grievance officer line.
- **Cookies (7 sections):** no cookies set by the site, no analytics, ads or trackers, no language preference stored; third-party cookies after leaving to WhatsApp or Google Maps; the owner-only /admin uses browser storage; how to clear or block; consent banner and policy update before any future analytics.
- **Every page:** one h1, summary box, "Last updated: 27 November 2026" (localised), general-policy/advocate notice, contact block (owner, phone, WhatsApp, address, "email to be added"), link to the Contact page, links to the other policies and Credits.

## (c) Facts the policies rely on (update the pages if any of these change)

Verified by reading the source and grepping the built output in `/tmp/dist-legal`:

1. The public site sets no cookies and has no `document.cookie`, `localStorage`, `sessionStorage`, analytics, tag manager, pixel or third-party `<script>`. The only `localStorage` code is inside the `/admin` bundle (`_astro/App.*.js`), which is not loaded on public pages.
2. The language switcher is plain links to the other language's page; nothing is stored.
3. The quote form (`src/scripts/quote.ts`, `views/Quote.astro`) sends nothing to a server. It builds a `wa.me` message that the visitor sends. There is a honeypot field (`website`) and a "copy message" button using the clipboard; no data is saved.
4. External links out of the site: `wa.me` (WhatsApp), `google.com/maps` (link only, no embed), photo source links on the Credits page (Pexels, Wikimedia Commons, `openfontlicense.org`). No external images, fonts, CSS or iframes are loaded: fonts (Fontsource, self-hosted) and photos are served from our own host.
5. Hosting is planned on Cloudflare Pages, which may keep server logs (such as IP addresses). The Privacy page says "we plan to host on Cloudflare Pages". Change this if the host changes.
6. `/admin` is a separate owner-only PWA, `noindex`, excluded from the sitemap and `robots.txt`. It stores data in IndexedDB, settings and PIN-lock state in localStorage (`bc:*` keys), the unlock flag in sessionStorage, and a service worker caches only app files, not data. Optional Supabase sync (the owner's own project, region as the owner chose) is described as optional.
7. No prices are published; no online payment; email address does not yet exist; social profiles do not exist.
8. The FSSAI number appears only in the footer (checked: one occurrence per page). The Terms refer to "the footer".
9. The domain is not hard-coded in legal text; pages say "this website".

## (d) Open questions for the owner

1. **Email address:** to be added to the contact block (Legal.astro and `legalCommon.emailNote` in `legal.ts`) once available. Under DPDP an easy contact route for rights requests matters.
2. **Advance and cancellation terms:** the site states no figures. Decide the real advance, payment schedule and refund rules and use them in the written confirmation (WhatsApp). Keep forfeiture to genuine reasonable loss.
3. **Retention period:** the Privacy page says "as needed for the business and as law requires". Choose a number of years (the advocate or accountant can advise on tax and accounting record periods) and add it to section 8.
4. **Grievance officer:** the pages name the owner, Shanti Lal Maharaj. Confirm, or name someone else.
5. **Analytics or forms later:** if Google Analytics, a server-side contact form, an embedded map or a social pixel is added, update Cookies and Privacy first and add a consent banner. Also confirm hosting provider and Supabase region and update section 6 and 12 of Privacy.
6. **Advocate review** of all three pages, particularly the liability limit, force majeure and the DPDP wording after 13 May 2027.
7. **DPDP date check:** re-check whether the 18-month period has been shortened, and then adjust the sentence in Privacy section 4.
8. **Invoices** should carry the FSSAI number (FSSAI order, 2021) even though the site shows it only in the footer.

## (e) Deliberately not included

- **No cookie consent banner:** no cookies or trackers are set, so there is nothing to consent to. A banner would be misleading and add friction.
- **No parental-consent flow or age gate:** no child data is collected by the site; the Privacy page says so.
- **No Data Protection Officer or consent manager:** only for Significant Data Fiduciaries / consent-manager services; a small caterer is not one.
- **No fixed cancellation percentages, advance amount, refund periods or prices:** not given by the owner; invented figures could be unenforceable or wrong.
- **No e-commerce, refund or returns policy, and no shipping policy:** no online sales or payment.
- **No SPDI-Rules-specific policy text and no GST rates or number:** SPDI Rules are being replaced; GST figures change and none was provided.
- **No arbitration clause or heavy disclaimers:** overkill for a local caterer and can conflict with consumer law.
- **No email, social-media or domain text:** none exist yet.
