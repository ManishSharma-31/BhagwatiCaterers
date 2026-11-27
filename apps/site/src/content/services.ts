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
    metaTitle: 'लग्न, पूजा, पार्टीसाठी केटरिंग सेवा, लातूर',
    metaDescription:
      'लातूर व आसपास लग्न, साखरपुडा, हळद, गृहप्रवेश, पूजा, वाढदिवस आणि ऑफिसच्या कार्यक्रमांसाठी शुद्ध शाकाहारी केटरिंग. घरगुती जेवणही ऑर्डरवर.',
    h1: 'लातूरमधील आमच्या केटरिंग सेवा',
    lead: 'घरच्या छोट्या समारंभापासून मोठ्या लग्नापर्यंत, शुद्ध शाकाहारी जेवणाची सोय आम्ही करतो.',
    note: 'प्रत्येक कार्यक्रम वेगळा असतो. कोटेशनमध्ये काय समाविष्ट आहे आणि काय नाही, ते आम्ही स्पष्ट सांगतो.',
    items: [
      { icon: '/art/kalash.svg', title: 'लग्न', body: 'लग्नाच्या जेवणाचे नियोजन: मेनू तुमच्या पसंतीने ठरवू आणि पाहुण्यांच्या संख्येनुसार तयारी करू.' },
      { icon: '/art/icon-sweets.svg', title: 'साखरपुडा', body: 'साखरपुड्यासाठी साधे आणि चवदार जेवण, गोडाच्या पदार्थांसह.' },
      { icon: '/art/icon-puran-poli.svg', title: 'हळद', body: 'हळदीच्या कार्यक्रमासाठी नाश्ता आणि जेवणाची सोय.' },
      { icon: '/art/diya.svg', title: 'गृहप्रवेश', body: 'नव्या घरात प्रवेशाच्या दिवशी घरच्यांसाठी आणि पाहुण्यांसाठी पारंपरिक जेवण.' },
      { icon: '/art/icon-modak.svg', title: 'पूजा व धार्मिक कार्यक्रम', body: 'सत्यनारायण पूजा, गणेशोत्सव आणि इतर धार्मिक कार्यक्रमांसाठी प्रसाद व जेवण. उपवासाचे पदार्थ हवे असतील तर आधी सांगा.' },
      { icon: '/art/icon-shrikhand.svg', title: 'वाढदिवस व पार्टी', body: 'वाढदिवस आणि घरगुती किंवा मित्रमंडळींच्या पार्टीसाठी जेवण.' },
      { icon: '/art/icon-vada-sambar.svg', title: 'ऑफिस व संस्थेचे कार्यक्रम', body: 'ऑफिस, संस्था आणि मंडळांच्या कार्यक्रमांसाठी जेवणाची सोय.' },
      { icon: '/art/banana-leaf-meal.svg', title: 'कौटुंबिक मेळावे', body: 'नातेवाईक आणि घरच्यांच्या एकत्र जेवणासाठी, लहान किंवा मोठ्या संख्येसाठी.' },
      { icon: '/art/icon-bhakri.svg', title: 'घरगुती जेवण, ऑर्डरवर', body: 'घरच्यासारखे साधे पदार्थ ऑर्डरवर बनवून मिळतात. कोणते पदार्थ, किती आधी सांगावे आणि जेवण कसे मिळेल, ते फोन केल्यावर सांगतो.' },
    ],
    closeTitle: 'ऑर्डरच्या दोन पद्धती',
    closeBody: 'कोणत्याही कार्यक्रमासाठी तुम्ही "सर्व साहित्य आमचे" किंवा "साहित्य तुमचे, स्वयंपाक आमचा" यापैकी एक निवडू शकता.',
    ctaTitle: 'तुमच्या कार्यक्रमाबद्दल सांगा',
    ctaBody: 'कार्यक्रमाचा प्रकार, तारीख आणि पाहुण्यांची संख्या सांगा. आम्ही तुमच्याशी संपर्क करू.',
  },
  en: {
    metaTitle: 'Wedding, Puja & Party Catering, Latur',
    metaDescription:
      'Pure vegetarian catering in Latur and nearby for weddings, engagements, haldi, housewarming, pujas, birthdays and office events. Home-style food on order.',
    h1: 'Our Catering Services in Latur',
    lead: 'From a small family function to a big wedding, we arrange pure vegetarian food for your occasion.',
    note: 'Every event is different. In the quote we state clearly what is included and what is not.',
    items: [
      { icon: '/art/kalash.svg', title: 'Weddings', body: 'Planning the wedding meal: we agree the menu with you and prepare for the number of guests you expect.' },
      { icon: '/art/icon-sweets.svg', title: 'Engagement (sakharpuda)', body: 'Simple, tasty food for the engagement ceremony, with sweets.' },
      { icon: '/art/icon-puran-poli.svg', title: 'Haldi ceremony', body: 'Snacks and a meal for the haldi function.' },
      { icon: '/art/diya.svg', title: 'Housewarming (griha pravesh)', body: 'Traditional food for the family and guests on the day you enter your new home.' },
      { icon: '/art/icon-modak.svg', title: 'Puja and religious functions', body: 'Prasad and meals for Satyanarayan puja, Ganeshotsav and other religious events. Tell us in advance if you need fasting (upvas) dishes.' },
      { icon: '/art/icon-shrikhand.svg', title: 'Birthdays and parties', body: 'Food for birthdays and for house or friends\' parties.' },
      { icon: '/art/icon-vada-sambar.svg', title: 'Office and institution events', body: 'Meals for events at offices, institutions and mandals.' },
      { icon: '/art/banana-leaf-meal.svg', title: 'Family gatherings', body: 'Meals for relatives and family getting together, for a small or large group.' },
      { icon: '/art/icon-bhakri.svg', title: 'Home-style food on order', body: 'Simple home-style dishes prepared on order. When you call, we tell you which dishes, how much notice we need and how you receive the food.' },
    ],
    closeTitle: 'Two ways to order',
    closeBody: 'For any event you can choose "We bring everything" or "You provide ingredients, we cook".',
    ctaTitle: 'Tell us about your event',
    ctaBody: 'Share the type of event, the date and the number of guests. We will get in touch with you.',
  },
  hi: {
    metaTitle: 'शादी, पूजा, पार्टी कैटरिंग सेवा, लातूर',
    metaDescription:
      'लातूर और आसपास शादी, सगाई, हल्दी, गृहप्रवेश, पूजा, जन्मदिन और ऑफिस कार्यक्रमों के लिए शुद्ध शाकाहारी कैटरिंग। घर जैसा भोजन ऑर्डर पर।',
    h1: 'लातूर में हमारी कैटरिंग सेवाएँ',
    lead: 'घर के छोटे समारोह से लेकर बड़ी शादी तक, हम शुद्ध शाकाहारी भोजन की व्यवस्था करते हैं।',
    note: 'हर आयोजन अलग होता है। कोटेशन में क्या शामिल है और क्या नहीं, यह हम साफ़ बताते हैं।',
    items: [
      { icon: '/art/kalash.svg', title: 'विवाह', body: 'शादी के भोजन की योजना: मेन्यू आपकी पसंद से तय करेंगे और मेहमानों की संख्या के अनुसार तैयारी करेंगे।' },
      { icon: '/art/icon-sweets.svg', title: 'सगाई (साखरपुड़ा)', body: 'सगाई के लिए सादा और स्वादिष्ट भोजन, मिठाइयों के साथ।' },
      { icon: '/art/icon-puran-poli.svg', title: 'हल्दी', body: 'हल्दी के कार्यक्रम के लिए नाश्ते और भोजन की व्यवस्था।' },
      { icon: '/art/diya.svg', title: 'गृहप्रवेश', body: 'नए घर में प्रवेश के दिन परिवार और मेहमानों के लिए पारंपरिक भोजन।' },
      { icon: '/art/icon-modak.svg', title: 'पूजा और धार्मिक कार्यक्रम', body: 'सत्यनारायण पूजा, गणेशोत्सव और अन्य धार्मिक कार्यक्रमों के लिए प्रसाद और भोजन। व्रत (उपवास) के व्यंजन चाहिए तो पहले बताएँ।' },
      { icon: '/art/icon-shrikhand.svg', title: 'जन्मदिन और पार्टी', body: 'जन्मदिन तथा घर या दोस्तों की पार्टी के लिए भोजन।' },
      { icon: '/art/icon-vada-sambar.svg', title: 'ऑफिस और संस्था के कार्यक्रम', body: 'ऑफिस, संस्था और मंडल के कार्यक्रमों के लिए भोजन की व्यवस्था।' },
      { icon: '/art/banana-leaf-meal.svg', title: 'पारिवारिक मिलन', body: 'रिश्तेदारों और परिवार के साथ भोजन के लिए, छोटे या बड़े समूह में।' },
      { icon: '/art/icon-bhakri.svg', title: 'घर जैसा भोजन, ऑर्डर पर', body: 'घर जैसे सादे व्यंजन ऑर्डर पर बनाकर मिलते हैं। कौन-से व्यंजन, कितना पहले बताना है और भोजन कैसे मिलेगा, यह फ़ोन करने पर बताते हैं।' },
    ],
    closeTitle: 'ऑर्डर के दो तरीके',
    closeBody: 'किसी भी आयोजन के लिए आप "सारी सामग्री हमारी" या "सामग्री आपकी, खाना हमारा" चुन सकते हैं।',
    ctaTitle: 'अपने आयोजन के बारे में बताएँ',
    ctaBody: 'आयोजन का प्रकार, तारीख और मेहमानों की संख्या बताएँ। हम आपसे संपर्क करेंगे।',
  },
};
