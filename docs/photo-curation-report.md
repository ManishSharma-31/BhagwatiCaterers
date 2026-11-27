# Photo curation report (checked 2026-11-27)

Manifest: `apps/site/photos/manifest.json` (37 entries; 31 with a Pexels page and direct URL, 6 marked `needs_manual`).

## Method and limits
- Only Pexels search and photo pages could be read. Pixabay and Unsplash were not used (no pages fetched), so they remain untried for the gaps below.
- Images were never viewed. Dish and "no people" judgements come from page titles and descriptions only. A human must look at every image before launch.
- Photographer names come from download filenames (unverified), except photo 5993269 (named on its page).
- Only one photo page (5993269) was fetched in full. The direct URL form `https://images.pexels.com/photos/ID/pexels-photo-ID.jpeg` was confirmed on that page and is reused for the others. The download Action must check each for HTTP 200 and fail soft.
- Licence: each page showed "Free" and linked to the Pexels licence. The licence text itself was not re-read. Attribution is not required, but credit is recorded anyway.

## Found
| Slot(s) | Result |
|---|---|
| modak (3 photos) | Good, page text names modak. Mostly dyed or fried style. |
| misal-pav (2) | Good, named misal pav. |
| jilebi (2) | Good. |
| idli-sambar (2), dosa (2, masala named) | Good. |
| banana-leaf-meal | Kerala sadya, not Maharashtrian. Label as representative. |
| hero-thali, thali-top, thali-sweets | North Indian-style thalis. Representative only. |
| buffet-counter (2) | Generic steel chafing dishes. Food unconfirmed. |
| marigold (2), diyas (2), kalash (2), puja-thali | Good, no people noted. Kalash shows coconut and leaves, mango leaf unconfirmed. |
| hero-wedding-decor | Empty mandap in a fort. Check for people. |
| sweets-platter, snacks-platter, samosa, poha, gulab-jamun | Good generic fillers. |

## Missing (do not substitute)
puran poli, bhakri-pithla, shrikhand, masale bhat, varan bhat, dal baati churma, rangoli (Pexels page unreadable), aamras-puri, gatte ki sabzi. Pexels search returned no genuine photo for these.

## Risks
- Unverified faces, hands, brand marks and non-veg items (several Pexels banana-leaf photos contain fish, meat or egg; those were excluded).
- Several Lara Jameson photos share a shoot with hands and women in frame. Check each.
- Direct URLs not individually confirmed. gulab-jamun was seen only in search results.
- Stock photos of non-local food may mislead customers. Use the "representative image" label.
- Kerala, Bangladeshi and Delhi origins of some photos do not match Latur.

## Replace first with owner photos
1. Hero thali and hero wedding decor (trust and first impression).
2. All missing Maharashtrian dishes: puran poli, bhakri-pithla, shrikhand, masale bhat, varan bhat, dal baati churma.
3. misal-pav, modak (local style, ukadiche).
4. buffet-counter and banana-leaf-meal (show your actual service).
5. Then idli, dosa, sweets, snacks.
