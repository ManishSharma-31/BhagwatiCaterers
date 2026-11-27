# Design Guide

_Starting point from `research/01-visuals-and-image-licensing.md`. All values are proposals until the owner approves a first preview._

## Feeling
Warm, festive, trustworthy, clean. Maharashtrian heritage as decoration, never clutter. Mobile first: most visitors will arrive on an Android phone over a mobile network.

## Colour palette (starting hex values, to be tuned on screen)

| Name | Hex | Use |
|---|---|---|
| Haldi (turmeric) yellow | `#F2B01E` | Highlights, badges |
| Kesari (saffron) | `#E8750A` | Primary buttons, accents |
| Maroon | `#7A1F2B` | Headings, footer, borders |
| Leaf green | `#3E7B3A` | "Pure veg" mark, success |
| Peacock teal | `#0F7C80` | Secondary accent |
| Cream | `#FFF6E3` | Page background |
| Ink | `#2B1B14` | Body text |

Check contrast: body text and buttons must reach WCAG AA (4.5:1 for normal text). Do not use saffron text on cream for small text.

## Typography (all open licence, self-hosted, subset WOFF2)

| Role | Font |
|---|---|
| Festive headings | Yatra One |
| Elegant Marathi headings | Tiro Devanagari Marathi |
| Body | Mukta |
| Numbers and UI | Poppins |

**[VERIFY]** the family names and Devanagari coverage on fonts.google.com before use. Load at most one or two fonts at launch; the performance plan prefers a system Devanagari stack plus one subset font. Marathi body text needs generous line height (about 1.6 to 1.8).

## Motifs (all redrawn as original SVG)

Paithani-inspired border, Warli-inspired scene (people, tarpa dance, simple figures), rangoli corners, kolam-style dividers, kalash and shriphal, toran across the header, banana-leaf thali, diya, mango-leaf garland, dish icons (puran poli, modak, misal, bhakri, shrikhand, masale bhat, varan bhat, jilebi, dal-baati-churma, idli-dosa).

Rules:
- Original drawings only. No tracing of specific artists' works or branded designs.
- Say "inspired by". Do not claim "authentic Paithani/Warli".
- No state emblem, no politician or public-figure images, no swastika glyph, no deity icons without the owner's OK.
- Keep SVGs small (under about 10 KB each), inline or sprite them.

## Images
Order of preference:
1. The owner's own photos (best for trust)
2. Original SVG art created for this project
3. Pexels, Unsplash or Pixabay, food only, no faces, no brands, labelled "representative image" or avoided

Every image gets a row in `image-credits.md`. Optimise: AVIF/WebP with `<picture>`, srcset widths, width and height set, lazy loading, EXIF removed, hero under about 150 KB.

## Layout and components
- Sticky bottom bar on mobile: **Call** and **WhatsApp**, always visible
- Hero: headline, "pure veg, 30+ years", two buttons (Get a Quote, WhatsApp)
- Order-type cards (two large, one small)
- Menu cards with dietary tags (Jain, no onion/garlic, fasting)
- Trust strip: 30+ years, FSSAI licence number, pure veg mark
- Gallery grid, testimonial slider (no heavy JavaScript), FAQ accordion
- Language switcher: मराठी, English, हिन्दी, in the header

## Accessibility
Large tap targets (at least 44 px), visible focus, alt text in Marathi and English, no motion that cannot be turned off, forms with clear labels and errors in the selected language.
