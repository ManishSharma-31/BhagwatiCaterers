// Pure lead logic: validation, filtering, sorting, messages. No JSX so it can be tested with node.
import type { Lang, Lead, LeadStatus, Settings } from '../../types';
import { LEAD_STATUSES } from '../../types';
import { addDays, cleanText, fmtDate, phoneKey, waNumber } from '../../util';

export const LEAD_TOWNS = ['Latur', 'Ausa', 'Nilanga', 'Renapur', 'Tuljapur', 'Ambajogai'] as const;
export const TOWN_MR: Record<string, string> = { Latur: 'लातूर', Ausa: 'औसा', Nilanga: 'निलंगा', Renapur: 'रेणापूर', Tuljapur: 'तुळजापूर', Ambajogai: 'अंबाजोगाई' };
export const townLabel = (t: string | undefined, lang: Lang) => (t ? (lang === 'mr' && TOWN_MR[t] ? TOWN_MR[t] : t) : '');

export interface LeadErrors { name?: string; phone?: string; guests?: string }

export const validateLead = (l: { name: string; phone: string; guests?: number | string }, lang: Lang): LeadErrors => {
  const e: LeadErrors = {};
  if (!l.name.trim()) e.name = lang === 'mr' ? 'नाव लिहा' : 'Please enter the name';
  if (!waNumber(l.phone)) e.phone = lang === 'mr' ? '१० अंकी मोबाईल नंबर लिहा (६, ७, ८ किंवा ९ ने सुरू होणारा)' : 'Enter a valid 10-digit mobile number (starting with 6, 7, 8 or 9)';
  if (l.guests !== undefined && l.guests !== '' && !(Number(l.guests) > 0 && Number.isInteger(Number(l.guests)))) e.guests = lang === 'mr' ? 'पाहुणे १ किंवा जास्त (पूर्ण संख्या) हवेत' : 'Guests must be a whole number, 1 or more';
  return e;
};

export const countByStatus = (leads: Lead[]): Record<LeadStatus, number> => {
  const c = Object.fromEntries(LEAD_STATUSES.map((s) => [s, 0])) as Record<LeadStatus, number>;
  for (const l of leads) c[l.status] = (c[l.status] || 0) + 1;
  return c;
};

/** Search by name (case-insensitive) or phone digits. */
export const matchesSearch = (l: Lead, q: string) => {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  const digits = s.replace(/\D/g, '');
  return l.name.toLowerCase().includes(s) || (l.town ?? '').toLowerCase().includes(s) || (l.notes ?? '').toLowerCase().includes(s) || (digits.length > 0 && l.phone.replace(/\D/g, '').includes(digits));
};

export const filterLeads = (leads: Lead[], status: LeadStatus | 'all', q: string, dueOnly = false, todayIso = '') =>
  leads.filter((l) => (status === 'all' || l.status === status) && matchesSearch(l, q) && (!dueOnly || followUpDue(l, todayIso)));

export type LeadSort = 'followup' | 'newest' | 'eventdate';
/** Other leads with the same mobile number (last 10 digits), so the owner does not enter one customer twice. */
export const findDuplicates = (leads: Lead[], phone: string, excludeId?: string) => {
  const k = phoneKey(phone);
  return k ? leads.filter((l) => l.id !== excludeId && phoneKey(l.phone) === k) : [];
};

/** followup (default): follow-up date first, then newest. newest: by creation. eventdate: soonest event first, no date last. */
export const sortLeads = (leads: Lead[], mode: LeadSort = 'followup') =>
  [...leads].sort((a, b) => {
    if (mode === 'newest') return a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0;
    if (mode === 'eventdate') {
      if (a.eventDate && b.eventDate && a.eventDate !== b.eventDate) return a.eventDate < b.eventDate ? -1 : 1;
      if (!!a.eventDate !== !!b.eventDate) return a.eventDate ? -1 : 1;
      return a.createdAt < b.createdAt ? 1 : -1;
    }
    if (a.nextFollowUp && b.nextFollowUp && a.nextFollowUp !== b.nextFollowUp) return a.nextFollowUp < b.nextFollowUp ? -1 : 1;
    if (!!a.nextFollowUp !== !!b.nextFollowUp) return a.nextFollowUp ? -1 : 1;
    return a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0;
  });

/** Follow-up flag: due today or overdue, only for leads still open. */
export const followUpDue = (l: Lead, todayIso: string) =>
  !!l.nextFollowUp && l.nextFollowUp <= todayIso && ['new', 'contacted', 'quoted'].includes(l.status);

export const followUpDate = (kind: 'tomorrow' | '3days' | 'week', todayIso: string) => addDays(todayIso, kind === 'tomorrow' ? 1 : kind === '3days' ? 3 : 7);

/** Polite first WhatsApp message to a customer. */
export const buildLeadMessage = (l: Pick<Lead, 'name' | 'eventDate'>, s: Pick<Settings, 'businessName' | 'ownerName'>, lang: Lang) => {
  const name = cleanText(l.name);
  const biz = s.businessName || (lang === 'mr' ? 'भगवती केटरर्स' : 'Bhagwati Caterers');
  const d = l.eventDate ? fmtDate(l.eventDate, lang) : '';
  return lang === 'mr'
    ? `नमस्कार ${name} जी,\n${biz} कडून नमस्कार. तुमच्या चौकशीबद्दल धन्यवाद.${d ? ` ${d} च्या कार्यक्रमासाठी` : ''} आपल्याला कोणत्या प्रकारचे जेवण हवे आहे ते कृपया सांगा, म्हणजे आम्ही योग्य कोटेशन देऊ.\nधन्यवाद.`
    : `Namaste ${name},\nThank you for contacting ${biz}.${d ? ` For your event on ${d},` : ''} please tell us what kind of food you would like, and we will send you a suitable quote.\nThank you.`;
};
