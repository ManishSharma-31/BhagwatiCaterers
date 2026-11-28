import type { Lang } from '../data/site';

// REAL customer reviews only. Never invent a review, a name or a photo: that is misleading and illegal in India
// (Consumer Protection Act 2019). Add an entry only after the customer has agreed, in writing or on WhatsApp,
// to show their words, name and (if used) photo on the website. The section stays hidden while this list is empty.
//
// How to add one:
//   1. Put the customer's photo (square, at least 200x200, optional) in public/photos/testimonials/ as e.g. sunita.jpg
//   2. Add an object below. `text` and `about` are written in the language of the review; `lang` says which.
//   3. `rating` (1 to 5) is optional. Do not show a rating the customer did not give.
export interface Testimonial {
  name: string;
  about: string;        // short line about the person, e.g. "Wedding, Latur" or "Housewarming, Ausa"
  text: string;         // the review, in the customer's own words
  lang?: Lang;          // language of `text` (so that screen readers pronounce it correctly)
  photo?: string;       // file name inside public/photos/testimonials/ (optional; initials are shown if missing)
  rating?: 1 | 2 | 3 | 4 | 5;
}

export const testimonials: Testimonial[] = [];

export const testimonialsTitle: Record<Lang, { title: string; prev: string; next: string; goto: string }> = {
  mr: { title: 'आमचे ग्राहक काय म्हणतात', prev: 'मागील अभिप्राय', next: 'पुढील अभिप्राय', goto: 'अभिप्राय' },
  en: { title: 'What our customers say', prev: 'Previous review', next: 'Next review', goto: 'Review' },
  hi: { title: 'हमारे ग्राहक क्या कहते हैं', prev: 'पिछली समीक्षा', next: 'अगली समीक्षा', goto: 'समीक्षा' },
};
