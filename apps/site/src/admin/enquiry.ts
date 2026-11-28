import type { Lead, EventType, OrderType } from './types';

/** One row of the public.enquiries table (see supabase/migrations/0002_enquiries.sql). */
export interface EnquiryRow {
  id: string; created_at: string; name: string; phone: string; event_type?: string | null; event_date?: string | null; guests: number;
  town?: string | null; order_type?: string | null; cuisines?: string | null; dishes?: string | null; notes?: string | null; lang?: string | null;
}
const EVENT: Record<string, EventType> = { wedding: 'wedding', engagement: 'engagement', haldi: 'haldi', housewarming: 'housewarming', puja: 'puja', party: 'birthday', office: 'office', home: 'home-food', other: 'other' };
const ORDER: Record<string, OrderType> = { ours: 'without-material', theirs: 'with-material', unsure: 'not-sure' };
const CUISINE: Record<string, string> = { mh: 'maharashtrian', si: 'south-indian', rj: 'rajasthani', mix: 'mixed' };
const EXTRA_CUISINE: Record<string, string> = { gj: 'Gujarati', bn: 'Bengali sweets', cn: 'Indo-Chinese' };
const TOWN: Record<string, string> = { latur: 'Latur', ausa: 'Ausa', nilanga: 'Nilanga', renapur: 'Renapur', tuljapur: 'Tuljapur', ambajogai: 'Ambajogai', maharashtra: 'All across Maharashtra' };

/** Turn a website enquiry into a new lead. The id is fixed ('enq-<id>') so the same enquiry can never be imported twice. */
export function enquiryToLead(r: EnquiryRow): Lead {
  const keys = (r.cuisines ?? '').split(',').filter(Boolean);
  const extra = keys.filter((k) => EXTRA_CUISINE[k]).map((k) => EXTRA_CUISINE[k]);
  const notes = [
    'Website enquiry' + (r.lang ? ` (${r.lang})` : ''),
    extra.length ? 'Also interested in: ' + extra.join(', ') : '',
    r.dishes ? 'Selected dishes: ' + r.dishes : '',
    r.notes ? 'Customer note: ' + r.notes : '',
  ].filter(Boolean).join('\n');
  const now = new Date().toISOString();
  return {
    id: 'enq-' + r.id, createdAt: r.created_at || now, updatedAt: now,
    name: r.name, phone: r.phone, eventType: EVENT[r.event_type ?? ''] ?? 'other', eventDate: r.event_date || undefined, guests: r.guests,
    town: r.town ? TOWN[r.town] ?? '' : '', orderType: ORDER[r.order_type ?? ''] ?? 'not-sure',
    cuisines: keys.map((k) => CUISINE[k]).filter(Boolean), notes, status: 'new', source: 'website',
  };
}
