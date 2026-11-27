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
    metaTitle: 'आमच्याबद्दल: ३० वर्षांहून अधिक अनुभव, शुद्ध शाकाहारी',
    metaDescription:
      'भगवती केटरर्स, लातूर: ३० वर्षांहून अधिक अनुभव असलेले शुद्ध शाकाहारी केटरर्स. मालक शांतीलाल महाराज. FSSAI प्रमाणित.',
    h1: 'आमच्याबद्दल',
    lead: 'भगवती केटरर्स हे लातूर येथील शुद्ध शाकाहारी केटरिंग सेवा आहे. ३० वर्षांहून अधिक काळ आम्ही कुटुंबांच्या समारंभात जेवणाची सेवा देत आहोत.',
    ownerTitle: 'आमचे मालक',
    ownerRole: 'संस्थापक व मालक, भगवती केटरर्स',
    ownerBody: ['शांतीलाल महाराज यांच्या ३० वर्षांहून अधिक अनुभवावर भगवती केटरर्स उभे आहे. लातूर आणि आसपासच्या कुटुंबांसाठी विवाह, समारंभ, पार्ट्या आणि पूजेसाठी शुद्ध शाकाहारी जेवण तयार करणे, हेच आमचे काम.','महाराष्ट्रीयन, दाक्षिणात्य आणि राजस्थानी पदार्थांची चव आणि स्वच्छता यांकडे ते स्वतः लक्ष देतात. कार्यक्रमाबद्दल थेट बोलायचे असल्यास फोन करा.'],
    ownerAlt: 'शांतीलाल महाराज, भगवती केटरर्सचे मालक',
    ownerCall: 'शांतीलाल महाराज यांना फोन करा',
    whoTitle: 'आम्ही कोण',
    who: [
      'भगवती केटरर्सचे मालक शांतीलाल महाराज आहेत.',
      'आम्ही महाराष्ट्रीयन, दाक्षिणात्य आणि राजस्थानी शाकाहारी जेवण तयार करतो, विवाह, समारंभ, पार्ट्या आणि धार्मिक कार्यक्रमांसाठी.',
    ],
    factsTitle: 'थोडक्यात',
    facts: [
      { title: '३० वर्षांहून अधिक अनुभव', body: 'अनेक वर्षांपासून केटरिंगच्या कामात.' },
      { title: 'शुद्ध शाकाहारी', body: 'आमचे सर्व पदार्थ शाकाहारी असतात.' },
      { title: 'तीन प्रकारचे जेवण', body: 'महाराष्ट्रीयन, दाक्षिणात्य आणि राजस्थानी.' },
      { title: 'लातूर व आसपास', body: 'लातूर आणि जवळच्या परिसरात सेवा.' },
    ],
    approachTitle: 'आमची पद्धत',
    approach: [
      { title: 'आधी तुमचे ऐकतो', body: 'कार्यक्रम, पाहुणे आणि तुमची पसंती समजून घेऊन मेनू ठरवतो.' },
      { title: 'स्पष्ट कोटेशन', body: 'काय समाविष्ट आहे, हे कोटेशनमध्ये स्पष्ट सांगतो.' },
      { title: 'तुमची सोय', body: 'सर्व साहित्यासह किंवा तुमच्या साहित्यासह, दोन्ही पद्धतींनी ऑर्डर घेतो.' },
    ],
    fssaiTitle: 'FSSAI प्रमाणित',
    fssaiBody: 'आम्ही अन्न सुरक्षा व मानक प्राधिकरण (FSSAI) परवानाधारक आहोत.',
    ctaTitle: 'आमच्याशी बोला',
    ctaBody: 'तुमच्या कार्यक्रमाबद्दल सांगा. आम्ही आनंदाने मदत करू.',
  },
  en: {
    metaTitle: 'About Us: 30+ Years of Pure Vegetarian Catering',
    metaDescription:
      'Bhagwati Caterers, Latur: pure vegetarian caterers with 30+ years of experience. Owner Shanti Lal Maharaj. FSSAI certified.',
    h1: 'About Us',
    lead: 'Bhagwati Caterers is a pure vegetarian catering service in Latur. For over 30 years we have been serving food at family celebrations.',
    ownerTitle: 'Meet our owner',
    ownerRole: 'Founder and owner, Bhagwati Caterers',
    ownerBody: ['Bhagwati Caterers stands on the 30+ years of experience of Shanti Lal Maharaj. Our work is simple: pure vegetarian food for weddings, functions, parties and pujas for families in Latur and nearby areas.','He looks after the taste and cleanliness of Maharashtrian, South Indian and Rajasthani dishes himself. To talk about your event directly, give him a call.'],
    ownerAlt: 'Shanti Lal Maharaj, owner of Bhagwati Caterers',
    ownerCall: 'Call Shanti Lal Maharaj',
    whoTitle: 'Who we are',
    who: [
      'Bhagwati Caterers is owned by Shanti Lal Maharaj.',
      'We prepare Maharashtrian, South Indian and Rajasthani vegetarian food for weddings, events, parties and religious functions.',
    ],
    factsTitle: 'At a glance',
    facts: [
      { title: '30+ years of experience', body: 'Working in catering for many years.' },
      { title: 'Pure vegetarian', body: 'All our food is vegetarian.' },
      { title: 'Three cuisines', body: 'Maharashtrian, South Indian and Rajasthani.' },
      { title: 'Latur and nearby', body: 'Serving Latur and nearby areas.' },
    ],
    approachTitle: 'Our approach',
    approach: [
      { title: 'We listen first', body: 'We plan the menu after understanding your event, your guests and your preferences.' },
      { title: 'A clear quote', body: 'We state clearly in the quote what is included.' },
      { title: 'Your convenience', body: 'We take orders both ways: we bring everything, or you provide the ingredients.' },
    ],
    fssaiTitle: 'FSSAI Certified',
    fssaiBody: 'We hold a licence from the Food Safety and Standards Authority of India (FSSAI).',
    ctaTitle: 'Talk to us',
    ctaBody: 'Tell us about your event. We will be glad to help.',
  },
  hi: {
    metaTitle: 'हमारे बारे में: 30 साल से अधिक अनुभव, शुद्ध शाकाहारी',
    metaDescription:
      'भगवती कैटरर्स, लातूर: 30 साल से अधिक अनुभव वाले शुद्ध शाकाहारी कैटरर्स। मालिक शांतिलाल महाराज। FSSAI प्रमाणित।',
    h1: 'हमारे बारे में',
    lead: 'भगवती कैटरर्स लातूर की शुद्ध शाकाहारी कैटरिंग सेवा है। 30 साल से अधिक समय से हम परिवारों के आयोजनों में भोजन की सेवा दे रहे हैं।',
    ownerTitle: 'हमारे मालिक',
    ownerRole: 'संस्थापक व मालिक, भगवती कैटरर्स',
    ownerBody: ['भगवती कैटरर्स शांतिलाल महाराज के 30 से अधिक वर्षों के अनुभव पर खड़ा है। लातूर और आसपास के परिवारों के लिए विवाह, समारोह, पार्टी और पूजा के लिए शुद्ध शाकाहारी भोजन बनाना, यही हमारा काम है।','महाराष्ट्रीयन, दक्षिण भारतीय और राजस्थानी व्यंजनों के स्वाद और स्वच्छता का ध्यान वे स्वयं रखते हैं। अपने आयोजन के बारे में सीधे बात करने के लिए फोन करें।'],
    ownerAlt: 'शांतिलाल महाराज, भगवती कैटरर्स के मालिक',
    ownerCall: 'शांतिलाल महाराज को फोन करें',
    whoTitle: 'हम कौन हैं',
    who: [
      'भगवती कैटरर्स के मालिक शांतिलाल महाराज हैं।',
      'हम विवाह, समारोह, पार्टियों और धार्मिक कार्यक्रमों के लिए महाराष्ट्रीयन, दक्षिण भारतीय और राजस्थानी शाकाहारी भोजन बनाते हैं।',
    ],
    factsTitle: 'संक्षेप में',
    facts: [
      { title: '30 साल से अधिक अनुभव', body: 'कई वर्षों से कैटरिंग के काम में।' },
      { title: 'शुद्ध शाकाहारी', body: 'हमारा सारा भोजन शाकाहारी है।' },
      { title: 'तीन प्रकार का भोजन', body: 'महाराष्ट्रीयन, दक्षिण भारतीय और राजस्थानी।' },
      { title: 'लातूर और आसपास', body: 'लातूर और पास के क्षेत्रों में सेवा।' },
    ],
    approachTitle: 'हमारा तरीका',
    approach: [
      { title: 'पहले आपकी बात सुनते हैं', body: 'आयोजन, मेहमान और आपकी पसंद समझकर मेन्यू तय करते हैं।' },
      { title: 'साफ कोटेशन', body: 'क्या शामिल है, यह कोटेशन में साफ बताते हैं।' },
      { title: 'आपकी सुविधा', body: 'दोनों तरह से ऑर्डर लेते हैं: सारी सामग्री हमारी, या सामग्री आपकी।' },
    ],
    fssaiTitle: 'FSSAI प्रमाणित',
    fssaiBody: 'हमारे पास भारतीय खाद्य सुरक्षा और मानक प्राधिकरण (FSSAI) का लाइसेंस है।',
    ctaTitle: 'हमसे बात करें',
    ctaBody: 'अपने आयोजन के बारे में बताएँ। हमें मदद करके खुशी होगी।',
  },
};
