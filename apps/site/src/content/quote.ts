import type { Lang } from '../data/site';
import type { QuoteLabels } from '../scripts/quote';
type L3<T = string> = Record<Lang, T>;
export const events: Array<{ key: string } & L3> = [
  { key: 'wedding', mr: 'विवाह', en: 'Wedding', hi: 'विवाह' },
  { key: 'engagement', mr: 'साखरपुडा', en: 'Engagement', hi: 'सगाई' },
  { key: 'haldi', mr: 'हळद', en: 'Haldi', hi: 'हल्दी' },
  { key: 'housewarming', mr: 'गृहप्रवेश', en: 'Housewarming', hi: 'गृहप्रवेश' },
  { key: 'puja', mr: 'पूजा / धार्मिक कार्यक्रम', en: 'Puja / religious function', hi: 'पूजा / धार्मिक कार्यक्रम' },
  { key: 'party', mr: 'वाढदिवस / पार्टी', en: 'Birthday / party', hi: 'जन्मदिन / पार्टी' },
  { key: 'office', mr: 'ऑफिस कार्यक्रम', en: 'Office event', hi: 'ऑफिस कार्यक्रम' },
  { key: 'home', mr: 'घरगुती जेवण', en: 'Home-style food', hi: 'घर जैसा खाना' },
  { key: 'other', mr: 'इतर', en: 'Other', hi: 'अन्य' },
];
export const orderTypes: Array<{ key: string } & L3> = [
  { key: 'ours', mr: 'सर्व साहित्य तुमचे (आम्ही सर्व आणतो)', en: 'We bring everything', hi: 'सारा सामान हमारा (हम सब लाते हैं)' },
  { key: 'theirs', mr: 'साहित्य तुमचे, स्वयंपाक आमचा', en: 'You provide ingredients, we cook', hi: 'सामान आपका, खाना हम पकाएंगे' },
  { key: 'unsure', mr: 'खात्री नाही', en: 'Not sure', hi: 'पक्का नहीं' },
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
    name: 'नाम', phone: 'फोन', event: 'कार्यक्रम', date: 'तारीख', guests: 'अनुमानित मेहमान', town: 'शहर/गाँव',
    order: 'ऑर्डर प्रकार', cuisine: 'पसंदीदा खाना', notes: 'टिप्पणी', thanks: 'धन्यवाद।',
    errors: { name: 'कृपया अपना नाम लिखें।', phone: 'कृपया 10 अंकों का मोबाइल नंबर लिखें।', event: 'कृपया कार्यक्रम का प्रकार चुनें।', guests: 'कृपया मेहमानों की अनुमानित संख्या लिखें।' },
  },
};

