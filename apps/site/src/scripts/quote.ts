import { readCart, removeItem, clearCart, names, langIndex } from './cart';
// Quote form logic. Nothing is sent to a server; the message goes to WhatsApp only.
export interface QuoteValues {
  name: string; phone: string; event: string; date: string; guests: string;
  town: string; order: string; cuisines: string[]; notes: string; dishes?: string[];
}
export interface QuoteLabels {
  greeting: string; name: string; phone: string; event: string; date: string; guests: string;
  town: string; order: string; cuisine: string; dishes: string; notes: string; thanks: string;
  errors: { name: string; phone: string; event: string; guests: string };
}
export const cleanPhone = (p: string) => p.replace(/[\s\-()]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');
export const validPhone = (p: string) => /^[6-9]\d{9}$/.test(cleanPhone(p));

export function validate(v: QuoteValues, e: QuoteLabels['errors']): Partial<Record<'name' | 'phone' | 'event' | 'guests', string>> {
  const out: Partial<Record<'name' | 'phone' | 'event' | 'guests', string>> = {};
  if (!v.name.trim()) out.name = e.name;
  if (!validPhone(v.phone)) out.phone = e.phone;
  if (!v.event) out.event = e.event;
  const g = Number(v.guests);
  if (!v.guests || !Number.isFinite(g) || g < 1) out.guests = e.guests;
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
    (['name', 'phone', 'event', 'guests'] as const).forEach((k) => {
      const el = document.getElementById(`err-${k}`)!;
      const input = form.elements.namedItem(k) as HTMLElement;
      el.textContent = errs[k] || '';
      input.setAttribute('aria-invalid', errs[k] ? 'true' : 'false');
    });
    const first = Object.keys(errs)[0];
    if (first) { (form.elements.namedItem(first) as HTMLElement).focus(); return; }
    const msg = buildMessage(v, labels);
    msgBox.textContent = msg;
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
