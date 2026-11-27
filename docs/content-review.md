# Content Review (Marathi, Hindi, English)

_Reviewed and implemented 2026-11-27. All copy still needs a read-through by the owner's family before launch. Verified: `tsc --noEmit` clean, `astro build` OK, every public page has exactly one h1, full `<title>` 21 to 58 characters, description 76 to 154 characters, all JSON-LD parses, FSSAI number appears only in the footer._

## (a) What was weak and what changed

Marathi is shown first in each row; Hindi and English received the matching change unless noted.

| # | File | Before | After | Why |
|---|---|---|---|---|
| 1 | `content/quote.ts` orderTypes (mr) | "सर्व साहित्य तुमचे (आम्ही सर्व आणतो)" (says the material is yours AND we bring it: contradiction, goes into the WhatsApp message) | "सर्व साहित्य आमचे (आम्ही सर्व आणतो)" | Factual error in a customer-facing option |
| 2 | all content (mr) | "सर्व साहित्यासह" / "आपले साहित्य, आमचा स्वयंपाक" (ambiguous: "with whose material?", stiff "आपले") | "सर्व साहित्य आमचे" / "साहित्य तुमचे, स्वयंपाक आमचा" | Clear, spoken, one term everywhere (home, packages, services, FAQ, about, quote) |
| 3 | all content (hi) | "सारी सामग्री के साथ" / "आपकी सामग्री, हमारा पकाना" and "सामान" in the quote form | "सारी सामग्री हमारी" / "सामग्री आपकी, खाना हमारा"; "सामान" removed | Same two-option term in all places; "सामग्री" only |
| 4 | `i18n/ui.ts` nav.packages, `views/Services.astro`, `content/packages.ts` h1 (mr) | "ऑर्डर कसे करावे" (wrong gender, bookish) | "ऑर्डर कशी द्यावी" | Natural Marathi; "ऑर्डर" is feminine |
| 5 | `i18n/ui.ts` getQuote/nav.quote (mr, hi) | "कोटेशन मिळवा" / "कोटेशन पाएं" | "कोटेशन मागवा" / "कोटेशन पाएँ" | People ask for a quote ("मागवा"); Hindi spelling fixed |
| 6 | `content/home.ts` heroTitle (mr) | "तुमच्या प्रत्येक समारंभासाठी शुद्ध शाकाहारी चव" (no keyword, no place) | "लातूरमधील शुद्ध शाकाहारी केटरिंग: लग्न, समारंभ आणि पूजेसाठी" | h1 now carries "लातूर", "शुद्ध शाकाहारी केटरिंग", "लग्न" |
| 7 | `content/home.ts` metaTitle (all) | "भगवती केटरर्स, लातूर: शुद्ध शाकाहारी केटरिंग" | "भगवती केटरर्स लातूर: शुद्ध शाकाहारी केटरिंग, लग्नाचे जेवण" (en: "Bhagwati Caterers Latur \| Pure Veg Catering for Weddings") | Adds the "लग्नाचे जेवण" / wedding search intent; 57 and 56 chars |
| 8 | `content/home.ts` metaDescription (all) | Generic, no towns | Lists Latur, Ausa, Nilanga, Renapur, Tuljapur, Ambajogai, 30+ years, FSSAI Certified, call prompt; 146 to 150 chars | Local SEO and a call to action |
| 9 | page titles, all pages (all langs) | Long, e.g. about 68 chars total; no "Latur" on most | Page title plus brand now at most 58 chars; "लातूर"/"Latur" in nearly every title (e.g. "लग्न, पूजा, पार्टीसाठी केटरिंग सेवा, लातूर") | Under the 60-char display limit; local keyword on every page |
| 10 | `content/faq.ts` (all) | 10 items; advance, minimum guests, cancellation lumped in one vague line | 18 items: location, quote process, booking lead time, minimum guests, Jain/no onion-garlic/fasting, live counters, serving staff, outside Latur, tasting, advance and cancellation, home food, contact hours | Real questions people ask; every answer is truthful ("depends on the event, we confirm when we talk") |
| 11 | `content/faq.ts` rates answer | "दर कार्यक्रमानुसार ठरतात" | Adds "दर वेबसाइटवर दिलेले नाहीत" and what the quote is based on | Honest, avoids repeated "ask us" |
| 12 | `views/Faq.astro` | FAQPage JSON-LD existed | Left as is (it reads the new, longer list automatically) | Now 18 questions in rich-result markup |
| 13 | `layouts/Base.astro` JSON-LD | Business `description` was the per-page meta text; `founder` asserted; no `@id`, no image; no breadcrumbs | Fixed per-language business description, `@id`, `image`, `inLanguage`, hi alternate name; `founder` removed; BreadcrumbList (Home > page) on every non-home page | `founder` was not supplied by the owner; breadcrumbs help local results |
| 14 | `content/about.ts` ownerRole (all) | "संस्थापक व मालक" / "Founder and owner" | "मालक, भगवती केटरर्स" / "Owner" | "Founder" was never confirmed by the owner |
| 15 | `content/about.ts` ownerBody (all) | "चव आणि स्वच्छतेकडे ते स्वतः लक्ष देतात" (a claim nobody supplied) | "...थेट बोलायचे असेल तर फोन करा" | Removes an unverified hygiene claim (design guide: no hygiene superlatives) |
| 16 | `content/home.ts`, `packages.ts` order type body (all) | "साहित्य, स्वयंपाक आणि वाढप आम्ही पाहतो" (promises serving) | "साहित्याची खरेदी आणि स्वयंपाक आमच्याकडे. वाढपाची व्यवस्था कार्यक्रमानुसार बोलून ठरवू." | Serving staff was not confirmed by the owner |
| 17 | `content/areas.ts` Latur line (all) | "आम्ही उपलब्ध आहोत" | "आम्ही केटरिंग सेवा देतो" | "Available" reads as an availability promise |
| 18 | CTAs in home, services, packages, areas, quote, quote panel (all) | "आम्ही लवकर संपर्क करू" / "We will get back to you soon" / "जल्द संपर्क करेंगे" | "आम्ही तुमच्याशी संपर्क करू" / "We will get in touch with you" / "हम आपसे संपर्क करेंगे" | Removes an implied response-time promise |
| 19 | `content/quote.ts` panelTitle (all) | "काही मिनिटांत चौकशी करा" / "Plan your event in minutes" | "कार्यक्रमाची माहिती थोडक्यात द्या" / "Tell us about your event" | No timing claim |
| 20 | `content/quote.ts` title, metaTitle (all) | "कोटेशन मिळवा" (title only; no keyword) | "केटरिंग कोटेशन मागवा, लातूर" / "Get a Catering Quote, Latur" | Keyword and place in title/h1 |
| 21 | `content/quote.ts` lead (all) | Only describes the form | Adds "तुम्ही थेट फोन करूनही सांगू शकता" | Gives a phone-first escape (UX review) |
| 22 | `content/quote.ts` events/order options (mr) | "विवाह", "खात्री नाही", "ऑफिस कार्यक्रम" | "लग्न", "अजून ठरले नाही", "ऑफिस / संस्थेचा कार्यक्रम" | Spoken register; matches home and services |
| 23 | `content/packages.ts` needs (all) | 5 items | Adds "काही खास गरज (उदा. जैन, उपवास, कांदा-लसूण नको)" | Matches the new FAQ answer; helps owner prepare the quote |
| 24 | `content/menu.ts` prefs, metas (all) | No Jain / no onion-garlic; generic title | Adds Jain and no onion-garlic to preferences; title "शुद्ध शाकाहारी जेवणाचा मेनू, लातूर" | Search intent and real requests |
| 25 | `content/menu.ts` h1 (all) | "आमचा मेनू" | "आमचा शुद्ध शाकाहारी मेनू" | Keyword in h1 |
| 26 | `content/gallery.ts` metas and note (all) | "खरे फोटो लवकरच येतील" (a time promise) | "...खरे फोटो येथे जोडले जातील"; meta says images are representative | Honest, keeps the "representative image" wording |
| 27 | `content/gallery.ts` hero alt (mr) | "विवाह मंडपाची सजावट" | "लग्नमंडपाची सजावट" | Spoken term "लग्न" |
| 28 | `content/home.ts` why-cards (all) | "तुमचा पर्याय" style; "१००% शाकाहारी" | "१००% शुद्ध शाकाहारी"; FSSAI card says "परवाना क्रमांक प्रत्येक पृष्ठाच्या शेवटी" | Same phrase as the footer; one wording for veg claim |
| 29 | `content/contact.ts` (all) | Title "संपर्क" / "Contact Us"; meta without address | Title "संपर्क: भगवती केटरर्स, लातूर"; meta has street address and the phone number; label "वेळ" became "संपर्काची वेळ" | Local-SEO signals (NAP); clearer label for "call any time" |
| 30 | `content/areas.ts` (all) | "जवळचे इतर भाग"; meta without "ask us" | "जवळची इतर गावे"; h1 "सेवा क्षेत्र: लातूर आणि आसपास" | Natural village/town wording; keyword in h1 |
| 31 | `i18n/ui.ts` footerNote (all) | No place name | "लातूरमधील शुद्ध शाकाहारी केटरिंग: ..." | Every page footer now says Latur |
| 32 | Hindi everywhere | Mixed spellings: पाएं/पाएँ, बताएं/बताएँ, मांगें, "कैटरर्स" for the brand, "सारा सामान" | One style: "ँ" forms, "माँगें", brand always "केटरर्स", service word "कैटरिंग", "फ़ोन/फ़ॉर्म" with nukta | Consistent, correct Hindi |
| 33 | `views/Home.astro` buttons (all) | "अधिक माहिती" / "Learn more" / "पूर्ण मेनू" | "ऑर्डर कशी द्यायची ते पाहा" / "See how to order" / "पूर्ण मेनू पाहा" | Descriptive CTA labels (no "learn more") |
| 34 | `views/Menu.astro` not-listed line (mr) | "कदाचित करता येईल" (vague) | "तुमच्यासाठी करता येईल का ते सांगतो" | Clear and honest |
| 35 | `i18n/ui.ts` nav.faq (mr, hi) | "प्रश्नोत्तरे" / "सवाल-जवाब" | "नेहमीचे प्रश्न" / "अक्सर पूछे सवाल" | Everyday wording |

