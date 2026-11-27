import './events.css';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { tr, useList, useStore } from '../../hooks';
import { go, href, type Route } from '../../router';
import { EVENT_STATUSES, EVENT_TYPES, ORDER_TYPES, TASK_CATEGORIES, type CatEvent, type Lang, type Lead, type MenuItem, type Payment, type Quote, type Staff, type Task } from '../../types';
import { fmtDate, fmtMoney, isValidPhone, normPhone, orderTypeLabel, quoteTotal, today, waUrl } from '../../util';
import { CopyButton } from '../../ui';
import { QSTATUS } from '../quotes/QuotesScreen';
import { categoryLabel, cuisineLabel, dishName, eventStatusLabel, eventTypeLabel, roleLabel, TOWNS, townLabel } from './labels';
import { planTasks, type PlannedTask } from './templates';
import { eventShareText } from './share';
import { progress } from '../tasks/logic';

type Form = Omit<CatEvent, 'id' | 'createdAt' | 'updatedAt'> & { id?: string };

function initialForm(route: Route, id: string, events: CatEvent[], leads: Lead[], quotes: Quote[], lang: Lang): Form | undefined {
  if (id !== 'new') { const e = events.find((x) => x.id === id); return e ? { ...e } : undefined; }
  const blank: Form = { title: '', eventType: 'wedding', date: route.query.get('date') || '', guests: 0, orderType: 'without-material', dishIds: [], extraDishes: [], staffIds: [], status: 'planned', town: 'Latur' };
  const lead = leads.find((l) => l.id === route.query.get('lead'));
  const quote = quotes.find((q) => q.id === route.query.get('quote'));
  const ql = quote?.leadId ? leads.find((l) => l.id === quote.leadId) : undefined;
  if (quote) {
    return { ...blank, title: quote.eventTitle || '', eventType: ql?.eventType ?? 'other', date: quote.eventDate || '', guests: quote.guests || 0, town: quote.town || '', orderType: quote.orderType, dishIds: [...quote.dishIds], extraDishes: [...quote.extraDishes], customerName: quote.customerName, customerPhone: quote.customerPhone, quoteId: quote.id, leadId: quote.leadId, status: 'confirmed' };
  }
  if (lead) {
    return { ...blank, title: `${lead.name} - ${eventTypeLabel(lead.eventType, lang)}`, eventType: lead.eventType, date: lead.eventDate || '', guests: lead.guests || 0, town: lead.town || '', orderType: lead.orderType, customerName: lead.name, customerPhone: lead.phone, leadId: lead.id };
  }
  return blank;
}

export function EventDetail({ lang, route }: { lang: Lang; route: Route }) {
  const id = route.parts[0];
  const events = useList('events'), leads = useList('leads'), quotes = useList('quotes'), menu = useList('menu'), staff = useList('staff'), tasks = useList('tasks'), payments = useList('payments');
  if (!events || !leads || !quotes || !menu || !staff || !tasks || !payments) return <div class="page"><p class="muted">{tr(lang, 'लोड होत आहे…', 'Loading…')}</p></div>;
  const init = initialForm(route, id, events, leads, quotes, lang);
  if (!init) return <div class="page"><h1>{tr(lang, 'कार्यक्रम सापडला नाही', 'Event not found')}</h1><a class="btn" href={href('/events')}>{tr(lang, 'कार्यक्रम यादी', 'All events')}</a></div>;
  return <EventForm key={id + route.query.toString()} {...{ lang, id, init, menu, staff, tasks, quotes, payments, events }} />;
}

