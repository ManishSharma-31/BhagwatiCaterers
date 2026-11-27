import type { EventStatus, EventType, Lang, MenuItem, Staff, TaskCategory } from '../../types';
import { tr } from '../../hooks';

const ET: Record<EventType, [string, string]> = {
  wedding: ['लग्न', 'Wedding'], engagement: ['साखरपुडा', 'Engagement'], haldi: ['हळद', 'Haldi'],
  housewarming: ['वास्तुशांत / गृहप्रवेश', 'Housewarming'], puja: ['पूजा', 'Puja'], birthday: ['वाढदिवस', 'Birthday'],
  office: ['ऑफिस कार्यक्रम', 'Office event'], 'home-food': ['घरगुती जेवण ऑर्डर', 'Home food order'], other: ['इतर', 'Other'],
};
export const eventTypeLabel = (t: EventType, lang: Lang) => tr(lang, ET[t]?.[0] ?? t, ET[t]?.[1] ?? t);

const ES: Record<EventStatus, [string, string]> = {
  planned: ['नियोजित', 'Planned'], confirmed: ['पक्का', 'Confirmed'], done: ['पूर्ण', 'Done'], cancelled: ['रद्द', 'Cancelled'],
};
export const eventStatusLabel = (s: EventStatus, lang: Lang) => tr(lang, ES[s][0], ES[s][1]);

const TC: Record<TaskCategory, [string, string]> = {
  planning: ['नियोजन', 'Planning'], shopping: ['खरेदी', 'Shopping'], prep: ['तयारी', 'Prep'], packing: ['पॅकिंग', 'Packing'],
  transport: ['वाहतूक', 'Transport'], service: ['वाढप / सेवा', 'Service'], cleanup: ['आवराआवर', 'Cleanup'], payment: ['पैसे / वसुली', 'Payment'], other: ['इतर', 'Other'],
};
export const categoryLabel = (c: TaskCategory, lang: Lang) => tr(lang, TC[c][0], TC[c][1]);

const SR: Record<Staff['role'], [string, string]> = {
  cook: ['आचारी', 'Cook'], helper: ['मदतनीस', 'Helper'], server: ['वाढपी', 'Server'], driver: ['ड्रायव्हर', 'Driver'], manager: ['व्यवस्थापक', 'Manager'], other: ['इतर', 'Other'],
};
export const roleLabel = (r: Staff['role'], lang: Lang) => tr(lang, SR[r][0], SR[r][1]);

const CU: Record<MenuItem['cuisine'], [string, string]> = {
  maharashtrian: ['महाराष्ट्रीयन', 'Maharashtrian'], 'south-indian': ['दाक्षिणात्य', 'South Indian'], rajasthani: ['राजस्थानी', 'Rajasthani'], common: ['सर्वसाधारण', 'Common'],
};
export const cuisineLabel = (c: MenuItem['cuisine'], lang: Lang) => tr(lang, CU[c][0], CU[c][1]);

export const dishName = (m: MenuItem, lang: Lang) => (lang === 'mr' ? m.nameMr || m.nameEn : m.nameEn || m.nameMr);

export const TOWNS = ['Latur', 'Ausa', 'Nilanga', 'Renapur', 'Tuljapur', 'Ambajogai'];
const TM: Record<string, string> = { Latur: 'लातूर', Ausa: 'औसा', Nilanga: 'निलंगा', Renapur: 'रेणापूर', Tuljapur: 'तुळजापूर', Ambajogai: 'अंबाजोगाई' };
export const townLabel = (t: string | undefined, lang: Lang) => (t ? (lang === 'mr' ? TM[t] ?? t : t) : '');
