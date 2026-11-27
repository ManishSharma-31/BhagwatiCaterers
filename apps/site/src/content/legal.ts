// Terms, Privacy and Cookie policy text for all three languages.
// IMPORTANT: this text describes how the website really works today (no cookies, no analytics, no server-side forms).
// If that changes (analytics, a contact form that saves data, embedded maps, etc.), update these pages FIRST.
// See docs/legal-review.md for the facts these pages rely on.
import type { Lang } from '../data/site';

export type LegalKey = 'terms' | 'privacy' | 'cookies';
export interface LegalSection { h: string; p?: string[]; ul?: string[] }
export interface LegalDoc {
  metaTitle: string; metaDescription: string; title: string; lead: string;
  summary: string[]; sections: LegalSection[];
}
export interface LegalCommon {
  updatedLabel: string; updatedDate: string; updatedIso: string; summaryTitle: string; noticeTitle: string; notice: string;
  contactTitle: string; ownerLabel: string; phoneLabel: string; waLabel: string; addressLabel: string; emailLabel: string;
  contactCta: string; otherPages: string; onThisPage: string;
}

export const legalCommon: Record<Lang, LegalCommon> = {
  mr: {
    updatedLabel: 'शेवटचा बदल', updatedDate: '२७ नोव्हेंबर २०२६', updatedIso: '2026-11-27',
    summaryTitle: 'थोडक्यात', noticeTitle: 'महत्त्वाची सूचना',
    notice: 'हे धोरण सर्वसाधारण स्वरूपाचे आहे. ते कायदेशीर सल्ला नाही. तुमच्या विशिष्ट अडचणीसाठी कृपया वकिलांचा सल्ला घ्या. (मालकांनी हे धोरण स्थानिक वकिलांकडून तपासून घ्यावे.)',
    contactTitle: 'आमच्याशी संपर्क', ownerLabel: 'मालक व तक्रार निवारण अधिकारी', phoneLabel: 'फोन', waLabel: 'WhatsApp', addressLabel: 'पत्ता', emailLabel: 'ईमेल',
    contactCta: 'संपर्क पृष्ठ पहा', otherPages: 'इतर धोरणे', onThisPage: 'या पृष्ठावर',
  },
  en: {
    updatedLabel: 'Last updated', updatedDate: '27 November 2026', updatedIso: '2026-11-27',
    summaryTitle: 'In short', noticeTitle: 'Please note',
    notice: 'This is a general policy and is not legal advice to you. For your own situation, please consult an advocate. (The owner should have this policy reviewed by a local advocate.)',
    contactTitle: 'Contact us', ownerLabel: 'Owner and grievance officer', phoneLabel: 'Phone', waLabel: 'WhatsApp', addressLabel: 'Address', emailLabel: 'Email',
    contactCta: 'Go to the Contact page', otherPages: 'Other policies', onThisPage: 'On this page',
  },
  hi: {
    updatedLabel: 'अंतिम अद्यतन', updatedDate: '27 नवंबर 2026', updatedIso: '2026-11-27',
    summaryTitle: 'संक्षेप में', noticeTitle: 'ज़रूरी सूचना',
    notice: 'यह नीति सामान्य स्वरूप की है और कानूनी सलाह नहीं है। अपनी विशेष स्थिति के लिए कृपया किसी अधिवक्ता से सलाह लें। (मालिक को यह नीति स्थानीय अधिवक्ता से जँचवा लेनी चाहिए।)',
    contactTitle: 'हमसे संपर्क करें', ownerLabel: 'मालिक और शिकायत निवारण अधिकारी', phoneLabel: 'फ़ोन', waLabel: 'WhatsApp', addressLabel: 'पता', emailLabel: 'ईमेल',
    contactCta: 'संपर्क पृष्ठ देखें', otherPages: 'अन्य नीतियाँ', onThisPage: 'इस पृष्ठ पर',
  },
};

