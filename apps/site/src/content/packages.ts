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
    metaTitle: 'केटरिंग ऑर्डर कशी द्यावी: दोन पद्धती',
    metaDescription:
      'भगवती केटरर्स, लातूर कडे ऑर्डर देण्याच्या दोन पद्धती: सर्व साहित्य आमचे, किंवा साहित्य तुमचे आणि स्वयंपाक आमचा. कोटेशन कसे मिळते, ते पाहा.',
    h1: 'केटरिंग ऑर्डर कशी द्यावी',
    lead: 'ऑर्डर देण्याच्या दोन सोप्या पद्धती आहेत: साहित्यासह किंवा तुमच्या साहित्यासह. तुमच्या सोयीची निवडा. कोणती योग्य ते ठरवायला आम्ही मदत करू.',
    typesTitle: 'दोन ऑर्डर पद्धती',
    types: [
      {
        icon: '/art/thali.svg',
        title: 'सर्व साहित्य आमचे',
        body: 'तुम्ही मेनू निवडा. साहित्याची खरेदी आणि स्वयंपाक आमच्याकडे. वाढपाची व्यवस्था कार्यक्रमानुसार बोलून ठरवू.',
        points: ['साहित्याची खरेदी आमच्याकडून', 'अनुभवी आचाऱ्यांकडून स्वयंपाक', 'पाहुण्यांच्या संख्येनुसार तयारी'],
      },
      {
        icon: '/art/banana-leaf-meal.svg',
        title: 'साहित्य तुमचे, स्वयंपाक आमचा',
        body: 'धान्य, तेल, भाजीपाला असे साहित्य तुम्ही द्या. स्वयंपाक आम्ही करतो.',
        points: ['साहित्य तुमच्या पसंतीचे', 'स्वयंपाकासाठी अनुभवी आचारी', 'किती साहित्य लागेल ते आम्ही सांगतो'],
      },
    ],
    homeNote: 'घरगुती जेवण ऑर्डरवर हवे असेल तेही मिळते. काय मिळेल ते फोनवर विचारा.',
    tableTitle: 'दोन्ही पद्धतींची तुलना',
    tableHead: ['', 'सर्व साहित्य आमचे', 'साहित्य तुमचे, स्वयंपाक आमचा'],
    tableRows: [
      ['साहित्य कोण आणते', 'भगवती केटरर्स', 'तुम्ही'],
      ['स्वयंपाक कोण करतो', 'भगवती केटरर्स', 'भगवती केटरर्स'],
      ['मेनू ठरवणे', 'तुम्ही आणि आम्ही मिळून', 'तुम्ही आणि आम्ही मिळून'],
      ['साहित्याचे प्रमाण', 'आम्ही ठरवतो', 'आम्ही सांगतो'],
      ['दर व अटी', 'कोटेशनसोबत कळवतो', 'कोटेशनसोबत कळवतो'],
    ],
    tableNote: 'दर आणि अटी प्रत्येक कार्यक्रमानुसार ठरतात. त्या आम्ही कोटेशनसोबत कळवतो.',
    stepsTitle: 'ऑर्डर कशी चालते',
    steps: [
      { title: 'संपर्क करा', body: 'फोन, WhatsApp किंवा कोटेशन फॉर्मद्वारे आम्हाला कळवा.' },
      { title: 'मेनू ठरवा', body: 'तुमच्या पसंतीनुसार आणि कार्यक्रमानुसार मेनू ठरवू.' },
      { title: 'कोटेशन घ्या', body: 'तपशील आणि दर लिखित स्वरूपात कळवू.' },
      { title: 'ऑर्डर पक्की करा', body: 'कोटेशन पसंत पडले तर ऑर्डर पक्की करा.' },
      { title: 'कार्यक्रमाचा दिवस', body: 'ठरलेल्या दिवशी जेवणाची जबाबदारी आम्ही सांभाळतो.' },
    ],
    needTitle: 'कोटेशनसाठी आम्हाला काय माहिती हवी',
    needLead: 'कोटेशनसाठी ही माहिती सांगा:',
    needs: ['कार्यक्रमाची तारीख', 'पाहुण्यांची अंदाजे संख्या', 'गाव किंवा शहर', 'मेनूची पसंती (महाराष्ट्रीयन, दाक्षिणात्य, राजस्थानी किंवा मिश्र)', 'ऑर्डरचा प्रकार: सर्व साहित्य आमचे, किंवा साहित्य तुमचे', 'काही खास गरज (उदा. जैन, उपवास, कांदा-लसूण नको)'],
    ctaTitle: 'चला, सुरू करूया',
    ctaBody: 'तारीख आणि पाहुण्यांची संख्या सांगा. आम्ही तुमच्याशी संपर्क करू.',
  },
  en: {
    metaTitle: 'How to Order Catering in Latur',
    metaDescription:
      'Two ways to order from Bhagwati Caterers, Latur: we bring everything, or you provide the ingredients and we cook. See how a quote works.',
    h1: 'How to Order Catering',
    lead: 'There are two simple ways to order: with our ingredients or with yours. Choose what suits you, and we will help you decide which is right.',
    typesTitle: 'The two order types',
    types: [
      {
        icon: '/art/thali.svg',
        title: 'We bring everything',
        body: 'You choose the menu. We take care of the ingredients and the cooking. Serving arrangements are agreed with you for your event.',
        points: ['We buy the ingredients', 'Cooking by experienced cooks', 'Planned for your guest count'],
      },
      {
        icon: '/art/banana-leaf-meal.svg',
        title: 'You provide ingredients, we cook',
        body: 'You give the grain, oil, vegetables and other ingredients. We do the cooking.',
        points: ['Ingredients of your choice', 'Experienced cooks for the cooking', 'We tell you how much to arrange'],
      },
    ],
    homeNote: 'Home-style food on order is also available. Call us to ask what we can make.',
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
      { title: 'Event day', body: 'On the day, we take care of the food.' },
    ],
    needTitle: 'What we need to prepare your quote',
    needLead: 'To prepare a quote, please tell us:',
    needs: ['Date of the event', 'Approximate number of guests', 'Town or city', 'Menu preference (Maharashtrian, South Indian, Rajasthani or a mix)', 'Order type: we bring everything, or you provide the ingredients', 'Any special need (for example Jain, fasting, no onion or garlic)'],
    ctaTitle: 'Let us get started',
    ctaBody: 'Share the date and the number of guests. We will get in touch with you.',
  },
  hi: {
    metaTitle: 'कैटरिंग ऑर्डर कैसे करें, लातूर',
    metaDescription:
      'भगवती केटरर्स, लातूर में ऑर्डर के दो तरीके: सारी सामग्री हमारी, या सामग्री आपकी और खाना हमारा। जानें कोटेशन कैसे मिलता है।',
    h1: 'कैटरिंग ऑर्डर कैसे करें',
    lead: 'ऑर्डर देने के दो आसान तरीके हैं: हमारी सामग्री के साथ या आपकी सामग्री के साथ। अपनी सुविधा के अनुसार चुनें। कौन-सा ठीक रहेगा, यह तय करने में हम मदद करेंगे।',
    typesTitle: 'ऑर्डर के दो तरीके',
    types: [
      {
        icon: '/art/thali.svg',
        title: 'सारी सामग्री हमारी',
        body: 'मेन्यू आप चुनें। सामग्री की खरीद और खाना पकाना हमारे ज़िम्मे। परोसने की व्यवस्था आयोजन के अनुसार बात करके तय करेंगे।',
        points: ['सामग्री की खरीद हमारी ओर से', 'अनुभवी रसोइयों द्वारा खाना', 'मेहमानों की संख्या के अनुसार तैयारी'],
      },
      {
        icon: '/art/banana-leaf-meal.svg',
        title: 'सामग्री आपकी, खाना हमारा',
        body: 'अनाज, तेल, सब्ज़ियाँ और अन्य सामग्री आप दें। खाना हम पकाते हैं।',
        points: ['सामग्री आपकी पसंद की', 'खाना पकाने के लिए अनुभवी रसोइये', 'कितनी सामग्री चाहिए, यह हम बताते हैं'],
      },
    ],
    homeNote: 'ऑर्डर पर घर जैसा भोजन भी मिलता है। क्या मिलेगा, यह फ़ोन पर पूछें।',
    tableTitle: 'दोनों तरीकों की तुलना',
    tableHead: ['', 'सारी सामग्री हमारी', 'सामग्री आपकी, खाना हमारा'],
    tableRows: [
      ['सामग्री कौन लाता है', 'भगवती केटरर्स', 'आप'],
      ['खाना कौन पकाता है', 'भगवती केटरर्स', 'भगवती केटरर्स'],
      ['मेन्यू तय करना', 'आप और हम मिलकर', 'आप और हम मिलकर'],
      ['सामग्री की मात्रा', 'हम तय करते हैं', 'हम बताते हैं'],
      ['दर और शर्तें', 'कोटेशन के साथ बताते हैं', 'कोटेशन के साथ बताते हैं'],
    ],
    tableNote: 'दर और शर्तें हर आयोजन के अनुसार तय होती हैं। उन्हें हम कोटेशन के साथ बताते हैं।',
    stepsTitle: 'ऑर्डर कैसे चलता है',
    steps: [
      { title: 'संपर्क करें', body: 'फ़ोन, WhatsApp या कोटेशन फ़ॉर्म से हमें बताएँ।' },
      { title: 'मेन्यू तय करें', body: 'आपके आयोजन और पसंद के अनुसार मेन्यू तय करेंगे।' },
      { title: 'कोटेशन पाएँ', body: 'विवरण और दर लिखित रूप में बताएँगे।' },
      { title: 'ऑर्डर पक्का करें', body: 'कोटेशन पसंद आए तो ऑर्डर पक्का करें।' },
      { title: 'आयोजन का दिन', body: 'तय दिन पर भोजन की ज़िम्मेदारी हम सँभालते हैं।' },
    ],
    needTitle: 'कोटेशन के लिए हमें क्या जानकारी चाहिए',
    needLead: 'कोटेशन के लिए ये बातें बताएँ:',
    needs: ['आयोजन की तारीख', 'मेहमानों की अनुमानित संख्या', 'गाँव या शहर', 'मेन्यू की पसंद (महाराष्ट्रीयन, दक्षिण भारतीय, राजस्थानी या मिला-जुला)', 'ऑर्डर का प्रकार: सारी सामग्री हमारी, या सामग्री आपकी', 'कोई खास ज़रूरत (जैसे जैन, व्रत, बिना प्याज-लहसुन)'],
    ctaTitle: 'शुरू करें',
    ctaBody: 'तारीख और मेहमानों की संख्या बताएँ। हम आपसे संपर्क करेंगे।',
  },
};
