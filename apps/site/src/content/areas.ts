import type { Lang } from '../data/site';
type L3<T = string> = Record<Lang, T>;
export const areaLines: Record<string, L3> = {
  latur: { mr: 'आमचे मुख्य सेवा क्षेत्र. लातूर शहरातील समारंभांसाठी आम्ही उपलब्ध आहोत.', en: 'Our main service area. We cater for occasions in Latur city.', hi: 'हमारा मुख्य सेवा क्षेत्र। लातूर शहर के समारोहों के लिए हम उपलब्ध हैं।' },
  ausa: { mr: 'औसा परिसरातील कार्यक्रमांसाठी आम्ही सेवा देतो.', en: 'We serve events in and around Ausa.', hi: 'औसा और आसपास के कार्यक्रमों के लिए हम सेवा देते हैं।' },
  nilanga: { mr: 'निलंगा परिसरातील कार्यक्रमांसाठी आम्ही सेवा देतो.', en: 'We serve events in and around Nilanga.', hi: 'निलंगा और आसपास के कार्यक्रमों के लिए हम सेवा देते हैं।' },
  renapur: { mr: 'रेणापूर परिसरातील कार्यक्रमांसाठी आम्ही सेवा देतो.', en: 'We serve events in and around Renapur.', hi: 'रेणापुर और आसपास के कार्यक्रमों के लिए हम सेवा देते हैं।' },
  tuljapur: { mr: 'तुळजापूर परिसरातील कार्यक्रमांसाठी आम्ही सेवा देतो.', en: 'We serve events in and around Tuljapur.', hi: 'तुलजापुर और आसपास के कार्यक्रमों के लिए हम सेवा देते हैं।' },
  ambajogai: { mr: 'अंबाजोगाई परिसरातील कार्यक्रमांसाठी आम्ही सेवा देतो.', en: 'We serve events in and around Ambajogai.', hi: 'अम्बाजोगाई और आसपास के कार्यक्रमों के लिए हम सेवा देते हैं।' },
};
export const areas: Record<Lang, { metaTitle: string; metaDescription: string; title: string; lead: string; nearbyTitle: string; nearbyBody: string; note: string; ctaTitle: string; ctaBody: string }> = {
  mr: {
    metaTitle: 'सेवा क्षेत्र: लातूर आणि आसपास',
    metaDescription: 'भगवती केटरर्स लातूर, औसा, निलंगा, रेणापूर, तुळजापूर आणि अंबाजोगाई येथे शुद्ध शाकाहारी केटरिंग सेवा देते. जवळच्या इतर भागांसाठी विचारणा करा.',
    title: 'सेवा क्षेत्र',
    lead: 'आम्ही लातूर आणि आसपासच्या या ठिकाणी शुद्ध शाकाहारी केटरिंग सेवा देतो.',
    nearbyTitle: 'जवळचे इतर भाग',
    nearbyBody: 'तुमचे गाव किंवा शहर वरील यादीत नसेल, तर आम्हाला विचारा. जवळच्या भागांसाठी विनंतीनुसार सेवा देता येते का, ते आम्ही कळवू.',
    note: 'अंतर आणि कार्यक्रमाच्या स्वरूपानुसार व्यवस्था ठरते. यासाठी आमच्याशी बोला.',
    ctaTitle: 'तुमचे ठिकाण कळवा',
    ctaBody: 'कार्यक्रमाचे ठिकाण आणि तारीख सांगा. आम्ही पुढील माहिती देऊ.',
  },
  en: {
    metaTitle: 'Service Areas: Latur and Nearby',
    metaDescription: 'Bhagwati Caterers provides pure vegetarian catering in Latur, Ausa, Nilanga, Renapur, Tuljapur and Ambajogai. Ask us about other nearby areas.',
    title: 'Service Areas',
    lead: 'We provide pure vegetarian catering in Latur and these nearby places.',
    nearbyTitle: 'Other nearby areas',
    nearbyBody: 'If your town or village is not listed above, please ask us. We will tell you whether we can serve nearby areas on request.',
    note: 'Arrangements depend on the distance and the type of event. Please talk to us.',
    ctaTitle: 'Tell us your location',
    ctaBody: 'Share the venue and date, and we will tell you what to expect next.',
  },
  hi: {
    metaTitle: 'सेवा क्षेत्र: लातूर और आसपास',
    metaDescription: 'भगवती केटरर्स लातूर, औसा, निलंगा, रेणापुर, तुलजापुर और अम्बाजोगाई में शुद्ध शाकाहारी कैटरिंग सेवा देता है। आसपास के अन्य क्षेत्रों के लिए पूछें।',
    title: 'सेवा क्षेत्र',
    lead: 'हम लातूर और आसपास के इन स्थानों पर शुद्ध शाकाहारी कैटरिंग सेवा देते हैं।',
    nearbyTitle: 'आसपास के अन्य क्षेत्र',
    nearbyBody: 'अगर आपका गाँव या शहर ऊपर की सूची में नहीं है, तो हमसे पूछें। हम बताएंगे कि आसपास के क्षेत्रों में अनुरोध पर सेवा दे सकते हैं या नहीं।',
    note: 'व्यवस्था दूरी और कार्यक्रम के प्रकार पर निर्भर करती है। इसके लिए हमसे बात करें।',
    ctaTitle: 'अपना स्थान बताएं',
    ctaBody: 'कार्यक्रम का स्थान और तारीख बताएं। आगे की जानकारी हम देंगे।',
  },
};
