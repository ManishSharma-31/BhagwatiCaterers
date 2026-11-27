// Pure summary logic for the Today screen (no UI), so it can be tested.
import type { CatEvent, Lead, Payment, Quote, Task } from '../../types';
import { addDays, daysBetween, quoteTotal } from '../../util';

export interface Summary {
  newLeads: number;
  followUps: { lead: Lead; daysOverdue: number }[]; // due today (0) or overdue (>0)
  upcoming: { event: CatEvent; days: number }[];     // next 7 days, soonest first
  pending: { event: CatEvent; quote: Quote; total: number; received: number; balance: number }[];
  /** Events that already happened (not cancelled) but the accepted quote is not fully paid. Oldest first. */
  unpaidPast: { event: CatEvent; quote: Quote; total: number; received: number; balance: number }[];
  /** Tasks not done and due today or earlier. */
  tasksDue: Task[];
  /** Quotes sent 3+ days ago with no answer, whose lead is still open. */
  staleQuotes: { quote: Quote; days: number }[];
  /** Events in the next 7 days that still lack dishes or staff. */
  gaps: { event: CatEvent; noDishes: boolean; noStaff: boolean }[];
}

export function summarize(d: { leads: Lead[]; events: CatEvent[]; quotes: Quote[]; payments: Payment[]; tasks?: Task[] }, todayIso: string): Summary {
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

  const unpaidPast: Summary['unpaidPast'] = [];
  for (const event of d.events) {
    if (event.status === 'cancelled' || !event.date || event.date >= todayIso) continue;
    const accepted = d.quotes.filter((q) => q.status === 'accepted');
    const quote = accepted.find((q) => q.id === event.quoteId) ?? accepted.find((q) => q.eventId === event.id);
    if (!quote) continue;
    const total = quoteTotal(quote);
    const received = d.payments.filter((p) => p.direction === 'in' && (p.eventId === event.id || p.quoteId === quote.id)).reduce((s, p) => s + (p.amount || 0), 0);
    if (total - received > 0) unpaidPast.push({ event, quote, total, received, balance: total - received });
  }
  unpaidPast.sort((a, b) => a.event.date.localeCompare(b.event.date));

  const tasksDue = (d.tasks ?? []).filter((t) => !t.done && !!t.dueDate && t.dueDate <= todayIso).sort((a, b) => (a.dueDate ?? '').localeCompare(b.dueDate ?? ''));
  const leadById = new Map(d.leads.map((l) => [l.id, l]));
  const staleQuotes = d.quotes
    .filter((q) => q.status === 'sent' && daysBetween(q.updatedAt.slice(0, 10), todayIso) >= 3 && (!q.leadId || ['new', 'contacted', 'quoted'].includes(leadById.get(q.leadId)?.status ?? 'quoted')))
    .map((quote) => ({ quote, days: daysBetween(quote.updatedAt.slice(0, 10), todayIso) }))
    .sort((a, b) => b.days - a.days);
  const gaps = upcoming
    .map(({ event }) => ({ event, noDishes: event.dishIds.length + event.extraDishes.length === 0, noStaff: event.staffIds.length === 0 }))
    .filter((g) => g.noDishes || g.noStaff);
  return { newLeads: d.leads.filter((l) => l.status === 'new').length, followUps, upcoming, pending, unpaidPast, tasksDue, staleQuotes, gaps };
}

export const greetingKey = (hour: number): 'morning' | 'afternoon' | 'evening' => (hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening');
