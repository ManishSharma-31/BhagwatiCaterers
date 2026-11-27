import type { Lang, OrderType, Quote } from './types';

export const newId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : 'id-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);

export const today = () => toISODate(new Date());
export const toISODate = (d: Date) => {
  const z = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; // local date, not UTC
};
export const addDays = (iso: string, n: number) => {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return toISODate(d);
};
export const daysBetween = (a: string, b: string) =>
  Math.round((new Date(b + 'T00:00:00').getTime() - new Date(a + 'T00:00:00').getTime()) / 86400000);

export const fmtMoney = (n: number) => '₹' + new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(n || 0));
export const fmtDate = (iso?: string, lang: Lang = 'en') =>
  iso ? new Intl.DateTimeFormat(lang === 'mr' ? 'mr-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso + 'T00:00:00')) : '';

/** Normalise an Indian mobile number to 91XXXXXXXXXX for wa.me. Returns '' if it is not a valid 10-digit mobile. */
export const waNumber = (phone: string) => {
  const d = (phone || '').replace(/\D/g, '');
  const ten = d.length === 12 && d.startsWith('91') ? d.slice(2) : d.length === 11 && d.startsWith('0') ? d.slice(1) : d;
  return /^[6-9]\d{9}$/.test(ten) ? '91' + ten : '';
};
export const waUrl = (phone: string, text: string) => {
  const n = waNumber(phone);
  return `https://wa.me/${n}?text=${encodeURIComponent(text)}`;
};
/** Last 10 digits of an Indian number (used to compare numbers typed in different styles: +91, 0, spaces). '' if too short. */
export const phoneKey = (phone: string) => { const d = (phone || '').replace(/\D/g, ''); return d.length >= 10 ? d.slice(-10) : ''; };
/** Store a valid Indian mobile as plain 10 digits (no +91, spaces or dashes); anything else is only trimmed so the owner can fix it. */
export const normPhone = (phone: string) => { const n = waNumber(phone); return n ? n.slice(2) : (phone || '').trim(); };
/** True when the text is a usable 10-digit Indian mobile number. */
export const isValidPhone = (phone: string) => !!waNumber(phone);
/** True when an ISO date (YYYY-MM-DD) is before today. */
export const isPast = (iso?: string) => !!iso && iso < today();

/** Remove control, zero-width and bidi-override characters from text that goes into WhatsApp messages or exports. */
export const cleanText = (s: string | undefined | null) =>
  (s ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g, '').trim();

/** Copy text to the clipboard. Falls back to a hidden textarea for old browsers. Returns true on success. */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); return true; }
  } catch { /* fall through */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    document.body.appendChild(ta); ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch { return false; }
}

export const telUrl = (phone: string) => { const n = waNumber(phone); return n ? `tel:+${n}` : `tel:${phone}`; };

export const quoteTotal = (q: Pick<Quote, 'guests' | 'perPlate' | 'lines' | 'discount'>) =>
  Math.max(0, (q.guests || 0) * (q.perPlate || 0) + (q.lines || []).reduce((s, l) => s + (l.amount || 0), 0) - (q.discount || 0));

export const orderTypeLabel = (t: OrderType, lang: Lang) =>
  ({
    'without-material': { mr: 'सर्व साहित्यासह (आमचे साहित्य)', en: 'We bring everything' },
    'with-material': { mr: 'ग्राहकाचे साहित्य, आमचा स्वयंपाक', en: 'Customer provides ingredients' },
    'not-sure': { mr: 'अजून ठरले नाही', en: 'Not decided' },
  })[t][lang];

export const download = (filename: string, content: string, mime = 'text/plain;charset=utf-8') => {
  const url = URL.createObjectURL(new Blob([content], { type: mime }));
  const a = document.createElement('a');
  a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

/** CSV with a BOM so Excel opens Marathi text correctly. */
export const toCsv = (rows: Array<Record<string, unknown>>) => {
  if (!rows.length) return '';
  const cols = [...new Set(rows.flatMap((r) => Object.keys(r)))];
  const esc = (v: unknown) => {
    let s = Array.isArray(v) ? v.join('; ') : v == null ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v);
    // Spreadsheet formula injection: a text cell that starts with = + - @ (or tab/CR) could run as a formula in Excel. Prefix a quote.
    if (typeof v === 'string' && /^[=@\t\r]|^[+-](?![\d\s.,()+-]*$)/.test(s)) s = "'" + s;
    return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  return '﻿' + [cols.join(','), ...rows.map((r) => cols.map((c) => esc(r[c])).join(','))].join('\r\n');
};
