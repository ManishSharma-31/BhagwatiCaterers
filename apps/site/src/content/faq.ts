import type { Lang } from '../data/site';

// DRAFT copy. Answers use only known facts. Where the answer depends on the event or the owner, we say "we confirm when we talk". No prices, no invented terms.
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
    metaTitle: 'केटरिंगबद्दल नेहमीचे प्रश्न, लातूर',
    metaDescription: 'लातूरमधील शुद्ध शाकाहारी केटरिंगबद्दल प्रश्न: बुकिंग, कोटेशन, साहित्यासह किंवा साहित्याशिवाय ऑर्डर, जैन जेवण, सेवा क्षेत्र. उत्तरे इथे.',
    h1: 'केटरिंगबद्दल नेहमी विचारले जाणारे प्रश्न',
    lead: 'ऑर्डर, मेनू, कोटेशन आणि सेवा क्षेत्राबद्दल लोक नेहमी विचारतात ते प्रश्न. तुमचा प्रश्न इथे नसेल तर आम्हाला फोन किंवा WhatsApp करा.',
    items: [
      { q: 'तुमचे जेवण पूर्णपणे शाकाहारी आहे का?', a: 'होय. आमचे सर्व पदार्थ शुद्ध शाकाहारी आहेत.' },
      { q: 'लातूरमध्ये भगवती केटरर्स कुठे आहे?', a: 'जुल्हेलाल मार्ग, नारायण नगर, लातूर ४१३५३१. पत्ता आणि नकाशा संपर्क पृष्ठावर आहे. कार्यक्रमाबद्दल बोलण्यासाठी फोन किंवा WhatsApp करा: ९०५७२६४८९५.' },
      { q: 'कोणत्या प्रकारचे जेवण मिळते?', a: 'महाराष्ट्रीयन, दाक्षिणात्य, राजस्थानी, गुजराती, बंगाली व इंडो-चायनीज शाकाहारी जेवण. पदार्थांची उदाहरणे मेनू पृष्ठावर आहेत. तुमच्या कार्यक्रमाचा अंतिम मेनू आपण बोलून ठरवतो.' },
      { q: 'कोणत्या कार्यक्रमांसाठी सेवा देता?', a: 'लग्न, साखरपुडा, हळद, गृहप्रवेश, पूजा व धार्मिक कार्यक्रम, वाढदिवस व पार्ट्या, ऑफिस व संस्थेचे कार्यक्रम आणि कौटुंबिक मेळावे. घरगुती जेवणही ऑर्डरवर मिळते.' },
      { q: '"सर्व साहित्य आमचे" आणि "साहित्य तुमचे, स्वयंपाक आमचा" यात काय फरक?', a: '"सर्व साहित्य आमचे" मध्ये साहित्याची खरेदी आणि स्वयंपाक आम्ही करतो. "साहित्य तुमचे, स्वयंपाक आमचा" मध्ये साहित्य तुम्ही देता आणि स्वयंपाक आम्ही करतो. किती साहित्य लागेल ते आम्ही सांगतो. तपशील "ऑर्डर कशी द्यावी" पृष्ठावर आहे.' },
      { q: 'दर किती आहेत?', a: 'दर कार्यक्रमानुसार ठरतात. तारीख, पाहुण्यांची संख्या, मेनू आणि ऑर्डरचा प्रकार पाहून आम्ही कोटेशन देतो. दर वेबसाइटवर दिलेले नाहीत.' },
      { q: 'कोटेशन कसे मिळते?', a: 'कोटेशन फॉर्म भरा, WhatsApp करा किंवा फोन करा. कार्यक्रमाची तारीख, पाहुण्यांची अंदाजे संख्या, गाव, मेनूची पसंती आणि ऑर्डरचा प्रकार सांगा. मेनू ठरवल्यावर आम्ही तपशील आणि दर कळवतो.' },
      { q: 'बुकिंग किती दिवस आधी करावे?', a: 'तारीख ठरताच शक्य तितक्या लवकर कळवा, म्हणजे तयारीला वेळ मिळतो. तुमच्या तारखेला आम्ही उपलब्ध आहोत का, ते बोलताना सांगतो.' },
      { q: 'कमीत कमी किती पाहुण्यांसाठी ऑर्डर घेता?', a: 'हे कार्यक्रमावर अवलंबून असते. तुमच्या पाहुण्यांची अंदाजे संख्या सांगा, आम्ही बोलून कळवतो.' },
      { q: 'जैन जेवण, कांदा-लसूण नसलेले जेवण किंवा उपवासाचे पदार्थ मिळतील का?', a: 'अशी काही खास गरज असेल तर कोटेशन मागतानाच सांगा. काय शक्य आहे ते आम्ही बोलून कळवतो.' },
      { q: 'डोसा, जिलेबी यांसारखे लाइव्ह काउंटर करता येतात का?', a: 'काउंटर आणि जेवण वाढण्याची पद्धत कार्यक्रमानुसार ठरते. तुम्हाला काय हवे ते सांगा, शक्य आहे का ते आम्ही बोलून कळवतो.' },
      { q: 'वाढपी किंवा सेवा कर्मचारी मिळतात का?', a: 'वाढपाची आणि कर्मचाऱ्यांची व्यवस्था कार्यक्रमानुसार ठरते. कोटेशनमध्ये काय समाविष्ट आहे आणि काय नाही, ते आम्ही स्पष्ट सांगतो.' },
      { q: 'लातूरच्या बाहेर कार्यक्रम असेल तर येता का?', a: 'आम्ही लातूर, औसा, निलंगा, रेणापूर, तुळजापूर, अंबाजोगाई आणि आसपासच्या परिसरात सेवा देतो. तुमचे गाव यादीत नसेल तर विचारा. अंतर आणि कार्यक्रम पाहून व्यवस्था ठरते.' },
      { q: 'ऑर्डर देण्याआधी जेवण चाखून पाहता येईल का?', a: 'चाखून पाहण्याची व्यवस्था करता येते का, ते कार्यक्रमानुसार ठरते. ऑर्डरबद्दल बोलताना हे विचारा.' },
      { q: 'अनामत रक्कम, रद्द करणे आणि बदल याबद्दल काय?', a: 'या अटी कार्यक्रमानुसार ठरतात. त्या आम्ही ऑर्डर पक्की करण्यापूर्वी तुम्हाला कळवतो.' },
      { q: 'घरगुती जेवण ऑर्डरवर मिळते का?', a: 'होय, घरच्यासारखे साधे पदार्थ ऑर्डरवर बनवून मिळतात. काय मिळेल आणि किती आधी सांगायचे ते फोनवर विचारा.' },
      { q: 'फोन किंवा WhatsApp कधी करू शकतो?', a: 'तुम्ही कधीही फोन किंवा WhatsApp करू शकता: ९०५७२६४८९५.' },
      { q: 'तुमच्याकडे FSSAI परवाना आहे का?', a: 'होय, आम्ही FSSAI प्रमाणित आहोत. परवाना क्रमांक प्रत्येक पृष्ठाच्या शेवटी दिला आहे.' },
    ],
    ctaTitle: 'अजून प्रश्न आहे?',
    ctaBody: 'आम्हाला थेट विचारा. फोन किंवा WhatsApp करा, आम्ही आनंदाने सांगू.',
  },
  en: {
    metaTitle: 'Catering FAQs: Booking, Quote, Menu',
    metaDescription: 'Answers about pure vegetarian catering in Latur: booking, quotes, with or without your ingredients, Jain food, live counters, service areas.',
    h1: 'Frequently Asked Questions about Catering',
    lead: 'The questions people ask us most about orders, menus, quotes and service areas. If yours is not here, call or WhatsApp us.',
    items: [
      { q: 'Is your food completely vegetarian?', a: 'Yes. All our food is pure vegetarian.' },
      { q: 'Where is Bhagwati Caterers in Latur?', a: 'Julhelal Marg, Narayan Nagar, Latur 413531. The address and map are on the Contact page. To talk about your event, call or WhatsApp 9057264895.' },
      { q: 'What kind of food do you serve?', a: 'Maharashtrian, South Indian, Rajasthani, Gujarati, Bengali and Indo-Chinese vegetarian food. Example dishes are on our Menu page. We plan the final menu for your event together with you.' },
      { q: 'Which events do you cater for?', a: 'Weddings, engagements, haldi, housewarming, pujas and religious functions, birthdays and parties, office and institution events, and family gatherings. Home-style food is also available on order.' },
      { q: 'What is the difference between "We bring everything" and "You provide ingredients, we cook"?', a: 'With "We bring everything", we buy the ingredients and cook. With "You provide ingredients, we cook", you supply the ingredients and we do the cooking; we tell you how much you need. Details are on the How to Order page.' },
      { q: 'What are your rates?', a: 'Rates depend on the event. We give a quote after looking at the date, number of guests, menu and order type. We do not list rates on the website.' },
      { q: 'How does the quote work?', a: 'Fill in the quote form, WhatsApp us or call. Tell us the event date, approximate number of guests, town, menu preference and order type. Once the menu is planned, we share the details and rates.' },
      { q: 'How early should I book?', a: 'Tell us as soon as your date is fixed so that we have time to plan. We confirm whether we are available on your date when we talk.' },
      { q: 'What is the minimum number of guests?', a: 'It depends on the event. Tell us the approximate number of guests and we will confirm when we talk.' },
      { q: 'Can you arrange Jain food, food without onion and garlic, or fasting (upvas) dishes?', a: 'If you have a special requirement like this, mention it when you ask for a quote. We confirm what is possible when we talk.' },
      { q: 'Can you do live counters such as dosa or jilebi?', a: 'Counters and the style of serving depend on the event. Tell us what you would like and we will confirm whether it is possible.' },
      { q: 'Do you provide serving staff?', a: 'Serving and staff arrangements depend on the event. We state clearly in the quote what is included and what is not.' },
      { q: 'Will you come for an event outside Latur?', a: 'We serve Latur, Ausa, Nilanga, Renapur, Tuljapur, Ambajogai and nearby areas. If your town is not listed, please ask. Arrangements depend on the distance and the event.' },
      { q: 'Can we taste the food before ordering?', a: 'Whether a tasting can be arranged depends on the event. Please ask us when you talk about your order.' },
      { q: 'What about advance payment, cancellation and changes?', a: 'These terms depend on the event. We share them with you before the order is confirmed.' },
      { q: 'Do you make home-style food on order?', a: 'Yes. Simple home-style dishes are prepared on order. Call us to ask what is available and how much notice we need.' },
      { q: 'When can I call or WhatsApp you?', a: 'You can call or WhatsApp us any time on 9057264895.' },
      { q: 'Do you hold an FSSAI licence?', a: 'Yes, we are FSSAI Certified. The licence number is shown at the bottom of every page.' },
    ],
    ctaTitle: 'Still have a question?',
    ctaBody: 'Ask us directly. Call or WhatsApp, and we will be glad to answer.',
  },
  hi: {
    metaTitle: 'कैटरिंग के आम सवाल, लातूर',
    metaDescription: 'लातूर में शुद्ध शाकाहारी कैटरिंग के सवाल-जवाब: बुकिंग, कोटेशन, अपनी सामग्री या हमारी, जैन भोजन, लाइव काउंटर, सेवा क्षेत्र।',
    h1: 'कैटरिंग के बारे में अक्सर पूछे जाने वाले सवाल',
    lead: 'ऑर्डर, मेन्यू, कोटेशन और सेवा क्षेत्र के बारे में लोग जो सवाल सबसे ज़्यादा पूछते हैं। आपका सवाल यहाँ न हो तो हमें फ़ोन या WhatsApp करें।',
    items: [
      { q: 'क्या आपका भोजन पूरी तरह शाकाहारी है?', a: 'जी हाँ। हमारा सारा भोजन शुद्ध शाकाहारी है।' },
      { q: 'लातूर में भगवती केटरर्स कहाँ है?', a: 'जुल्हेलाल मार्ग, नारायण नगर, लातूर 413531। पता और नक्शा संपर्क पृष्ठ पर है। आयोजन के बारे में बात करने के लिए फ़ोन या WhatsApp करें: 9057264895।' },
      { q: 'किस प्रकार का भोजन मिलता है?', a: 'महाराष्ट्रीयन, दक्षिण भारतीय, राजस्थानी, गुजराती, बंगाली और इंडो-चायनीज शाकाहारी भोजन। व्यंजनों के उदाहरण मेन्यू पृष्ठ पर हैं। आपके आयोजन का अंतिम मेन्यू हम आपके साथ बात करके तय करते हैं।' },
      { q: 'किन आयोजनों के लिए सेवा देते हैं?', a: 'विवाह, सगाई, हल्दी, गृहप्रवेश, पूजा और धार्मिक कार्यक्रम, जन्मदिन और पार्टियाँ, ऑफिस और संस्था के कार्यक्रम तथा पारिवारिक समारोह। घर जैसा भोजन भी ऑर्डर पर मिलता है।' },
      { q: '"सारी सामग्री हमारी" और "सामग्री आपकी, खाना हमारा" में क्या अंतर है?', a: '"सारी सामग्री हमारी" में सामग्री की खरीद और खाना पकाना हम करते हैं। "सामग्री आपकी, खाना हमारा" में सामग्री आप देते हैं और खाना हम पकाते हैं; कितनी सामग्री लगेगी, यह हम बताते हैं। विवरण "ऑर्डर कैसे करें" पृष्ठ पर है।' },
      { q: 'आपके दर क्या हैं?', a: 'दर आयोजन के अनुसार तय होते हैं। तारीख, मेहमानों की संख्या, मेन्यू और ऑर्डर का प्रकार देखकर हम कोटेशन देते हैं। दर वेबसाइट पर नहीं दिए गए हैं।' },
      { q: 'कोटेशन कैसे मिलता है?', a: 'कोटेशन फ़ॉर्म भरें, WhatsApp करें या फ़ोन करें। आयोजन की तारीख, मेहमानों की अनुमानित संख्या, गाँव या शहर, मेन्यू की पसंद और ऑर्डर का प्रकार बताएँ। मेन्यू तय होने पर हम विवरण और दर बताते हैं।' },
      { q: 'बुकिंग कितने दिन पहले करें?', a: 'तारीख तय होते ही जल्द से जल्द बताएँ, ताकि तैयारी के लिए समय मिले। आपकी तारीख पर हम उपलब्ध हैं या नहीं, यह बात करते समय बताते हैं।' },
      { q: 'कम से कम कितने मेहमानों का ऑर्डर लेते हैं?', a: 'यह आयोजन पर निर्भर करता है। मेहमानों की अनुमानित संख्या बताएँ, हम बात करके बताएँगे।' },
      { q: 'क्या जैन भोजन, बिना प्याज-लहसुन का भोजन या व्रत के व्यंजन मिल सकते हैं?', a: 'ऐसी कोई खास ज़रूरत हो तो कोटेशन माँगते समय ही बताएँ। क्या संभव है, यह हम बात करके बताएँगे।' },
      { q: 'क्या डोसा, जलेबी जैसे लाइव काउंटर लग सकते हैं?', a: 'काउंटर और परोसने का तरीका आयोजन के अनुसार तय होता है। आप क्या चाहते हैं, यह बताएँ; संभव है या नहीं, हम बात करके बताएँगे।' },
      { q: 'क्या परोसने वाले स्टाफ़ की व्यवस्था होती है?', a: 'परोसने और स्टाफ़ की व्यवस्था आयोजन के अनुसार तय होती है। कोटेशन में क्या शामिल है और क्या नहीं, यह हम साफ़ बताते हैं।' },
      { q: 'क्या लातूर के बाहर के आयोजन में आते हैं?', a: 'हम लातूर, औसा, निलंगा, रेणापुर, तुलजापुर, अम्बाजोगाई और आसपास के क्षेत्रों में सेवा देते हैं। आपका गाँव सूची में न हो तो पूछें। दूरी और आयोजन देखकर व्यवस्था तय होती है।' },
      { q: 'क्या ऑर्डर से पहले खाना चखकर देख सकते हैं?', a: 'चखने की व्यवस्था हो सकती है या नहीं, यह आयोजन पर निर्भर करता है। ऑर्डर के बारे में बात करते समय पूछें।' },
      { q: 'अग्रिम राशि, रद्द करने और बदलाव के बारे में क्या?', a: 'ये शर्तें आयोजन के अनुसार तय होती हैं। ऑर्डर पक्का होने से पहले हम इन्हें आपको बता देते हैं।' },
      { q: 'क्या घर जैसा भोजन ऑर्डर पर मिलता है?', a: 'जी हाँ, घर जैसे सादे व्यंजन ऑर्डर पर बनाकर मिलते हैं। क्या मिलेगा और कितना पहले बताना होगा, यह फ़ोन पर पूछें।' },
      { q: 'फ़ोन या WhatsApp कब कर सकते हैं?', a: 'आप कभी भी फ़ोन या WhatsApp कर सकते हैं: 9057264895।' },
      { q: 'क्या आपके पास FSSAI लाइसेंस है?', a: 'जी हाँ, हम FSSAI प्रमाणित हैं। लाइसेंस नंबर हर पृष्ठ के नीचे दिया गया है।' },
    ],
    ctaTitle: 'और कोई सवाल है?',
    ctaBody: 'हमसे सीधे पूछें। फ़ोन या WhatsApp करें, हमें खुशी से बताएँगे।',
  },
};
