// Single source of truth for business facts. Update here only.
export type Lang = 'mr' | 'en' | 'hi';
export const LANGS: Lang[] = ['mr', 'en', 'hi'];
export const DEFAULT_LANG: Lang = 'mr';
export const SITE_URL = 'https://bhagwaticaterers.in'; // placeholder domain

type L3 = Record<Lang, string>;

export const site = {
  name: { mr: 'भगवती केटरर्स', en: 'Bhagwati Caterers', hi: 'भगवती केटरर्स' } as L3,
  owner: { mr: 'शांतीलाल महाराज', en: 'Shanti Lal Maharaj', hi: 'शांतिलाल महाराज' } as L3,
  phone: '9057264895',
  phoneIntl: '919057264895',
  fssai: '21526049010527',
  years: '30+',
  city: { mr: 'लातूर', en: 'Latur', hi: 'लातूर' } as L3,
  areas: [
    { key: 'latur', mr: 'लातूर', en: 'Latur', hi: 'लातूर' },
    { key: 'ausa', mr: 'औसा', en: 'Ausa', hi: 'औसा' },
    { key: 'nilanga', mr: 'निलंगा', en: 'Nilanga', hi: 'निलंगा' },
    { key: 'renapur', mr: 'रेणापूर', en: 'Renapur', hi: 'रेणापुर' },
    { key: 'tuljapur', mr: 'तुळजापूर', en: 'Tuljapur', hi: 'तुलजापुर' },
    { key: 'ambajogai', mr: 'अंबाजोगाई', en: 'Ambajogai', hi: 'अम्बाजोगाई' },
  ] as Array<{ key: string } & L3>,
  // Profiles are not created yet. Add the URLs here when they exist (used for schema sameAs and footer).
  social: { instagram: '', facebook: '', googleBusiness: '' },
};

// Page keys in navigation order. '' is the home page.
export const PAGES = [
  'home', 'services', 'menu', 'packages', 'gallery', 'about', 'faq', 'areas', 'contact', 'quote', 'credits',
] as const;
export type PageKey = (typeof PAGES)[number];

export const waLink = (lang: Lang, text?: string) => {
  const greeting: L3 = {
    mr: 'नमस्कार, मला केटरिंगची माहिती हवी आहे.',
    en: 'Hello, I would like information about catering.',
    hi: 'नमस्ते, मुझे कैटरिंग की जानकारी चाहिए।',
  };
  return `https://wa.me/${site.phoneIntl}?text=${encodeURIComponent(text ?? greeting[lang])}`;
};

export const pagePath = (lang: Lang, page: PageKey) => {
  const prefix = lang === DEFAULT_LANG ? '' : `/${lang}`;
  const slug = page === 'home' ? '' : `/${page}`;
  return `${prefix}${slug}/` === '/' ? '/' : `${prefix}${slug}/`;
};
