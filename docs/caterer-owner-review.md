# Caterer-owner review: will this win bookings, build trust, save time?

Reviewer view: a Maharashtrian caterer with 30+ years of weddings, pujas, corporate and home-food orders. Review only; no source files changed. Based on the built site (43 pages, screenshots at 390 and 1280 px), content files in `apps/site/src/content`, `docs/open-questions.md`, `docs/decision-log.md`, and the admin code and demo screens. Industry points are from my own experience, not verified online. Items marked **[OWNER]** depend on facts only Shanti Lal Maharaj knows.

Screenshot caveats: full-page mobile home showed beige blank boxes where the three cuisine photos should be (probably lazy-load in a full-page capture; not confirmed, please check on a real phone). My demo-data admin loader did not load the Events/Sheets deep routes (I used the wrong route name), so event detail and kitchen sheet were judged from code, not screenshots.

---

## Verdict in plain words

The site is clean, fast, trilingual and honest. It is a good **brochure** but a weak **closer**. A bride's father or an office manager in Latur will see "30+ years, pure veg, FSSAI, call anytime" and then hit a wall: no price idea, no sample menu with a budget, no minimum guests, no advance or cancellation rule, no past events, no testimonials, no live counter or staff info. Every one of those unanswered questions becomes a reason to call the next caterer instead. The admin is a solid CRM-plus-checklist for a one-person business, but it stops at "quote and payment"; it does not yet help with costing, procurement, staffing rules or repeat business.

The honest constraint: the owner has not supplied prices, min/max guests, terms or testimonials. Much of the fix is **extracting these facts from him**, not coding.

---

## A. Customer trust and conversion (what a Latur family or office manager looks for)

