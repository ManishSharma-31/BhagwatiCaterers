import './leads.css';
import { useState, useEffect } from 'preact/hooks';
import { useList, useStore, tr } from '../../hooks';
import { go, href, type Route } from '../../router';
import { EVENT_TYPES, LEAD_SOURCES, LEAD_STATUSES, ORDER_TYPES, type EventType, type Lang, type Lead, type LeadSource, type LeadStatus, type OrderType } from '../../types';
import { defaultSettings } from '../../seed';
import { fmtDate, fmtMoney, normPhone, orderTypeLabel, quoteTotal, telUrl, today, waUrl, focusFirstInvalid } from '../../util';
import { LEAD_TOWNS, buildLeadMessage, findDuplicates, followUpDate, townLabel, validateLead, type LeadErrors } from './logic';
import { EVENT_LABEL, STATUS_LABEL } from './LeadsScreen';
import { QSTATUS } from '../quotes/QuotesScreen';
import { KIND, METHOD } from '../payments/PaymentsScreen';
import { CopyButton } from '../../ui';

const SOURCE_LABEL: Record<LeadSource, { mr: string; en: string }> = {
  whatsapp: { mr: 'व्हॉट्सअॅप', en: 'WhatsApp' }, call: { mr: 'फोन कॉल', en: 'Phone call' }, walkin: { mr: 'प्रत्यक्ष भेट', en: 'Walk-in' },
  referral: { mr: 'ओळखीतून', en: 'Referral' }, website: { mr: 'वेबसाइट', en: 'Website' }, other: { mr: 'इतर', en: 'Other' },
};
const CUISINES = [
  { id: 'maharashtrian', mr: 'महाराष्ट्रीयन', en: 'Maharashtrian' }, { id: 'south-indian', mr: 'साउथ इंडियन', en: 'South Indian' },
  { id: 'rajasthani', mr: 'राजस्थानी', en: 'Rajasthani' }, { id: 'mixed', mr: 'मिश्र', en: 'Mixed' },
];
const OTHER_TOWN = '__other';

type Form = { name: string; phone: string; eventType: EventType; eventDate: string; guests: string; town: string; orderType: OrderType; cuisines: string[]; source: LeadSource; notes: string; status: LeadStatus; nextFollowUp: string; lostReason: string };
const blank = (): Form => ({ name: '', phone: '', eventType: 'wedding', eventDate: '', guests: '', town: 'Latur', orderType: 'not-sure', cuisines: [], source: 'call', notes: '', status: 'new', nextFollowUp: '', lostReason: '' });
const toForm = (l: Lead): Form => ({ name: l.name, phone: l.phone, eventType: l.eventType, eventDate: l.eventDate ?? '', guests: l.guests ? String(l.guests) : '', town: l.town ?? '', orderType: l.orderType, cuisines: l.cuisines, source: l.source, notes: l.notes ?? '', status: l.status, nextFollowUp: l.nextFollowUp ?? '', lostReason: l.lostReason ?? '' });

