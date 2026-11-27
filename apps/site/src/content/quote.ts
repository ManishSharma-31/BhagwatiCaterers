import type { Lang } from '../data/site';
import type { QuoteLabels } from '../scripts/quote';
type L3<T = string> = Record<Lang, T>;
export const events: Array<{ key: string } & L3> = [
  { key: 'wedding', mr: 'लग्न', en: 'Wedding', hi: 'विवाह' },
  { key: 'engagement', mr: 'साखरपुडा', en: 'Engagement', hi: 'सगाई' },
  { key: 'haldi', mr: 'हळद', en: 'Haldi', hi: 'हल्दी' },
  { key: 'housewarming', mr: 'गृहप्रवेश', en: 'Housewarming', hi: 'गृहप्रवेश' },
  { key: 'puja', mr: 'पूजा / धार्मिक कार्यक्रम', en: 'Puja / religious function', hi: 'पूजा / धार्मिक कार्यक्रम' },
  { key: 'party', mr: 'वाढदिवस / पार्टी', en: 'Birthday / party', hi: 'जन्मदिन / पार्टी' },
  { key: 'office', mr: 'ऑफिस / संस्थेचा कार्यक्रम', en: 'Office / institution event', hi: 'ऑफिस / संस्था का कार्यक्रम' },
  { key: 'home', mr: 'घरगुती जेवण (ऑर्डरवर)', en: 'Home-style food (on order)', hi: 'घर जैसा भोजन' },
  { key: 'other', mr: 'इतर', en: 'Other', hi: 'अन्य' },
];
export const orderTypes: Array<{ key: string } & L3> = [
  { key: 'ours', mr: 'सर्व साहित्य आमचे (आम्ही सर्व आणतो)', en: 'We bring everything', hi: 'सारी सामग्री हमारी (हम सब लाते हैं)' },
  { key: 'theirs', mr: 'साहित्य तुमचे, स्वयंपाक आमचा', en: 'You provide ingredients, we cook', hi: 'सामग्री आपकी, खाना हमारा' },
  { key: 'unsure', mr: 'अजून ठरले नाही', en: 'Not sure', hi: 'अभी पक्का नहीं' },
];
export const cuisineOpts: Array<{ key: string } & L3> = [
  { key: 'mh', mr: 'महाराष्ट्रीयन', en: 'Maharashtrian', hi: 'महाराष्ट्रीयन' },
  { key: 'si', mr: 'दाक्षिणात्य', en: 'South Indian', hi: 'दक्षिण भारतीय' },
  { key: 'rj', mr: 'राजस्थानी', en: 'Rajasthani', hi: 'राजस्थानी' },
  { key: 'mix', mr: 'मिश्र', en: 'Mixed', hi: 'मिश्रित' },
];
export const otherTown: L3 = { mr: 'इतर', en: 'Other', hi: 'अन्य' };

// The message text is written in the page's language. Option texts above are reused in the message.
export const messageLabels: Record<Lang, QuoteLabels> = {
  mr: {
    greeting: 'नमस्कार, मला केटरिंगसाठी कोटेशन हवे आहे.',
    name: 'नाव', phone: 'फोन', event: 'कार्यक्रम', date: 'तारीख', guests: 'अंदाजे पाहुणे', town: 'गाव/शहर',
    order: 'ऑर्डर प्रकार', cuisine: 'आवडते जेवण', notes: 'टीप', thanks: 'धन्यवाद.',
    errors: { name: 'कृपया तुमचे नाव लिहा.', phone: 'कृपया १० अंकी मोबाइल नंबर लिहा.', event: 'कृपया कार्यक्रमाचा प्रकार निवडा.', guests: 'कृपया पाहुण्यांची अंदाजे संख्या लिहा.' },
  },
  en: {
    greeting: 'Hello, I would like a catering quote.',
    name: 'Name', phone: 'Phone', event: 'Event', date: 'Date', guests: 'Approx. guests', town: 'Town',
    order: 'Order type', cuisine: 'Cuisine', notes: 'Notes', thanks: 'Thank you.',
    errors: { name: 'Please enter your name.', phone: 'Please enter a 10-digit mobile number.', event: 'Please choose the event type.', guests: 'Please enter the approximate number of guests.' },
  },
  hi: {
    greeting: 'नमस्ते, मुझे कैटरिंग के लिए कोटेशन चाहिए।',
    name: 'नाम', phone: 'फ़ोन', event: 'कार्यक्रम', date: 'तारीख', guests: 'अनुमानित मेहमान', town: 'शहर/गाँव',
    order: 'ऑर्डर प्रकार', cuisine: 'पसंदीदा खाना', notes: 'टिप्पणी', thanks: 'धन्यवाद।',
    errors: { name: 'कृपया अपना नाम लिखें।', phone: 'कृपया 10 अंकों का मोबाइल नंबर लिखें।', event: 'कृपया कार्यक्रम का प्रकार चुनें।', guests: 'कृपया मेहमानों की अनुमानित संख्या लिखें।' },
  },
};

