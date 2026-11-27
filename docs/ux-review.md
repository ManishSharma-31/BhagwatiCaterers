# UX and Engagement Review

_Reviewed 2026-11-27 from a fresh build (34 pages). Screenshots taken at 390px and 1280px in Marathi (all 10 pages) and en/hi spot checks. Paths are under `apps/site/src/`. No prices, reviews or awards are suggested here; every idea below uses only facts already in `docs/00-project-brief.md`._

## 1. Top 10 changes, ranked by impact vs effort

| # | Change | Impact | Effort | Where |
|---|---|---|---|---|
| 1 | Fix the 27px horizontal overflow on mobile (services, menu, packages, about, faq). `img.art-divider` is 416px wide in a 390px viewport and the fixed `.action-bar` stretches to 417px, so the whole page wobbles sideways and the bar's right edge is clipped. Add `max-width:100%` to `.art-divider` and `left:0; right:0` / `box-sizing` on `.action-bar`. | High | 10 min | `styles/global.css:150`, `:94-101` |
| 2 | Remove or correct the "open 24 hours" claim. `site.hours` says "Open at all times" and the JSON-LD declares open 00:00 to 23:59 every day. This was not supplied by the owner and Google may show it. Replace with "Call or WhatsApp; we reply as soon as we can" and drop `openingHoursSpecification` until confirmed. | High (trust, SEO) | 10 min | `data/site.ts:20`, `layouts/Base.astro` schema |
| 3 | Put a Call icon button in the mobile header next to the menu button. Today the only visible primary action above the fold on a 390px screen is in the hero (below 3 badges and a 3-line headline). A phone-first user should see "फोन करा" without scrolling or opening the hamburger. | High | 30 min | `components/Header.astro`, `global.css:86` |
| 4 | Make the WhatsApp message context-aware. `waLink()` always sends the generic "I want catering information". Pass a page-specific text: from Services/wedding "मला विवाहाच्या जेवणाची माहिती हवी आहे", from Menu "मला मेनूबद्दल माहिती हवी आहे", from a festival page the festival name. It lifts lead quality and saves the owner a question. | High | 1 to 2 h | `data/site.ts:47`, `components/ActionBar.astro`, all views |
| 5 | Add an occasion-led entry on the home page: tappable tiles (विवाह, साखरपुडा, हळद, गृहप्रवेश, सत्यनारायण पूजा, वाढदिवस) that open the quote form with the event type preselected (`/quote/?event=wedding`). The occasion chips on home are currently plain, non-clickable pills. | High | 2 h | `views/Home.astro` occasions block, `scripts/quote.ts` |
| 6 | Shorten the quote form for mobile and add a "just call/WhatsApp" escape at the top. 9 fields plus 4 checkboxes is long for a low-patience user. Keep name, phone, event, guests mandatory; collapse date/town/order/cuisine into one "more details (optional)" group. Show the date field as `type=date` hint in Marathi (browser shows `mm/dd/yyyy`). | High | 2 h | `views/Quote.astro`, `content/quote.ts` |
| 7 | Add a trust block with real, permitted content: a testimonial slot (hidden until a real, consented quote exists), a "Google Business Profile coming soon" placeholder removed from public view, and a visible owner line "मालक: शांतीलाल महाराज" on the home page. Home currently has no human face or voice; trust relies on three badges. | High | 2 h (slot) + owner effort | `views/Home.astro`, `content/home.ts` |
| 8 | Replace representative stock photos on hero and menu with the owner's own photos as soon as available; until then make the hero caption friendlier and add a "आमच्या कामाचे फोटो लवकरच" note on Gallery. The 24+ stock images with the repeated caption "प्रातिनिधिक चित्र (आमच्या पदार्थांचे नाही)" on the Gallery read as stock catalogue and weaken the "30 years" claim. | High | Owner dependent | `content/gallery.ts`, `views/Gallery.astro` |
| 9 | Add FAQ teaser and "How it works in 3 steps" to home; link the FAQ from Quote and Packages. FAQ exists but is only reachable from the nav. Put the top 3 questions (pure veg? rates? areas?) as an accordion on home above the final CTA. | Medium-High | 1 h | `views/Home.astro`, `content/faq.ts` |
| 10 | Image performance: Photo serves 800w/1600w webp only (no 400w), `sizes` is `50vw` on mobile so phones fetch the 800w file. Largest files are 700 KB (`hero-thali-1600.webp`, `jilebi-alt-1600.webp`). Add 480w variants and tighten the hero to about 150 KB per the design guide; load the hero with `fetchpriority=high`. | Medium | 2 h | `components/Photo.astro`, `public/photos` |

