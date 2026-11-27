import type { Lang } from '../data/site';
type L3<T = string> = Record<Lang, T>;
export const areaLines: Record<string, L3> = {
  latur: { mr: 'आमचे मुख्य सेवा क्षेत्र. लातूर शहरातील लग्न व समारंभांसाठी आम्ही केटरिंग सेवा देतो.', en: 'Our main service area. We cater for weddings and functions in Latur city.', hi: 'हमारा मुख्य सेवा क्षेत्र। लातूर शहर के विवाह और समारोहों के लिए हम कैटरिंग सेवा देते हैं।' },
  ausa: { mr: 'औसा परिसरातील कार्यक्रमांसाठी आम्ही केटरिंग सेवा देतो.', en: 'We serve events in and around Ausa.', hi: 'औसा और आसपास के कार्यक्रमों के लिए हम सेवा देते हैं।' },
  nilanga: { mr: 'निलंगा परिसरातील कार्यक्रमांसाठी आम्ही केटरिंग सेवा देतो.', en: 'We serve events in and around Nilanga.', hi: 'निलंगा और आसपास के कार्यक्रमों के लिए हम सेवा देते हैं।' },
  renapur: { mr: 'रेणापूर परिसरातील कार्यक्रमांसाठी आम्ही केटरिंग सेवा देतो.', en: 'We serve events in and around Renapur.', hi: 'रेणापुर और आसपास के कार्यक्रमों के लिए हम सेवा देते हैं।' },
  tuljapur: { mr: 'तुळजापूर परिसरातील कार्यक्रमांसाठी आम्ही केटरिंग सेवा देतो.', en: 'We serve events in and around Tuljapur.', hi: 'तुलजापुर और आसपास के कार्यक्रमों के लिए हम सेवा देते हैं।' },
  ambajogai: { mr: 'अंबाजोगाई परिसरातील कार्यक्रमांसाठी आम्ही केटरिंग सेवा देतो.', en: 'We serve events in and around Ambajogai.', hi: 'अम्बाजोगाई और आसपास के कार्यक्रमों के लिए हम सेवा देते हैं।' },
};
export const areas: Record<Lang, { metaTitle: string; metaDescription: string; title: string; lead: string; nearbyTitle: string; nearbyBody: string; note: string; ctaTitle: string; ctaBody: string }> = {
  mr: {
    metaTitle: 'लातूर व आसपास केटरिंग सेवा क्षेत्र',
    metaDescription: 'भगवती केटरर्स लातूर, औसा, निलंगा, रेणापूर, तुळजापूर आणि अंबाजोगाई येथे शुद्ध शाकाहारी केटरिंग देते. तुमचे गाव यादीत नसेल तर विचारा.',
    title: 'सेवा क्षेत्र: लातूर आणि आसपास',
    lead: 'आम्ही लातूर आणि आसपासच्या या ठिकाणी शुद्ध शाकाहारी केटरिंग सेवा देतो.',
    nearbyTitle: 'जवळची इतर गावे',
    nearbyBody: 'तुमचे गाव किंवा शहर वरील यादीत नसेल तर आम्हाला विचारा. तुमच्या ठिकाणी सेवा देता येईल का, ते आम्ही बोलून कळवतो.',
    note: 'अंतर आणि कार्यक्रमाचे स्वरूप पाहून व्यवस्था ठरते. त्यासाठी आमच्याशी बोला.',
    ctaTitle: 'तुमचे ठिकाण कळवा',
    ctaBody: 'कार्यक्रमाचे ठिकाण आणि तारीख सांगा. पुढे काय करायचे ते आम्ही सांगू.',
  },
  en: {
    metaTitle: 'Catering Service Areas near Latur',
    metaDescription: 'Bhagwati Caterers offers pure vegetarian catering in Latur, Ausa, Nilanga, Renapur, Tuljapur and Ambajogai. Ask us if your town is not listed.',
    title: 'Service Areas: Latur and Nearby',
    lead: 'We provide pure vegetarian catering in Latur and these nearby places.',
    nearbyTitle: 'Other nearby towns and villages',
    nearbyBody: 'If your town or village is not listed above, please ask us. We will tell you when we talk whether we can serve your location.',
    note: 'Arrangements depend on the distance and the type of event. Please talk to us.',
    ctaTitle: 'Tell us your location',
    ctaBody: 'Share the venue and date, and we will tell you what happens next.',
  },
  hi: {
    metaTitle: 'लातूर और आसपास सेवा क्षेत्र',
    metaDescription: 'भगवती केटरर्स लातूर, औसा, निलंगा, रेणापुर, तुलजापुर और अम्बाजोगाई में शुद्ध शाकाहारी कैटरिंग देता है। आपका गाँव सूची में न हो तो पूछें।',
    title: 'सेवा क्षेत्र: लातूर और आसपास',
    lead: 'हम लातूर और आसपास के इन स्थानों पर शुद्ध शाकाहारी कैटरिंग सेवा देते हैं।',
    nearbyTitle: 'आसपास के अन्य गाँव और शहर',
    nearbyBody: 'अगर आपका गाँव या शहर ऊपर की सूची में नहीं है, तो हमसे पूछें। आपके स्थान पर सेवा दे सकते हैं या नहीं, यह हम बात करके बताएँगे।',
    note: 'व्यवस्था दूरी और आयोजन के प्रकार को देखकर तय होती है। इसके लिए हमसे बात करें।',
    ctaTitle: 'अपना स्थान बताएँ',
    ctaBody: 'आयोजन का स्थान और तारीख बताएँ। आगे क्या करना है, यह हम बताएँगे।',
  },
};
