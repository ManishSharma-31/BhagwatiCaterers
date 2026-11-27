import type { Lang } from '../data/site';

// DRAFT copy. No prices on purpose: the owner has not confirmed them.
interface PackagesCopy {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  typesTitle: string;
  types: Array<{ icon: string; title: string; body: string; points: string[] }>;
  homeNote: string;
  tableTitle: string;
  tableHead: [string, string, string];
  tableRows: Array<[string, string, string]>;
  tableNote: string;
  stepsTitle: string;
  steps: Array<{ title: string; body: string }>;
  needTitle: string;
  needLead: string;
  needs: string[];
  ctaTitle: string;
  ctaBody: string;
}

export const packages: Record<Lang, PackagesCopy> = {
  mr: {
    metaTitle: 'ऑर्डर कसे करावे: दोन पद्धती व पाच पायऱ्या',
    metaDescription:
      'भगवती केटरर्सकडे ऑर्डर देण्याच्या दोन पद्धती: सर्व साहित्यासह, किंवा आपले साहित्य, आमचा स्वयंपाक. ऑर्डर प्रक्रिया आणि आम्हाला लागणारी माहिती.',
    h1: 'ऑर्डर कसे करावे',
    lead: 'ऑर्डर देण्याच्या दोन सोप्या पद्धती आहेत. तुमच्या सोयीची निवडा. कोणती योग्य, हे ठरवायला आम्ही मदत करू.',
    typesTitle: 'दोन ऑर्डर पद्धती',
    types: [
      {
        icon: '/art/thali.svg',
        title: 'सर्व साहित्यासह',
        body: 'तुम्ही मेनू निवडा. साहित्याची खरेदी, स्वयंपाक आणि वाढप आम्ही पाहतो.',
        points: ['साहित्याची खरेदी आमच्याकडून', 'अनुभवी आचाऱ्यांकडून स्वयंपाक', 'पाहुण्यांच्या संख्येनुसार नियोजन'],
      },
      {
        icon: '/art/banana-leaf-meal.svg',
        title: 'आपले साहित्य, आमचा स्वयंपाक',
        body: 'तुम्ही धान्य, तेल, भाजीपाला आणि इतर साहित्य द्या. स्वयंपाक आम्ही करतो.',
        points: ['साहित्य तुमच्या निवडीचे', 'स्वयंपाकासाठी अनुभवी आचारी', 'साहित्याचे प्रमाण आम्ही सांगतो'],
      },
    ],
    homeNote: 'घरगुती जेवण ऑर्डरवर हवे असल्यास तेही मिळते. तपशीलासाठी संपर्क करा.',
    tableTitle: 'दोन्ही पद्धतींची तुलना',
    tableHead: ['', 'सर्व साहित्यासह', 'आपले साहित्य, आमचा स्वयंपाक'],
    tableRows: [
      ['साहित्य कोण आणते', 'भगवती केटरर्स', 'तुम्ही'],
      ['स्वयंपाक कोण करतो', 'भगवती केटरर्स', 'भगवती केटरर्स'],
      ['मेनू ठरवणे', 'तुम्ही व आम्ही मिळून', 'तुम्ही व आम्ही मिळून'],
      ['साहित्याचे प्रमाण', 'आम्ही ठरवतो', 'आम्ही सांगतो'],
      ['दर व अटी', 'कोटेशनसोबत कळवतो', 'कोटेशनसोबत कळवतो'],
    ],
    tableNote: 'दर आणि अटी प्रत्येक कार्यक्रमानुसार ठरतात. त्या आम्ही तुमच्या कोटेशनसोबत कळवतो.',
    stepsTitle: 'ऑर्डर कशी चालते',
    steps: [
      { title: 'संपर्क करा', body: 'फोन, WhatsApp किंवा कोटेशन फॉर्मद्वारे आम्हाला कळवा.' },
      { title: 'मेनू ठरवा', body: 'तुमच्या पसंतीनुसार आणि कार्यक्रमानुसार मेनू ठरवू.' },
      { title: 'कोटेशन मिळवा', body: 'तपशील आणि दर लिखित स्वरूपात कळवू.' },
      { title: 'ऑर्डर निश्चित करा', body: 'कोटेशन पसंत पडल्यावर ऑर्डर पक्की करा.' },
      { title: 'कार्यक्रम', body: 'ठरलेल्या दिवशी जेवणाची तयारी आम्ही पाहतो.' },
    ],
    needTitle: 'आम्हाला काय माहिती हवी',
    needLead: 'कोटेशनसाठी ही माहिती सांगा:',
    needs: ['कार्यक्रमाची तारीख', 'अंदाजे पाहुण्यांची संख्या', 'गाव किंवा शहर', 'मेनूची पसंती (महाराष्ट्रीयन, दाक्षिणात्य, राजस्थानी किंवा मिश्र)', 'ऑर्डरचा प्रकार: सर्व साहित्यासह किंवा आपले साहित्य'],
    ctaTitle: 'चला, सुरू करूया',
    ctaBody: 'तारीख आणि पाहुण्यांची संख्या सांगा. आम्ही लवकर संपर्क करू.',
  },
  en: {
    metaTitle: 'How to Order: Two Order Types and Five Steps',
    metaDescription:
      'Two ways to order from Bhagwati Caterers, Latur: we bring everything, or you provide the ingredients and we cook. How ordering works and what we need from you.',
    h1: 'How to Order',
    lead: 'There are two simple ways to order. Choose what suits you, and we will help you decide which is right.',
    typesTitle: 'The two order types',
    types: [
      {
        icon: '/art/thali.svg',
        title: 'We bring everything',
        body: 'You choose the menu. We take care of the ingredients, the cooking and the serving.',
        points: ['We buy the ingredients', 'Cooking by experienced cooks', 'Planned for your guest count'],
      },
      {
        icon: '/art/banana-leaf-meal.svg',
        title: 'You provide ingredients, we cook',
        body: 'You give the grain, oil, vegetables and other ingredients. We do the cooking.',
        points: ['Ingredients of your choice', 'Experienced cooks for the cooking', 'We tell you how much to arrange'],
      },
    ],
    homeNote: 'Home-style food on order is also available. Contact us for details.',
    tableTitle: 'The two types side by side',
    tableHead: ['', 'We bring everything', 'You provide ingredients, we cook'],
    tableRows: [
      ['Who brings the ingredients', 'Bhagwati Caterers', 'You'],
      ['Who cooks', 'Bhagwati Caterers', 'Bhagwati Caterers'],
      ['Planning the menu', 'You and us together', 'You and us together'],
      ['Quantity of ingredients', 'We decide', 'We tell you'],
      ['Rates and terms', 'Shared with your quote', 'Shared with your quote'],
    ],
    tableNote: 'Rates and terms depend on the event. We share them with your quote.',
    stepsTitle: 'How it works',
    steps: [
      { title: 'Contact us', body: 'Reach us by phone, WhatsApp or the quote form.' },
      { title: 'Plan the menu', body: 'We plan the menu around your event and your preferences.' },
      { title: 'Get a quote', body: 'We send the details and rates in writing.' },
      { title: 'Confirm the order', body: 'If the quote suits you, confirm the order.' },
      { title: 'The event', body: 'On the day, we take care of the food.' },
    ],
    needTitle: 'What we need from you',
    needLead: 'To prepare a quote, please tell us:',
    needs: ['Date of the event', 'Approximate number of guests', 'Town or city', 'Menu preference (Maharashtrian, South Indian, Rajasthani or a mix)', 'Order type: we bring everything, or you provide the ingredients'],
    ctaTitle: 'Let us get started',
    ctaBody: 'Share the date and the number of guests. We will get back to you soon.',
  },
  hi: {
    metaTitle: 'ऑर्डर कैसे करें: दो तरीके और पाँच चरण',
    metaDescription:
      'भगवती कैटरर्स, लातूर में ऑर्डर के दो तरीके: सारी सामग्री हमारी, या सामग्री आपकी और खाना हमारा। ऑर्डर कैसे होता है और हमें क्या जानकारी चाहिए।',
    h1: 'ऑर्डर कैसे करें',
    lead: 'ऑर्डर देने के दो आसान तरीके हैं। अपनी सुविधा के अनुसार चुनें। कौन-सा ठीक रहेगा, यह तय करने में हम मदद करेंगे।',
    typesTitle: 'ऑर्डर के दो तरीके',
    types: [
      {
        icon: '/art/thali.svg',
        title: 'सारी सामग्री के साथ',
        body: 'मेन्यू आप चुनें। सामग्री की खरीद, खाना पकाना और परोसना हम सँभालते हैं।',
        points: ['सामग्री की खरीद हमारी ओर से', 'अनुभवी रसोइयों द्वारा खाना', 'मेहमानों की संख्या के अनुसार योजना'],
      },
      {
        icon: '/art/banana-leaf-meal.svg',
        title: 'आपकी सामग्री, हमारा खाना पकाना',
        body: 'अनाज, तेल, सब्ज़ियाँ और अन्य सामग्री आप दें। खाना हम पकाते हैं।',
        points: ['सामग्री आपकी पसंद की', 'खाना पकाने के लिए अनुभवी रसोइये', 'कितनी सामग्री चाहिए, यह हम बताते हैं'],
      },
    ],
    homeNote: 'ऑर्डर पर घरेलू भोजन भी मिलता है। जानकारी के लिए संपर्क करें।',
    tableTitle: 'दोनों तरीकों की तुलना',
    tableHead: ['', 'सारी सामग्री के साथ', 'आपकी सामग्री, हमारा खाना पकाना'],
    tableRows: [
      ['सामग्री कौन लाता है', 'भगवती कैटरर्स', 'आप'],
      ['खाना कौन पकाता है', 'भगवती कैटरर्स', 'भगवती कैटरर्स'],
      ['मेन्यू तय करना', 'आप और हम मिलकर', 'आप और हम मिलकर'],
      ['सामग्री की मात्रा', 'हम तय करते हैं', 'हम बताते हैं'],
      ['दर और शर्तें', 'कोटेशन के साथ बताते हैं', 'कोटेशन के साथ बताते हैं'],
    ],
    tableNote: 'दर और शर्तें हर आयोजन के अनुसार तय होती हैं। उन्हें हम आपके कोटेशन के साथ बताते हैं।',
    stepsTitle: 'ऑर्डर कैसे चलता है',
    steps: [
      { title: 'संपर्क करें', body: 'फ़ोन, WhatsApp या कोटेशन फ़ॉर्म से हमें बताएँ।' },
      { title: 'मेन्यू तय करें', body: 'आपके आयोजन और पसंद के अनुसार मेन्यू तय करेंगे।' },
      { title: 'कोटेशन पाएँ', body: 'विवरण और दर लिखित रूप में बताएँगे।' },
      { title: 'ऑर्डर पक्का करें', body: 'कोटेशन पसंद आने पर ऑर्डर पक्का करें।' },
      { title: 'आयोजन', body: 'तय दिन पर भोजन की व्यवस्था हम सँभालते हैं।' },
    ],
    needTitle: 'हमें क्या जानकारी चाहिए',
    needLead: 'कोटेशन के लिए ये बातें बताएँ:',
    needs: ['आयोजन की तारीख', 'मेहमानों की अनुमानित संख्या', 'गाँव या शहर', 'मेन्यू की पसंद (महाराष्ट्रीयन, दक्षिण भारतीय, राजस्थानी या मिला-जुला)', 'ऑर्डर का प्रकार: सारी सामग्री हमारी, या सामग्री आपकी'],
    ctaTitle: 'शुरू करें',
    ctaBody: 'तारीख और मेहमानों की संख्या बताएँ। हम जल्द संपर्क करेंगे।',
  },
};