| Need before calling | Status on site | Comment |
|---|---|---|
| Menu clarity | Strong. About 600 dishes in about 40 sections, tap-to-select, search, trilingual | Too much for a family deciding. 600 dishes is a printed-menu dump. They need "Sample menus" (see B). Names are drafts; wrong-name risk until owner confirms. |
| Packages | Not present. "Packages" page is really "how to order" (with/without material) | Page URL and nav label "ऑर्डर कशी द्यावी" is honest, but customers expect Silver/Gold style combos. |
| Per-plate price | Deliberately hidden: "rates with quote" | Understandable until owner supplies numbers, but the single biggest conversion loss. Most Latur callers ask "plate kitna" in the first 10 seconds. Recommend showing a **"from" range per tier** (e.g. "Veg thali from Rs X"), or at minimum "Typical wedding lunch: Rs X to Rs Y per plate, depends on menu". **[OWNER]** |
| Sample menus by budget | Missing | Highest-value content gap. |
| Tasting session | Missing | Not mentioned anywhere. For weddings, a paid or free tasting is a strong trust tool. **[OWNER: does he do tastings? free above what guest count?]** |
| Past events, testimonials | Missing entirely. Gallery is stock photos | Stock photos of dishes (Pexels/Commons) in a business with 30 years of real events weakens trust; Latur families can tell. Owner's own event photos and 5 to 10 short customer quotes with first name and locality would outperform everything else. Open-questions lists these as not received. **[OWNER]** |
| FSSAI | "FSSAI Certified" on pages, number in footer | Good. Add a "view licence" photo of the certificate on About. Check the number against the certificate (decision log already flags this). |
| Hygiene, uniforms, hairnets, gloves, RO water | Missing | Not one line. City families do ask. Only state what is true. **[OWNER]** |
| Live counters (dosa, chaat, jalebi, pani puri, pasta) | Partly: menu has chaat and Indo-Chinese but the site never says "live counter available" | Add a services line. **[OWNER: which counters, minimum guests, extra charge?]** |
| Min/max guests | Missing. Open question unanswered | Add "from 25 guests" (owner's number) and "up to N per event". Prevents wasted calls for 8-person birthday enquiries or 3,000-person asks. |
| Service area and travel charges | Area list is good; "anywhere in Maharashtra" is vague | Add "Within Latur city: no transport charge / outside: per km or per trip" as owner decides. **[OWNER]** |
| Advance and cancellation | Missing from site. Terms page covers site use only | Customers are anxious about money. State a plain rule. Typical Indian practice (unverified, owner to set): 25 to 50% advance to block the date, balance on event day before serving or on delivery, advance non-refundable inside 7 days. |
| Availability calendar | Missing | Do not build a live calendar; instead a line "Peak dates: book 2 to 3 months ahead" plus a "Check my date" WhatsApp button. |
| How to book | Good. Quote form builds a WhatsApp message, call buttons sticky | The form never saves anything; if the customer closes WhatsApp, the lead is lost. See improvement list. |
| Response time | "As soon as possible" | Vague. Replace with a promise the owner can keep: "We reply within 2 hours between 8 am and 9 pm." **[OWNER]** |
| Address and map | Present (Julhelal Marg, Narayan Nagar) | Open question: printed menu showed a different address and numbers. Resolve before launch; mismatch with Google Business Profile hurts local ranking and trust. |

Other observations:
- "Contact hours: open at all times" is nice for a caterer but sets an expectation the owner may not meet. Keep "call any time" but add a realistic reply promise.
- Photo of the owner and "owner section" on About is a good trust element. Add 2 to 3 lines of his own words (30 years story, first event, favourite dish). Currently About is generic; the decision log says no invented story, which is right, so ask him for it.
- Mobile layout: sticky Call / WhatsApp / Quote bar is correct for Latur traffic (mostly phones).

---

## B. Missing or weak, ranked by revenue impact (with exact suggestions)

1. **Price signal and sample menus by budget** (Packages page, new section "नमुना मेनू / Sample menus")
   - Three or four plates, each with dish list: e.g. "साधा शाकाहारी थाळी", "लग्न स्पेशल थाळी", "राजस्थानी दाल-बाटी-चुरमा", "दाक्षिणात्य नाश्ता".
   - Marathi: "लग्नाची थाळी: वरण-भात, २ भाज्या, पुरणपोळी/जिलेबी, कोशिंबीर, पापड, लोणचे, पुरी/चपाती. प्रति थाळी ₹___ पासून (पाहुण्यांच्या संख्येनुसार बदलते)".
   - English: "Wedding thali from Rs ___ per plate. Final rate depends on menu and guest count."
   - Each sample menu gets a "Ask quote for this menu" button that pre-fills the cart and the WhatsApp message (the cart already exists, so this is cheap).
   - **[OWNER]** price bands and dish lists.
2. **Real photos and testimonials** (Home section after "Why trust us"; Gallery)
   - Ask for 15 phone photos from the next three real events, plus 5 customers' permission to quote.
   - Marathi: "आमच्या ग्राहकांचे अनुभव". Format: quote, first name, event, town ("सौ. मीना देशमुख, गृहप्रवेश, औसा, १५० पाहुणे").
   - Add a counter line: "३०+ वर्षे, अनेक हजार जेवणे" only if owner confirms a real figure.
3. **"Booking terms" block** (Packages page and quote page sidebar)
   - Marathi: "तारीख पक्की करण्यासाठी ___% अॅडव्हान्स. उर्वरित रक्कम कार्यक्रमाच्या दिवशी. ___ दिवस आधी रद्द केल्यास ___."
   - English: "To block your date we take ___% advance. Balance on event day. Cancellation: ___."
   - **[OWNER]**.
4. **Min/max guests and "what is included" checklist** (Services page, Packages page)
   - Table: included / extra: serving staff, plates and glasses, water, tables, live counters, tent/decoration, transport, disposable vs steel.
   - Marathi: "कोटेशनमध्ये काय समाविष्ट" with ticks. Right now the site says "we say clearly in the quote", which is exactly what a worried customer cannot see before calling.
5. **Hygiene and safety strip** (Home, About): FSSAI certificate image, clean kitchen photo, uniform/gloves line, filtered water. Only true statements. **[OWNER]**
6. **Special diets** (Packages, FAQ, quote form): Jain (no onion, garlic, root vegetables), upvas (fast), sugar-free, no-onion-garlic for pooja. The quote form's notes line mentions it; make it a checkbox group "विशेष गरज" so it lands in the WhatsApp message and the lead.
7. **Tasting policy** (FAQ and Packages): "लग्नाच्या ऑर्डरसाठी चव पाहण्याची सोय" with terms. **[OWNER]**
8. **Festival and seasonal block** (Home): Ganesh Chaturthi, Diwali faral, Gudi Padwa (puran poli), Makar Sankranti (til-gul), Mahashivratri/Ekadashi upvas thali, Navratri. Small "Festival orders: book by [date]" banner, changed 4 times a year.
9. **Corporate / office page section** (Services): lunch boxes, tea-snacks, annual-day lunch, monthly tiffin. Mention GST invoice if the owner is registered. **[OWNER: GST registered? composition scheme?]**
10. **Response and availability promise** (Contact, quote page): "Reply within 2 hours. Check your date on WhatsApp now."
11. **Home-food orders**: the page tells people to "call and ask what is available". Better: 8 to 10 named items (puran poli, modak, besan ladoo, chakli, shankarpali, thalipeeth bhajani, pithla-bhakri), notice period and minimum quantity, pickup or delivery. **[OWNER]**
12. **Content defects to watch**: Hindi/Marathi copy is marked "needs native review" in source; the printed-menu transcription copies the same name for Marathi and Hindi and English is transliteration, so SEO and clarity suffer for English readers. Have a family member proofread Marathi before launch.

---

## C. Operations: does the admin match the real workflow?

Workflow mapping (what exists in code):

| Step | Admin support | Verdict |
|---|---|---|
| Enquiry | Leads with status new/contacted/quoted/confirmed/completed/lost, source (incl. referral), follow-up date, call/WhatsApp buttons, duplicate-phone warning | Good. Missing: website enquiries do not arrive here automatically (form only opens WhatsApp). Owner must retype leads. |
| Tasting | None | Add lead field/Task type "tasting date". Low effort via existing tasks. |
| Quote | Quote editor: guests x per-plate + extra lines (labour, transport, decoration) - discount, advance, terms, WhatsApp text | Good. Missing: per-plate costing, GST, quote templates by tier. Default terms exist in Settings but are empty by default. |
| Advance | Payments with advance/balance kinds, UPI reference | Good. |
| Menu freeze | Event holds dishIds and extra dishes; checklist task "confirm final guest count 2 days before" | Reasonable. No explicit "menu frozen / customer signed off" state or timestamp. |
| Procurement list | Kitchen sheet scales `perHundred` ingredients by guests; dishes without data are listed as missing | Right idea, but empty until the owner enters quantities for about 600 dishes. Unrealistic. See below. |
| Staff roster | Staff list (role, daily wage), assign to event, same-day clash warning, wage payments | Good for a small crew. No rule "how many servers for N guests". |
| Day-of checklist | Task templates by event type with offsets (buy, prep, pack, vehicle, serve, cleanup, balance) | Very good, matches reality. Missing: utensil/equipment items, return count. |
| Balance | Today screen "balance to collect" (only for events with accepted quote) | Good. |
| Feedback | None | Missing; cheap to add (task after event: "ask for Google review"). |

What is missing and whether it is worth building for a one-owner business:

| Feature | Worth it? | Notes |
|---|---|---|
| Per-plate costing and margin | **Yes, high value.** | Owner likely prices by feel. A simple "cost per plate (ingredients + labour + gas + transport)" next to the quoted per-plate with margin % prevents loss-making weddings. Start as two manual numbers on the quote (`costPerPlate`), not a recipe engine. |
| Ingredient qty per 100 guests | Partly built; **do not ask for 600 dishes.** | Pre-load typical quantities for the top 30 dishes (my experience: dal/rice/sabzi/puran poli/jalebi/shrikhand/aamras). Owner corrects them once. Mark as "typical, confirm" because they vary by cook and menu size. Also add a **menu-level** rule ("per 100 guests thali needs rice X kg, dal Y kg") since owners think by thali, not by dish. |
| Vendor/supplier list | Medium | Name, phone, items, last rate. Simple list; also lets the shopping list show "call whom". |
| Utensil and equipment checklist | **Yes, medium-high** | Utensils lost or not returned is a classic loss. Template per guest count (degchi sizes, burners/gas cylinders, tables, water drums, serving spoons). Add "out / returned" counts. |
| Labour/waiter rules by guests | **Yes, medium** | Typical practice (unverified, owner to confirm): about 1 server per 25 to 30 guests for buffet, 1 per 15 to 20 for seated, plus cooks and helpers. Auto-suggest "need N servers" on the event and warn when fewer are assigned. |
| Transport | Low-medium | Task exists. Add vehicle and distance charge line preset. |
| GST/invoice | **Ask owner first.** | Restaurant/outdoor catering GST depends on registration and turnover; I will not guess rates. The brief says FSSAI number goes on invoices, but I found no invoice generator, only quote text. A printable "bill" from an accepted quote is useful even without GST. **[OWNER + CA]** |
| Festival season/date clashes | **Yes, high** | Staff clash exists. Add a warning when two events share a date (owner often has 2 to 3 on wedding days) and a visible capacity limit "max N events/day or max N guests/day". Tie to a calendar badge (listed as not done in UX review). |
| Repeat-customer tracking | Medium | Same phone number across leads already exists; show "repeat customer, 3rd event" badge and last event menu. Free to compute. |
| Review requests | **Yes, high, tiny** | After "completed", auto-create a task and a prefilled WhatsApp text with Google review link. |
| Referral tracking | Medium | Source "referral" exists; add "referred by" name and a thank-you task. |
| Sticky Save, print layout, shorter lead form | Medium | Already listed as not done in `admin-ux-review-2.md`. Print layout matters because kitchen sheets and staff lists get pinned in the kitchen. |
| Auto-capture of website enquiries | **High** | Today the website form is WhatsApp-only and nothing reaches the admin. For a solo owner, copy-pasting is a leak. Even a tiny "Add lead from WhatsApp text" paste parser would help. |

Risk on the tool itself: the admin is local-first with Supabase optional; losing a phone or clearing the browser without backup would lose all bookings. Backup reminder exists (good); make a weekly "export to WhatsApp/Drive" habit.

---

## D. Marketing

- **Google Business Profile** (not created yet, per brief): top local lever. Category "Caterer" (secondary "Wedding service", "Sweet shop" only if applicable). Add address, hours, service-area list, 20+ real photos, menu link, a "Book/Call" button. Ask every happy customer for a review; aim for 25 reviews in 3 months. Same address and phone everywhere (resolve the printed-menu mismatch first).
- **WhatsApp Business**: create a catalogue (sample thalis, not 600 dishes), greeting message, quick replies ("Menu PDF", "Quote request", "Terms"), labels (new/quoted/booked). Broadcast lists for festival bookings; ask permission before adding anyone.
- **Instagram/Facebook**: low priority. A few reels of live counters, puran poli, aamras during season. Only if someone will post weekly.
- **Reviews**: after every event send a Google review link via WhatsApp; show 3 on the site.
- **Festival offers**: Ganesh, Diwali faral boxes, Gudi Padwa, Navratri upvas, Sankranti til-gul, Ekadashi/Mahashivratri. Pre-book campaigns 3 to 4 weeks before.
- **Marathi/Hindi/English SEO** (keywords unverified for search volume; verify with a tool): "लातूर केटरर्स", "लातूर लग्न केटरिंग", "लातूर शुद्ध शाकाहारी केटरिंग", "लातूर वाढदिवस जेवण ऑर्डर", "औसा केटरिंग", "निलंगा केटरर्स", "तुळजापूर भोजन व्यवस्था", "मराठवाडा लग्नाचे जेवण", "जैन केटरर्स लातूर", "caterers in Latur", "wedding catering Latur", "pure veg catering Latur". Site already has these in titles; the city pages policy (no thin pages) is sound. Add one real event write-up per town as they happen.
- Domain not bought; buy the .in name before printing anything. Put the URL and a QR code on the printed menu, visiting cards and vehicle.

---

## E. Risks

- **Food safety/legal**: FSSAI licence validity and category (central/state licence depends on turnover and catering scope), display on invoices, expiry reminder; food handlers' medical fitness and FoSTaC-trained supervisor are common requirements (unverified, check current FSSAI rules). Add licence expiry date in Settings with an alert. Shop Act, GST, labour rules: **[OWNER + CA/advocate]**. Terms/Privacy are already written and flagged for advocate review.
- **Price transparency**: hiding all prices is safe for the owner but a lost lead for the customer; pair with "from" prices and a written quote that lists what is included (which the admin quote supports). Avoid the "extra charges at the end" experience.
- **No-show and cancellations**: set a rule on the site and in default quote terms (empty today). Final guest count 48 to 72 hours ahead; under-attendance policy (billing floor at e.g. 90% of confirmed count is common practice, unverified; **[OWNER]**).
- **Allergens, Jain, no onion-garlic, upvas**: no allergen statement on the site. Add "We cook in a shared kitchen; tell us about nut, dairy, gluten allergies". Upvas needs separate utensils and rock salt (sendha namak), no grains. Jain also excludes root vegetables; do not claim "Jain" unless the kitchen process really does it. **[OWNER]**
- **Leftover policy**: not stated anywhere. Decide and write: leftovers belong to customer, packed on request; caterer does not guarantee reheating/holding beyond 4 hours (food safety), and no leftover is re-served. **[OWNER]**
- **Stock photos**: the images are free-licence, with attribution on Credits. The Terms clause covers photo substitution, but customers may read it as "this is what we serve". Replace with own photos soon; "masale bhat" is a known mismatch.
- **Different phone numbers and address on the printed menu** vs site: confirm before launch.
- **Admin security**: static public admin page; protection is Supabase login. Acceptable, but keep the PIN and backup. Do not store customer Aadhaar or bank details.

---

## Top 15 improvements (prioritised)

| # | Improvement | Effort | Value | Type |
|---|---|---|---|---|
| 1 | Show price signal: "from Rs X per plate" tiers or a typical range on Packages/Home | S | High | Website + business-process (owner sets numbers) |
| 2 | Sample menus by budget (4 plates) with "ask quote for this menu" button feeding the existing cart | M | High | Website |
| 3 | Real photos and 5 to 10 testimonials from actual events | M | High | Business-process (collect) + website |
| 4 | Booking terms: advance %, balance timing, cancellation, final-count rule, written on site and prefilled in default quote terms | S | High | Business-process + website + admin (default terms) |
| 5 | Create and complete Google Business Profile with real photos; ask for reviews | M | High | Business-process |
| 6 | Auto-capture website enquiries into admin Leads (or at minimum a paste-in/import) | M | High | Admin (needs a backend decision) |
| 7 | "What is included" checklist and min/max guests, live counters, travel charge rule | S | High | Website + business-process |
| 8 | Hygiene and licence trust strip (certificate photo, uniforms, water) | S | Med-High | Website + business-process |
| 9 | Review request and thank-you tasks after "completed" with prefilled WhatsApp text | S | High | Admin |
| 10 | Date-clash and capacity warning (events per day, guests per day) plus calendar badges | M | High | Admin |
| 11 | Per-plate cost and margin on the quote (two manual fields to start) | S-M | High | Admin |
| 12 | Auto-suggest servers/cooks by guest count and utensil/equipment checklist with out/returned counts | M | Med | Admin |
| 13 | Special-diet checkboxes (Jain, upvas, no onion-garlic, allergy note) on quote form and lead | S | Med | Website + admin |
| 14 | Pre-fill typical ingredient quantities for top 30 dishes; supplier list | M | Med | Admin |
| 15 | Printable bill/invoice from accepted quote (GST only if owner confirms); festival banner; repeat-customer badge | M | Med | Admin + website |

Not worth building now: a payment gateway, a live availability calendar for customers, a full recipe/inventory system, Instagram automation.

---

## 10-line summary

1. The site is fast, honest, trilingual and mobile-friendly, but it explains how to order, not why to choose you or what it costs.
2. Biggest losses: no price signal, no sample menus by budget, no real event photos or testimonials.
3. Customers also cannot see advance and cancellation terms, minimum and maximum guests, what is included, or hygiene details.
4. A 600-dish menu overwhelms families; 4 sample thalis with a "quote this menu" button will convert better.
5. The admin covers lead, quote, advance, event, tasks, staff, payments and kitchen sheets well for one owner.
6. Gaps in the admin: costing and margin, date and capacity clashes, review requests, utensil checklist, staff-by-guest rules, invoice.
7. Website enquiries do not reach the admin; owner has to retype them, which is a daily leak.
8. Google Business Profile, WhatsApp Business catalogue and review collection are the cheapest marketing wins for Latur.
9. Risks to settle with the owner and a CA/advocate: FSSAI validity, GST, no-show and cancellation rule, leftover policy, Jain/upvas/allergy claims.
10. Most fixes need facts only the owner has (prices, terms, guest limits, tasting, counters, GST); collect these in one 30-minute sit-down before launch.
