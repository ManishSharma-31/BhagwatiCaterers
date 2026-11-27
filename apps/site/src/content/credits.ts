import fs from 'node:fs';
import path from 'node:path';
import type { Lang } from '../data/site';

export interface PhotoCredit { file_name: string; source: string; page_url: string; photographer: string; license: string }

// Build-time: only list photos whose processed file exists in public/photos.
export function loadPhotoCredits(): PhotoCredit[] {
  const root = process.cwd();
  const manifest = path.join(root, 'photos', 'manifest.json');
  if (!fs.existsSync(manifest)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(manifest, 'utf8'));
    if (!Array.isArray(data)) return [];
    return data.filter((e: PhotoCredit) => {
      if (!e || !e.file_name) return false;
      const base = String(e.file_name).replace(/\.[a-z0-9]+$/i, '').replace(/-(800|1600)$/, '');
      return fs.existsSync(path.join(root, 'public', 'photos', `${base}-800.webp`));
    });
  } catch { return []; }
}

export const credits: Record<Lang, {
  metaTitle: string; metaDescription: string; title: string; lead: string;
  fontsTitle: string; fonts: string; fontsLicence: string; licenceLink: string;
  artTitle: string; art: string; photosTitle: string; photosNone: string; 
  colPhoto: string; colBy: string; colSource: string; colLicence: string; unknown: string;
}> = {
  mr: {
    metaTitle: 'श्रेय', metaDescription: 'भगवती केटरर्स वेबसाइटवरील फॉन्ट, कलाकृती आणि छायाचित्रांचे श्रेय आणि परवाने.',
    title: 'श्रेय', lead: 'या वेबसाइटसाठी वापरलेल्या फॉन्ट, कलाकृती आणि छायाचित्रांची माहिती.',
    fontsTitle: 'फॉन्ट', fonts: 'Mukta आणि Yatra One हे फॉन्ट Fontsource मार्फत आमच्या स्वतःच्या सर्व्हरवरून दिले जातात.',
    fontsLicence: 'दोन्ही फॉन्ट SIL Open Font License 1.1 अंतर्गत आहेत.', licenceLink: 'परवान्याची माहिती: openfontlicense.org',
    artTitle: 'कलाकृती', art: 'वेबसाइटवरील चित्रे आणि नक्षी या प्रकल्पासाठी खास तयार केलेली मूळ कलाकृती आहे.',
    photosTitle: 'छायाचित्रे', photosNone: 'छायाचित्रे जोडली जात आहेत. जोडल्यावर त्यांचे श्रेय येथे दिसेल.',
    colPhoto: 'फाईल', colBy: 'छायाचित्रकार', colSource: 'स्रोत', colLicence: 'परवाना', unknown: 'माहीत नाही',
  },
  en: {
    metaTitle: 'Credits', metaDescription: 'Credits and licences for the fonts, artwork and photographs used on the Bhagwati Caterers website.',
    title: 'Credits', lead: 'Details of the fonts, artwork and photographs used on this website.',
    fontsTitle: 'Fonts', fonts: 'The fonts Mukta and Yatra One are self-hosted on our own server through Fontsource.',
    fontsLicence: 'Both fonts are licensed under the SIL Open Font License 1.1.', licenceLink: 'Licence details: openfontlicense.org',
    artTitle: 'Artwork', art: 'The illustrations and patterns on this website are original artwork created for this project.',
    photosTitle: 'Photographs', photosNone: 'Photographs are being added. Their credits will appear here once they are.',
    colPhoto: 'File', colBy: 'Photographer', colSource: 'Source', colLicence: 'Licence', unknown: 'Not stated',
  },
  hi: {
    metaTitle: 'श्रेय', metaDescription: 'भगवती केटरर्स वेबसाइट पर उपयोग किए गए फ़ॉन्ट, कलाकृति और तस्वीरों के श्रेय और लाइसेंस।',
    title: 'श्रेय', lead: 'इस वेबसाइट पर उपयोग किए गए फ़ॉन्ट, कलाकृति और तस्वीरों की जानकारी।',
    fontsTitle: 'फ़ॉन्ट', fonts: 'Mukta और Yatra One फ़ॉन्ट Fontsource के माध्यम से हमारे अपने सर्वर से दिए जाते हैं।',
    fontsLicence: 'दोनों फ़ॉन्ट SIL Open Font License 1.1 के अंतर्गत हैं।', licenceLink: 'लाइसेंस की जानकारी: openfontlicense.org',
    artTitle: 'कलाकृति', art: 'वेबसाइट के चित्र और नक्श इस परियोजना के लिए विशेष रूप से बनाई गई मौलिक कलाकृति हैं।',
    photosTitle: 'तस्वीरें', photosNone: 'तस्वीरें जोड़ी जा रही हैं। जोड़ने पर उनका श्रेय यहाँ दिखेगा।',
    colPhoto: 'फ़ाइल', colBy: 'फ़ोटोग्राफ़र', colSource: 'स्रोत', colLicence: 'लाइसेंस', unknown: 'उल्लेख नहीं',
  },
};
