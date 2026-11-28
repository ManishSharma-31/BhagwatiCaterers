import { readCart, removeItem, clearCart, names, langIndex } from './cart';
import { DEFAULT_CLOUD_URL, DEFAULT_CLOUD_KEY } from '../admin/cloud-defaults';
// Quote form logic. The message opens in WhatsApp, and the same enquiry is also saved to the owner's admin portal
// (best effort: if saving fails, WhatsApp still works). The public key can only ADD enquiries, never read them.
export interface EnquiryPayload { name: string; phone: string; event_type: string; event_date: string | null; guests: number; town: string | null; order_type: string | null; cuisines: string | null; dishes: string | null; notes: string | null; lang: string }
export async function saveEnquiry(p: EnquiryPayload, f: typeof fetch = fetch): Promise<boolean> {
  try {
    const r = await f(`${DEFAULT_CLOUD_URL}/rest/v1/enquiries`, {
      method: 'POST', keepalive: true,
      headers: { apikey: DEFAULT_CLOUD_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify(p),
    });
    return r.ok;
  } catch { return false; }
}
export interface QuoteValues {
  name: string; phone: string; event: string; date: string; guests: string;
  town: string; order: string; cuisines: string[]; notes: string; dishes?: string[];
}
export interface QuoteLabels {
  greeting: string; name: string; phone: string; event: string; date: string; guests: string;
  town: string; order: string; cuisine: string; dishes: string; notes: string; thanks: string;
  errors: { name: string; phone: string; event: string; guests: string; date: string };
}
export const cleanPhone = (p: string) => p.replace(/[\s\-()]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');
export const validPhone = (p: string) => /^[6-9]\d{9}$/.test(cleanPhone(p));

type Field = 'name' | 'phone' | 'event' | 'guests' | 'date';
/** Today as YYYY-MM-DD in the visitor's own time zone (not UTC), so "today" is never rejected. */
export const todayLocal = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

export function validate(v: QuoteValues, e: QuoteLabels['errors']): Partial<Record<Field, string>> {
  const out: Partial<Record<Field, string>> = {};
  if (!v.name.trim()) out.name = e.name;
  if (!validPhone(v.phone)) out.phone = e.phone;
  if (!v.event) out.event = e.event;
  const g = Number(v.guests);
  // Whole number, 1 or more. No upper limit.
  if (!/^\d+$/.test(v.guests.trim()) || !Number.isSafeInteger(g) || g < 1) out.guests = e.guests;
  if (v.date && v.date < todayLocal()) out.date = e.date;
  return out;
}

export function buildMessage(v: QuoteValues, l: QuoteLabels): string {
  const lines = [l.greeting, '', `${l.name}: ${v.name.trim()}`, `${l.phone}: ${cleanPhone(v.phone)}`, `${l.event}: ${v.event}`];
  if (v.date) lines.push(`${l.date}: ${v.date.split('-').reverse().join('-')}`);
  lines.push(`${l.guests}: ${v.guests}`);
  if (v.town) lines.push(`${l.town}: ${v.town}`);
  if (v.order) lines.push(`${l.order}: ${v.order}`);
  if (v.cuisines.length) lines.push(`${l.cuisine}: ${v.cuisines.join(', ')}`);
  if (v.dishes && v.dishes.length) { lines.push(`${l.dishes} (${v.dishes.length}):`); v.dishes.forEach((d) => lines.push(`• ${d}`)); }
  if (v.notes.trim()) lines.push(`${l.notes}: ${v.notes.trim()}`);
  lines.push('', l.thanks);
  return lines.join('\n');
}

export function waUrl(phoneIntl: string, msg: string) {
  return `https://wa.me/${phoneIntl}?text=${encodeURIComponent(msg)}`;
}

export function initQuoteForm() {
  const form = document.getElementById('quote-form') as HTMLFormElement | null;
  if (!form) return;
  const labels: QuoteLabels = JSON.parse(form.dataset.labels || '{}');
  (form.elements.namedItem('date') as HTMLInputElement | null)?.setAttribute('min', todayLocal());
  const phoneIntl = form.dataset.phone || '';
  const panel = document.getElementById('quote-done') as HTMLElement;
  const msgBox = document.getElementById('quote-msg') as HTMLElement;
  const copyBtn = document.getElementById('quote-copy') as HTMLButtonElement;
  const status = document.getElementById('quote-copied') as HTMLElement;
  const opt = (id: string) => {
    const s = form.elements.namedItem(id) as HTMLSelectElement;
    return s.value ? s.selectedOptions[0].textContent!.trim() : '';
  };
  const box = document.getElementById('quote-dishes');
  const ul = document.getElementById('quote-dishes-list');
  const none = document.getElementById('quote-dishes-none');
  const renderDishes = () => {
    if (!box || !ul || !none) return;
    const items = readCart(), li = langIndex();
    ul.innerHTML = '';
    items.forEach((it) => {
      const row = document.createElement('li');
      const t = document.createElement('span'); t.textContent = it.n[li] || it.n[0];
      const b = document.createElement('button'); b.type = 'button'; b.className = 'qd-rm'; b.textContent = box.dataset.remove || 'x'; b.setAttribute('aria-label', `${box.dataset.remove || 'x'}: ${t.textContent}`);
      b.addEventListener('click', () => { removeItem(it.id); renderDishes(); });
      row.append(t, b); ul.append(row);
    });
    none.hidden = items.length > 0;
    document.getElementById('quote-dishes-clear')!.hidden = items.length === 0;
  };
  document.getElementById('quote-dishes-clear')?.addEventListener('click', () => { clearCart(); renderDishes(); });
  renderDishes();
  window.addEventListener('pageshow', renderDishes);
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const fd = new FormData(form);
    if (fd.get('website')) return; // honeypot
    const v: QuoteValues = {
      name: String(fd.get('name') || ''), phone: String(fd.get('phone') || ''),
      event: opt('event'), date: String(fd.get('date') || ''), guests: String(fd.get('guests') || ''),
      town: opt('town'), order: opt('order'),
      cuisines: Array.from(form.querySelectorAll<HTMLInputElement>('input[name=cuisine]:checked')).map((i) => i.parentElement!.textContent!.trim()),
      notes: String(fd.get('notes') || ''),
      dishes: names(),
    };
    const raw = { event: String(fd.get('event') || ''), guests: v.guests };
    const errs = validate({ ...v, event: raw.event }, labels.errors);
    (['name', 'phone', 'event', 'guests', 'date'] as const).forEach((k) => {
      const el = document.getElementById(`err-${k}`)!;
      const input = form.elements.namedItem(k) as HTMLElement;
      el.textContent = errs[k] || '';
      input.setAttribute('aria-invalid', errs[k] ? 'true' : 'false');
    });
    const first = Object.keys(errs)[0];
    if (first) { (form.elements.namedItem(first) as HTMLElement).focus(); return; }
    const msg = buildMessage(v, labels);
    const cuisineKeys = Array.from(form.querySelectorAll<HTMLInputElement>('input[name=cuisine]:checked')).map((i) => i.value);
    void saveEnquiry({
      name: v.name.trim().slice(0, 120), phone: cleanPhone(v.phone), event_type: raw.event, event_date: v.date || null,
      guests: Number(v.guests), town: String(fd.get('town') || '') || null, order_type: String(fd.get('order') || '') || null,
      cuisines: cuisineKeys.join(',') || null, dishes: (v.dishes || []).join('; ').slice(0, 6000) || null,
      notes: v.notes.trim().slice(0, 1500) || null, lang: document.documentElement.lang === 'en' ? 'en' : document.documentElement.lang === 'hi' ? 'hi' : 'mr',
    });
    msgBox.textContent = msg;
    const waBtn = document.getElementById('quote-wa') as HTMLAnchorElement | null;
    if (waBtn) waBtn.href = waUrl(phoneIntl, msg);
    panel.hidden = false;
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.open(waUrl(phoneIntl, msg), '_blank', 'noopener');
  });
  copyBtn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(msgBox.textContent || ''); status.textContent = copyBtn.dataset.ok || ''; }
    catch {
      const r = document.createRange(); r.selectNodeContents(msgBox);
      const s = window.getSelection(); s?.removeAllRanges(); s?.addRange(r);
      status.textContent = copyBtn.dataset.manual || '';
    }
  });
}
