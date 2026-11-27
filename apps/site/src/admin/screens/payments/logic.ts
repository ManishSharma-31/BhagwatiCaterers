// Pure payment logic: filters, month summary, balances. No JSX.
import type { CatEvent, Lang, Payment, Quote } from '../../types';
import { quoteTotal } from '../../util';

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
  if (!(p.amount > 0)) e.amount = lang === 'mr' ? 'रक्कम लिहा' : 'Enter the amount';
  if (p.method === 'upi' && !(p.reference ?? '').trim()) e.reference = lang === 'mr' ? 'UPI व्यवहार क्रमांक (ट्रान्झॅक्शन आयडी) लिहा' : 'Enter the UPI transaction id';
  if (!p.date) e.date = lang === 'mr' ? 'तारीख निवडा' : 'Pick a date';
  return e;
};

export const defaultKind = (q: string | null, direction: 'in' | 'out'): Payment['kind'] =>
  (['advance', 'balance', 'full', 'expense', 'other'] as const).find((k) => k === q) ?? (direction === 'out' ? 'expense' : 'advance');
