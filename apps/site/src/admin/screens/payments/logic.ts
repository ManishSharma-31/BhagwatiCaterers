// Pure payment logic: filters, month summary, balances. No JSX.
import type { CatEvent, Lang, Payment, Quote } from '../../types';
import { cleanText, fmtDate, fmtMoney, quoteTotal } from '../../util';

export const received = (ps: Payment[]) => ps.filter((p) => p.direction === 'in').reduce((s, p) => s + (p.amount || 0), 0);
export const spent = (ps: Payment[]) => ps.filter((p) => p.direction === 'out').reduce((s, p) => s + (p.amount || 0), 0);

/** month = 'YYYY-MM' */
export const monthSummary = (ps: Payment[], month: string) => {
  const m = ps.filter((p) => p.date.startsWith(month));
  const inn = received(m), out = spent(m);
  return { received: inn, expenses: out, net: inn - out };
};

export interface PayFilter { direction: 'all' | 'in' | 'out'; eventId?: string; leadId?: string; search?: string }
export const filterPayments = (ps: Payment[], f: PayFilter, nameFor: (p: Payment) => string = (p) => p.customerName ?? '') => {
  const s = (f.search ?? '').trim().toLowerCase();
  return ps
    .filter((p) => (f.direction === 'all' || p.direction === f.direction) && (!f.eventId || p.eventId === f.eventId) && (!f.leadId || p.leadId === f.leadId))
    .filter((p) => !s || nameFor(p).toLowerCase().includes(s) || (p.reference ?? '').toLowerCase().includes(s) || (p.note ?? '').toLowerCase().includes(s))
    .sort((a, b) => (a.date === b.date ? (a.createdAt < b.createdAt ? 1 : -1) : a.date < b.date ? 1 : -1));
};

/** The accepted quote that belongs to an event (by quote.eventId or event.quoteId). */
export const acceptedQuoteFor = (ev: CatEvent, quotes: Quote[]) =>
  quotes.find((q) => q.status === 'accepted' && (q.eventId === ev.id || q.id === ev.quoteId));

export const paymentsForEvent = (ev: CatEvent, ps: Payment[], q?: Quote) =>
  ps.filter((p) => p.eventId === ev.id || (!!q && p.quoteId === q.id));

export interface Balance { expected: number; received: number; balance: number }
export const eventBalance = (q: Quote, ps: Payment[]): Balance => {
  const expected = quoteTotal(q), got = received(ps);
  return { expected, received: got, balance: expected - got };
};

export interface Unpaid { event: CatEvent; quote: Quote; balance: Balance }
export const unpaidBalances = (events: CatEvent[], quotes: Quote[], ps: Payment[]): Unpaid[] =>
  events
    .filter((e) => e.status !== 'cancelled')
    .map((event) => {
      const quote = acceptedQuoteFor(event, quotes);
      return quote ? { event, quote, balance: eventBalance(quote, paymentsForEvent(event, ps, quote)) } : null;
    })
    .filter((x): x is Unpaid => !!x && x.balance.balance > 0)
    .sort((a, b) => (a.event.date < b.event.date ? -1 : 1));

export interface PayErrors { amount?: string; reference?: string; date?: string }
export const validatePayment = (p: { amount: number; method: string; reference?: string; date: string; direction: 'in' | 'out' }, lang: Lang): PayErrors => {
  const e: PayErrors = {};
  if (!(p.amount > 0)) e.amount = lang === 'mr' ? 'रक्कम लिहा (० पेक्षा जास्त)' : 'Enter the amount (more than 0)';
  if (p.method === 'upi' && !(p.reference ?? '').trim()) e.reference = lang === 'mr' ? 'UPI व्यवहार क्रमांक (ट्रान्झॅक्शन आयडी) लिहा' : 'Enter the UPI transaction id';
  if (!p.date) e.date = lang === 'mr' ? 'तारीख निवडा' : 'Pick a date';
  return e;
};

export const defaultKind = (q: string | null, direction: 'in' | 'out'): Payment['kind'] =>
  (['advance', 'balance', 'full', 'expense', 'other'] as const).find((k) => k === q) ?? (direction === 'out' ? 'expense' : 'advance');

/** Another entry that already uses the same non-empty reference (UPI transaction id), ignoring case and spaces. */
export const duplicateReference = (ps: Payment[], reference: string, exceptId?: string) => {
  const k = reference.replace(/\s+/g, '').toLowerCase();
  return k ? ps.find((p) => p.id !== exceptId && (p.reference ?? '').replace(/\s+/g, '').toLowerCase() === k) : undefined;
};

