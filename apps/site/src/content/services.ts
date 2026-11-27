import type { Lang } from '../data/site';

// DRAFT copy. Marathi and Hindi need native review. See docs/owner-review-A.md.
interface ServicesCopy {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  note: string;
  items: Array<{ icon: string; title: string; body: string }>;
  closeTitle: string;
  closeBody: string;
  ctaTitle: string;
  ctaBody: string;
}

export const services: Record<Lang, ServicesCopy> = {
  mr: {
    metaTitle: 'आमच्या सेवा: विवाह, पूजा, पार्टी व घरगुती जेवण',
    metaDescription:
      'लातूर व आसपास विवाह, साखरपुडा, हळद, गृहप्रवेश, पूजा, वाढदिवस, कार्यालयीन कार्यक्रम आणि घरगुती जेवण ऑर्डरवर: शुद्ध शाकाहारी केटरिंग.',
    h1: 'आमच्या सेवा',
    lead: 'लहान घरगुती समारंभापासून मोठ्या कार्यक्रमापर्यंत, शुद्ध शाकाहारी जेवणाची सोय आम्ही करतो.',
    note: 'प्रत्येक कार्यक्रम वेगळा असतो. काय काय समाविष्ट असेल, हे आम्ही तुमच्या कोटेशनमध्ये स्पष्ट सांगतो.',
    items: [
      { icon: '/art/kalash.svg', title: 'विवाह', body: 'लग्नाच्या जेवणाचे नियोजन: मेनू तुमच्या पसंतीनुसार ठरवू आणि पाहुण्यांच्या संख्येनुसार तयारी करू.' },
      { icon: '/art/icon-sweets.svg', title: 'साखरपुडा', body: 'साखरपुड्यासाठी साधे व चवदार जेवण, गोडाच्या पदार्थांसह.' },
      { icon: '/art/icon-puran-poli.svg', title: 'हळदी समारंभ', body: 'हळदीच्या कार्यक्रमासाठी अल्पोपाहार व जेवणाची सोय.' },
      { icon: '/art/diya.svg', title: 'गृहप्रवेश', body: 'नवीन घरात प्रवेशाच्या दिवशी कुटुंब व पाहुण्यांसाठी पारंपरिक जेवण.' },
      { icon: '/art/icon-modak.svg', title: 'पूजा व धार्मिक कार्यक्रम', body: 'सत्यनारायण पूजा, गणेशोत्सव व इतर धार्मिक कार्यक्रमांसाठी प्रसाद व जेवण. उपवासाचे पदार्थ हवे असल्यास आधी सांगा.' },
      { icon: '/art/icon-shrikhand.svg', title: 'वाढदिवस व पार्टी', body: 'वाढदिवस आणि घरगुती किंवा मित्रमंडळींच्या पार्टीसाठी जेवण.' },
      { icon: '/art/icon-vada-sambar.svg', title: 'कार्यालयीन व संस्थांचे कार्यक्रम', body: 'कार्यालये, संस्था व मंडळांच्या कार्यक्रमांसाठी जेवणाची सोय.' },
      { icon: '/art/banana-leaf-meal.svg', title: 'कौटुंबिक मेळावे', body: 'नातेवाईक व कुटुंबाच्या एकत्र जेवणासाठी, लहान किंवा मोठ्या संख्येसाठी.' },
      { icon: '/art/icon-bhakri.svg', title: 'घरगुती जेवण ऑर्डरवर', body: 'घरच्यासारखे साधे पदार्थ ऑर्डरवर तयार करून मिळतात. कोणते पदार्थ, किती वेळ आधी सांगावे, व कसे मिळेल याची माहिती संपर्क केल्यावर सांगितली जाते.' },
    ],
    closeTitle: 'दोन प्रकारे ऑर्डर',
    closeBody: 'कोणत्याही कार्यक्रमासाठी तुम्ही "सर्व साहित्यासह" किंवा "आपले साहित्य, आमचा स्वयंपाक" यापैकी एक निवडू शकता.',
    ctaTitle: 'तुमचा कार्यक्रम सांगा',
    ctaBody: 'कार्यक्रमाचा प्रकार, तारीख आणि पाहुण्यांची संख्या सांगा. आम्ही संपर्क करू.',
  },
  en: {
    metaTitle: 'Our Services: Weddings, Pujas, Parties and Home-Style Food',
    metaDescription:
      'Pure vegetarian catering in Latur and nearby areas for weddings, engagements, haldi, housewarming, pujas, birthdays, office events, family gatherings, and home-style food on order.',
    h1: 'Our Services',
    lead: 'From a small family function to a large celebration, we arrange pure vegetarian food for your occasion.',
    note: 'Every event is different. We state clearly what is included in the quote we send you.',
    items: [
      { icon: '/art/kalash.svg', title: 'Weddings', body: 'Planning the wedding meal: we agree the menu with you and prepare for the number of guests you expect.' },
      { icon: '/art/icon-sweets.svg', title: 'Engagement (sakharpuda)', body: 'Simple, tasty food for the engagement ceremony, with sweets.' },
      { icon: '/art/icon-puran-poli.svg', title: 'Haldi ceremony', body: 'Snacks and a meal for the haldi function.' },
      { icon: '/art/diya.svg', title: 'Housewarming (griha pravesh)', body: 'Traditional food for the family and guests on the day you enter your new home.' },
      { icon: '/art/icon-modak.svg', title: 'Puja and religious functions', body: 'Prasad and meals for Satyanarayan puja, Ganeshotsav and other religious events. Tell us in advance if you need fasting (upvas) dishes.' },
      { icon: '/art/icon-shrikhand.svg', title: 'Birthdays and parties', body: 'Food for birthdays and for house or friends\' parties.' },
      { icon: '/art/icon-vada-sambar.svg', title: 'Office and institution events', body: 'Meals for events at offices, institutions and mandals.' },
      { icon: '/art/banana-leaf-meal.svg', title: 'Family gatherings', body: 'Meals for relatives and family getting together, for a small or large group.' },
      { icon: '/art/icon-bhakri.svg', title: 'Home-style food on order', body: 'Simple home-style dishes prepared on order. We share which dishes, how much notice we need and how you receive the food when you contact us.' },
    ],
    closeTitle: 'Two ways to order',
    closeBody: 'For any event you can choose "We bring everything" or "You provide ingredients, we cook".',
    ctaTitle: 'Tell us about your event',
    ctaBody: 'Share the type of event, the date and the number of guests. We will get in touch.',
  },
  hi: {
    metaTitle: 'हमारी सेवाएँ: विवाह, पूजा, पार्टी और घरेलू भोजन',
    metaDescription:
      'लातूर और आसपास विवाह, सगाई, हल्दी, गृहप्रवेश, पूजा, जन्मदिन, ऑफिस कार्यक्रम और ऑर्डर पर घरेलू भोजन: शुद्ध शाकाहारी कैटरिंग।',
    h1: 'हमारी सेवाएँ',
    lead: 'छोटे पारिवारिक आयोजन से लेकर बड़े समारोह तक, हम शुद्ध शाकाहारी भोजन की व्यवस्था करते हैं।',
    note: 'हर आयोजन अलग होता है। क्या-क्या शामिल है, यह हम आपके कोटेशन में साफ बताते हैं।',
    items: [
      { icon: '/art/kalash.svg', title: 'विवाह', body: 'शादी के भोजन की योजना: मेन्यू आपकी पसंद से तय करेंगे और मेहमानों की संख्या के अनुसार तैयारी करेंगे।' },
      { icon: '/art/icon-sweets.svg', title: 'सगाई (साखरपुड़ा)', body: 'सगाई के लिए सादा और स्वादिष्ट भोजन, मिठाइयों के साथ।' },
      { icon: '/art/icon-puran-poli.svg', title: 'हल्दी समारोह', body: 'हल्दी के कार्यक्रम के लिए नाश्ते और भोजन की व्यवस्था।' },
      { icon: '/art/diya.svg', title: 'गृहप्रवेश', body: 'नए घर में प्रवेश के दिन परिवार और मेहमानों के लिए पारंपरिक भोजन।' },
      { icon: '/art/icon-modak.svg', title: 'पूजा और धार्मिक कार्यक्रम', body: 'सत्यनारायण पूजा, गणेशोत्सव और अन्य धार्मिक कार्यक्रमों के लिए प्रसाद और भोजन। व्रत (उपवास) के व्यंजन चाहिए तो पहले बताएँ।' },
      { icon: '/art/icon-shrikhand.svg', title: 'जन्मदिन और पार्टी', body: 'जन्मदिन तथा घरेलू या दोस्तों की पार्टी के लिए भोजन।' },
      { icon: '/art/icon-vada-sambar.svg', title: 'ऑफिस और संस्था के कार्यक्रम', body: 'ऑफिस, संस्था और मंडल के कार्यक्रमों के लिए भोजन की व्यवस्था।' },
      { icon: '/art/banana-leaf-meal.svg', title: 'पारिवारिक मिलन', body: 'रिश्तेदारों और परिवार के साथ भोजन के लिए, छोटे या बड़े समूह में।' },
      { icon: '/art/icon-bhakri.svg', title: 'ऑर्डर पर घरेलू भोजन', body: 'घर जैसे सादे व्यंजन ऑर्डर पर तैयार किए जाते हैं। कौन-से व्यंजन, कितना पहले बताना है और भोजन कैसे मिलेगा, यह संपर्क करने पर बताया जाता है।' },
    ],
    closeTitle: 'ऑर्डर के दो तरीके',
    closeBody: 'किसी भी आयोजन के लिए आप "सारी सामग्री के साथ" या "आपकी सामग्री, हमारा खाना पकाना" चुन सकते हैं।',
    ctaTitle: 'अपने आयोजन के बारे में बताएँ',
    ctaBody: 'आयोजन का प्रकार, तारीख और मेहमानों की संख्या बताएँ। हम संपर्क करेंगे।',
  },
};
