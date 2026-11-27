// Pure quote logic: totals, validation, messages, lead status rules. No JSX.
import type { CatEvent, Lang, Lead, LeadStatus, MenuItem, Quote, QuoteLine, QuoteStatus, Settings } from '../../types';
import { fmtDate, fmtMoney, quoteTotal } from '../../util';

export const balanceAfterAdvance = (q: Pick<Quote, 'guests' | 'perPlate' | 'lines' | 'discount' | 'advanceAmount'>) =>
  quoteTotal(q) - (q.advanceAmount || 0);

export const cleanLines = (lines: QuoteLine[]) => lines.filter((l) => l.label.trim() || l.amount);

export interface QuoteErrors { name?: string; phone?: string; guests?: string; perPlate?: string }
export const validateQuote = (q: Pick<Quote, 'customerName' | 'customerPhone' | 'guests' | 'perPlate'>, phoneOk: boolean, lang: Lang): QuoteErrors => {
  const e: QuoteErrors = {};
  if (!q.customerName.trim()) e.name = lang === 'mr' ? 'ग्राहकाचे नाव लिहा' : 'Enter the customer name';
  if (!phoneOk) e.phone = lang === 'mr' ? '१० अंकी मोबाईल नंबर लिहा' : 'Enter a valid 10-digit mobile number';
  if (!(q.guests > 0)) e.guests = lang === 'mr' ? 'पाहुण्यांची संख्या लिहा' : 'Enter number of guests';
  if (!(q.perPlate > 0)) e.perPlate = lang === 'mr' ? 'दर लिहा' : 'Enter the rate';
  return e;
};

/** Which lead status results from a quote status change. Returns the new lead status, or undefined for no change. */
export const leadStatusAfterQuote = (quote: QuoteStatus, lead: LeadStatus): LeadStatus | undefined => {
  if (quote === 'sent' && (lead === 'new' || lead === 'contacted')) return 'quoted';
  if (quote === 'accepted' && lead !== 'completed') return lead === 'confirmed' ? undefined : 'confirmed';
  return undefined;
};

export const dishNames = (q: Pick<Quote, 'dishIds' | 'extraDishes'>, menu: MenuItem[], lang: Lang): string[] => {
  const byId = new Map(menu.map((m) => [m.id, m]));
  const picked = q.dishIds.map((id) => byId.get(id)).filter((m): m is MenuItem => !!m).map((m) => (lang === 'mr' ? m.nameMr : m.nameEn));
  return [...picked, ...q.extraDishes.map((d) => d.trim()).filter(Boolean)];
};

export const CUISINE_LABEL: Record<MenuItem['cuisine'], { mr: string; en: string }> = {
  maharashtrian: { mr: 'महाराष्ट्रीयन', en: 'Maharashtrian' },
  'south-indian': { mr: 'साउथ इंडियन', en: 'South Indian' },
  rajasthani: { mr: 'राजस्थानी', en: 'Rajasthani' },
  common: { mr: 'सर्वसाधारण', en: 'Common' },
};
const CUISINE_ORDER: MenuItem['cuisine'][] = ['maharashtrian', 'south-indian', 'rajasthani', 'common'];

/** Active menu items grouped by cuisine, filtered by search (Marathi or English name). Selected items stay visible. */
export const groupMenu = (menu: MenuItem[], search: string, selected: string[] = []) => {
  const s = search.trim().toLowerCase();
  return CUISINE_ORDER.map((c) => ({
    cuisine: c,
    items: menu.filter((m) => m.cuisine === c && (m.active || selected.includes(m.id)) && (!s || m.nameMr.toLowerCase().includes(s) || m.nameEn.toLowerCase().includes(s))),
  })).filter((g) => g.items.length);
};

export const perPlateLabel = (orderType: Quote['orderType'], lang: Lang) =>
  orderType === 'with-material'
    ? lang === 'mr' ? 'प्रति थाळी मजुरी (स्वयंपाकाचे शुल्क)' : 'Labour charge per plate'
    : lang === 'mr' ? 'प्रति थाळी दर' : 'Rate per plate';

type MsgSettings = Pick<Settings, 'businessName' | 'phone' | 'fssai' | 'upiId'>;

