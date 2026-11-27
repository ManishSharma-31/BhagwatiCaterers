import type { Lang } from '../data/site';

// DRAFT copy. No invented story: only facts supplied by the owner.
interface AboutCopy {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  ownerTitle: string;
  ownerRole: string;
  ownerBody: string[];
  ownerAlt: string;
  ownerCall: string;
  whoTitle: string;
  who: string[];
  factsTitle: string;
  facts: Array<{ title: string; body: string }>;
  approachTitle: string;
  approach: Array<{ title: string; body: string }>;
  fssaiTitle: string;
  fssaiBody: string;
  ctaTitle: string;
  ctaBody: string;
}

export const about: Record<Lang, AboutCopy> = {
  mr: {
    metaTitle: 'आमच्याबद्दल: ३०+ वर्षांचा अनुभव, लातूर',
    metaDescription:
      'भगवती केटरर्स, लातूर: ३० वर्षांहून अधिक अनुभव असलेली शुद्ध शाकाहारी केटरिंग सेवा. मालक शांतीलाल महाराज. FSSAI प्रमाणित. फोन करा.',
    h1: 'आमच्याबद्दल: भगवती केटरर्स, लातूर',
    lead: 'भगवती केटरर्स ही लातूरमधील शुद्ध शाकाहारी केटरिंग सेवा आहे. ३० वर्षांहून अधिक काळ आम्ही कुटुंबांच्या समारंभात जेवणाची सेवा देत आहोत.',
    ownerTitle: 'आमचे मालक',
    ownerRole: 'मालक, भगवती केटरर्स',
    ownerBody: ['शांतीलाल महाराज यांच्या ३० वर्षांहून अधिक अनुभवावर भगवती केटरर्स उभे आहे. लातूर आणि आसपासच्या कुटुंबांसाठी लग्न, समारंभ, पार्टी आणि पूजेसाठी शुद्ध शाकाहारी जेवण तयार करणे, हेच आमचे काम.','महाराष्ट्रीयन, दाक्षिणात्य, राजस्थानी, गुजराती, बंगाली व इंडो-चायनीज जेवणाबद्दल किंवा तुमच्या कार्यक्रमाबद्दल थेट बोलायचे असेल तर फोन करा.'],
    ownerAlt: 'शांतीलाल महाराज, भगवती केटरर्सचे मालक',
    ownerCall: 'शांतीलाल महाराज यांना फोन करा',
    whoTitle: 'आम्ही कोण',
    who: [
      'भगवती केटरर्सचे मालक शांतीलाल महाराज आहेत.',
      'आम्ही महाराष्ट्रीयन, दाक्षिणात्य, राजस्थानी, गुजराती, बंगाली व इंडो-चायनीज शाकाहारी जेवण बनवतो: लग्न, समारंभ, पार्ट्या आणि धार्मिक कार्यक्रमांसाठी.',
    ],
    factsTitle: 'थोडक्यात',
    facts: [
      { title: '३० वर्षांहून अधिक अनुभव', body: 'अनेक वर्षांपासून केटरिंगच्या कामात.' },
      { title: 'शुद्ध शाकाहारी', body: 'आमचे सर्व पदार्थ शाकाहारी आहेत.' },
      { title: 'अनेक प्रकारचे जेवण', body: 'महाराष्ट्रीयन, दाक्षिणात्य, राजस्थानी, गुजराती, बंगाली व इंडो-चायनीज.' },
      { title: 'लातूर व आसपास', body: 'लातूर आणि जवळच्या परिसरात सेवा.' },
    ],
    approachTitle: 'आमची पद्धत',
    approach: [
      { title: 'आधी तुमचे ऐकतो', body: 'कार्यक्रम, पाहुणे आणि तुमची पसंती समजून घेऊन मग मेनू ठरवतो.' },
      { title: 'स्पष्ट कोटेशन', body: 'काय समाविष्ट आहे, ते कोटेशनमध्ये स्पष्ट सांगतो.' },
      { title: 'तुमची सोय', body: 'सर्व साहित्य आमचे, किंवा साहित्य तुमचे आणि स्वयंपाक आमचा: दोन्ही पद्धतींनी ऑर्डर घेतो.' },
    ],
    fssaiTitle: 'FSSAI प्रमाणित',
    fssaiBody: 'आम्ही अन्न सुरक्षा व मानक प्राधिकरणाचे (FSSAI) परवानाधारक आहोत. परवाना क्रमांक प्रत्येक पृष्ठाच्या शेवटी दिला आहे.',
    ctaTitle: 'आमच्याशी बोला',
    ctaBody: 'तुमच्या कार्यक्रमाबद्दल सांगा. आम्ही आनंदाने मदत करू.',
  },
  en: {
    metaTitle: 'About Us: 30+ Years, Latur',
    metaDescription:
      'Bhagwati Caterers, Latur: a pure vegetarian catering service with 30+ years of experience. Owner Shanti Lal Maharaj. FSSAI Certified. Call us.',
    h1: 'About Bhagwati Caterers, Latur',
    lead: 'Bhagwati Caterers is a pure vegetarian catering service in Latur. For over 30 years we have been serving food at family celebrations.',
    ownerTitle: 'Meet our owner',
    ownerRole: 'Owner, Bhagwati Caterers',
    ownerBody: ['Bhagwati Caterers stands on the 30+ years of experience of Shanti Lal Maharaj. Our work is simple: pure vegetarian food for weddings, functions, parties and pujas for families in Latur and nearby areas.','To talk directly about Maharashtrian, South Indian or Rajasthani food, or about your event, give us a call.'],
    ownerAlt: 'Shanti Lal Maharaj, owner of Bhagwati Caterers',
    ownerCall: 'Call Shanti Lal Maharaj',
    whoTitle: 'Who we are',
    who: [
      'Bhagwati Caterers is owned by Shanti Lal Maharaj.',
      'We prepare Maharashtrian, South Indian, Rajasthani, Gujarati, Bengali and Indo-Chinese vegetarian food for weddings, events, parties and religious functions.',
    ],
    factsTitle: 'At a glance',
    facts: [
      { title: '30+ years of experience', body: 'Working in catering for many years.' },
      { title: 'Pure vegetarian', body: 'All our food is vegetarian.' },
      { title: 'Many cuisines', body: 'Maharashtrian, South Indian, Rajasthani, Gujarati, Bengali and Indo-Chinese.' },
      { title: 'Latur and nearby', body: 'Serving Latur and nearby areas.' },
    ],
    approachTitle: 'Our approach',
    approach: [
      { title: 'We listen first', body: 'We understand your event, your guests and your preferences, and then plan the menu.' },
      { title: 'A clear quote', body: 'We state clearly in the quote what is included.' },
      { title: 'Your convenience', body: 'We take orders both ways: we bring everything, or you provide the ingredients and we cook.' },
    ],
    fssaiTitle: 'FSSAI Certified',
    fssaiBody: 'We hold a licence from the Food Safety and Standards Authority of India (FSSAI). The licence number is shown at the bottom of every page.',
    ctaTitle: 'Talk to us',
    ctaBody: 'Tell us about your event. We will be glad to help.',
  },
  hi: {
    metaTitle: 'हमारे बारे में: 30+ साल का अनुभव',
    metaDescription:
      'भगवती केटरर्स, लातूर: 30 साल से अधिक अनुभव वाली शुद्ध शाकाहारी कैटरिंग सेवा। मालिक शांतिलाल महाराज। FSSAI प्रमाणित। फ़ोन करें।',
    h1: 'हमारे बारे में: भगवती केटरर्स, लातूर',
    lead: 'भगवती केटरर्स लातूर की शुद्ध शाकाहारी कैटरिंग सेवा है। 30 साल से अधिक समय से हम परिवारों के समारोहों में भोजन की सेवा दे रहे हैं।',
    ownerTitle: 'हमारे मालिक',
    ownerRole: 'मालिक, भगवती केटरर्स',
    ownerBody: ['भगवती केटरर्स शांतिलाल महाराज के 30 से अधिक वर्षों के अनुभव पर खड़ा है। लातूर और आसपास के परिवारों के लिए विवाह, समारोह, पार्टी और पूजा के लिए शुद्ध शाकाहारी भोजन बनाना, यही हमारा काम है।','महाराष्ट्रीयन, दक्षिण भारतीय, राजस्थानी, गुजराती, बंगाली और इंडो-चायनीज भोजन के बारे में या अपने आयोजन के बारे में सीधे बात करनी हो तो फ़ोन करें।'],
    ownerAlt: 'शांतिलाल महाराज, भगवती केटरर्स के मालिक',
    ownerCall: 'शांतिलाल महाराज को फ़ोन करें',
    whoTitle: 'हम कौन हैं',
    who: [
      'भगवती केटरर्स के मालिक शांतिलाल महाराज हैं।',
      'हम विवाह, समारोह, पार्टियों और धार्मिक कार्यक्रमों के लिए महाराष्ट्रीयन, दक्षिण भारतीय, राजस्थानी, गुजराती, बंगाली और इंडो-चायनीज शाकाहारी भोजन बनाते हैं।',
    ],
    factsTitle: 'संक्षेप में',
    facts: [
      { title: '30 साल से अधिक अनुभव', body: 'कई वर्षों से कैटरिंग के काम में।' },
      { title: 'शुद्ध शाकाहारी', body: 'हमारा सारा भोजन शाकाहारी है।' },
      { title: 'कई प्रकार का भोजन', body: 'महाराष्ट्रीयन, दक्षिण भारतीय, राजस्थानी, गुजराती, बंगाली और इंडो-चायनीज।' },
      { title: 'लातूर और आसपास', body: 'लातूर और पास के क्षेत्रों में सेवा।' },
    ],
    approachTitle: 'हमारा तरीका',
    approach: [
      { title: 'पहले आपकी बात सुनते हैं', body: 'आयोजन, मेहमान और आपकी पसंद समझकर फिर मेन्यू तय करते हैं।' },
      { title: 'साफ़ कोटेशन', body: 'क्या शामिल है, यह कोटेशन में साफ़ बताते हैं।' },
      { title: 'आपकी सुविधा', body: 'दोनों तरह से ऑर्डर लेते हैं: सारी सामग्री हमारी, या सामग्री आपकी और खाना हमारा।' },
    ],
    fssaiTitle: 'FSSAI प्रमाणित',
    fssaiBody: 'हमारे पास भारतीय खाद्य सुरक्षा और मानक प्राधिकरण (FSSAI) का लाइसेंस है। लाइसेंस नंबर हर पृष्ठ के नीचे दिया गया है।',
    ctaTitle: 'हमसे बात करें',
    ctaBody: 'अपने आयोजन के बारे में बताएँ। हमें मदद करके खुशी होगी।',
  },
};