export const legal: Record<LegalKey, Record<Lang, LegalDoc>> = {
  // ------------------------------------------------------------------ TERMS
  terms: {
    mr: {
      metaTitle: 'अटी व शर्ती',
      metaDescription: 'भगवती केटरर्स, लातूर: वेबसाइट वापराच्या आणि केटरिंग चौकशी व ऑर्डरच्या अटी व शर्ती. कोटेशन, ॲडव्हान्स, रद्द करणे, ॲलर्जी, तक्रार.',
      title: 'अटी व शर्ती',
      lead: 'या वेबसाइटचा वापर आणि आमच्याकडे केटरिंगची चौकशी किंवा ऑर्डर देताना लागू होणाऱ्या अटी, सोप्या भाषेत.',
      summary: [
        'ही वेबसाइट माहितीसाठी आहे. येथे ऑनलाइन बुकिंग किंवा ऑनलाइन पेमेंट होत नाही.',
        'कोटेशन हा अंदाज असतो. आम्ही लेखी (WhatsApp संदेश चालतो) पक्के केल्यावरच ऑर्डर निश्चित होते.',
        'ॲडव्हान्सची रक्कम, वेळापत्रक आणि रद्द करण्याच्या/परताव्याच्या अटी ऑर्डर पक्की होण्यापूर्वी लेखी ठरतात.',
        'आमचे जेवण १००% शुद्ध शाकाहारी आहे. ॲलर्जी किंवा आहाराच्या गरजा आधीच सांगा.',
        'भारतीय कायदा लागू. न्यायालय: लातूर. तुमचे ग्राहक हक्क कायम राहतात.',
      ],
      sections: [
        { h: '१. आम्ही कोण आहोत', p: ['भगवती केटरर्स हा लातूर (महाराष्ट्र) येथील शुद्ध शाकाहारी केटरिंग व्यवसाय आहे. मालक: शांतीलाल महाराज. लग्न, समारंभ, पार्ट्या, धार्मिक कार्यक्रम आणि ऑर्डरवर घरगुती पद्धतीचे जेवण आम्ही देतो, आमच्या साहित्यासह किंवा तुमच्या साहित्यासह.', 'या अटींमध्ये "आम्ही" म्हणजे भगवती केटरर्स आणि "तुम्ही" म्हणजे वेबसाइट वापरणारी किंवा आमच्याकडे चौकशी/ऑर्डर करणारी व्यक्ती.'] },
        { h: '२. वेबसाइटचे स्वरूप', p: ['ही वेबसाइट आमच्या सेवांची माहिती देते आणि तुम्हाला फोन किंवा WhatsApp द्वारे आमच्याशी संपर्क करण्यास मदत करते.', 'ही बुकिंग किंवा पेमेंट साइट नाही. येथे ऑनलाइन पेमेंट घेतले जात नाही. कोटेशन फॉर्म तुमच्यासाठी WhatsApp संदेश तयार करतो; तो तुम्ही स्वतः पाठवल्यावरच आमच्यापर्यंत पोहोचतो. वेबसाइट वापरणे म्हणजे या अटी मान्य करणे.'] },
        { h: '३. कोटेशन आणि किंमत', ul: ['या वेबसाइटवर आम्ही दर (किंमती) प्रसिद्ध करत नाही. दर कार्यक्रम, मेनू, पाहुण्यांची संख्या, ठिकाण आणि तारीख यावर ठरतात.', 'आम्ही दिलेले कोटेशन हा अंदाज असतो. आम्ही लेखी (WhatsApp संदेशासह) पक्के केल्याशिवाय तो बंधनकारक ऑर्डर नसतो.', 'लागू असतील तेव्हा कर (GST इत्यादी) कायद्यानुसार लागू होतात; ते कोटेशन/बिलात स्पष्ट सांगितले जातील.'] },
        { h: '४. ऑर्डर पक्की करणे, ॲडव्हान्स आणि रद्द करणे', ul: ['ऑर्डर तेव्हाच पक्की मानली जाते जेव्हा आम्ही ती लेखी (WhatsApp संदेश चालतो) पक्की केल्याचे कळवतो.', 'ॲडव्हान्सची रक्कम, पैसे देण्याचे वेळापत्रक आणि रद्द करणे/परताव्याच्या अटी ऑर्डर पक्की होण्यापूर्वी लेखी ठरवल्या जातात. या वेबसाइटवर आम्ही कोणतीही रक्कम किंवा टक्केवारी ठरवलेली नाही.', 'रद्द केल्यास रक्कम कापायची असल्यास ती फक्त आमचे प्रत्यक्ष आणि वाजवी नुकसान भरून काढण्यापुरतीच असेल (Indian Contract Act, 1872 चे कलम ७४ नुसार). अवास्तव दंड आकारला जाणार नाही.', 'तारीख किंवा मेनू बदलायचा असेल तर शक्य तितक्या लवकर कळवा.'] },
        { h: '५. मेनू, पदार्थांची यादी आणि फोटो', ul: ['आमचे सर्व जेवण शुद्ध शाकाहारी आहे. आम्ही मांसाहारी पदार्थ देत नाही.', 'वेबसाइटवरील पदार्थांची यादी उदाहरणादाखल आहे. प्रत्यक्ष मेनू तुमच्याशी बोलून ठरतो.', 'वेबसाइटवरील छायाचित्रे प्रातिनिधिक आहेत (काही आमच्या स्वतःच्या पदार्थांची नाहीत). प्रत्यक्ष पदार्थ दिसण्यात थोडा फरक असू शकतो. त्यांचे श्रेय "श्रेय" पृष्ठावर आहे.'] },
        { h: '६. ॲलर्जी आणि आहाराच्या गरजा', p: ['तुम्हाला किंवा तुमच्या पाहुण्यांना कोणत्याही पदार्थाची ॲलर्जी असेल (उदा. शेंगदाणे, ड्रायफ्रुट्स, दूध, गहू) किंवा विशेष आहार (जैन, उपवास, मधुमेह इ.) असेल, तर ऑर्डर देण्यापूर्वी आम्हाला स्पष्ट सांगा.', 'आमच्या स्वयंपाकघरात अनेक पदार्थ हाताळले जातात. त्यामुळे विशेष ठरवल्याशिवाय आम्ही "ॲलर्जी-मुक्त" स्वयंपाकघराची शंभर टक्के हमी देऊ शकत नाही. गरज असेल तर तसे लेखी ठरवू.'] },
        { h: '७. तुमचे साहित्य (तुमच्या साहित्यातून स्वयंपाक)', ul: ['तुम्ही स्वतःचे साहित्य दिले, तर त्याची गुणवत्ता, ताजेपणा, प्रमाण आणि सुरक्षितता याची जबाबदारी तुमची आहे. आम्ही त्यातून स्वयंपाक करतो.', 'साहित्य खराब, कमी किंवा अयोग्य वाटले तर आम्ही ते तुम्हाला कळवू. त्यामुळे झालेल्या कमतरतेची किंवा चवीतील फरकाची जबाबदारी आमच्यावर राहणार नाही.', 'साहित्य कधी, कुठे आणि कसे द्यायचे हे आधी ठरवा.'] },
        { h: '८. अन्नसुरक्षा आणि FSSAI', p: ['आम्ही FSSAI प्रमाणित आहोत आणि Food Safety and Standards Act, 2006 आणि त्याखालील नियमांचे पालन करण्याचा प्रयत्न करतो. आमचा FSSAI परवाना क्रमांक या वेबसाइटच्या तळटीपेत (footer) दिलेला आहे.', 'तयार झालेले अन्न योग्य वेळेत खाल्ले जावे, योग्य तापमानात ठेवले जावे आणि स्वच्छ भांड्यांमध्येच वाढले जावे यासाठी आम्ही मार्गदर्शन करतो. कार्यक्रमस्थळी त्याचे पालन तुमच्या बाजूनेही व्हावे.'] },
        { h: '९. पाहुण्यांची संख्या', ul: ['कोटेशन तुम्ही सांगितलेल्या अंदाजे संख्येवर असते.', 'अंतिम संख्या कार्यक्रमापूर्वी ठरलेल्या वेळेत आम्हाला कळवा. अंतिम संख्या कळवल्यानंतरचे बदल शक्य असतील तर करू; ते शक्य असेलच असे नाही आणि त्यानुसार रकमेत बदल होऊ शकतो.', 'ठरलेल्या संख्येपेक्षा जास्त पाहुणे आल्यास अतिरिक्त जेवणाची उपलब्धता असेलच असे नाही.'] },
        { h: '१०. वेळ, जागा आणि तुमच्या जबाबदाऱ्या', ul: ['जेवणाची वेळ, पोहोचण्याची वेळ आणि कार्यक्रमस्थळ आधी लेखी ठरवा.', 'स्वयंपाकासाठी जागा, पाणी, वीज, गॅस, पार्किंग किंवा प्रवेश यांची व्यवस्था कोण करणार हे आवश्यक असेल तर आधी ठरवले जाईल ("आपसात ठरवल्याप्रमाणे").', 'कार्यक्रमस्थळाची परवानगी, प्रवेश आणि सुरक्षित वातावरण ही तुमची जबाबदारी आहे.'] },
        { h: '११. अपरिहार्य कारणे', p: ['आमच्या नियंत्रणाबाहेरच्या कारणांमुळे (उदा. नैसर्गिक आपत्ती, अतिवृष्टी, दंगल किंवा संचारबंदी, सरकारी आदेश, वीज किंवा पाणी खंडित होणे, अपघात, आजारपण) सेवा देणे शक्य न झाल्यास किंवा उशीर झाल्यास आम्ही तुम्हाला लगेच कळवू आणि पर्याय किंवा योग्य परताव्याचा विचार करू. त्यासाठी आम्हाला दोष दिला जाणार नाही.'] },
        { h: '१२. जबाबदारीची मर्यादा', p: ['कायद्याने जेवढी परवानगी आहे तेवढ्या मर्यादेपर्यंतच आमची जबाबदारी आहे. आमच्या सेवेतील कमतरतेमुळे झालेल्या थेट नुकसानीची जबाबदारी आम्ही घेऊ, पण अप्रत्यक्ष किंवा परिणामी नुकसानीची नाही.', 'या अटींमुळे कायद्याने वगळता न येणारी कोणतीही जबाबदारी वगळली जात नाही आणि Consumer Protection Act, 2019 नुसार तुम्हाला मिळणारे ग्राहक हक्क कमी होत नाहीत.', 'ही वेबसाइट "आहे तशी" दिली आहे. ती नेहमी त्रुटीविना किंवा खंडित न होता चालेल याची हमी आम्ही देत नाही.'] },
        { h: '१३. बौद्धिक संपदा', p: ['वेबसाइटवरील मजकूर, लोगो, रचना आणि मूळ कलाकृती भगवती केटरर्सच्या मालकीची आहेत. आमच्या लेखी परवानगीशिवाय व्यावसायिक वापरासाठी त्यांची नक्कल करू नका.', 'काही छायाचित्रे आणि फॉन्ट तृतीय पक्षांचे आहेत आणि त्यांच्या स्वतःच्या परवान्यांखाली वापरले आहेत. त्यांचे श्रेय व परवाने "श्रेय" पृष्ठावर दिले आहेत.'] },
        { h: '१४. वेबसाइटचा योग्य वापर', ul: ['वेबसाइटचा वापर कायदेशीर कारणांसाठीच करा.', 'खोटी माहिती, अपमानास्पद मजकूर किंवा स्पॅम पाठवू नका.', 'वेबसाइटच्या कामकाजात अडथळा आणू नका, तिच्यात बेकायदेशीर प्रवेशाचा प्रयत्न करू नका.', 'WhatsApp संदेश पाठवताना तुमची माहिती खरी असू द्या.'] },
        { h: '१५. इतर वेबसाइट्सचे दुवे', p: ['या वेबसाइटवर WhatsApp आणि Google Maps यांचे दुवे आहेत. त्यावर क्लिक केल्यावर तुम्ही आमची वेबसाइट सोडून त्या सेवांवर जाता. त्या सेवा त्यांच्या स्वतःच्या अटी, गोपनीयता धोरण आणि कुकीज वापरतात. त्यांच्यावर आमचे नियंत्रण नाही आणि त्यांच्या मजकुराची किंवा पद्धतींची जबाबदारी आम्ही घेत नाही.'] },
        { h: '१६. अटींमध्ये बदल', p: ['आम्ही या अटी वेळोवेळी बदलू शकतो. बदललेल्या अटी या पृष्ठावर प्रसिद्ध होतील आणि वर "शेवटचा बदल" तारीख बदलेल. बदलानंतरही वेबसाइट वापरत राहिल्यास नवीन अटी मान्य आहेत असे मानले जाईल. आधीच पक्की झालेल्या ऑर्डरसाठी पक्की करताना ठरलेल्या लेखी अटी लागू राहतील.'] },
        { h: '१७. लागू कायदा आणि न्यायालय', p: ['या अटींना भारतीय कायदा लागू आहे. वाद आधी बोलून सोडवण्याचा आम्ही प्रयत्न करू. तो न सुटल्यास लातूर, महाराष्ट्र येथील सक्षम न्यायालयांना अधिकारक्षेत्र असेल.', 'Consumer Protection Act, 2019 नुसार ग्राहक म्हणून तुम्हाला ग्राहक आयोगाकडे (जिल्हा, राज्य किंवा राष्ट्रीय) जाण्याचा जो कायदेशीर हक्क आहे, तो या अटींनी कमी होत नाही.'] },
        { h: '१८. तक्रार आणि संपर्क', p: ['कोणतीही तक्रार किंवा प्रश्न असेल तर खालील संपर्कावर कळवा. आम्ही शक्य तितक्या लवकर उत्तर देण्याचा प्रयत्न करतो.'] },
      ],
    },
    en: {
      metaTitle: 'Terms and Conditions',
      metaDescription: 'Terms for using the Bhagwati Caterers website, Latur, and for catering enquiries and orders: quotes, advance, cancellation, allergens, grievances.',
      title: 'Terms and Conditions',
      lead: 'The terms that apply when you use this website or make a catering enquiry or order with us, in plain language.',
      summary: [
        'This website is for information. There is no online booking and no online payment.',
        'A quote is an estimate. An order is confirmed only when we confirm it in writing (a WhatsApp message counts).',
        'The advance amount, schedule and cancellation or refund terms are agreed in writing before the order is confirmed.',
        'Our food is 100% pure vegetarian. Please tell us about allergies or dietary needs in advance.',
        'Indian law applies. Courts at Latur. Your consumer rights are not reduced.',
      ],
      sections: [
        { h: '1. Who we are', p: ['Bhagwati Caterers is a pure vegetarian catering business in Latur, Maharashtra. Owner: Shanti Lal Maharaj. We cater weddings, events, parties, religious functions and home-style food on order, with our own material or with material supplied by the customer.', 'In these terms, "we" means Bhagwati Caterers and "you" means anyone using this website or making an enquiry or order with us.'] },
        { h: '2. What this website is', p: ['This website gives information about our services and helps you contact us by phone or WhatsApp.', 'It is not a booking or payment portal and we do not take online payments. The quote form prepares a WhatsApp message for you; it reaches us only when you send it yourself. By using this website you accept these terms.'] },
        { h: '3. Quotes and prices', ul: ['We do not publish prices on this website. Rates depend on the event, menu, number of guests, place and date.', 'A quote we give is an estimate. It is not a binding order until we confirm it in writing (a WhatsApp message counts).', 'Taxes (such as GST) are charged as applicable under law and will be shown clearly in the quote or bill.'] },
        { h: '4. Confirming an order, advance and cancellation', ul: ['An order is confirmed only when we tell you in writing (a WhatsApp message counts) that it is confirmed.', 'The advance amount, payment schedule and cancellation or refund terms are agreed in writing before the order is confirmed. This website does not fix any amount or percentage.', 'If any amount is kept on cancellation, it will be limited to our genuine and reasonable loss, as section 74 of the Indian Contract Act, 1872 requires. No unreasonable penalty will be charged.', 'If you need to change the date or menu, please tell us as early as possible.'] },
        { h: '5. Menu, dish lists and photos', ul: ['All our food is pure vegetarian. We do not serve non-vegetarian items.', 'Dish lists on this website are illustrative. The actual menu is decided with you.', 'Photographs on this website are representative images (some are not our own dishes). The actual dish may look slightly different. Photo credits are on the Credits page.'] },
        { h: '6. Allergies and dietary needs', p: ['If you or your guests have any food allergy (for example peanuts, nuts, milk, wheat) or a special diet (Jain, fasting, diabetic and so on), please tell us clearly before you place the order.', 'We handle many ingredients in our kitchen, so unless specially agreed we cannot guarantee a completely allergen-free kitchen. If you need this, we will agree it in writing.'] },
        { h: '7. Cooking with your material', ul: ['If you supply your own ingredients, you are responsible for their quality, freshness, quantity and safety. We cook what you provide.', 'If material looks spoiled, short or unsuitable, we will tell you. We are not responsible for any shortfall or difference in taste caused by the material supplied.', 'Agree in advance when, where and how the material will be handed over.'] },
        { h: '8. Food safety and FSSAI', p: ['We are FSSAI Certified and try to follow the Food Safety and Standards Act, 2006 and its rules. Our FSSAI licence number is shown in the footer of this website.', 'We advise on eating cooked food within a safe time, keeping it at a suitable temperature and serving it in clean utensils. Please follow this at the venue as well.'] },
        { h: '9. Guest numbers', ul: ['The quote is based on the approximate number you tell us.', 'Please give us the final headcount within the time agreed before the event. After that, changes will be made if possible, but this is not always possible and the amount may change.', 'If more guests arrive than the agreed number, extra food may not be available.'] },
        { h: '10. Timing, venue and your responsibilities', ul: ['Agree the serving time, arrival time and venue in writing in advance.', 'Who arranges cooking space, water, electricity, gas, parking or access will be settled in advance where needed ("to be agreed").', 'Permission for the venue, access to it and a safe working place are your responsibility.'] },
        { h: '11. Events beyond our control', p: ['If we cannot serve or are delayed because of reasons beyond our control (for example natural disaster, heavy rain, riot or curfew, government order, power or water failure, accident, illness), we will tell you immediately and will consider an alternative or a fair refund. We will not be held at fault for such events.'] },
        { h: '12. Limit of liability', p: ['Our liability is limited only to the extent the law allows. We will answer for direct loss caused by a shortfall in our service, but not for indirect or consequential loss.', 'Nothing in these terms excludes any liability that cannot be excluded by law, and nothing reduces your rights as a consumer under the Consumer Protection Act, 2019.', 'This website is provided "as is". We do not promise that it will always be error-free or uninterrupted.'] },
        { h: '13. Intellectual property', p: ['The text, logo, design and original artwork on this website belong to Bhagwati Caterers. Please do not copy them for commercial use without our written permission.', 'Some photographs and fonts belong to third parties and are used under their own licences. Their credits and licences are on the Credits page.'] },
        { h: '14. Acceptable use', ul: ['Use this website only for lawful purposes.', 'Do not send false information, abusive content or spam.', 'Do not disrupt the website or try to gain unauthorised access to it.', 'Please keep the details you send us on WhatsApp truthful.'] },
        { h: '15. Links to other websites', p: ['This website has links to WhatsApp and Google Maps. When you click them you leave our website and go to those services. They use their own terms, privacy policies and cookies. We do not control them and are not responsible for their content or practices.'] },
        { h: '16. Changes to these terms', p: ['We may change these terms from time to time. Changed terms will be published on this page and the "Last updated" date above will change. If you keep using the website after a change, you accept the new terms. For an order already confirmed, the written terms agreed when it was confirmed continue to apply.'] },
        { h: '17. Governing law and courts', p: ['Indian law governs these terms. We will first try to settle any dispute by talking. If it is not settled, the competent courts at Latur, Maharashtra will have jurisdiction.', 'This does not reduce your legal right as a consumer under the Consumer Protection Act, 2019 to approach a Consumer Commission (District, State or National).'] },
        { h: '18. Grievances and contact', p: ['If you have a complaint or a question, please tell us using the contact details below. We try to reply as soon as we can.'] },
      ],
    },
    hi: {
      metaTitle: 'नियम और शर्तें',
      metaDescription: 'भगवती केटरर्स, लातूर: वेबसाइट के उपयोग तथा कैटरिंग पूछताछ और ऑर्डर के नियम व शर्तें। कोटेशन, एडवांस, रद्द करना, एलर्जी, शिकायत।',
      title: 'नियम और शर्तें',
      lead: 'इस वेबसाइट के उपयोग और हमारे यहाँ कैटरिंग की पूछताछ या ऑर्डर पर लागू होने वाली शर्तें, सरल भाषा में।',
      summary: [
        'यह वेबसाइट जानकारी के लिए है। यहाँ ऑनलाइन बुकिंग या ऑनलाइन भुगतान नहीं होता।',
        'कोटेशन एक अनुमान होता है। ऑर्डर तभी पक्का होता है जब हम उसे लिखित में (WhatsApp संदेश मान्य है) पक्का करें।',
        'एडवांस की राशि, समय-सारणी और रद्द करने/रिफ़ंड की शर्तें ऑर्डर पक्का होने से पहले लिखित में तय होती हैं।',
        'हमारा भोजन 100% शुद्ध शाकाहारी है। एलर्जी या खान-पान की ज़रूरतें पहले बताएँ।',
        'भारतीय कानून लागू। न्यायालय: लातूर। आपके उपभोक्ता अधिकार बने रहते हैं।',
      ],
      sections: [
        { h: '1. हम कौन हैं', p: ['भगवती केटरर्स लातूर (महाराष्ट्र) का शुद्ध शाकाहारी कैटरिंग व्यवसाय है। मालिक: शांतिलाल महाराज। हम विवाह, समारोह, पार्टी, धार्मिक कार्यक्रम और ऑर्डर पर घर जैसा भोजन देते हैं, अपनी सामग्री से या ग्राहक की सामग्री से।', 'इन शर्तों में "हम" का अर्थ भगवती केटरर्स और "आप" का अर्थ इस वेबसाइट का उपयोग करने वाला या हमारे यहाँ पूछताछ/ऑर्डर करने वाला व्यक्ति है।'] },
        { h: '2. वेबसाइट का स्वरूप', p: ['यह वेबसाइट हमारी सेवाओं की जानकारी देती है और आपको फ़ोन या WhatsApp से हमसे संपर्क करने में मदद करती है।', 'यह बुकिंग या भुगतान पोर्टल नहीं है और हम ऑनलाइन भुगतान नहीं लेते। कोटेशन फ़ॉर्म आपके लिए WhatsApp संदेश तैयार करता है; वह हमारे पास तभी पहुँचता है जब आप उसे स्वयं भेजते हैं। वेबसाइट का उपयोग करने का अर्थ है कि आप इन शर्तों को मानते हैं।'] },
        { h: '3. कोटेशन और कीमत', ul: ['हम इस वेबसाइट पर दरें (कीमतें) प्रकाशित नहीं करते। दरें आयोजन, मेन्यू, मेहमानों की संख्या, स्थान और तारीख पर निर्भर करती हैं।', 'हमारा दिया कोटेशन एक अनुमान है। जब तक हम उसे लिखित में (WhatsApp संदेश मान्य) पक्का न करें, वह बाध्यकारी ऑर्डर नहीं है।', 'कर (जैसे GST) कानून के अनुसार जहाँ लागू हों, वहाँ लगेंगे और कोटेशन/बिल में स्पष्ट बताए जाएँगे।'] },
        { h: '4. ऑर्डर पक्का करना, एडवांस और रद्द करना', ul: ['ऑर्डर तभी पक्का माना जाएगा जब हम आपको लिखित में (WhatsApp संदेश मान्य) बताएँ कि वह पक्का है।', 'एडवांस की राशि, भुगतान की समय-सारणी और रद्द करने/रिफ़ंड की शर्तें ऑर्डर पक्का होने से पहले लिखित में तय की जाती हैं। इस वेबसाइट पर हमने कोई राशि या प्रतिशत तय नहीं किया है।', 'रद्द करने पर यदि कोई राशि रखी जाती है, तो वह केवल हमारी वास्तविक और उचित हानि तक सीमित होगी (भारतीय संविदा अधिनियम, 1872 की धारा 74 के अनुसार)। अनुचित दंड नहीं लिया जाएगा।', 'तारीख या मेन्यू बदलना हो तो कृपया जल्द से जल्द बताएँ।'] },
        { h: '5. मेन्यू, व्यंजन सूची और तस्वीरें', ul: ['हमारा सारा भोजन शुद्ध शाकाहारी है। हम मांसाहारी व्यंजन नहीं देते।', 'वेबसाइट पर व्यंजन सूची उदाहरण के लिए है। असली मेन्यू आपसे बात करके तय होता है।', 'वेबसाइट की तस्वीरें प्रतिनिधि चित्र हैं (कुछ हमारे अपने व्यंजनों की नहीं हैं)। असली व्यंजन थोड़ा अलग दिख सकता है। तस्वीरों का श्रेय "श्रेय" पृष्ठ पर है।'] },
        { h: '6. एलर्जी और खान-पान की ज़रूरतें', p: ['यदि आपको या आपके मेहमानों को किसी चीज़ से एलर्जी है (जैसे मूँगफली, मेवे, दूध, गेहूँ) या विशेष आहार है (जैन, उपवास, मधुमेह आदि), तो ऑर्डर देने से पहले हमें स्पष्ट बताएँ।', 'हमारी रसोई में कई सामग्रियाँ संभाली जाती हैं, इसलिए विशेष रूप से तय किए बिना हम पूरी तरह एलर्जी-मुक्त रसोई की गारंटी नहीं दे सकते। ज़रूरत हो तो हम इसे लिखित में तय करेंगे।'] },
        { h: '7. आपकी सामग्री से खाना बनाना', ul: ['यदि आप अपनी सामग्री देते हैं, तो उसकी गुणवत्ता, ताज़गी, मात्रा और सुरक्षा की ज़िम्मेदारी आपकी है। जो आप देते हैं, हम उससे खाना बनाते हैं।', 'सामग्री खराब, कम या अनुपयुक्त लगे तो हम आपको बताएँगे। दी गई सामग्री से हुई कमी या स्वाद के अंतर की ज़िम्मेदारी हमारी नहीं होगी।', 'सामग्री कब, कहाँ और कैसे सौंपी जाएगी, यह पहले तय कर लें।'] },
        { h: '8. खाद्य सुरक्षा और FSSAI', p: ['हम FSSAI प्रमाणित हैं और खाद्य सुरक्षा और मानक अधिनियम, 2006 तथा उसके नियमों का पालन करने का प्रयास करते हैं। हमारा FSSAI लाइसेंस नंबर इस वेबसाइट के फ़ुटर में दिया गया है।', 'पका हुआ भोजन सुरक्षित समय में खाया जाए, उचित तापमान पर रखा जाए और साफ़ बर्तनों में परोसा जाए, इसके बारे में हम सलाह देते हैं। कार्यक्रम स्थल पर भी इसका पालन करें।'] },
        { h: '9. मेहमानों की संख्या', ul: ['कोटेशन आपके बताए अनुमानित आँकड़े पर आधारित होता है।', 'कार्यक्रम से पहले तय समय में अंतिम संख्या हमें बताएँ। उसके बाद के बदलाव संभव हुए तो किए जाएँगे, पर हर बार संभव नहीं होते और राशि बदल सकती है।', 'तय संख्या से अधिक मेहमान आने पर अतिरिक्त भोजन उपलब्ध होना ज़रूरी नहीं है।'] },
        { h: '10. समय, स्थान और आपकी ज़िम्मेदारियाँ', ul: ['भोजन परोसने का समय, पहुँचने का समय और कार्यक्रम स्थल पहले लिखित में तय करें।', 'खाना पकाने की जगह, पानी, बिजली, गैस, पार्किंग या प्रवेश की व्यवस्था कौन करेगा, यह ज़रूरत होने पर पहले तय किया जाएगा ("आपसी सहमति से")।', 'स्थल की अनुमति, वहाँ प्रवेश और काम के लिए सुरक्षित वातावरण आपकी ज़िम्मेदारी है।'] },
        { h: '11. हमारे नियंत्रण से बाहर की स्थितियाँ', p: ['हमारे नियंत्रण से बाहर के कारणों (जैसे प्राकृतिक आपदा, भारी बारिश, दंगा या कर्फ़्यू, सरकारी आदेश, बिजली या पानी बंद होना, दुर्घटना, बीमारी) से सेवा देना संभव न हो या देरी हो, तो हम तुरंत बताएँगे और विकल्प या उचित रिफ़ंड पर विचार करेंगे। ऐसी स्थिति में हमें दोषी नहीं माना जाएगा।'] },
        { h: '12. ज़िम्मेदारी की सीमा', p: ['हमारी ज़िम्मेदारी उसी सीमा तक है जहाँ तक कानून अनुमति देता है। हमारी सेवा में कमी से हुई प्रत्यक्ष हानि की ज़िम्मेदारी हम लेंगे, पर अप्रत्यक्ष या परिणामी हानि की नहीं।', 'इन शर्तों से कोई ऐसी ज़िम्मेदारी समाप्त नहीं होती जिसे कानून समाप्त नहीं करने देता, और उपभोक्ता संरक्षण अधिनियम, 2019 के तहत आपके उपभोक्ता अधिकार कम नहीं होते।', 'यह वेबसाइट "जैसी है" वैसी दी गई है। हम यह वादा नहीं करते कि वह हमेशा त्रुटि-रहित या निर्बाध चलेगी।'] },
        { h: '13. बौद्धिक संपदा', p: ['वेबसाइट का पाठ, लोगो, डिज़ाइन और मौलिक कलाकृति भगवती केटरर्स की है। हमारी लिखित अनुमति के बिना व्यावसायिक उपयोग के लिए उनकी नकल न करें।', 'कुछ तस्वीरें और फ़ॉन्ट तीसरे पक्षों के हैं और उनके अपने लाइसेंस के अंतर्गत उपयोग किए गए हैं। उनके श्रेय और लाइसेंस "श्रेय" पृष्ठ पर हैं।'] },
        { h: '14. वेबसाइट का उचित उपयोग', ul: ['वेबसाइट का उपयोग केवल कानूनी उद्देश्यों के लिए करें।', 'झूठी जानकारी, अपमानजनक सामग्री या स्पैम न भेजें।', 'वेबसाइट के संचालन में बाधा न डालें और उसमें अनधिकृत प्रवेश का प्रयास न करें।', 'WhatsApp पर भेजी जाने वाली जानकारी सही रखें।'] },
        { h: '15. अन्य वेबसाइटों के लिंक', p: ['इस वेबसाइट पर WhatsApp और Google Maps के लिंक हैं। उन पर क्लिक करने से आप हमारी वेबसाइट छोड़कर उन सेवाओं पर जाते हैं। वे अपनी शर्तों, गोपनीयता नीति और कुकीज़ का उपयोग करती हैं। उन पर हमारा नियंत्रण नहीं है और उनकी सामग्री या तरीकों की ज़िम्मेदारी हमारी नहीं है।'] },
        { h: '16. शर्तों में बदलाव', p: ['हम इन शर्तों को समय-समय पर बदल सकते हैं। बदली हुई शर्तें इसी पृष्ठ पर प्रकाशित होंगी और ऊपर "अंतिम अद्यतन" की तारीख बदलेगी। बदलाव के बाद वेबसाइट का उपयोग जारी रखने पर नई शर्तें मान्य मानी जाएँगी। पहले से पक्के हुए ऑर्डर पर पक्का करते समय तय की गई लिखित शर्तें लागू रहेंगी।'] },
        { h: '17. लागू कानून और न्यायालय', p: ['इन शर्तों पर भारतीय कानून लागू है। विवाद को हम पहले बातचीत से सुलझाने का प्रयास करेंगे। न सुलझे तो लातूर, महाराष्ट्र के सक्षम न्यायालयों का अधिकार-क्षेत्र होगा।', 'इससे उपभोक्ता संरक्षण अधिनियम, 2019 के तहत उपभोक्ता आयोग (जिला, राज्य या राष्ट्रीय) में जाने का आपका कानूनी अधिकार कम नहीं होता।'] },
        { h: '18. शिकायत और संपर्क', p: ['कोई शिकायत या प्रश्न हो तो नीचे दिए संपर्क पर बताएँ। हम जल्द से जल्द उत्तर देने का प्रयास करते हैं।'] },
      ],
    },
  },

  // ------------------------------------------------------------------ PRIVACY
  privacy: {
    mr: {
      metaTitle: 'गोपनीयता धोरण',
      metaDescription: 'भगवती केटरर्स, लातूर: आम्ही कोणती माहिती घेतो, का घेतो, किती काळ ठेवतो, आणि तुमचे अधिकार. वेबसाइट स्वतः काहीही गोळा करत नाही.',
      title: 'गोपनीयता धोरण',
      lead: 'तुमची माहिती आम्ही कशी हाताळतो, हे सोप्या भाषेत. या वेबसाइटवर कोणतेही ट्रॅकिंग नाही.',
      summary: [
        'ही वेबसाइट स्वतः तुमची कोणतीही माहिती गोळा किंवा साठवत नाही. कोटेशन फॉर्म फक्त WhatsApp संदेश तयार करतो; तो तुम्ही पाठवल्यावरच आमच्याकडे येतो.',
        'तुम्ही फोन किंवा WhatsApp वर स्वतः दिलेली माहिती (नाव, फोन, कार्यक्रमाचा तपशील) आम्ही फक्त तुमच्या चौकशीसाठी आणि ऑर्डरसाठी वापरतो.',
        'आम्ही तुमची माहिती विकत नाही. जाहिरात, ॲनालिटिक्स किंवा ट्रॅकिंग नाही.',
        'तुम्ही माहिती पाहणे, दुरुस्ती किंवा हटवणे मागू शकता: फोन, WhatsApp किंवा पत्त्यावर.',
      ],
      sections: [
        { h: '१. आम्ही कोण आहोत', p: ['भगवती केटरर्स, जुल्हेलाल मार्ग, नारायण नगर, लातूर ४१३५३१, महाराष्ट्र. मालक: शांतीलाल महाराज. तुमची वैयक्तिक माहिती कोणत्या हेतूसाठी आणि कशी वापरायची हे आम्हीच ठरवतो (म्हणजे आम्ही "डेटा फिड्युशरी" आहोत).'] },
        { h: '२. आम्ही कोणती माहिती घेतो', p: ['ही वेबसाइट स्वतः कोणतीही वैयक्तिक माहिती गोळा करत नाही. येथे लॉगिन, खाते, ऑनलाइन पेमेंट किंवा सर्व्हरवर माहिती पाठवणारा फॉर्म नाही. कोटेशन फॉर्ममध्ये लिहिलेली माहिती तुमच्या ब्राउझरमध्येच राहते आणि फक्त तुमच्यासाठी WhatsApp संदेश तयार करण्यासाठी वापरली जाते. तुम्ही तो संदेश पाठवला तरच आमच्याकडे येतो.', 'तुम्ही स्वेच्छेने आम्हाला फोन, WhatsApp किंवा प्रत्यक्ष भेटीत सांगितलेली माहिती आम्ही घेतो:'],
        ul: ['नाव आणि फोन नंबर', 'कार्यक्रमाचा प्रकार, तारीख, ठिकाण/गाव, पाहुण्यांची अंदाजे संख्या', 'जेवणाची आवड, ॲलर्जी किंवा आहाराच्या गरजा, तुमचे साहित्य देणार असाल तर त्याची माहिती', 'तुम्ही संदेशात स्वतः लिहिलेली इतर माहिती'] },
        { h: '३. आम्ही ती कशासाठी वापरतो', ul: ['तुमच्या चौकशीला उत्तर देणे आणि कोटेशन तयार करणे', 'तुमची ऑर्डर पूर्ण करणे (नियोजन, स्वयंपाक, वितरण, पैशांचा हिशेब)', 'कायद्याने आवश्यक असलेले कर आणि हिशेबाचे रेकॉर्ड ठेवणे', 'अन्नसुरक्षा आणि ऑर्डरचा मागोवा (काही तक्रार आल्यास कोणते जेवण कोणाला दिले हे तपासता यावे म्हणून)', 'तुमच्या तक्रारी आणि हक्कांच्या विनंत्यांना उत्तर देणे'], p: ['आम्ही तुमचा फोन नंबर थेट जाहिराती किंवा प्रचारासाठी वापरत नाही.'] },
        { h: '४. कायदेशीर आधार', p: ['तुम्ही स्वेच्छेने आमच्याशी संपर्क करून माहिती देता, तेव्हा त्या विशिष्ट हेतूसाठी तुमची संमती असते. डिजिटल पर्सनल डेटा प्रोटेक्शन ॲक्ट, २०२३ (DPDP Act) नुसार तुम्ही स्वतःहून दिलेल्या माहितीवर, ज्या हेतूसाठी दिली तो पूर्ण करण्यासाठी, प्रक्रिया करणे ही मान्य "कायदेशीर वापराची" बाब आहे. कर, हिशेब आणि अन्नसुरक्षेसारख्या कायदेशीर बंधनांसाठीही आम्हाला काही रेकॉर्ड ठेवावे लागतात. तुम्ही संमती कधीही मागे घेऊ शकता (संपर्क खाली); त्यावर आम्ही पुढील वापर थांबवू, मात्र कायद्याने ठेवणे आवश्यक असलेले रेकॉर्ड ठेवावे लागतील.', 'DPDP कायदा आणि नियम २०२५ टप्प्याटप्प्याने लागू होत आहेत (मुख्य बंधने १३ मे २०२७ पासून अपेक्षित). तोपर्यंत आणि नंतरही आम्ही या धोरणातील पद्धतींचे पालन करू.'] },
        { h: '५. विक्री नाही', p: ['आम्ही तुमची वैयक्तिक माहिती कोणालाही विकत नाही किंवा भाड्याने देत नाही.'] },
        { h: '६. माहिती कोणाशी शेअर होते', ul: ['WhatsApp (Meta): तुम्ही WhatsApp वापरता तेव्हा तुमचे संदेश त्या सेवेवरून जातात.', 'आमचे कर्मचारी आणि मदतनीस जे तुमच्या ऑर्डरवर काम करतात, फक्त आवश्यक तेवढी माहिती.', 'वेबसाइट होस्टिंग सेवा: ती वेबसाइट चालवताना तांत्रिक नोंदी (उदा. IP पत्ता) ठेवू शकते. सध्या वेबसाइट Cloudflare Pages वर ठेवण्याची योजना आहे. आम्ही त्या नोंदी पाहत किंवा वापरत नाही.', 'कायद्याने किंवा सरकारी/न्यायालयाच्या आदेशाने आवश्यक असेल तेव्हा सक्षम प्राधिकरणांना.'] },
        { h: '७. आम्ही माहिती कुठे ठेवतो आणि सुरक्षा', p: ['ग्राहकांच्या चौकशी आणि ऑर्डरची माहिती मालक आपल्या खाजगी व्यवस्थापन डॅशबोर्डमध्ये (/admin) व्यवसाय चालवण्यासाठी ठेवतात. हा डॅशबोर्ड फक्त मालकांसाठी आहे, पब्लिकसाठी नाही.', 'प्रत्यक्षात असलेले उपाय: डॅशबोर्ड PIN ने लॉक होतो; माहिती मालकाच्या स्वतःच्या फोन/उपकरणात ब्राउझर स्टोरेजमध्ये राहते; मालकाने निवडल्यास ती त्यांच्या स्वतःच्या Supabase क्लाउड प्रोजेक्टमध्येही सिंक होऊ शकते.', 'कोणतीही यंत्रणा १००% सुरक्षित नसते आणि आम्ही संपूर्ण सुरक्षेची हमी देऊ शकत नाही, पण वाजवी काळजी घेतो. माहितीचा गैरवापर किंवा चोरी झाल्याचे लक्षात आल्यास कायद्यानुसार योग्य ती कार्यवाही करू.'] },
        { h: '८. माहिती किती काळ ठेवतो', p: ['चौकशी आणि ऑर्डरची माहिती व्यवसायासाठी आवश्यक असेल तोपर्यंत आणि कर/हिशेब/अन्नसुरक्षेसारख्या कायद्यांनी आवश्यक तेवढा काळ ठेवली जाते. गरज संपल्यानंतर ती हटवली जाते किंवा ओळख पुसून टाकली जाते. तुम्ही विनंती केल्यास, कायद्याने ठेवणे आवश्यक नसलेली माहिती आम्ही हटवू. (ठराविक वर्षांचा कालावधी मालक निश्चित करून येथे जोडतील.)'] },
        { h: '९. तुमचे अधिकार', p: ['DPDP कायद्याच्या तत्त्वांनुसार तुम्ही आम्हाला पुढील विनंत्या करू शकता:'], ul: ['तुमची कोणती माहिती आमच्याकडे आहे आणि तिचा काय वापर होतो याचा सारांश मागणे', 'चुकीची किंवा अपूर्ण माहिती दुरुस्त/पूर्ण करणे', 'माहिती हटवणे (कायद्याने ठेवणे आवश्यक नसेल तर)', 'तुमचे निधन किंवा अक्षमता झाल्यास तुमचे हक्क वापरण्यासाठी दुसऱ्या व्यक्तीचे नामनिर्देशन करणे', 'तक्रार निवारण: खालील संपर्कावर तक्रार करा'] },
        { h: '१०. विनंती कशी करायची', p: ['फोन, WhatsApp किंवा पत्त्यावर तुमची विनंती सांगा. तुमची ओळख खात्री करण्यासाठी आम्ही काही माहिती विचारू शकतो. आम्ही शक्य तितक्या लवकर उत्तर देऊ. आमचे उत्तर समाधानकारक न वाटल्यास, DPDP कायदा पूर्णपणे लागू झाल्यावर तुम्ही Data Protection Board of India कडे तक्रार करू शकता (आधी आमच्याकडे तक्रार करणे अपेक्षित आहे).'] },
        { h: '११. लहान मुलांची माहिती', p: ['ही वेबसाइट लहान मुलांसाठी नाही आणि आम्ही वेबसाइटवरून मुलांची (१८ वर्षांखालील) माहिती जाणूनबुजून घेत नाही. तुमच्या मुलाची माहिती चुकून आमच्याकडे आली असेल तर कळवा, आम्ही ती हटवू. कार्यक्रम (उदा. वाढदिवस) असेल तर पालकांनीच आमच्याशी संपर्क करणे अपेक्षित आहे.'] },
        { h: '१२. भारताबाहेर प्रक्रिया', p: ['तुम्ही WhatsApp वर संदेश पाठवता, तेव्हा तो Meta च्या सेवेद्वारे भारताबाहेरील सर्व्हरवर प्रक्रिया होऊ शकतो. हे WhatsApp च्या स्वतःच्या धोरणानुसार होते. मालकाने क्लाउड सिंक वापरल्यास माहिती Supabase प्रोजेक्टच्या निवडलेल्या प्रदेशात (भारतात किंवा इतरत्र) ठेवली जाऊ शकते.'] },
        { h: '१३. तृतीय पक्ष सेवा, ट्रॅकिंग नाही', p: ['ही वेबसाइट ॲनालिटिक्स, जाहिरात, सोशल मीडिया पिक्सेल किंवा कोणतीही तृतीय पक्षाची स्क्रिप्ट वापरत नाही आणि तुम्हाला ट्रॅक करत नाही. फॉन्ट आणि फोटो आमच्या स्वतःच्या सर्व्हरवरून येतात.', 'WhatsApp आणि Google Maps चे दुवे क्लिक केल्यावर तुम्ही त्या कंपन्यांच्या सेवांवर जाता आणि त्यांचे स्वतःचे गोपनीयता धोरण लागू होते.', 'भविष्यात आम्ही ॲनालिटिक्स किंवा माहिती साठवणारा फॉर्म जोडल्यास, ते सुरू करण्यापूर्वी हे धोरण बदलू आणि आवश्यक तेथे तुमची संमती घेऊ.'] },
        { h: '१४. या धोरणातील बदल', p: ['हे धोरण बदलल्यास नवीन आवृत्ती याच पृष्ठावर प्रसिद्ध होईल आणि वर "शेवटचा बदल" तारीख बदलेल.'] },
        { h: '१५. तक्रार आणि संपर्क', p: ['तुमच्या माहितीबाबत कोणतीही तक्रार किंवा विनंती खालील संपर्कावर करा.'] },
      ],
    },
    en: {
      metaTitle: 'Privacy Policy',
      metaDescription: 'Bhagwati Caterers, Latur: what information we receive, why, how long we keep it, and your rights. This website itself collects nothing and has no tracking.',
      title: 'Privacy Policy',
      lead: 'How we handle your information, in plain language. This website has no tracking.',
      summary: [
        'This website itself does not collect or store your personal information. The quote form only prepares a WhatsApp message; it reaches us only when you send it.',
        'What you tell us yourself by phone or WhatsApp (name, phone, event details) is used only for your enquiry and order.',
        'We do not sell your information. No advertising, analytics or tracking.',
        'You can ask to see, correct or delete your information: by phone, WhatsApp or at our address.',
      ],
      sections: [
        { h: '1. Who we are', p: ['Bhagwati Caterers, Julhelal Marg, Narayan Nagar, Latur 413531, Maharashtra. Owner: Shanti Lal Maharaj. We decide why and how your personal information is used (in legal terms, we are the "data fiduciary").'] },
        { h: '2. What we receive', p: ['This website itself does not collect any personal information. There is no login, account, online payment or form that sends data to a server. What you type in the quote form stays in your browser and is used only to prepare a WhatsApp message for you. It reaches us only if you send that message.', 'We receive what you choose to tell us by phone, WhatsApp or in person:'],
        ul: ['Name and phone number', 'Event type, date, place or town, approximate number of guests', 'Food preferences, allergies or dietary needs, and details of any material you will supply', 'Anything else you write in your message'] },
        { h: '3. What we use it for', ul: ['Replying to your enquiry and preparing a quote', 'Carrying out your order (planning, cooking, delivery, payment accounts)', 'Keeping tax and accounting records that the law requires', 'Food safety and order traceability (so that, if a complaint arises, we can check what was served and to whom)', 'Replying to your complaints and rights requests'], p: ['We do not use your phone number for advertising or promotion.'] },
        { h: '4. Legal basis', p: ['When you voluntarily contact us and give information, that is your consent for that specific purpose. Under the Digital Personal Data Protection Act, 2023 (DPDP Act), using information you voluntarily give for the purpose for which you gave it is also a recognised "legitimate use". We also have to keep some records under tax, accounting and food-safety laws. You can withdraw consent at any time (contact details below); we will then stop further use, but we must keep records that the law requires us to keep.', 'The DPDP Act and the DPDP Rules, 2025 are being brought into force in phases (the main obligations are expected from 13 May 2027). We follow the practices in this policy now and will continue to do so.'] },
        { h: '5. No selling', p: ['We do not sell or rent your personal information to anyone.'] },
        { h: '6. Who it is shared with', ul: ['WhatsApp (Meta): when you use WhatsApp, your messages pass through that service.', 'Our staff and helpers who work on your order, and only what they need to know.', 'Website hosting service: it may keep technical logs (such as IP addresses) while serving the website. We plan to host on Cloudflare Pages. We do not look at or use those logs.', 'Authorities, when required by law or by a government or court order.'] },
        { h: '7. Where we keep it and security', p: ['Customer enquiry and order details are kept by the owner, for running the business, in a private management dashboard (/admin). That dashboard is for the owner only, not for the public.', 'Measures actually in place: the dashboard is locked with a PIN; the data is held in browser storage on the owner\'s own phone or device; and, if the owner chooses, it can also sync to the owner\'s own Supabase cloud project.', 'No system is 100% secure and we cannot promise complete security, but we take reasonable care. If we find that information has been misused or stolen, we will act as the law requires.'] },
        { h: '8. How long we keep it', p: ['Enquiry and order records are kept for as long as the business needs them and as long as tax, accounting and food-safety laws require. When they are no longer needed they are deleted or anonymised. If you ask, we will delete information that the law does not require us to keep. (The owner will decide a fixed number of years and add it here.)'] },
        { h: '9. Your rights', p: ['In line with the principles of the DPDP Act, you may ask us for:'], ul: ['A summary of the personal information we hold about you and how it is used', 'Correction or completion of wrong or incomplete information', 'Deletion of your information (unless the law requires us to keep it)', 'Nomination of another person to exercise your rights if you die or are unable to', 'Grievance redressal: complain to us using the contact details below'] },
        { h: '10. How to make a request', p: ['Tell us your request by phone, WhatsApp or at our address. We may ask for some details to confirm who you are. We will reply as soon as we can. If you are not satisfied, once the DPDP Act is fully in force you may complain to the Data Protection Board of India (you are expected to complain to us first).'] },
        { h: '11. Children', p: ['This website is not meant for children and we do not knowingly collect information about children (under 18) through it. If you think a child\'s information has reached us by mistake, tell us and we will delete it. For events such as birthdays, we expect a parent or guardian to contact us.'] },
        { h: '12. Processing outside India', p: ['When you message us on WhatsApp, the message may be processed by Meta on servers outside India, under WhatsApp\'s own policies. If the owner uses cloud sync, data may be held in the region chosen for the Supabase project (in India or elsewhere).'] },
        { h: '13. Third-party services and no tracking', p: ['This website does not use analytics, advertising, social-media pixels or any third-party scripts, and does not track you. Fonts and photographs are served from our own server.', 'When you click the links to WhatsApp or Google Maps, you go to those companies\' services and their own privacy policies apply.', 'If we add analytics or a form that stores data in future, we will update this policy before it starts and, where needed, ask for your consent.'] },
        { h: '14. Changes to this policy', p: ['If this policy changes, the new version will be published on this page and the "Last updated" date above will change.'] },
        { h: '15. Grievances and contact', p: ['For any complaint or request about your information, please use the contact details below.'] },
      ],
    },
    hi: {
      metaTitle: 'गोपनीयता नीति',
      metaDescription: 'भगवती केटरर्स, लातूर: हम कौन सी जानकारी लेते हैं, क्यों, कितने समय रखते हैं और आपके अधिकार। वेबसाइट स्वयं कुछ एकत्र नहीं करती।',
      title: 'गोपनीयता नीति',
      lead: 'हम आपकी जानकारी कैसे संभालते हैं, सरल भाषा में। इस वेबसाइट पर कोई ट्रैकिंग नहीं है।',
      summary: [
        'यह वेबसाइट स्वयं आपकी कोई व्यक्तिगत जानकारी एकत्र या संग्रहीत नहीं करती। कोटेशन फ़ॉर्म केवल WhatsApp संदेश तैयार करता है; वह तभी हमारे पास आता है जब आप उसे भेजते हैं।',
        'फ़ोन या WhatsApp पर आप जो जानकारी स्वयं देते हैं (नाम, फ़ोन, आयोजन का विवरण), उसे हम केवल आपकी पूछताछ और ऑर्डर के लिए उपयोग करते हैं।',
        'हम आपकी जानकारी बेचते नहीं हैं। कोई विज्ञापन, एनालिटिक्स या ट्रैकिंग नहीं।',
        'आप अपनी जानकारी देखने, सुधारने या हटाने को कह सकते हैं: फ़ोन, WhatsApp या पते पर।',
      ],
      sections: [
        { h: '1. हम कौन हैं', p: ['भगवती केटरर्स, जुल्हेलाल मार्ग, नारायण नगर, लातूर 413531, महाराष्ट्र। मालिक: शांतिलाल महाराज। आपकी व्यक्तिगत जानकारी का उपयोग किस उद्देश्य से और कैसे हो, यह हम ही तय करते हैं (कानूनी भाषा में हम "डेटा फिड्यूशरी" हैं)।'] },
        { h: '2. हम कौन सी जानकारी लेते हैं', p: ['यह वेबसाइट स्वयं कोई व्यक्तिगत जानकारी एकत्र नहीं करती। यहाँ लॉगिन, खाता, ऑनलाइन भुगतान या सर्वर को डेटा भेजने वाला फ़ॉर्म नहीं है। कोटेशन फ़ॉर्म में आप जो लिखते हैं वह आपके ब्राउज़र में ही रहता है और केवल आपके लिए WhatsApp संदेश बनाने में काम आता है। वह हमारे पास तभी आता है जब आप संदेश भेजते हैं।', 'फ़ोन, WhatsApp या सीधी मुलाक़ात में आप स्वेच्छा से जो बताते हैं, वह हम लेते हैं:'],
        ul: ['नाम और फ़ोन नंबर', 'आयोजन का प्रकार, तारीख, स्थान/शहर, मेहमानों की अनुमानित संख्या', 'खाने की पसंद, एलर्जी या आहार संबंधी ज़रूरतें, और यदि आप सामग्री देंगे तो उसका विवरण', 'आप अपने संदेश में स्वयं जो कुछ और लिखते हैं'] },
        { h: '3. हम इसका उपयोग किसलिए करते हैं', ul: ['आपकी पूछताछ का उत्तर देना और कोटेशन बनाना', 'आपका ऑर्डर पूरा करना (योजना, खाना बनाना, पहुँचाना, भुगतान का हिसाब)', 'कानून द्वारा आवश्यक कर और लेखा रिकॉर्ड रखना', 'खाद्य सुरक्षा और ऑर्डर की पहचान (कोई शिकायत आने पर यह जाँचने के लिए कि क्या और किसे परोसा गया)', 'आपकी शिकायतों और अधिकार-संबंधी अनुरोधों का उत्तर देना'], p: ['हम आपका फ़ोन नंबर विज्ञापन या प्रचार के लिए उपयोग नहीं करते।'] },
        { h: '4. कानूनी आधार', p: ['जब आप स्वेच्छा से हमसे संपर्क करके जानकारी देते हैं, तो उस विशेष उद्देश्य के लिए वह आपकी सहमति होती है। डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 (DPDP Act) के अनुसार, आपके स्वेच्छा से दी गई जानकारी का उसी उद्देश्य के लिए उपयोग एक मान्य "वैध उपयोग" भी है। कर, लेखा और खाद्य सुरक्षा के कानूनों के कारण हमें कुछ रिकॉर्ड रखने भी पड़ते हैं। आप किसी भी समय सहमति वापस ले सकते हैं (संपर्क नीचे); तब हम आगे का उपयोग रोक देंगे, पर कानूनन आवश्यक रिकॉर्ड रखने होंगे।', 'DPDP अधिनियम और DPDP नियम, 2025 चरणबद्ध रूप से लागू हो रहे हैं (मुख्य दायित्व 13 मई 2027 से अपेक्षित हैं)। हम इस नीति की पद्धतियों का अभी से पालन करते हैं और आगे भी करेंगे।'] },
        { h: '5. बिक्री नहीं', p: ['हम आपकी व्यक्तिगत जानकारी किसी को बेचते या किराये पर नहीं देते।'] },
        { h: '6. जानकारी किसके साथ साझा होती है', ul: ['WhatsApp (Meta): जब आप WhatsApp का उपयोग करते हैं, आपके संदेश उसी सेवा से गुज़रते हैं।', 'हमारे कर्मचारी और सहायक जो आपके ऑर्डर पर काम करते हैं, केवल उतनी जानकारी जितनी ज़रूरी हो।', 'वेबसाइट होस्टिंग सेवा: वेबसाइट चलाते समय वह तकनीकी लॉग (जैसे IP पता) रख सकती है। अभी वेबसाइट को Cloudflare Pages पर रखने की योजना है। हम उन लॉग को न देखते हैं, न उपयोग करते हैं।', 'कानून या सरकारी/न्यायालय के आदेश से आवश्यक होने पर सक्षम प्राधिकरणों के साथ।'] },
        { h: '7. जानकारी कहाँ रखी जाती है और सुरक्षा', p: ['ग्राहकों की पूछताछ और ऑर्डर का विवरण मालिक अपने निजी प्रबंधन डैशबोर्ड (/admin) में व्यवसाय चलाने के लिए रखते हैं। यह डैशबोर्ड केवल मालिक के लिए है, जनता के लिए नहीं।', 'वास्तव में मौजूद उपाय: डैशबोर्ड PIN से लॉक होता है; डेटा मालिक के अपने फ़ोन/उपकरण के ब्राउज़र स्टोरेज में रहता है; और मालिक चाहें तो वह उनके अपने Supabase क्लाउड प्रोजेक्ट में भी सिंक हो सकता है।', 'कोई भी प्रणाली 100% सुरक्षित नहीं होती और हम पूर्ण सुरक्षा का वादा नहीं कर सकते, पर हम उचित सावधानी बरतते हैं। जानकारी का दुरुपयोग या चोरी पता चलने पर हम कानून के अनुसार कार्रवाई करेंगे।'] },
        { h: '8. जानकारी कितने समय रखी जाती है', p: ['पूछताछ और ऑर्डर के रिकॉर्ड तब तक रखे जाते हैं जब तक व्यवसाय को उनकी ज़रूरत हो और जब तक कर, लेखा और खाद्य सुरक्षा के कानून माँगें। ज़रूरत खत्म होने पर उन्हें हटा दिया जाता है या पहचान मिटा दी जाती है। आप कहें तो कानूनन रखना आवश्यक न हो, ऐसी जानकारी हम हटा देंगे। (वर्षों की निश्चित अवधि मालिक तय करके यहाँ जोड़ेंगे।)'] },
        { h: '9. आपके अधिकार', p: ['DPDP अधिनियम के सिद्धांतों के अनुसार आप हमसे ये माँग सकते हैं:'], ul: ['हमारे पास आपकी कौन सी जानकारी है और उसका क्या उपयोग होता है, इसका सारांश', 'गलत या अधूरी जानकारी को सुधारना या पूरा करना', 'आपकी जानकारी हटाना (जब तक कानून रखना आवश्यक न करे)', 'आपकी मृत्यु या असमर्थता की स्थिति में अपने अधिकारों के उपयोग के लिए किसी अन्य व्यक्ति को नामित करना', 'शिकायत निवारण: नीचे दिए संपर्क पर हमें शिकायत करें'] },
        { h: '10. अनुरोध कैसे करें', p: ['अपना अनुरोध फ़ोन, WhatsApp या पते पर बताएँ। आपकी पहचान की पुष्टि के लिए हम कुछ जानकारी पूछ सकते हैं। हम जल्द से जल्द उत्तर देंगे। संतुष्ट न होने पर, DPDP अधिनियम पूरी तरह लागू होने के बाद आप भारतीय डेटा संरक्षण बोर्ड (Data Protection Board of India) में शिकायत कर सकते हैं (पहले हमें शिकायत करना अपेक्षित है)।'] },
        { h: '11. बच्चे', p: ['यह वेबसाइट बच्चों के लिए नहीं है और हम इसके माध्यम से जानबूझकर बच्चों (18 वर्ष से कम) की जानकारी नहीं लेते। यदि आपको लगे कि किसी बच्चे की जानकारी गलती से हम तक पहुँची है, तो बताएँ, हम उसे हटा देंगे। जन्मदिन जैसे आयोजनों के लिए माता-पिता या अभिभावक से ही संपर्क अपेक्षित है।'] },
        { h: '12. भारत के बाहर प्रसंस्करण', p: ['जब आप WhatsApp पर हमें संदेश भेजते हैं, तो वह Meta द्वारा भारत के बाहर के सर्वरों पर, WhatsApp की अपनी नीतियों के अनुसार, संसाधित हो सकता है। यदि मालिक क्लाउड सिंक का उपयोग करते हैं, तो डेटा Supabase प्रोजेक्ट के चुने हुए क्षेत्र (भारत में या अन्यत्र) में रखा जा सकता है।'] },
        { h: '13. तृतीय-पक्ष सेवाएँ, कोई ट्रैकिंग नहीं', p: ['यह वेबसाइट एनालिटिक्स, विज्ञापन, सोशल मीडिया पिक्सेल या कोई तृतीय-पक्ष स्क्रिप्ट उपयोग नहीं करती और आपको ट्रैक नहीं करती। फ़ॉन्ट और तस्वीरें हमारे अपने सर्वर से आती हैं।', 'WhatsApp और Google Maps के लिंक पर क्लिक करने पर आप उन कंपनियों की सेवाओं पर जाते हैं और उनकी अपनी गोपनीयता नीति लागू होती है।', 'भविष्य में यदि हम एनालिटिक्स या डेटा संग्रहीत करने वाला फ़ॉर्म जोड़ेंगे, तो शुरू करने से पहले यह नीति बदलेंगे और ज़रूरी होने पर आपकी सहमति लेंगे।'] },
        { h: '14. इस नीति में बदलाव', p: ['नीति बदलने पर नया संस्करण इसी पृष्ठ पर प्रकाशित होगा और ऊपर "अंतिम अद्यतन" की तारीख बदलेगी।'] },
        { h: '15. शिकायत और संपर्क', p: ['अपनी जानकारी के बारे में किसी भी शिकायत या अनुरोध के लिए नीचे दिया संपर्क उपयोग करें।'] },
      ],
    },
  },

  // ------------------------------------------------------------------ COOKIES
  cookies: {
    mr: {
      metaTitle: 'कुकी धोरण',
      metaDescription: 'भगवती केटरर्स वेबसाइट कुकीज, ॲनालिटिक्स किंवा ट्रॅकिंग वापरत नाही. तृतीय पक्ष सेवांच्या कुकीज आणि त्या कशा नियंत्रित करायच्या ते येथे वाचा.',
      title: 'कुकी धोरण',
      lead: 'आमची वेबसाइट कुकीज वापरत नाही. येथे नेमके काय खरे आहे ते सांगितले आहे.',
      summary: [
        'ही वेबसाइट स्वतः कुकीज सेट करत नाही.',
        'ॲनालिटिक्स, जाहिरात किंवा ट्रॅकिंग कुकीज/स्क्रिप्ट नाहीत. तुमची भाषा निवड आम्ही साठवत नाही.',
        'WhatsApp किंवा Google Maps उघडल्यास त्या सेवा स्वतःच्या कुकीज वापरू शकतात.',
        'कुकी बॅनर नाही, कारण संमती घ्यावी असे काही सेट होत नाही.',
      ],
      sections: [
        { h: '१. कुकी म्हणजे काय', p: ['कुकी ही वेबसाइट तुमच्या ब्राउझरमध्ये ठेवणारी छोटी फाईल असते. ती तुम्हाला ओळखण्यासाठी किंवा तुमच्या सवयी लक्षात ठेवण्यासाठी वापरली जाऊ शकते. त्यासारखी ब्राउझर स्टोरेज (localStorage) अशी साधनेही असतात.'] },
        { h: '२. आमची वेबसाइट काय करते', ul: ['ही वेबसाइट स्वतः कोणत्याही कुकीज सेट करत नाही.', 'ती ॲनालिटिक्स, जाहिरात किंवा ट्रॅकिंग कुकीज वापरत नाही आणि तृतीय पक्षाच्या स्क्रिप्ट (उदा. Google Analytics, Facebook Pixel) चालवत नाही.', 'ती तुमची भाषा निवड किंवा इतर काहीही तुमच्या ब्राउझरमध्ये साठवत नाही. भाषा बदलणे म्हणजे फक्त दुसऱ्या भाषेच्या पृष्ठावर जाणे.', 'फॉन्ट आणि फोटो आमच्याच सर्व्हरवरून येतात, त्यामुळे ते कुकीज ठेवत नाहीत.'] },
        { h: '३. तृतीय पक्षांच्या कुकीज', p: ['या वेबसाइटवर WhatsApp (wa.me) आणि Google Maps चे दुवे आहेत. त्यावर क्लिक केल्यावर तुम्ही आमची वेबसाइट सोडता आणि त्या सेवा त्यांच्या स्वतःच्या कुकीज आणि तंत्रज्ञान त्यांच्या स्वतःच्या धोरणांनुसार वापरू शकतात. त्यावर आमचे नियंत्रण नाही. त्यांचे धोरण त्यांच्या वेबसाइटवर वाचा.'] },
        { h: '४. मालकांचा /admin डॅशबोर्ड', p: ['/admin येथे फक्त मालकांसाठी एक खाजगी डॅशबोर्ड आहे. तो काम करण्यासाठी मालकाच्या स्वतःच्या उपकरणावर ब्राउझर स्टोरेज (IndexedDB आणि localStorage, उदा. सेटिंग्ज आणि PIN) वापरतो. हे ट्रॅकिंगसाठी नाही आणि पाहुण्यांच्या उपकरणावर लागू होत नाही.'] },
        { h: '५. कुकीज कशा नियंत्रित किंवा हटवायच्या', p: ['तुमच्या ब्राउझरच्या सेटिंग्जमध्ये (Chrome, Safari, Firefox इ.) तुम्ही कुकीज आणि साइट डेटा पाहू, ब्लॉक किंवा हटवू शकता. त्यासाठी ब्राउझरच्या मदत विभागात "कुकीज" शोधा. कुकीज ब्लॉक केल्यास आमच्या वेबसाइटवर काही फरक पडत नाही, पण इतर वेबसाइट्सवर काही गोष्टी चालणार नाहीत.'] },
        { h: '६. भविष्यातील बदल', p: ['जर आम्ही भविष्यात ॲनालिटिक्स, फॉर्म किंवा इतर कुकीज वापरणारी सेवा जोडली, तर ती सुरू करण्यापूर्वी आम्ही संमती बॅनर लावू आणि हे पृष्ठ व गोपनीयता धोरण बदलू. आता कुकीज नसल्यामुळे कुकी संमती बॅनर लावलेला नाही.'] },
        { h: '७. संपर्क', p: ['कुकीज किंवा गोपनीयतेबद्दल प्रश्न असतील तर खालील संपर्कावर विचारा. अधिक माहितीसाठी आमचे गोपनीयता धोरण वाचा.'] },
      ],
    },
    en: {
      metaTitle: 'Cookie Policy',
      metaDescription: 'The Bhagwati Caterers website sets no cookies and has no analytics or tracking. Learn about WhatsApp and Google Maps cookies and how to control them.',
      title: 'Cookie Policy',
      lead: 'Our website does not use cookies. Here is exactly what is true.',
      summary: [
        'This website itself does not set cookies.',
        'No analytics, advertising or tracking cookies or scripts. We do not store your language choice.',
        'If you open WhatsApp or Google Maps, those services may use their own cookies.',
        'There is no cookie banner because nothing is set that needs your consent.',
      ],
      sections: [
        { h: '1. What a cookie is', p: ['A cookie is a small file that a website places in your browser. It can be used to recognise you or remember your habits. Similar tools include browser storage (localStorage).'] },
        { h: '2. What our website does', ul: ['This website itself does not set any cookies.', 'It does not use analytics, advertising or tracking cookies, and does not run third-party scripts (such as Google Analytics or Facebook Pixel).', 'It does not store your language choice or anything else in your browser. Changing language simply takes you to the page in the other language.', 'Fonts and photographs are served from our own server, so they do not set cookies.'] },
        { h: '3. Third-party cookies', p: ['This website has links to WhatsApp (wa.me) and Google Maps. When you click them you leave our website, and those services may use their own cookies and technologies under their own policies. We do not control them. Please read their policies on their websites.'] },
        { h: '4. The owner\'s /admin dashboard', p: ['There is a private dashboard for the owner at /admin. To work, it uses browser storage (IndexedDB and localStorage, for example for settings and the PIN lock) on the owner\'s own device. This is not for tracking and does not apply to the devices of visitors.'] },
        { h: '5. How to control or delete cookies', p: ['In your browser settings (Chrome, Safari, Firefox and others) you can view, block or delete cookies and site data. Search the browser\'s help for "cookies". Blocking cookies makes no difference on our website, but some things on other websites may stop working.'] },
        { h: '6. Future changes', p: ['If we add analytics, a form or another service that uses cookies in future, we will put up a consent banner and update this page and the Privacy Policy before it starts. We have no cookie consent banner now because there are no cookies.'] },
        { h: '7. Contact', p: ['If you have questions about cookies or privacy, please use the contact details below. Please also read our Privacy Policy.'] },
      ],
    },
    hi: {
      metaTitle: 'कुकी नीति',
      metaDescription: 'भगवती केटरर्स वेबसाइट कुकीज़, एनालिटिक्स या ट्रैकिंग का उपयोग नहीं करती। WhatsApp या Google Maps की कुकीज़ और उन्हें नियंत्रित करने का तरीका पढ़ें।',
      title: 'कुकी नीति',
      lead: 'हमारी वेबसाइट कुकीज़ का उपयोग नहीं करती। यहाँ ठीक वही बताया है जो सच है।',
      summary: [
        'यह वेबसाइट स्वयं कुकीज़ सेट नहीं करती।',
        'एनालिटिक्स, विज्ञापन या ट्रैकिंग कुकीज़/स्क्रिप्ट नहीं हैं। हम आपकी भाषा की पसंद संग्रहीत नहीं करते।',
        'WhatsApp या Google Maps खोलने पर वे सेवाएँ अपनी कुकीज़ उपयोग कर सकती हैं।',
        'कुकी बैनर नहीं है, क्योंकि ऐसा कुछ सेट नहीं होता जिसके लिए सहमति चाहिए।',
      ],
      sections: [
        { h: '1. कुकी क्या है', p: ['कुकी एक छोटी फ़ाइल है जो कोई वेबसाइट आपके ब्राउज़र में रखती है। इसका उपयोग आपको पहचानने या आपकी आदतें याद रखने में हो सकता है। ब्राउज़र स्टोरेज (localStorage) जैसे साधन भी ऐसे ही होते हैं।'] },
        { h: '2. हमारी वेबसाइट क्या करती है', ul: ['यह वेबसाइट स्वयं कोई कुकी सेट नहीं करती।', 'यह एनालिटिक्स, विज्ञापन या ट्रैकिंग कुकीज़ का उपयोग नहीं करती और तृतीय-पक्ष स्क्रिप्ट (जैसे Google Analytics, Facebook Pixel) नहीं चलाती।', 'यह आपकी भाषा की पसंद या कुछ और आपके ब्राउज़र में संग्रहीत नहीं करती। भाषा बदलने का मतलब बस दूसरी भाषा के पृष्ठ पर जाना है।', 'फ़ॉन्ट और तस्वीरें हमारे अपने सर्वर से आती हैं, इसलिए वे कुकीज़ नहीं रखतीं।'] },
        { h: '3. तृतीय-पक्ष कुकीज़', p: ['इस वेबसाइट पर WhatsApp (wa.me) और Google Maps के लिंक हैं। उन पर क्लिक करने पर आप हमारी वेबसाइट छोड़ते हैं और वे सेवाएँ अपनी नीतियों के अनुसार अपनी कुकीज़ और तकनीकों का उपयोग कर सकती हैं। उन पर हमारा नियंत्रण नहीं है। उनकी नीति उनकी वेबसाइट पर पढ़ें।'] },
        { h: '4. मालिक का /admin डैशबोर्ड', p: ['/admin पर केवल मालिक के लिए एक निजी डैशबोर्ड है। काम करने के लिए वह मालिक के अपने उपकरण पर ब्राउज़र स्टोरेज (IndexedDB और localStorage, जैसे सेटिंग्स और PIN लॉक) का उपयोग करता है। यह ट्रैकिंग के लिए नहीं है और आगंतुकों के उपकरणों पर लागू नहीं होता।'] },
        { h: '5. कुकीज़ को कैसे नियंत्रित या हटाएँ', p: ['अपने ब्राउज़र की सेटिंग्स (Chrome, Safari, Firefox आदि) में आप कुकीज़ और साइट डेटा देख, ब्लॉक या हटा सकते हैं। ब्राउज़र की सहायता में "कुकीज़" खोजें। कुकीज़ ब्लॉक करने से हमारी वेबसाइट पर कोई फ़र्क नहीं पड़ता, पर दूसरी वेबसाइटों पर कुछ चीज़ें काम करना बंद कर सकती हैं।'] },
        { h: '6. भविष्य के बदलाव', p: ['यदि भविष्य में हम एनालिटिक्स, फ़ॉर्म या कुकीज़ का उपयोग करने वाली कोई और सेवा जोड़ेंगे, तो शुरू करने से पहले हम सहमति बैनर लगाएँगे और यह पृष्ठ तथा गोपनीयता नीति बदलेंगे। अभी कोई कुकी न होने से कुकी सहमति बैनर नहीं लगाया गया है।'] },
        { h: '7. संपर्क', p: ['कुकीज़ या गोपनीयता के बारे में प्रश्न हों तो नीचे दिए संपर्क पर पूछें। कृपया हमारी गोपनीयता नीति भी पढ़ें।'] },
      ],
    },
  },
};