/** WhatsApp text for a quote, in Marathi or English. Only includes what has been filled in. */
export const buildQuoteMessage = (q: Quote, dishes: string[], s: MsgSettings, lang: Lang): string => {
  const mr = lang === 'mr';
  const total = quoteTotal(q);
  const lines = cleanLines(q.lines);
  const out: string[] = [];
  out.push(`*${s.businessName}*`);
  out.push(mr ? `नमस्कार ${q.customerName} जी, आपले कोटेशन:` : `Namaste ${q.customerName}, here is your quote:`);
  out.push('');
  if (q.eventTitle) out.push((mr ? 'कार्यक्रम: ' : 'Event: ') + q.eventTitle);
  if (q.eventDate) out.push((mr ? 'दिनांक: ' : 'Date: ') + fmtDate(q.eventDate, lang));
  if (q.town) out.push((mr ? 'गाव/शहर: ' : 'Place: ') + q.town);
  out.push((mr ? 'पाहुणे: ' : 'Guests: ') + q.guests);
  if (dishes.length) {
    out.push('', mr ? '*पदार्थ:*' : '*Menu:*');
    dishes.forEach((d, i) => out.push(`${i + 1}. ${d}`));
  }
  out.push('');
  const rateLabel = q.orderType === 'with-material' ? (mr ? 'प्रति थाळी मजुरी' : 'Labour per plate') : (mr ? 'प्रति थाळी दर' : 'Rate per plate');
  out.push(`${rateLabel}: ${fmtMoney(q.perPlate)} x ${q.guests} = ${fmtMoney(q.guests * q.perPlate)}`);
  for (const l of lines) out.push(`${l.label || (mr ? 'इतर' : 'Other')}: ${fmtMoney(l.amount)}`);
  if (q.discount) out.push(`${mr ? 'सूट' : 'Discount'}: -${fmtMoney(q.discount)}`);
  out.push(`*${mr ? 'एकूण' : 'Total'}: ${fmtMoney(total)}*`);
  if (q.advanceAmount) {
    out.push(`${mr ? 'आगाऊ रक्कम (अॅडव्हान्स)' : 'Advance'}: ${fmtMoney(q.advanceAmount)}`);
    out.push(`${mr ? 'उरलेली रक्कम' : 'Balance'}: ${fmtMoney(total - q.advanceAmount)}`);
  }
  if (q.orderType === 'with-material') out.push('', mr ? 'टीप: साहित्य ग्राहक देणार; आम्ही फक्त स्वयंपाक करू.' : 'Note: ingredients provided by customer; we only cook.');
  if (q.validUntil) out.push('', (mr ? 'कोटेशन वैध: ' : 'Valid until: ') + fmtDate(q.validUntil, lang));
  out.push('', mr ? 'धन्यवाद.' : 'Thank you.', `${s.businessName}${s.phone ? ' | ' + s.phone : ''}`);
  if (s.fssai) out.push(`FSSAI: ${s.fssai}`);
  return out.join('\n');
};

/** Prefill fields (never prices) from a lead. */
export const fromLead = (l: Lead, lang: 'mr' | 'en' = 'en') => ({
  leadId: l.id, customerName: l.name, customerPhone: l.phone, eventTitle: eventTitleFor(l.eventType, l.name, lang),
  eventDate: l.eventDate, town: l.town, orderType: l.orderType, guests: l.guests ?? 0,
});
export const fromEvent = (e: CatEvent) => ({
  eventId: e.id, leadId: e.leadId, customerName: e.customerName ?? '', customerPhone: e.customerPhone ?? '', eventTitle: e.title,
  eventDate: e.date, town: e.town, orderType: e.orderType, guests: e.guests, dishIds: [...e.dishIds], extraDishes: [...e.extraDishes],
});
const EVENT_LABEL: Record<string, string> = { wedding: 'Wedding', engagement: 'Engagement', haldi: 'Haldi', housewarming: 'Housewarming', puja: 'Puja', birthday: 'Birthday', office: 'Office event', 'home-food': 'Home food', other: 'Event' };
const EVENT_LABEL_MR: Record<string, string> = { wedding: 'लग्न', engagement: 'साखरपुडा', haldi: 'हळद', housewarming: 'वास्तुशांती', puja: 'पूजा', birthday: 'वाढदिवस', office: 'ऑफिस कार्यक्रम', 'home-food': 'घरचे जेवण', other: 'कार्यक्रम' };
export const eventTitleFor = (type: string, name: string, lang: 'mr' | 'en' = 'en') => `${(lang === 'mr' ? EVENT_LABEL_MR[type] : EVENT_LABEL[type]) ?? (lang === 'mr' ? 'कार्यक्रम' : 'Event')} - ${name}`.trim();
