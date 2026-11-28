import type { MenuItem, Settings } from './types';

// Starter menu: EXAMPLE dishes only. The owner edits the real menu in the dashboard (docs/open-questions.md).
type Row = [string, string, MenuItem['cuisine'], MenuItem['category']];
const rows: Row[] = [
  ['पुरणपोळी', 'Puran poli', 'maharashtrian', 'sweet'],
  ['मोदक', 'Modak', 'maharashtrian', 'sweet'],
  ['श्रीखंड', 'Shrikhand', 'maharashtrian', 'sweet'],
  ['जिलेबी', 'Jilebi', 'common', 'sweet'],
  ['गुलाबजाम', 'Gulab jamun', 'common', 'sweet'],
  ['मिसळ पाव', 'Misal pav', 'maharashtrian', 'snack'],
  ['कांदे पोहे', 'Kanda poha', 'maharashtrian', 'snack'],
  ['साबुदाणा खिचडी', 'Sabudana khichdi', 'maharashtrian', 'snack'],
  ['कोथिंबीर वडी', 'Kothimbir vadi', 'maharashtrian', 'starter'],
  ['भाकरी', 'Bhakri', 'maharashtrian', 'bread'],
  ['पिठलं', 'Pithla', 'maharashtrian', 'main'],
  ['वरण', 'Varan (dal)', 'maharashtrian', 'main'],
  ['मसाले भात', 'Masale bhat', 'maharashtrian', 'rice'],
  ['वरण भात', 'Varan bhat', 'maharashtrian', 'rice'],
  ['बटाट्याची भाजी', 'Batata bhaji', 'maharashtrian', 'main'],
  ['इडली', 'Idli', 'south-indian', 'snack'],
  ['डोसा', 'Dosa', 'south-indian', 'snack'],
  ['मेदू वडा', 'Medu vada', 'south-indian', 'snack'],
  ['सांबार', 'Sambar', 'south-indian', 'accompaniment'],
  ['नारळाची चटणी', 'Coconut chutney', 'south-indian', 'accompaniment'],
  ['उपमा', 'Upma', 'south-indian', 'snack'],
  ['दाल बाटी चुरमा', 'Dal baati churma', 'rajasthani', 'main'],
  ['गट्टे की सब्जी', 'Gatte ki sabzi', 'rajasthani', 'main'],
  ['पोळी / चपाती', 'Poli / chapati', 'common', 'bread'],
  ['पुरी', 'Puri', 'common', 'bread'],
  ['जिरा राईस', 'Jeera rice', 'common', 'rice'],
  ['पापड', 'Papad', 'common', 'accompaniment'],
  ['कोशिंबीर', 'Koshimbir (salad)', 'maharashtrian', 'accompaniment'],
  ['ताक', 'Taak (buttermilk)', 'common', 'drink'],
];

export const seedMenu = (): MenuItem[] => {
  const now = new Date().toISOString();
  return rows.map(([nameMr, nameEn, cuisine, category]) => ({ id: 'seed-' + nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), createdAt: now, updatedAt: now, nameMr, nameEn, cuisine, category, active: true }));
};

export const defaultSettings = (): Settings => {
  const now = new Date().toISOString();
  return {
    id: 'main', createdAt: now, updatedAt: now,
    businessName: 'भगवती केटरर्स', ownerName: 'शांतीलाल महाराज', phone: '9057264895', fssai: '21526049010527',
    defaultTerms: '',
  };
};