## 2. Page-by-page findings

### Global (Header, Footer, ActionBar, Base)
- **Sticky action bar is good** on mobile (Call, WhatsApp, Quote; 3 equal tap targets). On desktop at 1280 it becomes a floating pill at bottom right that overlaps the hero image and page content (`global.css:102-103`); acceptable, but it hides the last footer line. Add bottom padding to `body` on all widths.
- **Overflow bug** (see top 10 #1): `.action-bar` measures 417px wide on a 390px viewport on 5 pages.
- **Header nav**: 7 items plus 3 language links on desktop; "सेवा क्षेत्र" and "श्रेय" (credits) are low value for the main nav. Move credits to footer only (it already is). Consider merging Areas into Contact and Packages into "ऑर्डर कसे करावे" only. Label "मेनू" for the hamburger is also the Marathi word for the food Menu page: confusing. Use "☰ मेन्यू" vs "☰ विभाग" or an icon plus "मुख्य पृष्ठे".
- **Language switcher on mobile** sits inside the collapsed menu; a first-time Hindi/English visitor cannot see it. Show a compact "म | EN | हि" next to the menu button.
- **Footer links** are 30px tall text links (underlined, cream on maroon). Raise to 44px tap height with padding (`global.css` footer rules). Footer "संपर्क" phone/WhatsApp are good.
- **Tap targets**: header phone/WhatsApp chips, nav links and footer links measured 22 to 34px tall on mobile (WCAG target 44px). Fix with `min-height:44px; display:inline-flex; align-items:center`.
- **Focus**: `:focus-visible` teal outline exists (`global.css:54`), skip link present. Good. Verify the teal outline against the maroon footer (low contrast on dark).
- **Colour**: kesari-dark buttons with white text look fine; the small grey caption "प्रातिनिधिक चित्र..." (about 12px) is below comfortable reading size for Marathi on mobile. Raise to 13 to 14px and darken.
- **SEO**: good basics (canonical, hreflang, x-default, OG, sitemap, LocalBusiness JSON-LD). Gaps: no `og:image:alt`; `sameAs` empty until social profiles exist; no `FAQPage` JSON-LD on FAQ, no `BreadcrumbList`; `servesCuisine` fine. `robots.txt` hardcodes `bhagwaticaterers.in`: confirm that is the real domain. Add `geo` coordinates and `hasMap` once confirmed.
- **Marathi default but `lang` links**: language switcher links have `hreflang` and `lang`; good.

### Home (`views/Home.astro`, `content/home.ts`)
- **First impression (mobile)**: logo, toran border, three badges (pure veg, 30+ years, FSSAI no.), headline, one-line sub, 3 buttons, hero photo. Trust signals are present and strong. Issues:
  - The FSSAI badge with a 14-digit number takes a full row on mobile and pushes the hero image below the fold; shorten to "FSSAI परवानाधारक" in the badge and keep the number in the trust section and footer.
  - Hero photo is an unlabelled-looking stock Rajasthani palace mandap, not Latur/Marathwada. For Marathwada families this may read as "not local". Prefer a thali, haldi-kumkum, or mango-leaf toran image.
  - Buttons wrap to two rows on 390px (Quote and WhatsApp on row 1, phone alone on row 2). Make Call and WhatsApp equal-width full-row buttons.
- **Order-type cards**: clear and well written, but the third (home food) has a vague "तपशीलासाठी संपर्क करा" and the single "अधिक माहिती" button sits below the cards, away from each. Give each card its own link/CTA.
- **Menu teaser**: three photo cards, good. Missing a visible "Jain / no onion-garlic / fasting" tag row (promised in the design guide). Dish lists are text only; add small dish icons from `public/art/icon-*.svg`.
- **Trust section** ("आमच्यावर विश्वास का?") is four text cards with big whitespace and no icons; use the existing kalash/diya/veg-leaf art. The line "अन्न सुरक्षा व मानक प्राधिकरणाचा परवाना क्रमांक पृष्ठाच्या शेवटी दिला आहे" is bureaucratic; say "FSSAI परवाना क्र. २१५२६०४९०१०५२७".
- **Missing**: testimonial slot, FAQ teaser, "how it works" 3 steps, owner name/face, seasonal strip, WhatsApp-first CTA wording ("WhatsApp वर तारीख पाठवा").
- **Service area chips** are not links; link to Areas page.
- Final CTA ("तुमचा कार्यक्रम सांगा") is good; add the phone number as a third button.

### Services (`views/Services.astro`, `content/services.ts`)
- Good structure: one card per occasion with icon or photo. Inconsistent card visuals (some stock photo, some small icon) make the page look unfinished; use the same treatment for all.
- The long scroll (5600px on mobile) has no in-page jump links; add chips at the top (विवाह, साखरपुडा, हळद, गृहप्रवेश, पूजा, पार्टी, कार्यालयीन, घरगुती).
- Each card needs its own CTA with a pre-filled WhatsApp text for that occasion (see top 10 #4).
- Lead "लहान घरगुती समारंभापासून मोठ्या कार्यक्रमापर्यंत" is good. The sub-line in small grey text is hard to read on mobile.
- Content gap: what is included (cooks, servers, utensils, tables?) is unknown; leave as "तपशील कोटेशनमध्ये" until the owner answers `docs/open-questions.md`.

### Menu (`views/Menu.astro`, `content/menu.ts`)
- Clear by cuisine with photos and dish names. Gaps: no dish photos per item, no Jain/no onion-garlic/fasting tags, no meal-type grouping (नाश्ता, जेवण, गोड, फराळ), no "build your menu" interaction.
- Biggest engagement opportunity (see bigger bets): a simple checklist menu builder that produces a WhatsApp message "माझी मेनू पसंती: ...".
- Mixed-script dish names: "गट्टे की सब्जी" in Marathi page is Hindi; fine as a dish name but check whether Marathi readers expect "गट्टे की भाजी".

### Packages / How to order (`views/Packages.astro`, `content/packages.ts`)
- Explains the two order types and 5 steps clearly. The comparison table ("तक्ता") should be checked on 390px; the page overflows by 27px (art-divider). Ensure the table scrolls inside a wrapper, not the page.
- Title "पॅकेजेस" in nav vs page title "ऑर्डर कसे करावे": nav label `nav.packages` should match the H1 or be one word.
- No price band, correctly. Add the line "दर कार्यक्रमानुसार; कोटेशन मोफत" only if the owner confirms the quote is free.
- Add "काय तयार ठेवावे" checklist as a printable/shareable card (date, guests, venue, menu, order type, kitchen/utensil access).

### Gallery (`views/Gallery.astro`, `content/gallery.ts`)
- 28 stock images in a 2-column grid (6000px on mobile) each with the same 12px caption; no lightbox, no categories, no filter. Visually repetitive; captions double the page length.
- Replace per-image caption with one banner at the top ("या प्रतिनिधिक प्रतिमा आहेत; आमचे स्वतःचे फोटो लवकरच") and a small "i" badge per image.
- Add category chips (विवाह सजावट, गोड पदार्थ, फराळ, थाळी) and cap initial display to 12 with "अजून पाहा".
- Alt text exists in three languages: good. Make it more descriptive and avoid "आमचे" claims.

### About (`views/About.astro`, `content/about.ts`)
- Honest, no invented story. It is thin: no owner photo, no kitchen photo, no origin of the name, no number of events or typical guest sizes (do not invent; ask the owner). "३० वर्षांहून अधिक अनुभव ... अनेक वर्षांपासून" repeats the same line. Add owner interview questions to `docs/open-questions.md` (how the business began, what dish families ask for, how many guests the largest event had).
- FSSAI block is good; link it to the official FSSAI verification page only if the owner agrees.

### FAQ (`views/Faq.astro`, `content/faq.ts`)
- 10 sensible questions; answers are honest ("we share with quote"). Three answers punt on terms (advance, cancellation, minimum guests) and rates, which are the top real questions; mark as "owner to answer" and prioritise.
- Add `FAQPage` JSON-LD, put the top 3 on home, and add "कार्यक्रमाच्या किती दिवस आधी बुकिंग करावी?" once known.
- Accordion works; ensure `summary` has 44px height and a visible focus ring.

### Areas (`views/Areas.astro`, `content/areas.ts`)
- Good listing in plain words. Missing: a simple map or distance-from-Latur hint, per-town "call for travel details", and links from each town to the quote form with the town preselected. No separate town pages (correct per decision log).
- Footer and home both repeat the six towns; fine for local SEO.

### Contact (`views/Contact.astro`, `content/contact.ts`)
- Clean: phone, WhatsApp, address, map link, hours, owner, areas. Issues: hours claim (see top 10 #2); the map is only a link (no embed, fine for performance); address "जुल्हेलाल मार्ग, नारायण नगर" should be verified with the owner; no QR code for WhatsApp (useful for printed invites/visiting cards).
- Phone and WhatsApp values are the same number printed twice; merge into one row with two large buttons.

### Quote (`views/Quote.astro`, `content/quote.ts`, `scripts/quote.ts`)
- Excellent privacy and flow (builds WhatsApp text, copy fallback, honeypot, validation). Issues:
  - Long form on mobile; date input shows English "mm/dd/yyyy" placeholder.
  - Submit button label "WhatsApp वर संदेश तयार करा" is a little technical; "WhatsApp वर पाठवा" is simpler.
  - No call alternative visible next to the button; add "फॉर्म नको? फोन करा 9057264895".
  - No confirmation of response expectation ("आम्ही लवकरच उत्तर देऊ"; avoid a time promise).
  - Phone field: set `inputmode=numeric`, `autocomplete=tel`, `maxlength`; guests `inputmode=numeric`.

### Credits (`views/Credits.astro`)
- Fine for compliance. Keep out of main nav (see Global). The page is indexable; consider `noindex` since it adds little SEO value.

### English and Hindi spot checks
- Layout parity is good; Hindi hero and nav fit at 390px. Hindi text still contains Marathi-first phrasing in places and mixes "WhatsApp" Latin script (acceptable). Have a native Hindi reader check "कोटेशन" vs "भाव/अनुमान". English copy reads slightly formal ("Fill the quote form"); "Get a free quote" only if confirmed free.
- The language switch keeps the current page; good. The `/en/` and `/hi/` quote form labels and the WhatsApp greeting are translated.

## 3. Quick wins (under 1 hour each)
1. Fix `.art-divider` and `.action-bar` overflow (10 min).
2. Remove "open at all times" and the 24x7 schema (10 min).
3. Add `body{padding-bottom:calc(var(--bar-h)+1rem)}` on desktop too so the floating pill never covers the footer (5 min).
4. Shorten the FSSAI hero badge on mobile (10 min).
5. Equal-width full-row Call and WhatsApp buttons in the hero on mobile (15 min).
6. Rename the hamburger label to avoid clashing with the "मेनू" page; show a compact language switcher beside it (30 min).
7. Raise small captions and sub-lines to at least 14px and darker ink (15 min).
8. 44px tap height for footer links and nav links (15 min).
9. `inputmode`, `autocomplete`, `enterkeyhint` on the quote inputs; change button label (15 min).
10. Add "फोन करा" line under the quote submit button (10 min).
11. Add `FAQPage` JSON-LD to the FAQ page (30 min).
12. Add `og:image:alt`, `BreadcrumbList` (20 min).
13. Make service-area chips on home link to `/areas/` (10 min).
14. Add jump chips to the top of Services and Gallery (30 min).
15. `noindex` on Credits (5 min).
16. Gallery: one banner caption instead of 28 repeated captions (20 min).
17. Verify the Marathi copy with the family, especially "प्रातिनिधिक चित्र" (clearer: "उदाहरणार्थ चित्र") and "सर्व साहित्यासह" (could be "सर्व काही आमच्याकडून").

## 4. Bigger bets
1. **Menu builder**: tick dishes by category (नाश्ता, भाजी, आमटी, भात, गोड, फराळ) and Jain/no onion-garlic/fasting toggles; output a WhatsApp message and save the selection in localStorage; feeds the admin Leads screen later. High engagement, no prices needed.
2. **Occasion pages / planners**: "लग्नाचे जेवण नियोजन", "सत्यनारायण पूजा जेवण", "गृहप्रवेश" each with a printable checklist (guest count, timing, utensils, seating, serving staff) and a pre-filled WhatsApp CTA. Also strong long-tail SEO ("लातूर लग्न केटरिंग").
3. **Seasonal festival strip** (Gudi Padwa, Ganesh Chaturthi, Diwali faral, Satyanarayan, Navratri fasting): a home-page band that the owner can toggle; each links to a festival menu card with WhatsApp text "गणेशोत्सवासाठी ऑर्डर". No prices; use dish lists only.
4. **Real social proof pipeline**: after each event, send a WhatsApp link asking for a consented one-line testimonial and optional photo; admin approves; site renders a no-JS testimonial list. Also create the Google Business Profile and put the review link on Contact and the footer (priority for local SEO).
5. **Own photo shoot** (one event, 40 photos): hero, kitchen, serving, owner, dishes in steel vessels. Replaces stock and unlocks a real About and Gallery.
6. **Referral**: "तुमच्या ओळखीच्या कुटुंबाला सांगा" with a share-on-WhatsApp button that sends the site link; any reward only if the owner decides.
7. **Guest-count helper** (non-price): enter guests and meal type, get a simple "typical items per person" note supplied by the owner (not invented); optional.
8. **Visiting-card/QR assets**: a QR to `/quote/` and WhatsApp, for printed material and wedding-hall counters.
9. **Performance polish**: 480w image variants, AVIF, preload the Mukta Devanagari 400 subset (about 100 KB per weight; consider dropping to one weight or using `font-display:swap` with a system fallback).
10. **Analytics (privacy-light)**: count taps on Call, WhatsApp and Quote buttons by page to learn which pages convert.

## 5. Done well
- Clear, consistent primary actions: Call, WhatsApp, Quote always one tap away via the sticky bar.
- Honest copy: no invented prices, awards or reviews; representative images are labelled.
- Trust basics visible at the top: pure veg, 30+ years, FSSAI number, repeated in the footer.
- Warm Maharashtrian look: haldi/saffron/maroon palette, Paithani-style border, original SVG motifs; good contrast and readable Mukta Devanagari at body size with generous line height.
- Quote form builds a WhatsApp message with a copy fallback and a privacy note; no data is stored.
- Marathi default plus English and Hindi with correct `hreflang`, canonical, sitemap, OG tags and LocalBusiness JSON-LD.
- Accessibility basics: skip link, visible focus ring, labels on all fields, trilingual alt text, `prefers-reduced-motion` respected.
- Content is sensibly structured for a small business: 10 pages, short, scannable, with FAQ and Areas pages already present.