export const quote: Record<Lang, Record<string, string>> = {
  mr: {
    metaTitle: 'कोटेशन मिळवा', metaDescription: 'भगवती केटरर्सकडून कोटेशन मागवा: फॉर्म भरा आणि WhatsApp वर संदेश पाठवा. लातूर आणि आसपास शुद्ध शाकाहारी केटरिंग.',
    title: 'कोटेशन मिळवा', lead: 'खालील माहिती भरा. तुमच्यासाठी WhatsApp संदेश तयार होईल, तो पाठवा.',
    name: 'तुमचे नाव', phone: 'मोबाइल नंबर', event: 'कार्यक्रमाचा प्रकार', choose: 'निवडा', date: 'कार्यक्रमाची तारीख', guests: 'पाहुण्यांची अंदाजे संख्या',
    town: 'गाव / शहर', order: 'ऑर्डरचा प्रकार', cuisine: 'जेवणाचा प्रकार (एक किंवा अधिक)', notes: 'इतर माहिती (ऐच्छिक)', optional: '(ऐच्छिक)',
    submit: 'WhatsApp वर संदेश तयार करा', privacy: 'तुमची माहिती फक्त तुम्ही पाठवत असलेल्या WhatsApp संदेशात जाते. आम्ही ती या वेबसाइटवर साठवत नाही.',
    doneTitle: 'तुमचा संदेश तयार आहे', doneBody: 'WhatsApp नवीन टॅबमध्ये उघडले आहे. तेथे "पाठवा" दाबा. उघडले नसेल, तर संदेश कॉपी करून WhatsApp वर पाठवा.',
    copy: 'संदेश कॉपी करा', copied: 'संदेश कॉपी झाला.', manual: 'संदेश निवडला आहे, कॉपी करा.', callBtn: 'फोन करा', waBtn: 'WhatsApp उघडा',
    noscript: 'हा फॉर्म वापरण्यासाठी JavaScript आवश्यक आहे. कृपया थेट फोन करा किंवा WhatsApp वर संदेश पाठवा.',
  },
  en: {
    metaTitle: 'Get a Quote', metaDescription: 'Request a quote from Bhagwati Caterers: fill the form and send the message on WhatsApp. Pure vegetarian catering in Latur and nearby areas.',
    title: 'Get a Quote', lead: 'Fill in the details below. We will prepare a WhatsApp message for you to send.',
    name: 'Your name', phone: 'Mobile number', event: 'Type of event', choose: 'Choose', date: 'Event date', guests: 'Approximate number of guests',
    town: 'Town', order: 'Order type', cuisine: 'Cuisine (one or more)', notes: 'Anything else (optional)', optional: '(optional)',
    submit: 'Prepare WhatsApp message', privacy: 'Your details go only into the WhatsApp message that you send. They are not stored on this website.',
    doneTitle: 'Your message is ready', doneBody: 'WhatsApp has opened in a new tab. Press "Send" there. If it did not open, copy the message and send it on WhatsApp.',
    copy: 'Copy message', copied: 'Message copied.', manual: 'Message selected, please copy it.', callBtn: 'Call us', waBtn: 'Open WhatsApp',
    noscript: 'This form needs JavaScript. Please call us directly or message us on WhatsApp.',
  },
  hi: {
    metaTitle: 'कोटेशन पाएं', metaDescription: 'भगवती केटरर्स से कोटेशन मांगें: फॉर्म भरें और WhatsApp पर संदेश भेजें। लातूर और आसपास शुद्ध शाकाहारी कैटरिंग।',
    title: 'कोटेशन पाएं', lead: 'नीचे जानकारी भरें। आपके लिए WhatsApp संदेश तैयार होगा, उसे भेज दें।',
    name: 'आपका नाम', phone: 'मोबाइल नंबर', event: 'कार्यक्रम का प्रकार', choose: 'चुनें', date: 'कार्यक्रम की तारीख', guests: 'मेहमानों की अनुमानित संख्या',
    town: 'शहर / गाँव', order: 'ऑर्डर का प्रकार', cuisine: 'खाने का प्रकार (एक या अधिक)', notes: 'अन्य जानकारी (वैकल्पिक)', optional: '(वैकल्पिक)',
    submit: 'WhatsApp संदेश तैयार करें', privacy: 'आपकी जानकारी केवल उस WhatsApp संदेश में जाती है जो आप भेजते हैं। हम इसे इस वेबसाइट पर संग्रहीत नहीं करते।',
    doneTitle: 'आपका संदेश तैयार है', doneBody: 'WhatsApp नए टैब में खुल गया है। वहाँ "भेजें" दबाएं। न खुला हो तो संदेश कॉपी करके WhatsApp पर भेजें।',
    copy: 'संदेश कॉपी करें', copied: 'संदेश कॉपी हो गया।', manual: 'संदेश चुना गया है, कृपया कॉपी करें।', callBtn: 'फोन करें', waBtn: 'WhatsApp खोलें',
    noscript: 'इस फॉर्म के लिए JavaScript ज़रूरी है। कृपया सीधे फोन करें या WhatsApp पर संदेश भेजें।',
  },
};