Not changed on purpose: all prices stay unpublished; `site.hours` (owner-supplied "call any time" wording); dish names in `menu-items.ts` (examples, owner must confirm); `credits.ts` (technical); photo alt text (already descriptive and in all three languages).

## (b) Glossary of standard terms

| Concept | Marathi | Hindi | English |
|---|---|---|---|
| Business | भगवती केटरर्स | भगवती केटरर्स | Bhagwati Caterers |
| Catering (service) | केटरिंग | कैटरिंग | catering |
| Pure vegetarian | शुद्ध शाकाहारी | शुद्ध शाकाहारी | pure vegetarian / pure veg |
| Wedding | लग्न (विवाह only in formal lists on the Hindi site) | विवाह (शादी in titles/SEO) | wedding |
| Event / function | कार्यक्रम, समारंभ | आयोजन, समारोह | event, function |
| Guests | पाहुणे | मेहमान | guests |
| Quote | कोटेशन (one term; never "अंदाजपत्रक") | कोटेशन | quote |
| Order | ऑर्डर (feminine: "ऑर्डर कशी द्यावी") | ऑर्डर | order |
| Order type 1 | सर्व साहित्य आमचे | सारी सामग्री हमारी | We bring everything |
| Order type 2 | साहित्य तुमचे, स्वयंपाक आमचा | सामग्री आपकी, खाना हमारा | You provide ingredients, we cook |
| Home food | घरगुती जेवण, ऑर्डरवर | घर जैसा भोजन, ऑर्डर पर | Home-style food on order |
| Ingredients | साहित्य | सामग्री | ingredients |
| Cook | आचारी | रसोइया | cook |
| Menu | मेनू | मेन्यू | menu |
| Service area | सेवा क्षेत्र | सेवा क्षेत्र | service areas |
| Call button | फोन करा | फ़ोन करें | Call |
| Licence line | FSSAI प्रमाणित (number only in footer) | FSSAI प्रमाणित | FSSAI Certified |
| Stock photo label | प्रातिनिधिक चित्र | प्रतिनिधि चित्र | Representative image |
| Nearby | आसपास | आसपास | nearby |