export function LeadDetail({ lang, route }: { lang: Lang; route: Route }) {
  const id = route.parts[0];
  const isNew = id === 'new';
  const store = useStore();
  const leads = useList('leads');
  const quotes = useList('quotes');
  const events = useList('events');
  const payments = useList('payments');
  const settingsList = useList('settings');
  const existing = isNew ? undefined : leads?.find((l) => l.id === id);
  const [f, setF] = useState<Form>(blank);
  const [loadedId, setLoadedId] = useState<string>();
  const [errs, setErrs] = useState<LeadErrors>({});
  const [msg, setMsg] = useState('');
  const [otherTown, setOtherTown] = useState(false);

  useEffect(() => {
    if (existing && loadedId !== existing.id) { setF(toForm(existing)); setLoadedId(existing.id); setOtherTown(!!existing.town && !(LEAD_TOWNS as readonly string[]).includes(existing.town)); }
  }, [existing?.id]);

  if (!leads) return <div class="page"><p class="muted">{tr(lang, 'लोड होत आहे…', 'Loading…')}</p></div>;
  if (!isNew && !existing) return <div class="page"><h1>{tr(lang, 'चौकशी सापडली नाही', 'Lead not found')}</h1><a class="btn" href={href('/leads')}>{tr(lang, 'यादीकडे', 'Back to list')}</a></div>;

  const set = <K extends keyof Form>(k: K, v: Form[K]) => { setF((p) => ({ ...p, [k]: v })); setMsg(''); };
  const txt = (k: keyof Form) => (e: Event) => set(k, (e.target as HTMLInputElement).value as never);
  const settings = settingsList?.find((s) => s.id === 'main') ?? defaultSettings();

  const build = (over: Partial<Form> = {}): Omit<Lead, 'id' | 'createdAt' | 'updatedAt'> & Partial<Lead> => {
    const x = { ...f, ...over };
    return {
      ...(existing ?? {}),
      name: x.name.trim(), phone: normPhone(x.phone), eventType: x.eventType, eventDate: x.eventDate || undefined,
      guests: x.guests ? Number(x.guests) : undefined, town: x.town.trim() || undefined, orderType: x.orderType, cuisines: x.cuisines,
      notes: x.notes.trim() || undefined, status: x.status, source: x.source, nextFollowUp: x.nextFollowUp || undefined,
      lostReason: x.status === 'lost' ? x.lostReason.trim() || undefined : undefined,
    };
  };
  const save = async (over: Partial<Form> = {}) => {
    const x = { ...f, ...over };
    const e = validateLead(x, lang);
    setErrs(e);
    if (Object.keys(e).length) { focusFirstInvalid(); setMsg(tr(lang, 'कृपया लाल रंगातील चुका दुरुस्त करा.', 'Please fix the errors shown in red.')); return null; }
    if (isNew && findDuplicates(leads, x.phone).length && !confirm(tr(lang, 'या नंबरची चौकशी आधीच आहे. तरीही नवी चौकशी सेव्ह करायची?', 'A lead with this number already exists. Save a new one anyway?'))) return null;
    if (isNew && x.eventDate && x.eventDate < today() && !confirm(tr(lang, 'कार्यक्रमाची तारीख होऊन गेलेली आहे. तरीही सेव्ह करायचे?', 'The event date is in the past. Save anyway?'))) return null;
    const saved = await store.put('leads', build(over));
    setMsg(tr(lang, 'सेव्ह झाले ✔', 'Saved ✔'));
    if (isNew) go('/leads/' + saved.id);
    return saved;
  };
  const quick = (over: Partial<Form>) => { setF((p) => ({ ...p, ...over })); if (!isNew) void save(over); };
  const remove = async () => {
    if (!existing) return;
    const linked = (quotes ?? []).filter((q) => q.leadId === existing.id).length + (events ?? []).filter((ev) => ev.leadId === existing.id).length;
    const extra = linked ? tr(lang, ` यातील ${linked} कोटेशन/कार्यक्रम तसेच राहतील.`, ` Its ${linked} linked quote(s)/event(s) will stay.`) : '';
    if (confirm(tr(lang, 'ही चौकशी काढायची?', 'Delete this lead?') + extra)) { await store.remove('leads', existing.id); go('/leads'); }
  };

  const t = today();
  const phoneOk = !!f.phone && !validateLead({ name: 'x', phone: f.phone }, lang).phone;
  const myQuotes = (quotes ?? []).filter((q) => q.leadId === id);
  const myEvents = (events ?? []).filter((ev) => ev.leadId === id);
  const myPays = (payments ?? []).filter((p) => p.leadId === id || (p.eventId && myEvents.some((ev) => ev.id === p.eventId)));
  const dupes = findDuplicates(leads, f.phone, existing?.id);
  const pastDate = !!f.eventDate && f.eventDate < t && f.status !== 'completed';
  const townIsPreset = (LEAD_TOWNS as readonly string[]).includes(f.town);

  return (
    <div class="page">
      <p class="no-print"><a class="back" href={href('/leads')}>← {tr(lang, 'चौकशी यादी', 'All leads')}</a></p>
      <h1>{isNew ? tr(lang, 'नवीन चौकशी', 'New lead') : f.name || tr(lang, 'चौकशी', 'Lead')}</h1>

      {!isNew && (
        <div class="lead-actions">
          {phoneOk ? <a class="btn btn-green" href={telUrl(f.phone)}>📞 {tr(lang, 'फोन करा', 'Call')}</a> : <button class="btn btn-green" type="button" disabled>📞 {tr(lang, 'फोन करा', 'Call')}</button>}
          {phoneOk ? <a class="btn btn-green" target="_blank" rel="noopener" href={waUrl(f.phone, buildLeadMessage({ name: f.name, eventDate: f.eventDate || undefined }, settings, lang))}>💬 WhatsApp</a> : <button class="btn btn-green" type="button" disabled>💬 WhatsApp</button>}
          <a class="btn" href={href('/quotes/new?lead=' + id)}>🧾 {tr(lang, 'कोटेशन बनवा', 'Create quote')}</a>
          <a class="btn" href={href('/events/new?lead=' + id)}>🗓️ {tr(lang, 'कार्यक्रम बनवा', 'Create event')}</a>
          <CopyButton lang={lang} small={false} text={() => buildLeadMessage({ name: f.name, eventDate: f.eventDate || undefined }, settings, lang)} label={tr(lang, 'संदेश कॉपी', 'Copy message')} />
        </div>
      )}

      {!isNew && (
        <div class="card">
          <h3>{tr(lang, 'स्थिती पटकन बदला', 'Quick status')}</h3>
          <div class="chips">
            {LEAD_STATUSES.map((s) => <button type="button" class={f.status === s ? 'chip on' : 'chip'} onClick={() => quick({ status: s })}>{tr(lang, STATUS_LABEL[s].mr, STATUS_LABEL[s].en)}</button>)}
          </div>
          <h3>{tr(lang, 'पुन्हा संपर्क कधी करायचा?', 'Follow up when?')}</h3>
          <div class="chips">
            <button type="button" class="chip" onClick={() => quick({ nextFollowUp: followUpDate('tomorrow', t) })}>{tr(lang, 'उद्या', 'Tomorrow')}</button>
            <button type="button" class="chip" onClick={() => quick({ nextFollowUp: followUpDate('3days', t) })}>{tr(lang, '३ दिवसांनी', 'In 3 days')}</button>
            <button type="button" class="chip" onClick={() => quick({ nextFollowUp: followUpDate('week', t) })}>{tr(lang, 'पुढच्या आठवड्यात', 'Next week')}</button>
          </div>
          {f.nextFollowUp && <p class="muted small">⏰ {fmtDate(f.nextFollowUp, lang)}</p>}
        </div>
      )}

      <form class="card" onSubmit={(e) => { e.preventDefault(); void save(); }} noValidate>
        <div class="field"><label for="ld-name">{tr(lang, 'ग्राहकाचे नाव *', 'Customer name *')}</label>
          <input id="ld-name" autoFocus={isNew} value={f.name} onInput={txt('name')} autoComplete="off" aria-invalid={!!errs.name} />{errs.name && <div class="err">{errs.name}</div>}</div>
        <div class="field"><label for="ld-phone">{tr(lang, 'मोबाईल नंबर * (१० अंक)', 'Mobile number * (10 digits)')}</label>
          <input id="ld-phone" type="tel" inputMode="tel" value={f.phone} onInput={txt('phone')} aria-invalid={!!errs.phone} />{errs.phone && <div class="err">{errs.phone}</div>}
          {dupes.length > 0 && (
            <div class="warn-box" role="alert">
              ⚠️ {tr(lang, 'हा नंबर आधीच नोंदलेला आहे: ', 'This number is already saved: ')}
              {dupes.slice(0, 3).map((d, i) => <span>{i ? ', ' : ''}<a href={href('/leads/' + d.id)}>{d.name}</a> ({tr(lang, STATUS_LABEL[d.status].mr, STATUS_LABEL[d.status].en)})</span>)}
              {tr(lang, '. नवी नोंद करण्याऐवजी जुनी उघडा.', '. Open the old one instead of adding a new entry.')}
            </div>
          )}</div>
        <div class="grid2">
          <div class="field"><label for="ld-type">{tr(lang, 'कार्यक्रमाचा प्रकार', 'Event type')}</label>
            <select id="ld-type" value={f.eventType} onChange={txt('eventType')}>{EVENT_TYPES.map((x) => <option value={x}>{tr(lang, EVENT_LABEL[x].mr, EVENT_LABEL[x].en)}</option>)}</select></div>
          <div class="field"><label for="ld-date">{tr(lang, 'कार्यक्रमाची तारीख', 'Event date')}</label>
            <input id="ld-date" type="date" value={f.eventDate} onInput={txt('eventDate')} />{pastDate && <div class="warn-text">{tr(lang, '⚠️ ही तारीख होऊन गेली आहे.', '⚠️ This date is in the past.')}</div>}</div>
          <div class="field"><label for="ld-guests">{tr(lang, 'पाहुण्यांची संख्या', 'Number of guests')}</label>
            <input id="ld-guests" type="number" inputMode="numeric" min="1" value={f.guests} onInput={txt('guests')} aria-invalid={!!errs.guests} />{errs.guests && <div class="err">{errs.guests}</div>}</div>
          <div class="field"><label for="ld-town">{tr(lang, 'गाव / शहर', 'Town')}</label>
            <select id="ld-town" value={otherTown || (f.town && !townIsPreset) ? OTHER_TOWN : f.town} onChange={(e) => { const v = (e.target as HTMLSelectElement).value; if (v === OTHER_TOWN) { setOtherTown(true); set('town', townIsPreset ? '' : f.town); } else { setOtherTown(false); set('town', v); } }}>
              <option value="">{tr(lang, '— निवडा —', '— choose —')}</option>
              {LEAD_TOWNS.map((x) => <option value={x}>{townLabel(x, lang)}</option>)}
              <option value={OTHER_TOWN}>{tr(lang, 'इतर (स्वतः लिहा)', 'Other (type it)')}</option>
            </select></div>
        </div>
        {(otherTown || (f.town && !townIsPreset)) && (
          <div class="field"><label for="ld-town2">{tr(lang, 'गावाचे नाव', 'Town name')}</label><input id="ld-town2" value={f.town} onInput={txt('town')} /></div>
        )}
        <div class="field"><label for="ld-order">{tr(lang, 'ऑर्डरचा प्रकार', 'Order type')}</label>
          <select id="ld-order" value={f.orderType} onChange={txt('orderType')}>{ORDER_TYPES.map((x) => <option value={x}>{orderTypeLabel(x, lang)}</option>)}</select></div>
        <div class="field"><span class="lbl">{tr(lang, 'कोणते जेवण हवे?', 'Cuisines wanted')}</span>
          {CUISINES.map((c) => (
            <label class="check"><input type="checkbox" checked={f.cuisines.includes(c.id)} onChange={(e) => set('cuisines', (e.target as HTMLInputElement).checked ? [...f.cuisines, c.id] : f.cuisines.filter((x) => x !== c.id))} /> {tr(lang, c.mr, c.en)}</label>
          ))}</div>
        <div class="grid2">
          <div class="field"><label for="ld-source">{tr(lang, 'चौकशी कुठून आली?', 'Where did it come from?')}</label>
            <select id="ld-source" value={f.source} onChange={txt('source')}>{LEAD_SOURCES.map((x) => <option value={x}>{tr(lang, SOURCE_LABEL[x].mr, SOURCE_LABEL[x].en)}</option>)}</select></div>
          <div class="field"><label for="ld-status">{tr(lang, 'स्थिती', 'Status')}</label>
            <select id="ld-status" value={f.status} onChange={txt('status')}>{LEAD_STATUSES.map((x) => <option value={x}>{tr(lang, STATUS_LABEL[x].mr, STATUS_LABEL[x].en)}</option>)}</select></div>
        </div>
        {f.status === 'lost' && <div class="field"><label for="ld-lost">{tr(lang, 'का गमावले? (कारण)', 'Why was it lost? (reason)')}</label><input id="ld-lost" value={f.lostReason} onInput={txt('lostReason')} /></div>}
        <div class="field"><label for="ld-fu">{tr(lang, 'पुढचा फॉलो-अप दिनांक', 'Next follow-up date')}</label><input id="ld-fu" type="date" value={f.nextFollowUp} onInput={txt('nextFollowUp')} /></div>
        <div class="field"><label for="ld-notes">{tr(lang, 'नोंदी', 'Notes')}</label><textarea id="ld-notes" value={f.notes} onInput={txt('notes')} /></div>
        {msg && <p class={msg.includes('✔') ? 'ok' : 'err'} role="status">{msg}</p>}
        <div class="lead-sticky no-print">
          <button class="btn btn-green" type="submit">💾 {tr(lang, 'सेव्ह करा', 'Save')}</button>
          {!isNew && <button class="btn btn-danger" type="button" onClick={remove}>🗑️ {tr(lang, 'काढा', 'Delete')}</button>}
        </div>
      </form>

      {!isNew && (
        <div class="card">
          <h3>🧾 {tr(lang, 'कोटेशन', 'Quotes')}</h3>
          {myQuotes.length === 0 ? <p class="muted">{tr(lang, 'अजून नाही', 'None yet')}</p> : (
            <div class="list">{myQuotes.map((q) => (
              <a class="list-item" href={href('/quotes/' + q.id)}><div class="li-main"><div class="li-title">{q.eventTitle || q.customerName}</div><div class="li-sub">{fmtMoney(quoteTotal(q))}</div></div><span class={'badge ' + q.status}>{tr(lang, QSTATUS[q.status].mr, QSTATUS[q.status].en)}</span></a>
            ))}</div>)}
          <h3>🗓️ {tr(lang, 'कार्यक्रम', 'Events')}</h3>
          {myEvents.length === 0 ? <p class="muted">{tr(lang, 'अजून नाही', 'None yet')}</p> : (
            <div class="list">{myEvents.map((ev) => (
              <a class="list-item" href={href('/events/' + ev.id)}><div class="li-main"><div class="li-title">{ev.title}</div><div class="li-sub">{fmtDate(ev.date, lang)}</div></div></a>
            ))}</div>)}
          <h3>₹ {tr(lang, 'पैसे', 'Payments')}</h3>
          {myPays.length === 0 ? <p class="muted">{tr(lang, 'अजून नाही', 'None yet')}</p> : (
            <div class="list">{myPays.map((p) => (
              <div class="list-item"><div class="li-main"><div class="li-title">{fmtDate(p.date, lang)}</div><div class="li-sub">{tr(lang, KIND[p.kind].mr, KIND[p.kind].en)} · {tr(lang, METHOD[p.method].mr, METHOD[p.method].en)}</div></div><span class="money" style={{ color: p.direction === 'in' ? 'var(--a-green)' : 'var(--a-red)' }}>{p.direction === 'in' ? '+' : '-'}{fmtMoney(p.amount)}</span></div>
            ))}</div>)}
          <p><a class="btn btn-ghost btn-sm" href={href('/payments?lead=' + id + '&new=1')}>+ {tr(lang, 'पैसे नोंदवा', 'Add payment')}</a></p>
        </div>
      )}
    </div>
  );
}