export const quote: Record<Lang, Record<string, string>> = {
  mr: {
    metaTitle: 'केटरिंग कोटेशन मागवा, लातूर', metaDescription: 'भगवती केटरर्स, लातूर कडून कोटेशन मागवा: फॉर्म भरा आणि WhatsApp वर संदेश पाठवा. लग्न, समारंभ, पूजेसाठी शुद्ध शाकाहारी केटरिंग.',
    title: 'केटरिंग कोटेशन मागवा', lead: 'खालील माहिती भरा. तुमच्यासाठी WhatsApp संदेश तयार होईल, तो फक्त पाठवा. तुम्ही थेट फोन करूनही सांगू शकता.',
    name: 'तुमचे नाव', phone: 'मोबाइल नंबर', event: 'कार्यक्रमाचा प्रकार', choose: 'निवडा', date: 'कार्यक्रमाची तारीख', guests: 'पाहुण्यांची अंदाजे संख्या',
    town: 'गाव / शहर', order: 'ऑर्डरचा प्रकार', cuisine: 'जेवणाचा प्रकार (एक किंवा अधिक)', notes: 'इतर माहिती (ऐच्छिक)', optional: '(ऐच्छिक)',
    submit: 'WhatsApp वर संदेश तयार करा', privacy: 'तुमची माहिती फक्त तुम्ही पाठवत असलेल्या WhatsApp संदेशात जाते. आम्ही ती या वेबसाइटवर साठवत नाही. अधिक माहिती:',
    doneTitle: 'तुमचा संदेश तयार आहे', doneBody: 'WhatsApp नवीन टॅबमध्ये उघडले आहे. तेथे "पाठवा" दाबा. उघडले नसेल, तर संदेश कॉपी करून WhatsApp वर पाठवा.',
    copy: 'संदेश कॉपी करा', copied: 'संदेश कॉपी झाला.', manual: 'संदेश निवडला आहे, कॉपी करा.', callBtn: 'फोन करा', waBtn: 'WhatsApp उघडा',
    noscript: 'हा फॉर्म वापरण्यासाठी JavaScript आवश्यक आहे. कृपया थेट फोन करा किंवा WhatsApp वर संदेश पाठवा.',
  },
  en: {
    metaTitle: 'Get a Catering Quote, Latur', metaDescription: 'Request a quote from Bhagwati Caterers, Latur: fill the form and send the message on WhatsApp. Pure vegetarian catering for weddings, events and pujas.',
    title: 'Get a Catering Quote', lead: 'Fill in the details below. We prepare a WhatsApp message for you to send. You can also simply call us.',
    name: 'Your name', phone: 'Mobile number', event: 'Type of event', choose: 'Choose', date: 'Event date', guests: 'Approximate number of guests',
    town: 'Town', order: 'Order type', cuisine: 'Cuisine (one or more)', notes: 'Anything else (optional)', optional: '(optional)',
    submit: 'Prepare WhatsApp message', privacy: 'Your details go only into the WhatsApp message that you send. They are not stored on this website. More details:',
    doneTitle: 'Your message is ready', doneBody: 'WhatsApp has opened in a new tab. Press "Send" there. If it did not open, copy the message and send it on WhatsApp.',
    copy: 'Copy message', copied: 'Message copied.', manual: 'Message selected, please copy it.', callBtn: 'Call us', waBtn: 'Open WhatsApp',
    noscript: 'This form needs JavaScript. Please call us directly or message us on WhatsApp.',
  },
  hi: {
    metaTitle: 'कैटरिंग कोटेशन पाएँ, लातूर', metaDescription: 'भगवती केटरर्स, लातूर से कोटेशन माँगें: फ़ॉर्म भरें और WhatsApp पर संदेश भेजें। शादी, समारोह, पूजा के लिए शुद्ध शाकाहारी कैटरिंग।',
    title: 'कैटरिंग कोटेशन पाएँ', lead: 'नीचे जानकारी भरें। आपके लिए WhatsApp संदेश तैयार होगा, उसे बस भेज दें। आप सीधे फ़ोन करके भी बता सकते हैं।',
    name: 'आपका नाम', phone: 'मोबाइल नंबर', event: 'कार्यक्रम का प्रकार', choose: 'चुनें', date: 'कार्यक्रम की तारीख', guests: 'मेहमानों की अनुमानित संख्या',
    town: 'शहर / गाँव', order: 'ऑर्डर का प्रकार', cuisine: 'खाने का प्रकार (एक या अधिक)', notes: 'अन्य जानकारी (वैकल्पिक)', optional: '(वैकल्पिक)',
    submit: 'WhatsApp संदेश तैयार करें', privacy: 'आपकी जानकारी केवल उस WhatsApp संदेश में जाती है जो आप भेजते हैं। हम इसे इस वेबसाइट पर संग्रहीत नहीं करते। अधिक जानकारी:',
    doneTitle: 'आपका संदेश तैयार है', doneBody: 'WhatsApp नए टैब में खुल गया है। वहाँ "भेजें" दबाएं। न खुला हो तो संदेश कॉपी करके WhatsApp पर भेजें।',
    copy: 'संदेश कॉपी करें', copied: 'संदेश कॉपी हो गया।', manual: 'संदेश चुना गया है, कृपया कॉपी करें।', callBtn: 'फ़ोन करें', waBtn: 'WhatsApp खोलें',
    noscript: 'इस फ़ॉर्म के लिए JavaScript ज़रूरी है। कृपया सीधे फ़ोन करें या WhatsApp पर संदेश भेजें।',
  },
};

