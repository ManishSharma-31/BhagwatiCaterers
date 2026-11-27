import type { Lang } from '../data/site';
// DRAFT dish catalogue. Names are examples of what a pure-vegetarian caterer in Latur can offer;
// the owner confirms the real menu. No prices. Each item: [Marathi, English, Hindi].
type Dish = [string, string, string];
type L3 = Record<Lang, string>;
export interface MenuSection { id: string; cuisine: 'mh' | 'si' | 'rj' | 'more'; icon: string; title: L3; items: Dish[] }

export const cuisineTitle: Record<MenuSection['cuisine'], L3> = {
  mh: { mr: 'महाराष्ट्रीयन', en: 'Maharashtrian', hi: 'महाराष्ट्रीयन' },
  si: { mr: 'दाक्षिणात्य', en: 'South Indian', hi: 'दक्षिण भारतीय' },
  rj: { mr: 'राजस्थानी', en: 'Rajasthani', hi: 'राजस्थानी' },
  more: { mr: 'सर्वांसाठी खास', en: 'Popular for every event', hi: 'हर कार्यक्रम के लिए खास' },
};

export const sections: MenuSection[] = [
  { id: 'mh-breakfast', cuisine: 'mh', icon: '/art/icon-misal.svg', title: { mr: 'न्याहारी', en: 'Breakfast', hi: 'नाश्ता' }, items: [
    ['कांदेपोहे', 'Kanda poha', 'कांदा पोहा'], ['उपमा', 'Upma', 'उपमा'], ['मिसळ-पाव', 'Misal pav', 'मिसल-पाव'], ['साबुदाणा खिचडी', 'Sabudana khichdi', 'साबूदाना खिचड़ी'],
    ['थालीपीठ', 'Thalipeeth', 'थालीपीठ'], ['सांजा (शिरा)', 'Sheera (suji halwa)', 'शीरा (सूजी हलवा)'], ['वडा-पाव', 'Vada pav', 'वड़ा-पाव'], ['बटाटा वडा', 'Batata vada', 'बटाटा वड़ा'],
    ['साबुदाणा वडा', 'Sabudana vada', 'साबूदाना वड़ा'], ['कांदाभजी', 'Kanda bhaji', 'प्याज़ की भजिया'], ['पोहे-चिवडा', 'Poha chivda', 'पोहा चिवड़ा'], ['धपाटे', 'Dhapate', 'धपाटे'],
    ['आंबोळी', 'Amboli (lentil dosa)', 'आंबोली'], ['पुरी-भाजी', 'Puri bhaji', 'पूरी-भाजी'] ] },
  { id: 'mh-main', cuisine: 'mh', icon: '/art/thali.svg', title: { mr: 'भाज्या व आमटी', en: 'Vegetables and curries', hi: 'सब्ज़ियाँ व दाल' }, items: [
    ['वरण (तूप-भात)', 'Varan (dal) with ghee rice', 'वरण (घी-चावल)'], ['कटाची आमटी', 'Katachi amti', 'कट की आमटी'], ['मटकी उसळ', 'Matki usal', 'मटकी उसल'], ['पिठलं', 'Pithla', 'पिठला'],
    ['झुणका', 'Zunka', 'झुणका'], ['भरली वांगी', 'Bharli vangi (stuffed brinjal)', 'भरवाँ बैंगन'], ['बटाट्याची सुकी भाजी', 'Dry batata bhaji', 'आलू की सूखी सब्ज़ी'], ['पातळ भाजी', 'Patal bhaji', 'पतली सब्ज़ी'],
    ['कोबी-वाटाणा भाजी', 'Cabbage-peas bhaji', 'पत्तागोभी-मटर'], ['भेंडी भाजी', 'Bhendi (okra) bhaji', 'भिंडी की सब्ज़ी'], ['फरसबी भाजी', 'French beans bhaji', 'फरसबी की सब्ज़ी'], ['दोडक्याची भाजी', 'Ridge gourd bhaji', 'तुरई की सब्ज़ी'],
    ['पालक भाजी', 'Palak bhaji', 'पालक की सब्ज़ी'], ['मेथी भाजी', 'Methi bhaji', 'मेथी की सब्ज़ी'], ['शेवभाजी', 'Shev bhaji', 'शेव भाजी'], ['चवळी उसळ', 'Chavli usal', 'लोबिया उसल'],
    ['वांग्याचे भरीत', 'Vangyache bharit', 'बैंगन का भरता'], ['कढी', 'Kadhi', 'कढ़ी'], ['सार', 'Saar', 'सार'], ['गवारी भाजी', 'Cluster beans bhaji', 'ग्वार की सब्ज़ी'] ] },
  { id: 'mh-rice', cuisine: 'mh', icon: '/art/icon-masale-bhat.svg', title: { mr: 'भात, पोळी व भाकरी', en: 'Rice, rotis and bhakri', hi: 'चावल, रोटी व भाकरी' }, items: [
    ['मसाले भात', 'Masale bhat', 'मसाले भात'], ['वांगी भात', 'Vangi bhat', 'बैंगन भात'], ['पुलाव', 'Veg pulao', 'वेज पुलाव'], ['जिरा भात', 'Jeera rice', 'जीरा चावल'],
    ['साधा भात', 'Steamed rice', 'सादा चावल'], ['खिचडी', 'Khichdi', 'खिचड़ी'], ['पोळी (चपाती)', 'Poli (chapati)', 'चपाती'], ['पुरणाची पोळी', 'Puranachi poli', 'पूरन पोली'],
    ['ज्वारी भाकरी', 'Jowar bhakri', 'ज्वार की भाकरी'], ['बाजरी भाकरी', 'Bajra bhakri', 'बाजरे की भाकरी'], ['तांदळाची भाकरी', 'Rice bhakri', 'चावल की भाकरी'], ['पुरी', 'Puri', 'पूरी'], ['फुलके', 'Phulka', 'फुलका'] ] },
  { id: 'mh-sweets', cuisine: 'mh', icon: '/art/icon-puran-poli.svg', title: { mr: 'गोड पदार्थ', en: 'Sweets', hi: 'मिठाई' }, items: [
    ['पुरणपोळी', 'Puran poli', 'पूरन पोली'], ['उकडीचे मोदक', 'Ukadiche modak', 'उकड़ीचे मोदक'], ['तळणीचे मोदक', 'Fried modak', 'तले हुए मोदक'], ['श्रीखंड', 'Shrikhand', 'श्रीखंड'],
    ['आम्रखंड', 'Amrakhand', 'आम्रखंड'], ['बासुंदी', 'Basundi', 'बासुंदी'], ['जिलेबी', 'Jilebi', 'जलेबी'], ['मोतीचूर लाडू', 'Motichoor ladoo', 'मोतीचूर लड्डू'],
    ['बेसन लाडू', 'Besan ladoo', 'बेसन लड्डू'], ['रवा लाडू', 'Rava ladoo', 'रवा लड्डू'], ['गुलाबजाम', 'Gulab jamun', 'गुलाब जामुन'], ['सत्यनारायणाचा शिरा', 'Satyanarayan sheera', 'सत्यनारायण का शीरा'],
    ['शेवयांची खीर', 'Shevayanchi kheer', 'सेवइयों की खीर'], ['गव्हाची खीर', 'Wheat kheer', 'गेहूँ की खीर'], ['करंजी', 'Karanji', 'करंजी'], ['अनारसे', 'Anarse', 'अनारसे'],
    ['रव्याचे लाडू', 'Rava ladoo (coconut)', 'नारियल रवा लड्डू'], ['खव्याची पोळी', 'Khavyachi poli', 'खोये की पोली'], ['गाजर हलवा', 'Gajar halwa', 'गाजर का हलवा'], ['रसगुल्ला', 'Rasgulla', 'रसगुल्ला'],
    ['मांडे', 'Mande', 'मांडे'], ['चिरोटे', 'Chirote', 'चिरोटे'] ] },
  { id: 'mh-sides', cuisine: 'mh', icon: '/art/icon-bhakri.svg', title: { mr: 'तोंडीलावणी', en: 'Sides and accompaniments', hi: 'साथ में परोसे जाने वाले व्यंजन' }, items: [
    ['कोशिंबीर', 'Koshimbir (salad)', 'कचुंबर सलाद'], ['काकडी-दही कोशिंबीर', 'Kakdi raita', 'ककड़ी रायता'], ['ठेचा', 'Thecha', 'ठेचा'], ['शेंगदाणा चटणी', 'Peanut chutney', 'मूँगफली की चटनी'],
    ['जवसाची चटणी', 'Flaxseed chutney', 'अलसी की चटनी'], ['लसूण चटणी', 'Garlic chutney', 'लहसुन की चटनी'], ['कोथिंबीर वडी', 'Kothimbir vadi', 'कोथिंबीर वड़ी'], ['पापड', 'Papad', 'पापड़'],
    ['कुरडई', 'Kurdai', 'कुरड़ई'], ['सांडगे', 'Sandge', 'सांडगे'], ['लोणचे', 'Pickle', 'अचार'], ['तूप', 'Ghee', 'घी'], ['ताक', 'Buttermilk', 'छाछ'], ['लिंबू', 'Lemon wedge', 'नींबू'] ] },
  { id: 'si-main', cuisine: 'si', icon: '/art/icon-idli.svg', title: { mr: 'न्याहारी व टिफिन', en: 'Breakfast and tiffin', hi: 'नाश्ता व टिफिन' }, items: [
    ['इडली', 'Idli', 'इडली'], ['मेदू वडा', 'Medu vada', 'मेदू वड़ा'], ['वडा-सांबार', 'Vada sambar', 'वड़ा-सांभर'], ['साधा डोसा', 'Plain dosa', 'सादा डोसा'],
    ['मसाला डोसा', 'Masala dosa', 'मसाला डोसा'], ['म्हैसूर मसाला डोसा', 'Mysore masala dosa', 'मैसूर मसाला डोसा'], ['रवा डोसा', 'Rava dosa', 'रवा डोसा'], ['सेट डोसा', 'Set dosa', 'सेट डोसा'],
    ['उत्तप्पा', 'Uttapam', 'उत्तपम'], ['उपमा', 'Rava upma', 'रवा उपमा'], ['पोंगल', 'Ven pongal', 'वेन पोंगल'], ['अप्पम', 'Appam', 'अप्पम'],
    ['इडियप्पम', 'Idiyappam', 'इडियप्पम'], ['पेसरट्टू', 'Pesarattu', 'पेसरट्टू'], ['कांचीपुरम इडली', 'Kanchipuram idli', 'कांचीपुरम इडली'] ] },
  { id: 'si-rice', cuisine: 'si', icon: '/art/icon-vada-sambar.svg', title: { mr: 'भात व जेवण', en: 'Rice and meals', hi: 'चावल व भोजन' }, items: [
    ['लेमन राईस', 'Lemon rice', 'लेमन राइस'], ['टोमॅटो राईस', 'Tomato rice', 'टमाटर राइस'], ['कर्ड राईस', 'Curd rice', 'दही चावल'], ['चिंच भात (पुलिहोरा)', 'Tamarind rice (pulihora)', 'इमली चावल'],
    ['बिसी बेळे भात', 'Bisi bele bhath', 'बिसी बेले भात'], ['सांबार भात', 'Sambar rice', 'सांभर चावल'], ['नारळ भात', 'Coconut rice', 'नारियल चावल'], ['सांबार', 'Sambar', 'सांभर'],
    ['रसम', 'Rasam', 'रसम'], ['नारळ चटणी', 'Coconut chutney', 'नारियल चटनी'], ['टोमॅटो चटणी', 'Tomato chutney', 'टमाटर चटनी'], ['अवियल', 'Avial', 'अवियल'],
    ['पोरियल', 'Poriyal', 'पोरियल'], ['केसरी बाथ', 'Kesari bath', 'केसरी बाथ'], ['पायसम', 'Payasam', 'पायसम'], ['फिल्टर कॉफी', 'Filter coffee', 'फ़िल्टर कॉफ़ी'] ] },
  { id: 'rj-main', cuisine: 'rj', icon: '/art/icon-dal-baati.svg', title: { mr: 'जेवण', en: 'Main course', hi: 'भोजन' }, items: [
    ['दाल-बाटी-चुरमा', 'Dal baati churma', 'दाल-बाटी-चूरमा'], ['पंचमेल दाल', 'Panchmel dal', 'पंचमेल दाल'], ['गट्टे की सब्जी', 'Gatte ki sabzi', 'गट्टे की सब्ज़ी'], ['केर सांगरी', 'Ker sangri', 'केर सांगरी'],
    ['कढी-पकोडा', 'Kadhi pakoda', 'कढ़ी-पकौड़ा'], ['बाजरे की रोटी', 'Bajre ki roti', 'बाजरे की रोटी'], ['राजस्थानी खिचडी', 'Rajasthani khichdi', 'राजस्थानी खिचड़ी'], ['पापड की सब्जी', 'Papad ki sabzi', 'पापड़ की सब्ज़ी'],
    ['आलू प्याज की सब्जी', 'Aloo pyaz sabzi', 'आलू प्याज़ की सब्ज़ी'], ['मंगोडी की सब्जी', 'Mangodi sabzi', 'मंगोड़ी की सब्ज़ी'], ['लसूण चटणी', 'Lahsun chutney', 'लहसुन की चटनी'], ['लापसी', 'Lapsi', 'लापसी'] ] },
  { id: 'rj-snacks', cuisine: 'rj', icon: '/art/icon-sweets.svg', title: { mr: 'नाश्ता व गोड', en: 'Snacks and sweets', hi: 'नाश्ता व मिठाई' }, items: [
    ['प्याज कचोरी', 'Pyaz kachori', 'प्याज़ कचौरी'], ['मूग दाल कचोरी', 'Moong dal kachori', 'मूँग दाल कचौरी'], ['मिर्ची वडा', 'Mirchi vada', 'मिर्ची वड़ा'], ['मावा कचोरी', 'Mawa kachori', 'मावा कचौरी'],
    ['घेवर', 'Ghevar', 'घेवर'], ['मालपुआ', 'Malpua', 'मालपुआ'], ['मोहनथाळ', 'Mohanthal', 'मोहनथाल'], ['बेसन चक्की', 'Besan chakki', 'बेसन चक्की'],
    ['चुरमा लाडू', 'Churma ladoo', 'चूरमा लड्डू'], ['गोंद के लाडू', 'Gond ke ladoo', 'गोंद के लड्डू'], ['जलेबी-रबडी', 'Jalebi rabdi', 'जलेबी-रबड़ी'], ['दाल का हलवा', 'Moong dal halwa', 'मूँग दाल का हलवा'] ] },
  { id: 'more-north', cuisine: 'more', icon: '/art/thali.svg', title: { mr: 'पंजाबी / उत्तर भारतीय', en: 'Punjabi / North Indian', hi: 'पंजाबी / उत्तर भारतीय' }, items: [
    ['पनीर बटर मसाला', 'Paneer butter masala', 'पनीर बटर मसाला'], ['कढई पनीर', 'Kadai paneer', 'कड़ाही पनीर'], ['मटर पनीर', 'Matar paneer', 'मटर पनीर'], ['शाही पनीर', 'Shahi paneer', 'शाही पनीर'],
    ['मिक्स व्हेज', 'Mixed veg', 'मिक्स वेज'], ['व्हेज कोल्हापुरी', 'Veg kolhapuri', 'वेज कोल्हापुरी'], ['आलू गोबी', 'Aloo gobi', 'आलू गोभी'], ['दाल फ्राय', 'Dal fry', 'दाल फ्राई'],
    ['दाल तडका', 'Dal tadka', 'दाल तड़का'], ['दाल मखनी', 'Dal makhani', 'दाल मखनी'], ['छोले', 'Chole', 'छोले'], ['राजमा', 'Rajma', 'राजमा'],
    ['नान', 'Naan', 'नान'], ['तंदूरी रोटी', 'Tandoori roti', 'तंदूरी रोटी'], ['पराठा', 'Paratha', 'पराठा'], ['व्हेज बिर्याणी', 'Veg biryani', 'वेज बिरयानी'], ['रायता', 'Raita', 'रायता'] ] },
  { id: 'more-chaat', cuisine: 'more', icon: '/art/icon-sweets.svg', title: { mr: 'चाट व लाइव्ह काउंटर', en: 'Chaat and live counters', hi: 'चाट व लाइव काउंटर' }, items: [
    ['पाणीपुरी', 'Pani puri', 'पानी पूरी'], ['भेळ', 'Bhel', 'भेल'], ['शेवपुरी', 'Sev puri', 'सेव पूरी'], ['दहीपुरी', 'Dahi puri', 'दही पूरी'],
    ['रगडा-पॅटिस', 'Ragda pattice', 'रगड़ा पैटिस'], ['पावभाजी', 'Pav bhaji', 'पाव भाजी'], ['दाबेली', 'Dabeli', 'दाबेली'], ['समोसा', 'Samosa', 'समोसा'],
    ['कचोरी', 'Kachori', 'कचौरी'], ['व्हेज कटलेट', 'Veg cutlet', 'वेज कटलेट'], ['पनीर टिक्का', 'Paneer tikka', 'पनीर टिक्का'], ['हरा भरा कबाब', 'Hara bhara kabab', 'हरा भरा कबाब'],
    ['लाइव्ह जिलेबी', 'Live jilebi', 'लाइव जलेबी'], ['लाइव्ह डोसा', 'Live dosa', 'लाइव डोसा'], ['लाइव्ह चाट', 'Live chaat', 'लाइव चाट'] ] },
  { id: 'more-drinks', cuisine: 'more', icon: '/art/kalash.svg', title: { mr: 'पेये व स्वागत पेय', en: 'Drinks and welcome drinks', hi: 'पेय व वेलकम ड्रिंक' }, items: [
    ['मसाला ताक', 'Masala buttermilk', 'मसाला छाछ'], ['जलजिरा', 'Jaljeera', 'जलजीरा'], ['कोकम सरबत', 'Kokum sharbat', 'कोकम शरबत'], ['लिंबू सरबत', 'Lemon sharbat', 'नींबू शरबत'],
    ['आंबा पन्हं (पन्हे)', 'Aam panha', 'आम पन्ना'], ['गोड लस्सी', 'Sweet lassi', 'मीठी लस्सी'], ['गुलाब सरबत', 'Rose sharbat', 'गुलाब शरबत'], ['उसाचा रस', 'Sugarcane juice', 'गन्ने का रस'],
    ['चहा', 'Tea', 'चाय'], ['कॉफी', 'Coffee', 'कॉफ़ी'], ['मसाला दूध', 'Masala milk', 'मसाला दूध'], ['सोडा/पाणी बाटली', 'Water and soda', 'पानी व सोडा'] ] },
  { id: 'more-fast', cuisine: 'more', icon: '/art/diya.svg', title: { mr: 'उपवासाचे पदार्थ', en: 'Fasting (upvas) food', hi: 'व्रत-उपवास के व्यंजन' }, items: [
    ['साबुदाणा खिचडी', 'Sabudana khichdi', 'साबूदाना खिचड़ी'], ['साबुदाणा वडा', 'Sabudana vada', 'साबूदाना वड़ा'], ['वरीचे तांदूळ (भगर)', 'Bhagar (varai rice)', 'भगर (वरी चावल)'], ['शेंगदाण्याची आमटी', 'Peanut amti', 'मूँगफली की आमटी'],
    ['बटाट्याची उपवासाची भाजी', 'Upvas batata bhaji', 'व्रत के आलू'], ['राजगिरा लाडू', 'Rajgira ladoo', 'राजगिरा लड्डू'], ['उपवासाची थालीपीठ', 'Upvas thalipeeth', 'व्रत की थालीपीठ'], ['केळ्याची कोशिंबीर', 'Banana raita', 'केले का रायता'], ['शिंगाड्याच्या पिठाची पुरी', 'Singhara puri', 'सिंघाड़े की पूरी'] ] },
];
export const dishCount = sections.reduce((n, s) => n + s.items.length, 0);
