// Global search over leads, quotes, events, payments, staff and menu. Pure logic (no JSX).
import type { CatEvent, Lead, MenuItem, Payment, Quote, Staff } from '../../types';
import { fmtMoney, phoneKey } from '../../util';

export interface SearchData { leads: Lead[]; quotes: Quote[]; events: CatEvent[]; payments: Payment[]; staff: Staff[]; menu: MenuItem[] }
export type HitKind = 'lead' | 'quote' | 'event' | 'payment' | 'staff' | 'dish';
export interface Hit { kind: HitKind; id: string; title: string; sub: string; path: string; sort: string }

const norm = (s: string | undefined) => (s ?? '').toLowerCase();

/** Every word the person typed must appear somewhere in the record (names, phone digits, titles, notes). */
export function matches(fields: Array<string | undefined>, q: string): boolean {
  const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return false;
  const hay = fields.map(norm).join(' \n ');
  const digitsHay = fields.map((f) => (f ?? '').replace(/\D/g, '')).join(' ');
  return words.every((w) => hay.includes(w) || (/^\d{3,}$/.test(w) && digitsHay.includes(w)));
}

export function searchAll(d: SearchData, q: string, limitPerKind = 8): Hit[] {
  if (!q.trim()) return [];
  const out: Hit[] = [];
  const take = <T,>(items: T[], f: (x: T) => Hit | null) => { let n = 0; for (const x of items) { if (n >= limitPerKind) break; const h = f(x); if (h) { out.push(h); n++; } } };
  const byRecent = <T extends { updatedAt: string }>(a: T[]) => [...a].sort((x, y) => (x.updatedAt < y.updatedAt ? 1 : -1));
  take(byRecent(d.leads), (l) => matches([l.name, l.phone, l.town, l.notes, l.eventType], q) ? { kind: 'lead', id: l.id, title: l.name, sub: `${l.phone}${l.eventDate ? ' · ' + l.eventDate : ''}`, path: '/leads/' + l.id, sort: l.updatedAt } : null);
  take(byRecent(d.events), (e) => matches([e.title, e.customerName, e.customerPhone, e.venue, e.town, e.notes], q) ? { kind: 'event', id: e.id, title: e.title, sub: `${e.date}${e.customerName ? ' · ' + e.customerName : ''}`, path: '/events/' + e.id, sort: e.updatedAt } : null);
  take(byRecent(d.quotes), (x) => matches([x.customerName, x.customerPhone, x.eventTitle, x.town, x.notes], q) ? { kind: 'quote', id: x.id, title: x.customerName || x.eventTitle, sub: x.eventTitle, path: '/quotes/' + x.id, sort: x.updatedAt } : null);
  take(byRecent(d.payments), (p) => matches([p.customerName, p.reference, p.note], q) ? { kind: 'payment', id: p.id, title: p.customerName || '—', sub: `${p.date} · ${fmtMoney(p.amount)}`, path: p.eventId ? '/payments?event=' + p.eventId : '/payments', sort: p.updatedAt } : null);
  take(d.staff, (s) => matches([s.name, s.phone, s.notes], q) ? { kind: 'staff', id: s.id, title: s.name, sub: s.phone ?? '', path: '/staff', sort: s.updatedAt } : null);
  return out;
}

/** Other leads that have the same phone number (compared by the last 10 digits). */
export const sameNumber = (a: string, b: string) => { const ka = phoneKey(a); return !!ka && ka === phoneKey(b); };