// Extra copy for the redesigned quote page.
export const qdesign: Record<Lang, { panelTitle: string; panelBody: string; steps: string[]; trust: string[]; s1: string; s2: string; s3: string; callNow: string; }> = {
  mr: { panelTitle: 'कार्यक्रमाची माहिती थोडक्यात द्या', panelBody: 'फॉर्म भरा, आम्ही तुमचा तयार संदेश WhatsApp वर उघडतो. फोन किंवा WhatsApp वर थेट बोललात तरी चालेल.',
    steps: ['माहिती भरा', 'WhatsApp वर पाठवा', 'आम्ही तुमच्याशी बोलतो'], trust: ['शुद्ध शाकाहारी', '३०+ वर्षांचा अनुभव', 'FSSAI प्रमाणित', 'लातूर व आसपासच्या परिसरात सेवा'],
    s1: 'तुमची माहिती', s2: 'तुमचा कार्यक्रम', s3: 'जेवणाची आवड', callNow: 'थेट फोन करा' },
  en: { panelTitle: 'Tell us about your event', panelBody: 'Fill in the form and we open a ready message on WhatsApp. You can also call or WhatsApp us directly.',
    steps: ['Fill in the details', 'Send on WhatsApp', 'We talk to you'], trust: ['Pure vegetarian', '30+ years of experience', 'FSSAI Certified', 'Serving Latur and nearby areas'],
    s1: 'About you', s2: 'Your event', s3: 'Food preferences', callNow: 'Call us directly' },
  hi: { panelTitle: 'अपने आयोजन की जानकारी दें', panelBody: 'फ़ॉर्म भरें, हम आपका तैयार संदेश WhatsApp पर खोल देते हैं। आप सीधे फ़ोन या WhatsApp भी कर सकते हैं।',
    steps: ['जानकारी भरें', 'WhatsApp पर भेजें', 'हम आपसे बात करेंगे'], trust: ['शुद्ध शाकाहारी', '30+ साल का अनुभव', 'FSSAI प्रमाणित', 'लातूर व आसपास के क्षेत्रों में सेवा'],
    s1: 'आपकी जानकारी', s2: 'आपका आयोजन', s3: 'खाने की पसंद', callNow: 'सीधे फ़ोन करें' },
};
