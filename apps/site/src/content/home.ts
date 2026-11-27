import type { Lang } from '../data/site';

// DRAFT copy. Marathi and Hindi must be reviewed by a native speaker (the owner's family) before launch.
// Dish names are examples only; the owner must confirm the real menu (docs/open-questions.md).
interface HomeCopy {
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroLead: string;
  orderTitle: string;
  orderLead: string;
  orders: Array<{ icon: string; title: string; body: string; points: string[] }>;
  cuisineTitle: string;
  cuisineNote: string;
  cuisines: Array<{ icon: string; title: string; dishes: string }>;
  occasionTitle: string;
  occasions: string[];
  whyTitle: string;
  why: Array<{ title: string; body: string }>;
  areasTitle: string;
  areasNote: string;
  ctaTitle: string;
  ctaBody: string;
}

export const home: Record<Lang, HomeCopy> = {
  mr: {
    metaTitle: 'भगवती केटरर्स, लातूर: शुद्ध शाकाहारी केटरिंग',
    metaDescription:
      'लातूर आणि आसपास विवाह, समारंभ, पार्टी व पूजेसाठी शुद्ध शाकाहारी केटरिंग. महाराष्ट्रीयन, दाक्षिणात्य व राजस्थानी जेवण. ३० वर्षांहून अधिक अनुभव. FSSAI परवानाधारक.',
    heroTitle: 'तुमच्या प्रत्येक समारंभासाठी शुद्ध शाकाहारी चव',
    heroLead:
      'महाराष्ट्रीयन, दाक्षिणात्य आणि राजस्थानी जेवण: विवाह, समारंभ, पार्ट्या आणि धार्मिक कार्यक्रमांसाठी. ३० वर्षांहून अधिक अनुभव.',
    orderTitle: 'ऑर्डर देण्याच्या दोन सोप्या पद्धती',
    orderLead: 'तुमच्या सोयीप्रमाणे निवडा. कोणती पद्धत योग्य, हे आम्ही आनंदाने सांगू.',
    orders: [
      {
        icon: '/art/thali.svg',
        title: 'सर्व साहित्यासह',
        body: 'मेनू तुम्ही निवडा. साहित्य, स्वयंपाक आणि वाढप आम्ही पाहतो.',
        points: ['साहित्याची खरेदी आमच्याकडून', 'अनुभवी आचाऱ्यांकडून स्वयंपाक', 'पाहुण्यांच्या संख्येनुसार नियोजन'],
      },
      {
        icon: '/art/banana-leaf-meal.svg',
        title: 'आपले साहित्य, आमचा स्वयंपाक',
        body: 'तुम्ही धान्य, तेल, भाजीपाला आणि इतर साहित्य द्या. आम्ही चवदार स्वयंपाक करून देतो.',
        points: ['साहित्य तुमच्या निवडीचे', 'स्वयंपाकासाठी अनुभवी आचारी', 'साहित्याचे प्रमाण आम्ही सांगतो'],
      },
      {
        icon: '/art/diya.svg',
        title: 'घरगुती जेवण ऑर्डरवर',
        body: 'घरच्यासारखे साधे पदार्थ ऑर्डरवर तयार करून मिळतात. तपशीलासाठी संपर्क करा.',
        points: ['आधी ऑर्डर आवश्यक', 'पदार्थांची यादी फोनवर सांगितली जाते'],
      },
    ],
    cuisineTitle: 'आमचे जेवण',
    cuisineNote: 'पदार्थ उदाहरणादाखल. अंतिम मेनू तुमच्या कार्यक्रमानुसार ठरतो.',
    cuisines: [
      { icon: '/art/icon-puran-poli.svg', title: 'महाराष्ट्रीयन', dishes: 'पुरणपोळी, मोदक, मिसळ, भाकरी-पिठलं, मसाले भात, वरण-भात' },
      { icon: '/art/icon-idli.svg', title: 'दाक्षिणात्य', dishes: 'इडली, डोसा, वडा-सांबार, उपमा' },
      { icon: '/art/icon-dal-baati.svg', title: 'राजस्थानी', dishes: 'दाल-बाटी-चुरमा, गट्टे की सब्जी' },
    ],
    occasionTitle: 'कोणत्या प्रसंगांसाठी',
    occasions: ['विवाह', 'साखरपुडा', 'हळद', 'गृहप्रवेश', 'सत्यनारायण पूजा', 'वाढदिवस', 'धार्मिक कार्यक्रम', 'कार्यालयीन कार्यक्रम', 'घरगुती समारंभ'],
    whyTitle: 'आमच्यावर विश्वास का?',
    why: [
      { title: '३० वर्षांहून अधिक अनुभव', body: 'अनेक वर्षांपासून लातूर परिसरातील कुटुंबांच्या आनंदात सहभागी.' },
      { title: '१००% शाकाहारी', body: 'आमचे सर्व पदार्थ शुद्ध शाकाहारी असतात.' },
      { title: 'FSSAI परवानाधारक', body: 'अन्न सुरक्षा व मानक प्राधिकरणाचा परवाना क्रमांक पृष्ठाच्या शेवटी दिला आहे.' },
      { title: 'तुमच्या सोयीची ऑर्डर', body: 'साहित्यासह किंवा तुमच्या साहित्यासह: तुमचा पर्याय.' },
    ],
    areasTitle: 'आमचे सेवा क्षेत्र',
    areasNote: 'लातूर आणि आसपासचा सर्व परिसर.',
    ctaTitle: 'तुमचा कार्यक्रम सांगा',
    ctaBody: 'तारीख आणि पाहुण्यांची संख्या सांगा. आम्ही लवकर संपर्क करू.',
  },
  en: {
    metaTitle: 'Bhagwati Caterers, Latur: Pure Vegetarian Catering',
    metaDescription:
      'Pure vegetarian catering for weddings, events, parties and pujas in Latur and nearby areas. Maharashtrian, South Indian and Rajasthani food. 30+ years of experience. FSSAI licensed.',
    heroTitle: 'Pure vegetarian taste for every celebration',
    heroLead:
      'Maharashtrian, South Indian and Rajasthani food for weddings, events, parties and religious functions. Over 30 years of experience.',
    orderTitle: 'Two easy ways to order',
    orderLead: 'Choose what suits you. We are happy to help you decide.',
    orders: [
      {
        icon: '/art/thali.svg',
        title: 'We bring everything',
        body: 'You choose the menu. We take care of ingredients, cooking and serving.',
        points: ['We buy all the ingredients', 'Cooked by experienced cooks', 'Planned for your guest count'],
      },
      {
        icon: '/art/banana-leaf-meal.svg',
        title: 'You provide ingredients, we cook',
        body: 'You supply grains, oil, vegetables and other items. We cook delicious food for you.',
        points: ['Ingredients of your choice', 'Experienced cooks for the cooking', 'We tell you the quantities needed'],
      },
      {
        icon: '/art/diya.svg',
        title: 'Home-style food on order',
        body: 'Simple home-style dishes prepared on order. Contact us for details.',
        points: ['Order in advance', 'Dish list shared by phone'],
      },
    ],
    cuisineTitle: 'Our food',
    cuisineNote: 'Dishes shown are examples. The final menu is planned for your event.',
    cuisines: [
      { icon: '/art/icon-puran-poli.svg', title: 'Maharashtrian', dishes: 'Puran poli, modak, misal, bhakri with pithla, masale bhat, varan bhat' },
      { icon: '/art/icon-idli.svg', title: 'South Indian', dishes: 'Idli, dosa, vada sambar, upma' },
      { icon: '/art/icon-dal-baati.svg', title: 'Rajasthani', dishes: 'Dal baati churma, gatte ki sabzi' },
    ],
    occasionTitle: 'Occasions we cater',
    occasions: ['Weddings', 'Engagements', 'Haldi', 'Housewarming', 'Satyanarayan puja', 'Birthdays', 'Religious functions', 'Office events', 'Family gatherings'],
    whyTitle: 'Why families trust us',
    why: [
      { title: '30+ years of experience', body: 'Serving families in and around Latur at their happiest moments.' },
      { title: '100% vegetarian', body: 'All our food is pure vegetarian.' },
      { title: 'FSSAI licensed', body: 'Our licence number is shown at the bottom of every page.' },
      { title: 'Flexible ordering', body: 'With our ingredients or yours: your choice.' },
    ],
    areasTitle: 'Where we serve',
    areasNote: 'Latur and all nearby areas.',
    ctaTitle: 'Tell us about your event',
    ctaBody: 'Share the date and number of guests. We will get back to you soon.',
  },
  hi: {
    metaTitle: 'भगवती केटरर्स, लातूर: शुद्ध शाकाहारी कैटरिंग',
    metaDescription:
      'लातूर और आसपास विवाह, समारोह, पार्टी और पूजा के लिए शुद्ध शाकाहारी कैटरिंग। महाराष्ट्रीयन, दक्षिण भारतीय और राजस्थानी भोजन। 30 साल से अधिक का अनुभव। FSSAI लाइसेंस प्राप्त।',
    heroTitle: 'आपके हर समारोह के लिए शुद्ध शाकाहारी स्वाद',
    heroLead:
      'महाराष्ट्रीयन, दक्षिण भारतीय और राजस्थानी भोजन: विवाह, समारोह, पार्टियों और धार्मिक कार्यक्रमों के लिए। 30 साल से अधिक का अनुभव।',
    orderTitle: 'ऑर्डर करने के दो आसान तरीके',
    orderLead: 'अपनी सुविधा के अनुसार चुनें। सही तरीका चुनने में हम खुशी से मदद करेंगे।',
    orders: [
      {
        icon: '/art/thali.svg',
        title: 'सारी सामग्री के साथ',
        body: 'मेन्यू आप चुनें। सामग्री, पकाना और परोसना हम संभालते हैं।',
        points: ['सारी सामग्री की खरीद हमारी ओर से', 'अनुभवी रसोइयों द्वारा भोजन', 'मेहमानों की संख्या के अनुसार योजना'],
      },
      {
        icon: '/art/banana-leaf-meal.svg',
        title: 'आपकी सामग्री, हमारा पकाना',
        body: 'आप अनाज, तेल, सब्जियाँ और अन्य सामग्री दें। हम स्वादिष्ट भोजन बनाकर देते हैं।',
        points: ['सामग्री आपकी पसंद की', 'पकाने के लिए अनुभवी रसोइये', 'कितनी सामग्री चाहिए, यह हम बताते हैं'],
      },
      {
        icon: '/art/diya.svg',
        title: 'घर जैसा भोजन ऑर्डर पर',
        body: 'घर जैसे सादे व्यंजन ऑर्डर पर तैयार किए जाते हैं। जानकारी के लिए संपर्क करें।',
        points: ['पहले से ऑर्डर आवश्यक', 'व्यंजनों की सूची फोन पर बताई जाती है'],
      },
    ],
    cuisineTitle: 'हमारा भोजन',
    cuisineNote: 'व्यंजन उदाहरण के रूप में हैं। अंतिम मेन्यू आपके कार्यक्रम के अनुसार तय होता है।',
    cuisines: [
      { icon: '/art/icon-puran-poli.svg', title: 'महाराष्ट्रीयन', dishes: 'पूरन पोली, मोदक, मिसल, भाकरी-पिठला, मसाले भात, वरण-भात' },
      { icon: '/art/icon-idli.svg', title: 'दक्षिण भारतीय', dishes: 'इडली, डोसा, वड़ा-सांबर, उपमा' },
      { icon: '/art/icon-dal-baati.svg', title: 'राजस्थानी', dishes: 'दाल-बाटी-चूरमा, गट्टे की सब्जी' },
    ],
    occasionTitle: 'किन अवसरों के लिए',
    occasions: ['विवाह', 'सगाई', 'हल्दी', 'गृहप्रवेश', 'सत्यनारायण पूजा', 'जन्मदिन', 'धार्मिक कार्यक्रम', 'कार्यालय के कार्यक्रम', 'पारिवारिक समारोह'],
    whyTitle: 'लोग हम पर भरोसा क्यों करते हैं',
    why: [
      { title: '30 साल से अधिक का अनुभव', body: 'लातूर और आसपास के परिवारों की खुशियों में वर्षों से साथ।' },
      { title: '100% शाकाहारी', body: 'हमारे सभी व्यंजन शुद्ध शाकाहारी होते हैं।' },
      { title: 'FSSAI लाइसेंस प्राप्त', body: 'हमारा लाइसेंस नंबर हर पृष्ठ के नीचे दिया गया है।' },
      { title: 'आपकी सुविधा का ऑर्डर', body: 'हमारी सामग्री के साथ या आपकी सामग्री के साथ: आपका चुनाव।' },
    ],
    areasTitle: 'हमारा सेवा क्षेत्र',
    areasNote: 'लातूर और आसपास के सभी क्षेत्र।',
    ctaTitle: 'अपने कार्यक्रम के बारे में बताएं',
    ctaBody: 'तारीख और मेहमानों की संख्या बताएं। हम जल्द संपर्क करेंगे।',
  },
};
