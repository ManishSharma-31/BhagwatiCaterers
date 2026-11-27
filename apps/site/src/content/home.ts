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
    metaTitle: 'भगवती केटरर्स लातूर: शुद्ध शाकाहारी केटरिंग, लग्नाचे जेवण',
    metaDescription:
      'लातूर, औसा, निलंगा, रेणापूर, तुळजापूर, अंबाजोगाई येथे लग्न, समारंभ व पूजेसाठी शुद्ध शाकाहारी केटरिंग. ३०+ वर्षांचा अनुभव. FSSAI प्रमाणित. फोन करा.',
    heroTitle: 'लातूरमधील शुद्ध शाकाहारी केटरिंग: लग्न, समारंभ आणि पूजेसाठी',
    heroLead:
      'भगवती केटरर्स: ३० वर्षांहून अधिक अनुभव. महाराष्ट्रीयन, दाक्षिणात्य, राजस्थानी, गुजराती, बंगाली व इंडो-चायनीज शाकाहारी जेवण, लातूर आणि आसपासच्या परिसरात.',
    orderTitle: 'ऑर्डर कशी द्यायची? दोन सोप्या पद्धती',
    orderLead: 'तुमच्या सोयीची पद्धत निवडा. कोणती योग्य आहे ते ठरवायला आम्ही मदत करू.',
    orders: [
      {
        icon: '/art/thali.svg',
        title: 'सर्व साहित्य आमचे',
        body: 'मेनू तुम्ही निवडा. साहित्याची खरेदी आणि स्वयंपाक आमच्याकडे. वाढपाची व्यवस्था कार्यक्रमानुसार बोलून ठरवू.',
        points: ['साहित्याची खरेदी आमच्याकडून', 'अनुभवी आचाऱ्यांकडून स्वयंपाक', 'पाहुण्यांच्या संख्येनुसार तयारी'],
      },
      {
        icon: '/art/banana-leaf-meal.svg',
        title: 'साहित्य तुमचे, स्वयंपाक आमचा',
        body: 'धान्य, तेल, भाजीपाला असे साहित्य तुम्ही द्या. स्वयंपाक आम्ही करून देतो.',
        points: ['साहित्य तुमच्या पसंतीचे', 'स्वयंपाकासाठी अनुभवी आचारी', 'किती साहित्य लागेल ते आम्ही सांगतो'],
      },
      {
        icon: '/art/diya.svg',
        title: 'घरगुती जेवण, ऑर्डरवर',
        body: 'घरच्यासारखे साधे पदार्थ ऑर्डरवर बनवून मिळतात. काय मिळेल ते फोनवर विचारा.',
        points: ['आधी ऑर्डर द्यावी लागते', 'पदार्थांची यादी फोनवर सांगतो'],
      },
    ],
    cuisineTitle: 'आमचे जेवण: तीन प्रकार',
    cuisineNote: 'हे पदार्थ उदाहरणादाखल आहेत. अंतिम मेनू तुमच्या कार्यक्रमानुसार ठरतो.',
    cuisines: [
      { icon: '/art/icon-puran-poli.svg', title: 'महाराष्ट्रीयन', dishes: 'पुरणपोळी, मोदक, मिसळ, भाकरी-पिठलं, मसाले भात, वरण-भात' },
      { icon: '/art/icon-idli.svg', title: 'दाक्षिणात्य', dishes: 'इडली, डोसा, वडा-सांबार, उपमा' },
      { icon: '/art/icon-dal-baati.svg', title: 'राजस्थानी', dishes: 'दाल-बाटी-चुरमा, गट्टे की सब्जी' },
    ],
    occasionTitle: 'कोणत्या कार्यक्रमांसाठी?',
    occasions: ['लग्न', 'साखरपुडा', 'हळद', 'गृहप्रवेश', 'सत्यनारायण पूजा', 'वाढदिवस', 'धार्मिक कार्यक्रम', 'ऑफिस व संस्थेचे कार्यक्रम', 'घरगुती समारंभ'],
    whyTitle: 'आमच्यावर विश्वास का ठेवावा?',
    why: [
      { title: '३० वर्षांहून अधिक अनुभव', body: 'अनेक वर्षांपासून लातूर परिसरातील कुटुंबांच्या समारंभात जेवणाची सेवा.' },
      { title: '१००% शुद्ध शाकाहारी', body: 'आमचे सर्व पदार्थ शुद्ध शाकाहारी आहेत.' },
      { title: 'FSSAI प्रमाणित', body: 'आमचा FSSAI परवाना क्रमांक प्रत्येक पृष्ठाच्या शेवटी दिला आहे.' },
      { title: 'तुमच्या सोयीची ऑर्डर', body: 'सर्व साहित्य आमचे, किंवा साहित्य तुमचे आणि स्वयंपाक आमचा: तुम्ही ठरवा.' },
    ],
    areasTitle: 'लातूर आणि आसपास आमची सेवा',
    areasNote: 'लातूर, औसा, निलंगा, रेणापूर, तुळजापूर, अंबाजोगाई आणि जवळचा परिसर. तुमचे गाव यादीत नसेल तर विचारा.',
    ctaTitle: 'तुमच्या कार्यक्रमाची तारीख सांगा',
    ctaBody: 'तारीख, गाव आणि पाहुण्यांची अंदाजे संख्या सांगा. मेनू व कोटेशनबद्दल आम्ही तुमच्याशी बोलू.',
  },
  en: {
    metaTitle: 'Bhagwati Caterers Latur | Pure Veg Catering for Weddings',
    metaDescription:
      'Pure vegetarian caterers in Latur for weddings, events, parties and pujas. Maharashtrian, South Indian, Rajasthani and more food. 30+ years. FSSAI Certified.',
    heroTitle: 'Pure vegetarian catering in Latur for weddings, events and pujas',
    heroLead:
      'Bhagwati Caterers: 30+ years of experience. Maharashtrian, South Indian, Rajasthani, Gujarati, Bengali and Indo-Chinese vegetarian food in Latur and nearby areas.',
    orderTitle: 'How to order: two simple ways',
    orderLead: 'Pick the way that suits you. We are happy to help you decide.',
    orders: [
      {
        icon: '/art/thali.svg',
        title: 'We bring everything',
        body: 'You choose the menu. We take care of the ingredients and the cooking. Serving arrangements are agreed with you for your event.',
        points: ['We buy all the ingredients', 'Cooked by experienced cooks', 'Planned for your guest count'],
      },
      {
        icon: '/art/banana-leaf-meal.svg',
        title: 'You provide ingredients, we cook',
        body: 'You supply grains, oil, vegetables and other items. We do the cooking for you.',
        points: ['Ingredients of your choice', 'Experienced cooks for the cooking', 'We tell you how much you need'],
      },
      {
        icon: '/art/diya.svg',
        title: 'Home-style food on order',
        body: 'Simple home-style dishes prepared on order. Call us to ask what is available.',
        points: ['Order in advance', 'Dish list shared by phone'],
      },
    ],
    cuisineTitle: 'Our food: three cuisines',
    cuisineNote: 'These dishes are examples. The final menu is planned for your event.',
    cuisines: [
      { icon: '/art/icon-puran-poli.svg', title: 'Maharashtrian', dishes: 'Puran poli, modak, misal, bhakri with pithla, masale bhat, varan bhat' },
      { icon: '/art/icon-idli.svg', title: 'South Indian', dishes: 'Idli, dosa, vada sambar, upma' },
      { icon: '/art/icon-dal-baati.svg', title: 'Rajasthani', dishes: 'Dal baati churma, gatte ki sabzi' },
    ],
    occasionTitle: 'Occasions we cater',
    occasions: ['Weddings', 'Engagements', 'Haldi', 'Housewarming', 'Satyanarayan puja', 'Birthdays', 'Religious functions', 'Office and institution events', 'Family gatherings'],
    whyTitle: 'Why families trust us',
    why: [
      { title: '30+ years of experience', body: 'Serving food at family celebrations in and around Latur for many years.' },
      { title: '100% pure vegetarian', body: 'All our food is pure vegetarian.' },
      { title: 'FSSAI Certified', body: 'Our FSSAI licence number is shown at the bottom of every page.' },
      { title: 'Flexible ordering', body: 'We bring everything, or you give the ingredients and we cook: you decide.' },
    ],
    areasTitle: 'Serving Latur and nearby areas',
    areasNote: 'Latur, Ausa, Nilanga, Renapur, Tuljapur, Ambajogai and nearby places. If your town is not listed, please ask.',
    ctaTitle: 'Tell us the date of your event',
    ctaBody: 'Share the date, the town and the approximate number of guests. We will talk to you about the menu and the quote.',
  },
  hi: {
    metaTitle: 'भगवती केटरर्स लातूर: शुद्ध शाकाहारी कैटरिंग, शादी भोजन',
    metaDescription:
      'लातूर, औसा, निलंगा, रेणापुर, तुलजापुर, अम्बाजोगाई में शादी, समारोह और पूजा के लिए शुद्ध शाकाहारी कैटरिंग। 30+ साल का अनुभव। FSSAI प्रमाणित। फ़ोन करें।',
    heroTitle: 'लातूर में शुद्ध शाकाहारी कैटरिंग: शादी, समारोह और पूजा के लिए',
    heroLead:
      'भगवती केटरर्स: 30 साल से अधिक का अनुभव। महाराष्ट्रीयन, दक्षिण भारतीय, राजस्थानी, गुजराती, बंगाली और इंडो-चायनीज शाकाहारी भोजन, लातूर और आसपास के क्षेत्रों में।',
    orderTitle: 'ऑर्डर कैसे दें? दो आसान तरीके',
    orderLead: 'अपनी सुविधा का तरीका चुनें। कौन-सा ठीक रहेगा, यह तय करने में हम मदद करेंगे।',
    orders: [
      {
        icon: '/art/thali.svg',
        title: 'सारी सामग्री हमारी',
        body: 'मेन्यू आप चुनें। सामग्री की खरीद और खाना पकाना हमारे ज़िम्मे। परोसने की व्यवस्था आयोजन के अनुसार बात करके तय करेंगे।',
        points: ['सामग्री की खरीद हमारी ओर से', 'अनुभवी रसोइयों द्वारा भोजन', 'मेहमानों की संख्या के अनुसार तैयारी'],
      },
      {
        icon: '/art/banana-leaf-meal.svg',
        title: 'सामग्री आपकी, खाना हमारा',
        body: 'अनाज, तेल, सब्ज़ियाँ जैसी सामग्री आप दें। खाना हम पकाकर देते हैं।',
        points: ['सामग्री आपकी पसंद की', 'पकाने के लिए अनुभवी रसोइये', 'कितनी सामग्री लगेगी, यह हम बताते हैं'],
      },
      {
        icon: '/art/diya.svg',
        title: 'घर जैसा भोजन, ऑर्डर पर',
        body: 'घर जैसे सादे व्यंजन ऑर्डर पर बनाकर मिलते हैं। क्या मिलेगा, यह फ़ोन पर पूछें।',
        points: ['पहले से ऑर्डर देना होता है', 'व्यंजनों की सूची फ़ोन पर बताते हैं'],
      },
    ],
    cuisineTitle: 'हमारा भोजन: तीन प्रकार',
    cuisineNote: 'ये व्यंजन उदाहरण के रूप में हैं। अंतिम मेन्यू आपके आयोजन के अनुसार तय होता है।',
    cuisines: [
      { icon: '/art/icon-puran-poli.svg', title: 'महाराष्ट्रीयन', dishes: 'पूरन पोली, मोदक, मिसल, भाकरी-पिठला, मसाले भात, वरण-भात' },
      { icon: '/art/icon-idli.svg', title: 'दक्षिण भारतीय', dishes: 'इडली, डोसा, वड़ा-सांबर, उपमा' },
      { icon: '/art/icon-dal-baati.svg', title: 'राजस्थानी', dishes: 'दाल-बाटी-चूरमा, गट्टे की सब्ज़ी' },
    ],
    occasionTitle: 'किन आयोजनों के लिए?',
    occasions: ['विवाह', 'सगाई', 'हल्दी', 'गृहप्रवेश', 'सत्यनारायण पूजा', 'जन्मदिन', 'धार्मिक कार्यक्रम', 'ऑफिस और संस्था के कार्यक्रम', 'पारिवारिक समारोह'],
    whyTitle: 'परिवार हम पर भरोसा क्यों करते हैं',
    why: [
      { title: '30 साल से अधिक का अनुभव', body: 'कई वर्षों से लातूर और आसपास के परिवारों के समारोहों में भोजन की सेवा।' },
      { title: '100% शुद्ध शाकाहारी', body: 'हमारा सारा भोजन शुद्ध शाकाहारी है।' },
      { title: 'FSSAI प्रमाणित', body: 'हमारा FSSAI लाइसेंस नंबर हर पृष्ठ के नीचे दिया गया है।' },
      { title: 'आपकी सुविधा का ऑर्डर', body: 'सारी सामग्री हमारी, या सामग्री आपकी और खाना हमारा: आप तय करें।' },
    ],
    areasTitle: 'लातूर और आसपास हमारी सेवा',
    areasNote: 'लातूर, औसा, निलंगा, रेणापुर, तुलजापुर, अम्बाजोगाई और आसपास के क्षेत्र। आपका गाँव सूची में न हो तो पूछें।',
    ctaTitle: 'अपने आयोजन की तारीख बताएँ',
    ctaBody: 'तारीख, गाँव और मेहमानों की अनुमानित संख्या बताएँ। मेन्यू और कोटेशन के बारे में हम आपसे बात करेंगे।',
  },
};
