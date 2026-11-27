import type { Lang, PageKey } from '../data/site';

type L3<T = string> = Record<Lang, T>;

// Short, shared interface text. Longer page copy lives in src/content/*.ts
export const nav: Record<Exclude<PageKey, 'credits' | 'home'>, L3> = {
  services: { mr: 'सेवा', en: 'Services', hi: 'सेवाएँ' },
  menu: { mr: 'मेनू', en: 'Menu', hi: 'मेन्यू' },
  packages: { mr: 'ऑर्डर कशी द्यावी', en: 'How to Order', hi: 'ऑर्डर कैसे करें' },
  gallery: { mr: 'गॅलरी', en: 'Gallery', hi: 'गैलरी' },
  about: { mr: 'आमच्याबद्दल', en: 'About Us', hi: 'हमारे बारे में' },
  faq: { mr: 'नेहमीचे प्रश्न', en: 'FAQ', hi: 'अक्सर पूछे सवाल' },
  areas: { mr: 'सेवा क्षेत्र', en: 'Service Areas', hi: 'सेवा क्षेत्र' },
  contact: { mr: 'संपर्क', en: 'Contact', hi: 'संपर्क' },
  quote: { mr: 'कोटेशन मागवा', en: 'Get a Quote', hi: 'कोटेशन पाएँ' },
};

export const ui = {
  home: { mr: 'मुख्य पृष्ठ', en: 'Home', hi: 'मुख्य पृष्ठ' } as L3,
  call: { mr: 'फोन करा', en: 'Call', hi: 'फ़ोन करें' } as L3,
  whatsapp: { mr: 'WhatsApp', en: 'WhatsApp', hi: 'WhatsApp' } as L3,
  getQuote: { mr: 'कोटेशन मागवा', en: 'Get a Quote', hi: 'कोटेशन पाएँ' } as L3,
  pureVeg: { mr: '१००% शुद्ध शाकाहारी', en: '100% Pure Vegetarian', hi: '100% शुद्ध शाकाहारी' } as L3,
  yearsExp: { mr: '३०+ वर्षांचा अनुभव', en: '30+ Years of Experience', hi: '30+ वर्षों का अनुभव' } as L3,
  fssaiCertified: { mr: 'FSSAI प्रमाणित', en: 'FSSAI Certified', hi: 'FSSAI प्रमाणित' } as L3,
  fssaiLabel: { mr: 'FSSAI परवाना क्र.', en: 'FSSAI Licence No.', hi: 'FSSAI लाइसेंस क्र.' } as L3,
  servingAreas: { mr: 'लातूर आणि आसपासच्या परिसरात सेवा', en: 'Serving Latur and nearby areas', hi: 'लातूर और आसपास के क्षेत्रों में सेवा' } as L3,
  skip: { mr: 'मुख्य मजकुराकडे जा', en: 'Skip to content', hi: 'मुख्य सामग्री पर जाएँ' } as L3,
  language: { mr: 'भाषा', en: 'Language', hi: 'भाषा' } as L3,
  langNames: { mr: 'मराठी', en: 'English', hi: 'हिन्दी' } as L3,
  repImage: {
    mr: 'प्रातिनिधिक चित्र (आमच्या पदार्थांचे नाही)',
    en: 'Representative image (not our own dish)',
    hi: 'प्रतिनिधि चित्र (हमारे व्यंजन नहीं)',
  } as L3,
  footerNote: {
    mr: 'लातूरमधील शुद्ध शाकाहारी केटरिंग: लग्न, समारंभ, पार्ट्या आणि धार्मिक कार्यक्रम.',
    en: 'Pure vegetarian catering in Latur for weddings, events, parties and religious functions.',
    hi: 'लातूर में शुद्ध शाकाहारी कैटरिंग: विवाह, समारोह, पार्टियाँ और धार्मिक कार्यक्रम।',
  } as L3,
  credits: { mr: 'श्रेय', en: 'Credits', hi: 'श्रेय' } as L3,
  rights: { mr: 'सर्व हक्क राखीव', en: 'All rights reserved', hi: 'सर्वाधिकार सुरक्षित' } as L3,
};
