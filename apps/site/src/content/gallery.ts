import type { Lang } from '../data/site';
type L3<T = string> = Record<Lang, T>;
export interface Slot { name: string; icon: string; alt: L3 }
export const slots: Slot[] = [
  { name: 'puran-poli', icon: '/art/icon-puran-poli.svg', alt: { mr: 'पुरणपोळी', en: 'Puran poli, a sweet flatbread', hi: 'पूरन पोली' } },
  { name: 'modak', icon: '/art/icon-modak.svg', alt: { mr: 'मोदक', en: 'Modak sweets', hi: 'मोदक मिठाई' } },
  { name: 'misal-pav', icon: '/art/icon-misal.svg', alt: { mr: 'मिसळ पाव', en: 'Misal pav', hi: 'मिसल पाव' } },
  { name: 'bhakri-pithla', icon: '/art/icon-bhakri.svg', alt: { mr: 'भाकरी आणि पिठले', en: 'Bhakri with pithla', hi: 'भाकरी और पिठला' } },
  { name: 'shrikhand', icon: '/art/icon-shrikhand.svg', alt: { mr: 'श्रीखंड', en: 'Shrikhand', hi: 'श्रीखंड' } },
  { name: 'masale-bhat', icon: '/art/icon-masale-bhat.svg', alt: { mr: 'मसाले भात', en: 'Masale bhat, spiced rice', hi: 'मसाले भात' } },
  { name: 'jilebi', icon: '/art/icon-jilebi.svg', alt: { mr: 'जिलेबी', en: 'Jilebi', hi: 'जलेबी' } },
  { name: 'dal-baati-churma', icon: '/art/icon-dal-baati.svg', alt: { mr: 'दाल बाटी चुरमा', en: 'Dal baati churma', hi: 'दाल बाटी चूरमा' } },
  { name: 'idli-sambar', icon: '/art/icon-idli.svg', alt: { mr: 'इडली सांबार', en: 'Idli with sambar', hi: 'इडली सांभर' } },
  { name: 'dosa', icon: '/art/icon-dosa.svg', alt: { mr: 'डोसा', en: 'Dosa', hi: 'डोसा' } },
  { name: 'banana-leaf-meal', icon: '/art/banana-leaf-meal.svg', alt: { mr: 'केळीच्या पानावरचे जेवण', en: 'A meal served on a banana leaf', hi: 'केले के पत्ते पर भोजन' } },
  { name: 'buffet-counter', icon: '/art/thali.svg', alt: { mr: 'बुफे काउंटर', en: 'A buffet counter', hi: 'बुफे काउंटर' } },
  { name: 'marigold-flowers', icon: '/art/toran.svg', alt: { mr: 'झेंडूची फुले', en: 'Marigold flowers', hi: 'गेंदे के फूल' } },
  { name: 'diyas', icon: '/art/diya.svg', alt: { mr: 'पणत्या', en: 'Lit diyas', hi: 'दीये' } },
  { name: 'rangoli', icon: '/art/rangoli-corner.svg', alt: { mr: 'रांगोळी', en: 'Rangoli', hi: 'रंगोली' } },
  { name: 'kalash', icon: '/art/kalash.svg', alt: { mr: 'कलश', en: 'A kalash', hi: 'कलश' } },
  { name: 'sweets-platter', icon: '/art/icon-sweets.svg', alt: { mr: 'मिठाईचे ताट', en: 'A platter of sweets', hi: 'मिठाई की थाली' } },
  { name: 'thali-top', icon: '/art/thali.svg', alt: { mr: 'शाकाहारी थाळी', en: 'A vegetarian thali', hi: 'शाकाहारी थाली' } },
];
export const gallery: Record<Lang, { metaTitle: string; metaDescription: string; title: string; lead: string; note: string; ctaTitle: string; ctaBody: string }> = {
  mr: {
    metaTitle: 'गॅलरी: पदार्थ आणि समारंभ',
    metaDescription: 'भगवती केटरर्सची गॅलरी: महाराष्ट्रीयन, दाक्षिणात्य आणि राजस्थानी पदार्थांची प्रातिनिधिक चित्रे. आमच्या कार्यक्रमांचे खरे फोटो लवकरच येतील.',
    title: 'गॅलरी',
    lead: 'आम्ही बनवतो त्या प्रकारच्या पदार्थांची आणि समारंभाच्या वातावरणाची काही चित्रे.',
    note: 'ही चित्रे प्रातिनिधिक आहेत, आमच्या स्वतःच्या पदार्थांची नाहीत. आमच्या कार्यक्रमांचे खरे फोटो लवकरच येथे जोडले जातील.',
    ctaTitle: 'तुमच्या समारंभासाठी बोलूया',
    ctaBody: 'मेनू आणि व्यवस्थेबद्दल आमच्याशी थेट बोला.',
  },
  en: {
    metaTitle: 'Gallery: Dishes and Occasions',
    metaDescription: 'Gallery of Bhagwati Caterers: representative pictures of Maharashtrian, South Indian and Rajasthani dishes. Real photos from our events will be added soon.',
    title: 'Gallery',
    lead: 'A few pictures of the kinds of dishes we cook and the feel of the occasions we serve.',
    note: 'These pictures are representative and are not our own dishes. Real photos from our events will be added here soon.',
    ctaTitle: "Let's talk about your occasion",
    ctaBody: 'Speak to us directly about the menu and arrangements.',
  },
  hi: {
    metaTitle: 'गैलरी: व्यंजन और समारोह',
    metaDescription: 'भगवती केटरर्स की गैलरी: महाराष्ट्रीयन, दक्षिण भारतीय और राजस्थानी व्यंजनों के प्रतिनिधि चित्र। हमारे कार्यक्रमों की असली तस्वीरें जल्द जोड़ी जाएंगी।',
    title: 'गैलरी',
    lead: 'हम जिस तरह के व्यंजन बनाते हैं और जिन समारोहों में सेवा देते हैं, उनके कुछ चित्र।',
    note: 'ये चित्र प्रतिनिधि हैं, हमारे अपने व्यंजनों के नहीं। हमारे कार्यक्रमों की असली तस्वीरें जल्द यहाँ जोड़ी जाएंगी।',
    ctaTitle: 'आपके समारोह के लिए बात करें',
    ctaBody: 'मेन्यू और व्यवस्था के बारे में सीधे हमसे बात करें।',
  },
};