type Biz = { businessName?: string; phone?: string; upiId?: string };
const bizName = (s: Biz, mr: boolean) => cleanText(s.businessName) || (mr ? 'भगवती केटरर्स' : 'Bhagwati Caterers');
const METHOD_TXT: Record<string, [string, string]> = { upi: ['UPI', 'UPI'], cash: ['रोख', 'Cash'], bank: ['बँक ट्रान्सफर', 'Bank transfer'], cheque: ['चेक', 'Cheque'], other: ['इतर', 'Other'] };
const KIND_TXT: Record<string, [string, string]> = { advance: ['आगाऊ रक्कम', 'Advance'], balance: ['बाकी रक्कम', 'Balance'], full: ['पूर्ण रक्कम', 'Full payment'], other: ['रक्कम', 'Payment'], expense: ['खर्च', 'Expense'] };

/** WhatsApp receipt for money received. Amounts come only from what the owner typed. `bal` is shown when an accepted quote gives an expected total. */
export function buildReceiptMessage(p: Payment, o: { name?: string; eventTitle?: string; bal?: Balance }, s: Biz, lang: Lang): string {
  const mr = lang === 'mr';
  const name = cleanText(o.name || p.customerName);
  const out = [`*${bizName(s, mr)}*`, mr ? '*पावती*' : '*Receipt*', ''];
  out.push(mr ? `${name ? name + ' जी, ' : ''}आपले ${fmtMoney(p.amount)} मिळाले. धन्यवाद!` : `${name ? 'Dear ' + name + ', ' : ''}we received ${fmtMoney(p.amount)}. Thank you!`);
  out.push(`${mr ? 'प्रकार' : 'For'}: ${KIND_TXT[p.kind]?.[mr ? 0 : 1] ?? ''}`);
  out.push(`${mr ? 'तारीख' : 'Date'}: ${fmtDate(p.date, lang)}`);
  out.push(`${mr ? 'पद्धत' : 'Method'}: ${METHOD_TXT[p.method]?.[mr ? 0 : 1] ?? p.method}`);
  if (p.reference) out.push(`${mr ? 'संदर्भ क्र.' : 'Reference'}: ${cleanText(p.reference)}`);
  if (o.eventTitle) out.push(`${mr ? 'कार्यक्रम' : 'Event'}: ${cleanText(o.eventTitle)}`);
  if (o.bal) {
    out.push('', `${mr ? 'ठरलेली एकूण रक्कम' : 'Agreed total'}: ${fmtMoney(o.bal.expected)}`, `${mr ? 'आतापर्यंत मिळाले' : 'Received so far'}: ${fmtMoney(o.bal.received)}`, `${mr ? 'बाकी' : 'Balance'}: ${fmtMoney(Math.max(0, o.bal.balance))}`);
  }
  out.push('', `${bizName(s, mr)}${s.phone ? ' | ' + s.phone : ''}`);
  return out.join('\n');
}

/** Polite balance reminder. */
export function buildBalanceReminder(o: { name?: string; eventTitle: string; eventDate?: string; bal: Balance }, s: Biz, lang: Lang): string {
  const mr = lang === 'mr';
  const name = cleanText(o.name);
  const when = o.eventDate ? ` (${fmtDate(o.eventDate, lang)})` : '';
  const out = mr
    ? [`नमस्कार${name ? ' ' + name + ' जी' : ''},`, `${cleanText(o.eventTitle)}${when} साठी ${fmtMoney(o.bal.balance)} बाकी आहेत (एकूण ${fmtMoney(o.bal.expected)}, मिळाले ${fmtMoney(o.bal.received)}).`, 'कृपया सोयीने पाठवावेत.']
    : [`Namaste${name ? ' ' + name : ''},`, `A balance of ${fmtMoney(o.bal.balance)} is pending for ${cleanText(o.eventTitle)}${when} (total ${fmtMoney(o.bal.expected)}, received ${fmtMoney(o.bal.received)}).`, 'Kindly send it at your convenience.'];
  if (s.upiId) out.push(`${mr ? 'UPI' : 'UPI'}: ${cleanText(s.upiId)}`);
  out.push(mr ? 'धन्यवाद.' : 'Thank you.', `${bizName(s, mr)}${s.phone ? ' | ' + s.phone : ''}`);
  return out.join('\n');
}
