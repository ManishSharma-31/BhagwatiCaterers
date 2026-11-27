import type { Lang } from '../data/site';

// DRAFT copy. Dish names are examples only; the owner has not confirmed the menu.
interface MenuCopy {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  exampleNote: string;
  cuisines: Array<{ icon: string; title: string; intro: string; dishes: string[] }>;
  prefTitle: string;
  prefBody: string;
  prefs: string[];
  plannedTitle: string;
  plannedBody: string;
  ctaTitle: string;
  ctaBody: string;
}

export const menu: Record<Lang, MenuCopy> = {
  mr: {
    metaTitle: 'मेनू: महाराष्ट्रीयन, दाक्षिणात्य व राजस्थानी शाकाहारी जेवण',
    metaDescription:
      'भगवती केटरर्सचा शुद्ध शाकाहारी मेनू: पुरणपोळी, मिसळ, इडली, डोसा, दाल-बाटी-चुरमा यांसारखे पदार्थ (उदाहरणादाखल). अंतिम मेनू कार्यक्रमानुसार ठरतो.',
    h1: 'आमचा मेनू',
    lead: 'महाराष्ट्रीयन, दाक्षिणात्य आणि राजस्थानी: तिन्ही प्रकारचे शुद्ध शाकाहारी जेवण.',
    exampleNote: 'खालील पदार्थ उदाहरणादाखल आहेत. तुमच्या कार्यक्रमासाठी कोणते पदार्थ करता येतील, हे आम्ही संपर्कात सांगतो.',
    cuisines: [
      { icon: '/art/icon-puran-poli.svg', title: 'महाराष्ट्रीयन', intro: 'पारंपरिक महाराष्ट्रीयन जेवण, गोड व तिखट दोन्ही.', dishes: ['पुरणपोळी', 'मोदक', 'मिसळ', 'भाकरी-पिठलं', 'मसाले भात', 'वरण-भात', 'श्रीखंड', 'जिलेबी'] },
      { icon: '/art/icon-idli.svg', title: 'दाक्षिणात्य', intro: 'दक्षिण भारतीय न्याहारी व जेवणाचे पदार्थ.', dishes: ['इडली', 'डोसा', 'वडा-सांबार', 'उपमा'] },
      { icon: '/art/icon-dal-baati.svg', title: 'राजस्थानी', intro: 'राजस्थानी पद्धतीचे पारंपरिक पदार्थ.', dishes: ['दाल-बाटी-चुरमा', 'गट्टे की सब्जी'] },
    ],
    prefTitle: 'तुमची आवड आम्हाला सांगा',
    prefBody: 'कार्यक्रमासाठी काही खास गरज असेल तर कोटेशन मागताना आधी सांगा. उदाहरणार्थ:',
    prefs: ['उपवासाचे पदार्थ', 'तिखट कमी किंवा जास्त', 'गोडाचे पदार्थ', 'तीनपैकी एक किंवा मिश्र मेनू'],
    plannedTitle: 'अंतिम मेनू कार्यक्रमानुसार',
    plannedBody: 'प्रत्येक कार्यक्रमाचा मेनू त्या कार्यक्रमासाठी वेगळा ठरवला जातो. कोणते पदार्थ शक्य आहेत हे आम्ही तुमच्याशी बोलून निश्चित करतो.',
    ctaTitle: 'तुमचा मेनू ठरवूया',
    ctaBody: 'कार्यक्रम, तारीख व पाहुण्यांची संख्या सांगा. मेनू व कोटेशन आम्ही सोबत ठरवू.',
  },
  en: {
    metaTitle: 'Menu: Maharashtrian, South Indian and Rajasthani Vegetarian Food',
    metaDescription:
      'Pure vegetarian menu by Bhagwati Caterers, Latur: dishes such as puran poli, misal, idli, dosa and dal baati churma (examples). The final menu is planned for each event.',
    h1: 'Our Menu',
    lead: 'Maharashtrian, South Indian and Rajasthani: pure vegetarian food in all three styles.',
    exampleNote: 'The dishes below are examples. We tell you which dishes we can prepare for your event when we speak with you.',
    cuisines: [
      { icon: '/art/icon-puran-poli.svg', title: 'Maharashtrian', intro: 'Traditional Maharashtrian food, sweet and savoury.', dishes: ['Puran poli', 'Modak', 'Misal', 'Bhakri with pithla', 'Masale bhat', 'Varan bhat', 'Shrikhand', 'Jilebi'] },
      { icon: '/art/icon-idli.svg', title: 'South Indian', intro: 'South Indian breakfast and meal dishes.', dishes: ['Idli', 'Dosa', 'Vada sambar', 'Upma'] },
      { icon: '/art/icon-dal-baati.svg', title: 'Rajasthani', intro: 'Traditional Rajasthani-style dishes.', dishes: ['Dal baati churma', 'Gatte ki sabzi'] },
    ],
    prefTitle: 'Tell us what you prefer',
    prefBody: 'If you have any special need for your event, tell us when you ask for a quote. For example:',
    prefs: ['Fasting (upvas) dishes', 'Less or more spicy food', 'Sweets', 'One cuisine or a mix of the three'],
    plannedTitle: 'The final menu is planned per event',
    plannedBody: 'We plan the menu separately for each event. We confirm which dishes are possible after speaking with you.',
    ctaTitle: 'Let us plan your menu',
    ctaBody: 'Tell us the event, the date and the number of guests. We will plan the menu and quote together.',
  },
  hi: {
    metaTitle: 'मेन्यू: महाराष्ट्रीयन, दक्षिण भारतीय और राजस्थानी शाकाहारी भोजन',
    metaDescription:
      'भगवती कैटरर्स, लातूर का शुद्ध शाकाहारी मेन्यू: पूरन पोली, मिसल, इडली, डोसा, दाल-बाटी-चूरमा जैसे व्यंजन (उदाहरण)। अंतिम मेन्यू हर आयोजन के अनुसार तय होता है।',
    h1: 'हमारा मेन्यू',
    lead: 'महाराष्ट्रीयन, दक्षिण भारतीय और राजस्थानी: तीनों प्रकार का शुद्ध शाकाहारी भोजन।',
    exampleNote: 'नीचे दिए व्यंजन उदाहरण हैं। आपके आयोजन के लिए कौन-से व्यंजन बन सकते हैं, यह बातचीत में बताया जाता है।',
    cuisines: [
      { icon: '/art/icon-puran-poli.svg', title: 'महाराष्ट्रीयन', intro: 'पारंपरिक महाराष्ट्रीयन भोजन, मीठा और नमकीन दोनों।', dishes: ['पूरन पोली', 'मोदक', 'मिसल', 'भाकरी-पिठला', 'मसाले भात', 'वरण-भात', 'श्रीखंड', 'जलेबी'] },
      { icon: '/art/icon-idli.svg', title: 'दक्षिण भारतीय', intro: 'दक्षिण भारत के नाश्ते और भोजन के व्यंजन।', dishes: ['इडली', 'डोसा', 'वड़ा-सांभर', 'उपमा'] },
      { icon: '/art/icon-dal-baati.svg', title: 'राजस्थानी', intro: 'राजस्थानी शैली के पारंपरिक व्यंजन।', dishes: ['दाल-बाटी-चूरमा', 'गट्टे की सब्जी'] },
    ],
    prefTitle: 'अपनी पसंद हमें बताएँ',
    prefBody: 'आयोजन के लिए कोई खास ज़रूरत हो तो कोटेशन माँगते समय पहले बताएँ। उदाहरण:',
    prefs: ['व्रत (उपवास) के व्यंजन', 'कम या ज़्यादा तीखा', 'मिठाइयाँ', 'तीन में से एक या मिला-जुला मेन्यू'],
    plannedTitle: 'अंतिम मेन्यू हर आयोजन के अनुसार',
    plannedBody: 'हर आयोजन का मेन्यू अलग से तय किया जाता है। कौन-से व्यंजन संभव हैं, यह हम आपसे बात करके पक्का करते हैं।',
    ctaTitle: 'आपका मेन्यू तय करें',
    ctaBody: 'आयोजन, तारीख और मेहमानों की संख्या बताएँ। मेन्यू और कोटेशन हम साथ तय करेंगे।',
  },
};