function EventForm({ lang, id, init, menu, staff, tasks, quotes, payments, events }: { lang: Lang; id: string; init: Form; menu: MenuItem[]; staff: Staff[]; tasks: Task[]; quotes: Quote[]; payments: Payment[]; events: CatEvent[] }) {
  const store = useStore();
  const isNew = id === 'new';
  const [f, setF] = useState<Form>(init);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [q, setQ] = useState('');
  const [extra, setExtra] = useState('');
  const [tpl, setTpl] = useState<PlannedTask[]>([]);
  const [tplTouched, setTplTouched] = useState(false);
  const [quick, setQuick] = useState('');
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((p) => ({ ...p, [k]: v }));

  useEffect(() => { if (isNew && !tplTouched) setTpl(planTasks(f.eventType, f.date, today(), lang)); }, [f.eventType, f.date, lang, isNew, tplTouched]);

  const evTasks = tasks.filter((t) => t.eventId === id).sort((a, b) => (a.dueDate || '9').localeCompare(b.dueDate || '9'));
  const pr = progress(evTasks);
  const evQuotes = quotes.filter((x) => !isNew && (x.eventId === id || x.id === f.quoteId));
  const accepted = evQuotes.find((x) => x.status === 'accepted');
  const received = payments.filter((p) => p.eventId === id && p.direction === 'in').reduce((s, p) => s + p.amount, 0);
  const expected = accepted ? quoteTotal(accepted) : undefined;
  const staffById = new Map(staff.map((s) => [s.id, s]));
  const staffShown = staff.filter((s) => s.active || f.staffIds.includes(s.id));

  const groups = useMemo(() => {
    const term = q.trim().toLowerCase();
    const items = menu.filter((m) => (m.active || f.dishIds.includes(m.id)) && (!term || m.nameMr.toLowerCase().includes(term) || m.nameEn.toLowerCase().includes(term)));
    const g = new Map<string, MenuItem[]>();
    items.forEach((m) => g.set(m.cuisine, [...(g.get(m.cuisine) ?? []), m]));
    return [...g.entries()];
  }, [menu, q, f.dishIds]);

  const toggle = (k: 'dishIds' | 'staffIds', v: string) => set(k, f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v]);

  const save = async () => {
    if (!f.title.trim()) return setErr(tr(lang, 'कार्यक्रमाचे नाव लिहा.', 'Please enter the event title.'));
    if (!f.date) return setErr(tr(lang, 'तारीख निवडा.', 'Please pick the date.'));
    if (!(f.guests > 0) || !Number.isInteger(f.guests)) return setErr(tr(lang, 'पाहुण्यांची संख्या लिहा (१ किंवा जास्त, पूर्ण संख्या).', 'Please enter the number of guests (a whole number, 1 or more).'));
    if (f.customerPhone?.trim() && !isValidPhone(f.customerPhone)) return setErr(tr(lang, 'ग्राहकाचा फोन १० अंकी मोबाईल नंबर हवा, किंवा रिकामा ठेवा.', 'Customer phone must be a 10-digit mobile number, or leave it empty.'));
    if (isNew && f.date < today() && !confirm(tr(lang, 'ही तारीख होऊन गेली आहे. तरीही सेव्ह करायचे?', 'This date is in the past. Save anyway?'))) return;
    setErr(''); setBusy(true);
    try {
      const saved = await store.put('events', { ...f, title: f.title.trim(), customerPhone: f.customerPhone?.trim() ? normPhone(f.customerPhone) : undefined });
      if (isNew) for (const t of tpl.filter((x) => x.on && x.title.trim())) await store.put('tasks', { eventId: saved.id, title: t.title.trim(), category: t.category, dueDate: t.dueDate || undefined, done: false });
      go('/events/' + saved.id);
    } catch { setErr(tr(lang, 'सेव्ह झाले नाही. पुन्हा प्रयत्न करा.', 'Could not save. Please try again.')); }
    setBusy(false);
  };
  const remove = async () => {
    if (!confirm(tr(lang, `हा कार्यक्रम व त्याची ${evTasks.length} कामे काढायची? (नंतर "परत आणा" दाबता येईल.)`, `Delete this event and its ${evTasks.length} task(s)? (You can undo right after.)`))) return;
    for (const t of evTasks) await store.remove('tasks', t.id);
    await store.remove('events', id);
    go('/events');
  };
  const addQuick = async () => {
    if (!quick.trim()) return;
    await store.put('tasks', { eventId: id, title: quick.trim(), category: 'other', done: false });
    setQuick('');
  };
  const shareText = () => {
    const dishes = [...f.dishIds.map((d) => menu.find((m) => m.id === d)).filter(Boolean).map((m) => dishName(m!, lang)), ...f.extraDishes];
    const names = f.staffIds.map((s) => staffById.get(s)?.name).filter(Boolean) as string[];
    return eventShareText({ ...(f as CatEvent) }, { lang, typeLabel: eventTypeLabel(f.eventType, lang), dateText: fmtDate(f.date, lang), dishes, staff: names, town: townLabel(f.town, lang) });
  };
  const share = () => window.open(waUrl('', shareText()), '_blank', 'noopener');

  const F = (label: string, el: preact.ComponentChildren, fid: string) => <div class="field"><label for={fid}>{label}</label>{el}</div>;

  return (
    <div class="page">
      <p><a class="back" href={href('/events')}>← {tr(lang, 'कार्यक्रम', 'Events')}</a></p>
      <h1>{isNew ? tr(lang, 'नवीन कार्यक्रम', 'New event') : f.title}</h1>

      <div class="card">
        {F(tr(lang, 'कार्यक्रमाचे नाव', 'Event title'), <input id="ev-title" value={f.title} onInput={(e) => set('title', (e.target as HTMLInputElement).value)} />, 'ev-title')}
        <div class="grid2">
          {F(tr(lang, 'कार्यक्रमाचा प्रकार', 'Event type'), <select id="ev-type" value={f.eventType} onChange={(e) => set('eventType', (e.target as HTMLSelectElement).value as CatEvent['eventType'])}>{EVENT_TYPES.map((t) => <option value={t}>{eventTypeLabel(t, lang)}</option>)}</select>, 'ev-type')}
          {F(tr(lang, 'स्थिती', 'Status'), <select id="ev-status" value={f.status} onChange={(e) => set('status', (e.target as HTMLSelectElement).value as CatEvent['status'])}>{EVENT_STATUSES.map((s) => <option value={s}>{eventStatusLabel(s, lang)}</option>)}</select>, 'ev-status')}
          {F(tr(lang, 'तारीख', 'Date'), <input id="ev-date" type="date" value={f.date} onInput={(e) => set('date', (e.target as HTMLInputElement).value)} />, 'ev-date')}
          {F(tr(lang, 'सुरू होण्याची वेळ', 'Start time'), <input id="ev-time" type="time" value={f.startTime || ''} onInput={(e) => set('startTime', (e.target as HTMLInputElement).value || undefined)} />, 'ev-time')}
        </div>
        {F(tr(lang, 'ठिकाण / हॉल', 'Venue'), <input id="ev-venue" value={f.venue || ''} onInput={(e) => set('venue', (e.target as HTMLInputElement).value)} />, 'ev-venue')}
        <div class="grid2">
          <div class="field">
            <label for="ev-town">{tr(lang, 'गाव / शहर', 'Town')}</label>
            <input id="ev-town" list="ev-towns" value={f.town || ''} onInput={(e) => set('town', (e.target as HTMLInputElement).value)} />
            <datalist id="ev-towns">{TOWNS.map((t) => <option value={t}>{townLabel(t, lang)}</option>)}</datalist>
            <div class="chips" style="margin:.3rem 0 0">{TOWNS.map((t) => <button type="button" class={'chip' + (f.town === t ? ' on' : '')} onClick={() => set('town', t)}>{townLabel(t, lang)}</button>)}</div>
          </div>
          {F(tr(lang, 'पाहुण्यांची संख्या', 'Number of guests'), <input id="ev-guests" type="number" inputMode="numeric" min="1" value={f.guests || ''} onInput={(e) => set('guests', Number((e.target as HTMLInputElement).value))} />, 'ev-guests')}
        </div>
        {F(tr(lang, 'ऑर्डरचा प्रकार', 'Order type'), <select id="ev-order" value={f.orderType} onChange={(e) => set('orderType', (e.target as HTMLSelectElement).value as CatEvent['orderType'])}>{ORDER_TYPES.map((o) => <option value={o}>{orderTypeLabel(o, lang)}</option>)}</select>, 'ev-order')}
        <div class="grid2">
          {F(tr(lang, 'ग्राहकाचे नाव', 'Customer name'), <input id="ev-cn" value={f.customerName || ''} onInput={(e) => set('customerName', (e.target as HTMLInputElement).value)} />, 'ev-cn')}
          {F(tr(lang, 'ग्राहकाचा फोन', 'Customer phone'), <input id="ev-cp" type="tel" inputMode="tel" value={f.customerPhone || ''} onInput={(e) => set('customerPhone', (e.target as HTMLInputElement).value)} />, 'ev-cp')}
        </div>
        {F(tr(lang, 'नोंदी', 'Notes'), <textarea id="ev-notes" value={f.notes || ''} onInput={(e) => set('notes', (e.target as HTMLTextAreaElement).value)} />, 'ev-notes')}
      </div>

      <div class="card">
        <h3>{tr(lang, 'पदार्थ (मेनू)', 'Dishes (menu)')} <span class="badge">{f.dishIds.length + f.extraDishes.length}</span></h3>
        {F(tr(lang, 'पदार्थ शोधा', 'Search dishes'), <input id="ev-q" type="search" value={q} onInput={(e) => setQ((e.target as HTMLInputElement).value)} />, 'ev-q')}
        <div class="ev-dishes">
          {groups.length === 0 && <p class="muted">{tr(lang, 'पदार्थ सापडला नाही.', 'No dishes found.')}</p>}
          {groups.map(([cu, items]) => (
            <div class="ev-dish-group" key={cu}>
              <h3>{cuisineLabel(cu as MenuItem['cuisine'], lang)}</h3>
              {items.map((m) => <label class="check"><input type="checkbox" checked={f.dishIds.includes(m.id)} onChange={() => toggle('dishIds', m.id)} /> {dishName(m, lang)}</label>)}
            </div>
          ))}
        </div>
        <div class="field" style="margin-top:.7rem">
          <label for="ev-extra">{tr(lang, 'इतर पदार्थ (स्वतः लिहा)', 'Other dishes (type your own)')}</label>
          <div class="row">
            <input id="ev-extra" style="flex:1" value={extra} onInput={(e) => setExtra((e.target as HTMLInputElement).value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); if (extra.trim()) { set('extraDishes', [...f.extraDishes, extra.trim()]); setExtra(''); } } }} />
            <button type="button" class="btn btn-sm" onClick={() => { if (extra.trim()) { set('extraDishes', [...f.extraDishes, extra.trim()]); setExtra(''); } }}>+ {tr(lang, 'जोडा', 'Add')}</button>
          </div>
        </div>
        <div>{f.extraDishes.map((d, i) => <span class="ev-tag">{d}<button type="button" aria-label={tr(lang, 'काढा', 'Remove')} onClick={() => set('extraDishes', f.extraDishes.filter((_, j) => j !== i))}>×</button></span>)}</div>
      </div>

      <div class="card">
        <h3>{tr(lang, 'कर्मचारी', 'Staff')} <span class="badge">{f.staffIds.length}</span></h3>
        {staffShown.length === 0 ? <p class="muted">{tr(lang, 'अजून कर्मचारी नाहीत.', 'No staff yet.')} <a href={href('/staff')}>{tr(lang, 'कर्मचारी जोडा', 'Add staff')}</a></p> :
          staffShown.map((s) => {
            const clash = f.date && f.staffIds.includes(s.id) ? events.filter((e) => e.id !== id && e.date === f.date && e.status !== 'cancelled' && e.staffIds.includes(s.id)) : [];
            return (
              <div>
                <label class="check"><input type="checkbox" checked={f.staffIds.includes(s.id)} onChange={() => toggle('staffIds', s.id)} /> {s.name} <span class="muted small">({roleLabel(s.role, lang)}{s.active ? '' : ', ' + tr(lang, 'निष्क्रिय', 'inactive')})</span></label>
                {clash.length > 0 && <div class="warn-text">⚠️ {tr(lang, 'याच दिवशी दुसऱ्या कार्यक्रमातही नेमले आहेत: ', 'Also assigned the same day: ')}{clash.map((e) => e.title).join(', ')}</div>}
              </div>
            );
          })}
      </div>

      {isNew && (
        <div class="card">
          <h3>{tr(lang, 'कामांची यादी (सूचना)', 'Task checklist (suggested)')}</h3>
          <p class="muted small">{tr(lang, 'नको असलेली काम काढा किंवा बदला. सेव्ह केल्यावर ही कामे तयार होतील. तारीख कार्यक्रमाच्या तारखेनुसार ठरते.', 'Untick or edit as needed. These become tasks when you save. Due dates follow the event date.')}</p>
          {!f.date && <p class="err">{tr(lang, 'आधी कार्यक्रमाची तारीख निवडा.', 'Pick the event date first.')}</p>}
          {tpl.map((t, i) => {
            const upd = (p: Partial<PlannedTask>) => { setTplTouched(true); setTpl(tpl.map((x, j) => (j === i ? { ...x, ...p } : x))); };
            return (
              <div class="ev-tpl-row" key={i}>
                <input type="checkbox" aria-label={tr(lang, 'हे काम बनवा', 'Create this task')} checked={t.on} onChange={() => upd({ on: !t.on })} />
                <div>
                  <input aria-label={tr(lang, 'कामाचे नाव', 'Task title')} value={t.title} onInput={(e) => upd({ title: (e.target as HTMLInputElement).value })} />
                  <div class="grid2" style="margin-top:.3rem">
                    <select aria-label={tr(lang, 'प्रकार', 'Category')} value={t.category} onChange={(e) => upd({ category: (e.target as HTMLSelectElement).value as Task['category'] })}>{TASK_CATEGORIES.map((c) => <option value={c}>{categoryLabel(c, lang)}</option>)}</select>
                    <input type="date" aria-label={tr(lang, 'अंतिम तारीख', 'Due date')} value={t.dueDate} onInput={(e) => upd({ dueDate: (e.target as HTMLInputElement).value })} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {err && <p class="err" role="alert">{err}</p>}
      <div class="ev-savebar">
        <button type="button" class="btn btn-green" disabled={busy} onClick={save}>{tr(lang, 'सेव्ह करा', 'Save')}</button>
        {!isNew && <button type="button" class="btn btn-danger" onClick={remove}>{tr(lang, 'काढा', 'Delete')}</button>}
      </div>

      {!isNew && (
        <>
          <div class="card">
            <h3>{tr(lang, 'कामे', 'Tasks')} ({pr.done}/{pr.total})</h3>
            <div class="ev-bar" role="progressbar" aria-valuenow={pr.pct} aria-valuemin={0} aria-valuemax={100}><i style={`width:${pr.pct}%`} /></div>
            {evTasks.slice(0, 6).map((t) => (
              <label class="check"><input type="checkbox" checked={t.done} onChange={() => store.put('tasks', { ...t, done: !t.done })} /> <span style={t.done ? 'text-decoration:line-through;opacity:.6' : ''}>{t.title}</span> {t.dueDate && <span class="muted small">{fmtDate(t.dueDate, lang)}</span>}</label>
            ))}
            {evTasks.length > 6 && <p class="muted small">+{evTasks.length - 6}</p>}
            <div class="row" style="margin-top:.5rem">
              <input style="flex:1" aria-label={tr(lang, 'नवीन काम', 'New task')} placeholder={tr(lang, 'नवीन काम लिहा', 'Type a new task')} value={quick} onInput={(e) => setQuick((e.target as HTMLInputElement).value)} onKeyDown={(e) => { if (e.key === 'Enter') addQuick(); }} />
              <button type="button" class="btn btn-sm" onClick={addQuick}>+ {tr(lang, 'जोडा', 'Add')}</button>
            </div>
            <p style="margin-top:.6rem"><a class="btn btn-ghost btn-sm" href={href('/tasks?event=' + id)}>{tr(lang, 'सर्व कामे', 'All tasks')}</a></p>
          </div>

          <div class="card">
            <h3>{tr(lang, 'कोटेशन', 'Quote')}</h3>
            {evQuotes.length === 0 ? <p class="muted">{tr(lang, 'या कार्यक्रमाचे कोटेशन नाही.', 'No quote linked to this event.')}</p> : evQuotes.map((x) => (
              <a class="list-item" style="margin-bottom:.4rem" href={href('/quotes/' + x.id)}><span class="li-main"><span class="li-title">{x.eventTitle || x.customerName}</span></span><span class={'badge ' + x.status}>{tr(lang, QSTATUS[x.status].mr, QSTATUS[x.status].en)}</span><span class="money">{fmtMoney(quoteTotal(x))}</span></a>
            ))}
            <a class="btn btn-ghost btn-sm" href={href('/quotes/new?event=' + id)}>+ {tr(lang, 'कोटेशन बनवा', 'Create quote')}</a>
          </div>

          <div class="card">
            <h3>{tr(lang, 'पैसे', 'Payments')}</h3>
            <div class="ev-pay">
              <span>{tr(lang, 'ठरलेली एकूण रक्कम', 'Expected total')}</span><span class="money">{expected === undefined ? '—' : fmtMoney(expected)}</span>
              <span>{tr(lang, 'मिळालेले', 'Received')}</span><span class="money ok">{fmtMoney(received)}</span>
              <span>{tr(lang, 'बाकी', 'Balance')}</span><span class="money">{expected === undefined ? '—' : fmtMoney(expected - received)}</span>
            </div>
            {expected === undefined && <p class="muted small">{tr(lang, 'कोटेशन स्वीकारले की एकूण रक्कम दिसेल.', 'The expected total appears once a quote is accepted.')}</p>}
            <div class="row" style="margin-top:.6rem">
              <a class="btn btn-sm" href={href(`/payments?event=${id}&new=1&kind=advance`)}>+ {tr(lang, 'अॅडव्हान्स', 'Advance')}</a>
              <a class="btn btn-sm" href={href(`/payments?event=${id}&new=1&kind=balance`)}>+ {tr(lang, 'बाकी रक्कम', 'Balance')}</a>
              <a class="btn btn-ghost btn-sm" href={href('/payments?event=' + id)}>{tr(lang, 'सर्व नोंदी', 'All payments')}</a>
            </div>
          </div>

          <div class="card">
            <h3>{tr(lang, 'स्वयंपाक व खरेदी याद्या', 'Kitchen sheets')}</h3>
            <div class="row">
              <a class="btn" href={href('/sheets/' + id)}>🍳 {tr(lang, 'तयारी / खरेदी / पॅकिंग', 'Prep / Shopping / Packing')}</a>
              <button type="button" class="btn btn-green" onClick={share}>💬 {tr(lang, 'कर्मचाऱ्यांना WhatsApp वर पाठवा', 'Share with staff on WhatsApp')}</button>
              <CopyButton lang={lang} small={false} text={() => shareText()} label={tr(lang, 'माहिती कॉपी', 'Copy details')} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
