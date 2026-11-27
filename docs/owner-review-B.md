# Owner review: pages Gallery, Areas, Contact, Quote, Credits

## Needs owner confirmation
- Opening hours / best time to call (none shown on Contact).
- Business address or kitchen location (none shown; no map).
- Email address, if any (none shown).
- Is the WhatsApp number the same as 9057264895? (used everywhere now)
- Can we serve villages near the six towns "on request"? (Areas page says we will tell them whether we can.)
- Real photos of food and events to replace stock photos in the Gallery.
- Quote form: confirm the event types and order-type wording match how the owner talks to customers.
- Minimum and maximum guest numbers (not mentioned on the form).

## Copy needing native Marathi/Hindi review
- All text in src/content/gallery.ts, areas.ts, contact.ts, quote.ts, credits.ts (Marathi and Hindi drafts).
- The WhatsApp message wording in quote.ts (messageLabels): the owner will read these messages, so check they sound natural.
- Quote form validation messages and privacy note.
- Hindi dish spellings in the gallery alt text (e.g. पूरन पोली, जलेबी).

## Requests for lead
- Photo.astro reads `public/photos` relative to `process.cwd()`; build must run from apps/site.
- Credits reads `apps/site/photos/manifest.json` (array: file_name, source, page_url, photographer, license) and lists an entry only if `public/photos/<base>-800.webp` exists (base = file_name without extension and without -800/-1600).
- Gallery slot icons reuse art files (thali.svg for buffet-counter/thali-top, toran.svg for marigold-flowers); swap in content/gallery.ts if better art exists.
