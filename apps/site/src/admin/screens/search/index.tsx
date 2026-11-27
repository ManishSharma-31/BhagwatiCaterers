import { useEffect, useState } from 'preact/hooks';
import { tr, useList } from '../../hooks';
import { href, type Route } from '../../router';
import type { Lang } from '../../types';
import { fmtDate } from '../../util';
import { searchAll, type HitKind } from './logic';

const ICON: Record<HitKind, string> = { lead: '📋', quote: '🧾', event: '🗓️', payment: '₹', staff: '👥', dish: '🍽️' };
const KIND: Record<HitKind, [string, string]> = {
  lead: ['चौकशी', 'Lead'], quote: ['कोटेशन', 'Quote'], event: ['कार्यक्रम', 'Event'], payment: ['पैसे', 'Payment'], staff: ['कर्मचारी', 'Staff'], dish: ['पदार्थ', 'Dish'],
};

export function SearchScreen({ lang, route }: { lang: Lang; route: Route }) {
  const leads = useList('leads'), quotes = useList('quotes'), events = useList('events'), payments = useList('payments'), staff = useList('staff'), menu = useList('menu');
  const [q, setQ] = useState(route.query.get('q') ?? '');
  useEffect(() => { document.getElementById('gs-q')?.focus(); }, []);
  const ready = leads && quotes && events && payments && staff && menu;
  const hits = ready ? searchAll({ leads, quotes, events, payments, staff, menu }, q) : [];
  const pretty = (sub: string) => sub.replace(/\b(\d{4}-\d{2}-\d{2})\b/g, (d) => fmtDate(d, lang));
  return (
    <div class="page">
      <h1>{tr(lang, 'शोधा', 'Search')}</h1>
      <div class="field">
        <label for="gs-q">{tr(lang, 'नाव, फोन, कार्यक्रम, ठिकाण…', 'Name, phone, event, place…')}</label>
        <input id="gs-q" type="search" inputMode="search" autoComplete="off" value={q} onInput={(e) => setQ((e.target as HTMLInputElement).value)} />
      </div>
      {!ready && <p class="muted">{tr(lang, 'लोड होत आहे…', 'Loading…')}</p>}
      {ready && !q.trim() && <p class="empty">{tr(lang, 'वर काहीही लिहा. चौकशी, कोटेशन, कार्यक्रम, पैसे आणि कर्मचारी एकत्र शोधले जातील.', 'Type above. Leads, quotes, events, payments and staff are searched together.')}</p>}
      {ready && q.trim() && hits.length === 0 && <p class="empty">{tr(lang, 'काहीही सापडले नाही. फोन नंबर शोधत असाल तर किमान ३ अंक लिहा.', 'Nothing found. For a phone number, type at least 3 digits.')}</p>}
      <div class="list">
        {hits.map((h) => (
          <a class="list-item" href={href(h.path)} key={h.kind + h.id}>
            <span class="li-icon" aria-hidden="true">{ICON[h.kind]}</span>
            <span class="li-main"><span class="li-title">{h.title}</span><br /><span class="li-sub">{tr(lang, KIND[h.kind][0], KIND[h.kind][1])}{h.sub ? ' · ' + pretty(h.sub) : ''}</span></span>
          </a>
        ))}
      </div>
    </div>
  );
}
