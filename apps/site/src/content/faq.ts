import type { Lang } from '../data/site';

// DRAFT copy. Answers use only known facts or say "we confirm with your quote".
interface FaqCopy {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  items: Array<{ q: string; a: string }>;
  ctaTitle: string;
  ctaBody: string;
}

export const faq: Record<Lang, FaqCopy> = {
  mr: {
    metaTitle: 'प्रश्नोत्तरे: केटरिंग ऑर्डरबद्दल नेहमीचे प्रश्न',
    metaDescription: 'भगवती केटरर्सकडे ऑर्डर कशी द्यावी, कोणते जेवण मिळते, कोणत्या भागात सेवा आहे आणि कोटेशन कसे मिळते, याबद्दल नेहमीचे प्रश्न व उत्तरे.',
    h1: 'नेहमी विचारले जाणारे प्रश्न',
    lead: 'तुमचा प्रश्न इथे नसेल तर आम्हाला फोन किंवा WhatsApp करा.',
    items: [
      { q: 'तुमचे जेवण पूर्णपणे शाकाहारी आहे का?', a: 'होय. आमचे सर्व पदार्थ शुद्ध शाकाहारी असतात.' },
      { q: 'कोणत्या प्रकारचे जेवण मिळते?', a: 'महाराष्ट्रीयन, दाक्षिणात्य आणि राजस्थानी. पदार्थांची उदाहरणे आमच्या मेनू पृष्ठावर आहेत. तुमच्या कार्यक्रमासाठी अंतिम मेनू आपण मिळून ठरवतो.' },
      { q: 'कोणत्या कार्यक्रमांसाठी सेवा देता?', a: 'विवाह, साखरपुडा, हळद, गृहप्रवेश, पूजा व धार्मिक कार्यक्रम, वाढदिवस व पार्ट्या, कार्यालयीन कार्यक्रम आणि कौटुंबिक मेळावे. तसेच घरगुती जेवण ऑर्डरवर.' },
      { q: '"सर्व साहित्यासह" आणि "आपले साहित्य" यात काय फरक?', a: '"सर्व साहित्यासह" मध्ये साहित्याची खरेदी आणि स्वयंपाक आम्ही करतो. "आपले साहित्य, आमचा स्वयंपाक" मध्ये साहित्य तुम्ही देता आणि स्वयंपाक आम्ही करतो. तपशील "ऑर्डर कसे करावे" पृष्ठावर आहे.' },
      { q: 'दर किती आहेत?', a: 'दर कार्यक्रमानुसार ठरतात. तारीख, पाहुण्यांची संख्या आणि मेनूनुसार आम्ही कोटेशन देतो.' },
      { q: 'कोटेशन कसे मिळवावे?', a: 'कोटेशन फॉर्म भरा, WhatsApp करा किंवा फोन करा. कार्यक्रमाची तारीख, पाहुण्यांची संख्या, गाव, मेनूची पसंती आणि ऑर्डरचा प्रकार सांगा.' },
      { q: 'कोणत्या भागात सेवा देता?', a: 'लातूर, औसा, निलंगा, रेणापूर, तुळजापूर, अंबाजोगाई आणि आसपासचा परिसर. तुमचे गाव यादीत नसेल तर विचारा.' },
      { q: 'उपवासाचे पदार्थ मिळतील का?', a: 'तुमच्या कार्यक्रमासाठी उपवासाचे पदार्थ हवे असल्यास कोटेशन मागताना सांगा. काय शक्य आहे हे आम्ही कोटेशनसोबत कळवू.' },
      { q: 'अनामत रक्कम, रद्द करणे आणि कमीत कमी पाहुणे याबद्दल काय?', a: 'या अटी आम्ही तुमच्या कोटेशनसोबत कळवतो.' },
      { q: 'तुमच्याकडे FSSAI परवाना आहे का?', a: 'होय, आम्ही FSSAI प्रमाणित आहोत. परवाना क्रमांक प्रत्येक पृष्ठाच्या शेवटी दिला आहे.' },
    ],
    ctaTitle: 'अजून प्रश्न आहे?',
    ctaBody: 'आम्हाला विचारा. आम्ही आनंदाने उत्तर देऊ.',
  },
  en: {
    metaTitle: 'FAQ: Common Questions About Ordering Catering',
    metaDescription: 'Common questions and answers about ordering from Bhagwati Caterers: the food we serve, where we serve, and how to get a quote.',
    h1: 'Frequently Asked Questions',
    lead: 'If your question is not here, call or WhatsApp us.',
    items: [
      { q: 'Is your food completely vegetarian?', a: 'Yes. All our food is pure vegetarian.' },
      { q: 'What kind of food do you serve?', a: 'Maharashtrian, South Indian and Rajasthani. Example dishes are on our Menu page. We plan the final menu for your event together with you.' },
      { q: 'Which events do you cater for?', a: 'Weddings, engagements, haldi, housewarming, pujas and religious functions, birthdays and parties, office events and family gatherings. We also prepare home-style food on order.' },
      { q: 'What is the difference between "We bring everything" and "You provide ingredients"?', a: 'With "We bring everything", we buy the ingredients and cook. With "You provide ingredients, we cook", you supply the ingredients and we do the cooking. See the How to Order page for details.' },
      { q: 'What are your rates?', a: 'Rates depend on the event. We give a quote based on the date, number of guests and menu.' },
      { q: 'How do I get a quote?', a: 'Fill in the quote form, WhatsApp us or call. Tell us the event date, number of guests, town, menu preference and order type.' },
      { q: 'Which areas do you serve?', a: 'Latur, Ausa, Nilanga, Renapur, Tuljapur, Ambajogai and nearby areas. If your town is not listed, please ask.' },
      { q: 'Can you prepare fasting (upvas) dishes?', a: 'If you need fasting dishes for your event, tell us when you ask for a quote. We confirm what is possible with your quote.' },
      { q: 'What about advance payment, cancellation and minimum guests?', a: 'We share these terms with your quote.' },
      { q: 'Do you hold an FSSAI licence?', a: 'Yes, we are FSSAI Certified. The licence number is shown at the bottom of every page.' },
    ],
    ctaTitle: 'Still have a question?',
    ctaBody: 'Ask us. We will be glad to answer.',
  },
  hi: {
    metaTitle: 'सवाल-जवाब: कैटरिंग ऑर्डर के बारे में आम सवाल',
    metaDescription: 'भगवती कैटरर्स से ऑर्डर कैसे करें, कौन-सा भोजन मिलता है, किन क्षेत्रों में सेवा है और कोटेशन कैसे मिलता है, इस बारे में आम सवाल और जवाब।',
    h1: 'अक्सर पूछे जाने वाले सवाल',
    lead: 'आपका सवाल यहाँ न हो तो हमें फ़ोन या WhatsApp करें।',
    items: [
      { q: 'क्या आपका भोजन पूरी तरह शाकाहारी है?', a: 'जी हाँ। हमारा सारा भोजन शुद्ध शाकाहारी है।' },
      { q: 'किस प्रकार का भोजन मिलता है?', a: 'महाराष्ट्रीयन, दक्षिण भारतीय और राजस्थानी। व्यंजनों के उदाहरण मेन्यू पृष्ठ पर हैं। आपके आयोजन का अंतिम मेन्यू हम आपके साथ मिलकर तय करते हैं।' },
      { q: 'किन आयोजनों के लिए सेवा देते हैं?', a: 'विवाह, सगाई, हल्दी, गृहप्रवेश, पूजा और धार्मिक कार्यक्रम, जन्मदिन और पार्टियाँ, ऑफिस कार्यक्रम और पारिवारिक मिलन। साथ ही ऑर्डर पर घरेलू भोजन।' },
      { q: '"सारी सामग्री के साथ" और "आपकी सामग्री" में क्या अंतर है?', a: '"सारी सामग्री के साथ" में सामग्री की खरीद और खाना पकाना हम करते हैं। "आपकी सामग्री, हमारा खाना पकाना" में सामग्री आप देते हैं और खाना हम पकाते हैं। विवरण "ऑर्डर कैसे करें" पृष्ठ पर है।' },
      { q: 'आपके दर क्या हैं?', a: 'दर आयोजन के अनुसार तय होते हैं। तारीख, मेहमानों की संख्या और मेन्यू के आधार पर हम कोटेशन देते हैं।' },
      { q: 'कोटेशन कैसे पाएँ?', a: 'कोटेशन फ़ॉर्म भरें, WhatsApp करें या फ़ोन करें। आयोजन की तारीख, मेहमानों की संख्या, शहर, मेन्यू की पसंद और ऑर्डर का प्रकार बताएँ।' },
      { q: 'किन क्षेत्रों में सेवा देते हैं?', a: 'लातूर, औसा, निलंगा, रेणापुर, तुलजापुर, अम्बाजोगाई और आसपास के क्षेत्र। आपका शहर सूची में न हो तो पूछें।' },
      { q: 'क्या व्रत (उपवास) के व्यंजन मिल सकते हैं?', a: 'आपके आयोजन के लिए व्रत के व्यंजन चाहिए तो कोटेशन माँगते समय बताएँ। क्या संभव है, यह हम कोटेशन के साथ बताएँगे।' },
      { q: 'अग्रिम राशि, रद्द करने और न्यूनतम मेहमानों के बारे में क्या?', a: 'ये शर्तें हम आपके कोटेशन के साथ बताते हैं।' },
      { q: 'क्या आपके पास FSSAI लाइसेंस है?', a: 'जी हाँ, हम FSSAI प्रमाणित हैं। लाइसेंस नंबर हर पृष्ठ के नीचे दिया गया है।' },
    ],
    ctaTitle: 'और कोई सवाल है?',
    ctaBody: 'हमसे पूछें। हमें खुशी से जवाब देंगे।',
  },
};