Target search phrases now present in titles, h1s or descriptions: लातूर केटरर्स, लग्नाचे जेवण (home title), शुद्ध शाकाहारी केटरिंग लातूर, catering in Latur, veg caterers Latur, wedding catering Latur, लातूर कैटरिंग, शादी भोजन.

## (c) Questions only the owner can answer

1. Do you take bookings for small events? What is the smallest number of guests you cook for? (Needed for the FAQ "minimum guests" answer.)
2. How far ahead should customers book, and do you ask for an advance? What is the cancellation and change policy? (FAQ currently says "we share these terms before the order is confirmed".)
3. Can you provide serving staff (वाढपी), tables, utensils or buffet counters? Which ones, and are they included or extra? (Wording on "We bring everything" is deliberately silent until this is known.)
4. Do you do live counters (dosa, jilebi)? Which ones?
5. Can you cook Jain food and food without onion and garlic? Fasting (upvas) dishes? Which ones?
6. Do you offer a tasting before the order? Is it free or paid?
7. How far outside Latur do you travel, and is there a travel arrangement or charge? (Only the six towns plus "nearby" are stated.)
8. Is Shanti Lal Maharaj the founder, or the owner only? Is he the person who takes the calls? (We now say "owner" only.)
9. Please confirm the real dish list for each cuisine; the menu is still examples, and the Marathi/Hindi/English dish spellings should be checked by someone who cooks them.
10. Are there customer words (with their permission) or photos from real events we can show? Until then the trust wording relies on 30+ years, pure veg and FSSAI Certified.
11. Is "कोटेशन" the word your customers use, or do they say "रेट" / "भाव"? We can switch the one standard term in a single pass.
12. Public phone and WhatsApp are the same number (9057264895). Is that right, and is "any time" still correct?
13. Do you want the domain, Instagram, Facebook and Google Business Profile added to the site data once created? (`SITE_URL` in `src/data/site.ts` is still a placeholder; it feeds canonical, hreflang, sitemap and JSON-LD.)

## Out of scope but worth fixing (not in my allowed files)

- `components/Header.astro`: the hamburger label reads "मेनू" and clashes with the Menu page; also the label is hard-coded Marathi for Hindi. Suggest "☰ विभाग" / "☰ Pages" / "☰ विभाग".
- `data/site.ts`: SITE_URL placeholder; `hours.hi` uses "फोन" while other Hindi uses "फ़ोन" (cosmetic).
- `/admin/` has no meta description and no h1 (another agent's area; it should stay `noindex`).
