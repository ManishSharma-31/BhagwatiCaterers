// Pure summary logic for the Today screen (no UI), so it can be tested.
import type { CatEvent, Lead, Payment, Quote } from '../../types';
import { addDays, daysBetween, quoteTotal } from '../../util';

export interface Summary {
  newLeads: number;
  followUps: { lead: Lead; daysOverdue: number }[]; // due today (0) or overdue (>0)
  upcoming: { event: CatEvent; days: number }[];     // next 7 days, soonest first
  pending: { event: CatEvent; quote: Quote; total: number; received: number; balance: number }[];
}

export function summarize(d: { leads: Lead[]; events: CatEvent[]; quotes: Quote[]; payments: Payment[] }, todayIso: string): Summary {
  const open = (l: Lead) => l.status !== 'lost' && l.status !== 'completed';
  const followUps = d.leads
    .filter((l) => open(l) && l.nextFollowUp && l.nextFollowUp <= todayIso)
    .map((lead) => ({ lead, daysOverdue: daysBetween(lead.nextFollowUp!, todayIso) }))
    .sort((a, b) => b.daysOverdue - a.daysOverdue);

  const live = d.events.filter((e) => e.status !== 'cancelled' && e.status !== 'done' && e.date);
  const upcoming = live
    .filter((e) => e.date >= todayIso && e.date <= addDays(todayIso, 7))
    .map((event) => ({ event, days: daysBetween(todayIso, event.date) }))
    .sort((a, b) => a.days - b.days || (a.event.startTime ?? '').localeCompare(b.event.startTime ?? ''));

  const pending: Summary['pending'] = [];
  for (const event of live) {
    if (event.status !== 'confirmed' || event.date < todayIso) continue;
    const accepted = d.quotes.filter((q) => q.status === 'accepted');
    const quote = accepted.find((q) => q.id === event.quoteId) ?? accepted.find((q) => q.eventId === event.id) ?? (event.leadId ? accepted.find((q) => q.leadId === event.leadId) : undefined);
    if (!quote) continue; // no quote, no expected total: skip
    const total = quoteTotal(quote);
    const received = d.payments.filter((p) => p.direction === 'in' && (p.eventId === event.id || p.quoteId === quote.id)).reduce((s, p) => s + (p.amount || 0), 0);
    if (total - received > 0) pending.push({ event, quote, total, received, balance: total - received });
  }
  pending.sort((a, b) => a.event.date.localeCompare(b.event.date));
  return { newLeads: d.leads.filter((l) => l.status === 'new').length, followUps, upcoming, pending };
}

export const greetingKey = (hour: number): 'morning' | 'afternoon' | 'evening' => (hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening');
