import './payments.css';
import { useEffect, useState } from 'preact/hooks';
import { useList, useStore, tr } from '../../hooks';
import { go, href, type Route } from '../../router';
import { PAYMENT_METHODS, type Lang, type Payment, type PaymentMethod } from '../../types';
import { fmtDate, fmtMoney, today, waUrl, focusFirstInvalid } from '../../util';
import { CopyButton, MoreButton, pageOf, usePager } from '../../ui';
import { defaultSettings } from '../../seed';
import { acceptedQuoteFor, buildBalanceReminder, buildReceiptMessage, defaultKind, duplicateReference, eventBalance, filterPayments, monthSummary, paymentsForEvent, unpaidBalances, validatePayment, type PayErrors } from './logic';

export const METHOD: Record<PaymentMethod, { mr: string; en: string }> = {
  upi: { mr: 'UPI', en: 'UPI' }, cash: { mr: 'रोख', en: 'Cash' }, bank: { mr: 'बँक ट्रान्सफर', en: 'Bank transfer' }, cheque: { mr: 'चेक', en: 'Cheque' }, other: { mr: 'इतर', en: 'Other' },
};
export const KIND: Record<Payment['kind'], { mr: string; en: string }> = {
  advance: { mr: 'आगाऊ (अॅडव्हान्स)', en: 'Advance' }, balance: { mr: 'बाकी रक्कम', en: 'Balance' }, full: { mr: 'पूर्ण रक्कम', en: 'Full payment' }, expense: { mr: 'खर्च', en: 'Expense' }, other: { mr: 'इतर', en: 'Other' },
};
const KINDS = ['advance', 'balance', 'full', 'expense', 'other'] as const;

type F = { id?: string; direction: 'in' | 'out'; kind: Payment['kind']; amount: string; date: string; method: PaymentMethod; reference: string; note: string; eventId: string; leadId: string; quoteId: string; customerName: string; staffId: string };

export function PaymentsScreen({ lang, route }: { lang: Lang; route: Route }) {
  const store = useStore();
  const payments = useList('payments');
  const events = useList('events');
  const quotes = useList('quotes');
  const leads = useList('leads');
  const staff = useList('staff');
  const settingsList = useList('settings');
  const settings = settingsList?.find((x) => x.id === 'main') ?? settingsList?.[0] ?? defaultSettings();
  const staffQ = route.query.get('staff') || '';
  const eventId = route.query.get('event') || undefined;
  const leadId = route.query.get('lead') || undefined;
  const [dir, setDir] = useState<'all' | 'in' | 'out'>('all');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState<F | null>(null);
  const [errs, setErrs] = useState<PayErrors>({});
  const [opened, setOpened] = useState(false);
  const [period, setPeriod] = useState<'all' | 'month'>('all');
  const pager = usePager(60, dir + search + period + (eventId ?? '') + (leadId ?? ''));

  const ev = (events ?? []).find((e) => e.id === eventId);
  const lead = (leads ?? []).find((l) => l.id === (leadId ?? ev?.leadId));
  const eventQuote = ev ? acceptedQuoteFor(ev, quotes ?? []) : undefined;

  const blank = (): F => {
    const direction = route.query.get('kind') === 'expense' ? 'out' : 'in';
    return {
      direction, kind: defaultKind(route.query.get('kind'), direction), amount: '', date: today(), method: 'cash', reference: '', note: '',
      eventId: eventId ?? '', leadId: lead?.id ?? leadId ?? '', quoteId: eventQuote?.id ?? '', customerName: ev?.customerName ?? lead?.name ?? eventQuote?.customerName ?? (staff ?? []).find((x) => x.id === staffQ)?.name ?? '', staffId: (staff ?? []).some((x) => x.id === staffQ) ? staffQ : '',
    };
  };
  // open the form once data is available when ?new=1
  useEffect(() => {
    if (!opened && route.query.get('new') === '1' && payments && events && leads && quotes && staff) { setForm(blank()); setOpened(true); }
  }, [payments, events, leads, quotes, staff, opened]);

  if (!payments || !staff) return <div class="page"><p class="muted">{tr(lang, 'लोड होत आहे…', 'Loading…')}</p></div>;

  const evById = new Map((events ?? []).map((e) => [e.id, e]));
  const nameFor = (p: Payment) => p.customerName || (p.eventId ? evById.get(p.eventId)?.customerName : '') || (p.leadId ? (leads ?? []).find((l) => l.id === p.leadId)?.name : '') || '';
  const m = monthSummary(payments, today().slice(0, 7));
  const monthKey = today().slice(0, 7);
  const filtered = filterPayments(payments, { direction: dir, eventId, leadId, search }, (p) => nameFor(p) + ' ' + (p.eventId ? evById.get(p.eventId)?.title ?? '' : '')).filter((p) => period === 'all' || p.date.startsWith(monthKey));
  const paged = pageOf(filtered, pager);
  const shown = paged.shown;
  const unpaid = unpaidBalances(events ?? [], quotes ?? [], payments);
  const eventBal = ev && eventQuote ? eventBalance(eventQuote, paymentsForEvent(ev, payments, eventQuote)) : undefined;

  const formEv = form ? evById.get(form.eventId) : undefined;
  const formQuote = formEv ? acceptedQuoteFor(formEv, quotes ?? []) : undefined;
  const formBal = formEv && formQuote ? eventBalance(formQuote, paymentsForEvent(formEv, payments, formQuote)) : undefined;
  const phoneOf = (p: { eventId?: string; leadId?: string; quoteId?: string }) => {
    const e = p.eventId ? evById.get(p.eventId) : undefined;
    return e?.customerPhone || (quotes ?? []).find((x) => x.id === p.quoteId)?.customerPhone || (leads ?? []).find((l) => l.id === (p.leadId ?? e?.leadId))?.phone || '';
  };
  const receiptFor = (p: Payment) => {
    const e = p.eventId ? evById.get(p.eventId) : undefined;
    const q = e ? acceptedQuoteFor(e, quotes ?? []) : undefined;
    return buildReceiptMessage(p, { name: nameFor(p), eventTitle: e?.title, bal: e && q ? eventBalance(q, paymentsForEvent(e, payments, q)) : undefined }, settings, lang);
  };
  const set = <K extends keyof F>(k: K, v: F[K]) => setForm((p) => (p ? { ...p, [k]: v } : p));
  const closeForm = () => { setForm(null); setErrs({}); const q = new URLSearchParams(); if (eventId) q.set('event', eventId); if (leadId) q.set('lead', leadId); go('/payments' + (q.toString() ? '?' + q : '')); };
  const save = async () => {
    if (!form) return;
    const e = validatePayment({ amount: Number(form.amount), method: form.method, reference: form.reference, date: form.date, direction: form.direction }, lang);
    const dup = duplicateReference(payments, form.reference, form.id);
    if (dup && !e.reference) e.reference = tr(lang, `हा संदर्भ क्रमांक आधीच वापरला आहे (${fmtDate(dup.date, lang)}, ${fmtMoney(dup.amount)}). एकच पैसे दोनदा नोंदवले नाहीत ना ते तपासा.`, `This reference is already used (${fmtDate(dup.date, lang)}, ${fmtMoney(dup.amount)}). Check you are not entering the same payment twice.`);
    setErrs(e);
    if (Object.keys(e).length) { focusFirstInvalid(); return; }
    if (form.date > today() && !confirm(tr(lang, 'ही तारीख पुढची आहे. तरीही सेव्ह करायचे?', 'This date is in the future. Save anyway?'))) return;
    if (form.direction === 'in' && formBal && Number(form.amount) > formBal.balance + (form.id ? (payments.find((p) => p.id === form.id)?.amount ?? 0) : 0) && !confirm(tr(lang, `ही रक्कम बाकी रकमेपेक्षा (${fmtMoney(formBal.balance)}) जास्त आहे. तरीही सेव्ह करायचे?`, `This is more than the balance (${fmtMoney(formBal.balance)}). Save anyway?`))) return;
    await store.put('payments', {
      ...(form.id ? payments.find((p) => p.id === form.id) : {}), ...(form.id ? { id: form.id } : {}),
      direction: form.direction, kind: form.kind, amount: Number(form.amount), date: form.date, method: form.method,
      reference: form.reference.trim() || undefined, note: form.note.trim() || undefined,
      eventId: form.eventId || undefined, leadId: form.leadId || undefined, quoteId: form.quoteId || undefined, customerName: form.customerName.trim() || undefined,
      staffId: form.direction === 'out' && form.staffId ? form.staffId : undefined,
    });
    closeForm();
  };
  const del = async () => { if (form?.id && confirm(tr(lang, 'ही नोंद काढायची? (नंतर "परत आणा" दाबता येईल.)', 'Delete this entry? (You can undo right after.)'))) { await store.remove('payments', form.id); closeForm(); } };
  const edit = (p: Payment) => setForm({ id: p.id, direction: p.direction, kind: p.kind, amount: String(p.amount), date: p.date, method: p.method, reference: p.reference ?? '', note: p.note ?? '', eventId: p.eventId ?? '', leadId: p.leadId ?? '', quoteId: p.quoteId ?? '', customerName: p.customerName ?? '', staffId: p.staffId ?? '' });
  const pickEvent = (id: string) => {
    const e = evById.get(id);
    const q = e ? acceptedQuoteFor(e, quotes ?? []) : undefined;
    setForm((p) => (p ? { ...p, eventId: id, leadId: e?.leadId ?? p.leadId, quoteId: q?.id ?? '', customerName: e?.customerName ?? p.customerName } : p));
  };

  if (form) {
    return (
      <div class="page">
        <h1>{form.id ? tr(lang, 'पैसे नोंद बदला', 'Edit payment') : tr(lang, 'पैसे नोंदवा', 'Add payment')}</h1>
        <form class="card" onSubmit={(e) => { e.preventDefault(); void save(); }} noValidate>
          <div class="field"><span class="lbl">{tr(lang, 'पैसे कोणत्या बाजूचे?', 'Money direction')}</span>
            <div class="chips">
              <button type="button" class={form.direction === 'in' ? 'chip on' : 'chip'} onClick={() => setForm({ ...form, direction: 'in', kind: form.kind === 'expense' ? 'advance' : form.kind })}>⬇ {tr(lang, 'मिळाले', 'Received')}</button>
              <button type="button" class={form.direction === 'out' ? 'chip on' : 'chip'} onClick={() => setForm({ ...form, direction: 'out', kind: 'expense' })}>⬆ {tr(lang, 'खर्च', 'Expense')}</button>
            </div></div>
          <div class="grid2">
            <div class="field"><label for="p-kind">{tr(lang, 'प्रकार', 'Kind')}</label>
              <select id="p-kind" value={form.kind} onChange={(e) => set('kind', (e.target as HTMLSelectElement).value as Payment['kind'])}>{KINDS.map((k) => <option value={k}>{tr(lang, KIND[k].mr, KIND[k].en)}</option>)}</select></div>
            <div class="field"><label for="p-amt">{tr(lang, 'रक्कम (₹) *', 'Amount (₹) *')}</label>
              <input id="p-amt" autoFocus={!form.id} type="number" inputMode="decimal" min="0" value={form.amount} onInput={(e) => set('amount', (e.target as HTMLInputElement).value)} aria-invalid={!!errs.amount} />{errs.amount && <div class="err">{errs.amount}</div>}</div>
            <div class="field"><label for="p-date">{tr(lang, 'तारीख', 'Date')}</label>
              <input id="p-date" type="date" value={form.date} onInput={(e) => set('date', (e.target as HTMLInputElement).value)} />{errs.date && <div class="err">{errs.date}</div>}</div>
            <div class="field"><label for="p-method">{tr(lang, 'कसे दिले?', 'Method')}</label>
              <select id="p-method" value={form.method} onChange={(e) => set('method', (e.target as HTMLSelectElement).value as PaymentMethod)}>{PAYMENT_METHODS.map((k) => <option value={k}>{tr(lang, METHOD[k].mr, METHOD[k].en)}</option>)}</select></div>
          </div>
          <div class="field"><label for="p-ref">{form.method === 'upi' ? tr(lang, 'UPI व्यवहार क्रमांक (ट्रान्झॅक्शन आयडी) *', 'UPI transaction id *') : tr(lang, 'संदर्भ क्रमांक (असल्यास)', 'Reference (if any)')}</label>
            <input id="p-ref" value={form.reference} onInput={(e) => set('reference', (e.target as HTMLInputElement).value)} aria-invalid={!!errs.reference} />{errs.reference && <div class="err">{errs.reference}</div>}</div>
          <div class="field"><label for="p-event">{tr(lang, 'कार्यक्रम (असल्यास)', 'Event (optional)')}</label>
            <select id="p-event" value={form.eventId} onChange={(e) => pickEvent((e.target as HTMLSelectElement).value)}>
              <option value="">{tr(lang, '— कोणताही नाही —', '— none —')}</option>
              {(events ?? []).map((x) => <option value={x.id}>{x.title} · {fmtDate(x.date, lang)}</option>)}
            </select></div>
          <div class="field"><label for="p-lead">{tr(lang, 'चौकशी / ग्राहक (असल्यास)', 'Lead / customer (optional)')}</label>
            <select id="p-lead" value={form.leadId} onChange={(e) => { const id = (e.target as HTMLSelectElement).value; const l = (leads ?? []).find((x) => x.id === id); setForm({ ...form, leadId: id, customerName: form.customerName || l?.name || '' }); }}>
              <option value="">{tr(lang, '— कोणतीही नाही —', '— none —')}</option>
              {(leads ?? []).map((x) => <option value={x.id}>{x.name}</option>)}
            </select></div>
          <div class="field"><label for="p-cust">{tr(lang, 'नाव (ग्राहक / ज्याला दिले)', 'Name (customer / paid to)')}</label>
            <input id="p-cust" value={form.customerName} onInput={(e) => set('customerName', (e.target as HTMLInputElement).value)} /></div>
          {form.direction === 'out' && (staff ?? []).length > 0 && (
            <div class="field"><label for="p-staff">{tr(lang, 'कर्मचारी (पगार / मजुरी दिली असल्यास)', 'Staff member (if this is wages)')}</label>
              <select id="p-staff" value={form.staffId} onChange={(e) => { const id = (e.target as HTMLSelectElement).value; const st = (staff ?? []).find((x) => x.id === id); setForm({ ...form, staffId: id, customerName: form.customerName || st?.name || '' }); }}>
                <option value="">{tr(lang, '— नाही —', '— none —')}</option>
                {(staff ?? []).map((x) => <option value={x.id}>{x.name}</option>)}
              </select></div>
          )}
          {formBal && form.direction === 'in' && <p class="muted small">{tr(lang, `या कार्यक्रमाचे बाकी: ${fmtMoney(formBal.balance)} (एकूण ${fmtMoney(formBal.expected)})`, `Balance for this event: ${fmtMoney(formBal.balance)} (total ${fmtMoney(formBal.expected)})`)}</p>}
          <div class="field"><label for="p-note">{tr(lang, 'नोंद', 'Note')}</label><textarea id="p-note" value={form.note} onInput={(e) => set('note', (e.target as HTMLTextAreaElement).value)} /></div>
          <div class="row">
            <button class="btn btn-green" type="submit">💾 {tr(lang, 'सेव्ह करा', 'Save')}</button>
            <button class="btn btn-ghost" type="button" onClick={closeForm}>{tr(lang, 'रद्द करा', 'Cancel')}</button>
            {form.id && <button class="btn btn-danger" type="button" onClick={del}>🗑️ {tr(lang, 'काढा', 'Delete')}</button>}
          </div>
          {form.id && form.direction === 'in' && (() => {
            const saved = payments.find((x) => x.id === form.id);
            if (!saved) return null;
            return (
              <div class="row" style="margin-top:.8rem">
                <button class="btn btn-green btn-sm" type="button" onClick={() => window.open(waUrl(phoneOf(saved), receiptFor(saved)), '_blank', 'noopener')}>💬 {tr(lang, 'पावती WhatsApp वर पाठवा', 'Send receipt on WhatsApp')}</button>
                <CopyButton lang={lang} text={() => receiptFor(saved)} label={tr(lang, 'पावती कॉपी', 'Copy receipt')} />
              </div>
            );
          })()}
        </form>
      </div>
    );
  }

  return (
    <div class="page">
      <h1>{tr(lang, 'पैसे (जमा / खर्च)', 'Money (received / expenses)')}</h1>
      <div class="pay-tiles">
        <div class="pay-tile"><small>{tr(lang, 'या महिन्यात मिळाले', 'Received this month')}</small><span class="money pay-in">{fmtMoney(m.received)}</span></div>
        <div class="pay-tile"><small>{tr(lang, 'या महिन्याचा खर्च', 'Expenses this month')}</small><span class="money pay-out">{fmtMoney(m.expenses)}</span></div>
        <div class="pay-tile"><small>{tr(lang, 'निव्वळ', 'Net')}</small><span class={'money ' + (m.net < 0 ? 'pay-out' : 'pay-in')}>{fmtMoney(m.net)}</span></div>
      </div>

      {(eventId || leadId) && (
        <div class="card">
          <div class="row between"><b>{ev?.title ?? lead?.name ?? ''}</b><a class="btn btn-ghost btn-sm" href={href('/payments')}>{tr(lang, 'फिल्टर काढा', 'Clear filter')}</a></div>
          {eventBal && (
            <div class="pay-balance card" style={{ marginTop: '.6rem', marginBottom: 0 }}>
              <div><span>{tr(lang, 'ठरलेली एकूण रक्कम', 'Expected total')}</span><span class="money">{fmtMoney(eventBal.expected)}</span></div>
              <div><span>{tr(lang, 'मिळाले', 'Received')}</span><span class="money pay-in">{fmtMoney(eventBal.received)}</span></div>
              <div><span>{tr(lang, 'बाकी', 'Balance')}</span><span class="money">{fmtMoney(eventBal.balance)}</span></div>
              {eventBal.balance > 0 && ev && (() => { const text = buildBalanceReminder({ name: ev.customerName ?? eventQuote?.customerName, eventTitle: ev.title, eventDate: ev.date, bal: eventBal }, settings, lang); return (
                <div class="row" style="margin-top:.4rem"><button type="button" class="btn btn-green btn-sm" onClick={() => window.open(waUrl(ev.customerPhone || eventQuote?.customerPhone || '', text), '_blank', 'noopener')}>💬 {tr(lang, 'बाकी रकमेची आठवण', 'Balance reminder')}</button><CopyButton lang={lang} text={text} /></div>
              ); })()}
            </div>
          )}
        </div>
      )}

      <div class="field"><label for="p-search">{tr(lang, 'शोधा (नाव, संदर्भ, नोंद)', 'Search (name, reference, note)')}</label>
        <input id="p-search" type="search" value={search} onInput={(e) => setSearch((e.target as HTMLInputElement).value)} /></div>
      <div class="chips">
        {(['all', 'in', 'out'] as const).map((d) => <button type="button" class={dir === d ? 'chip on' : 'chip'} onClick={() => setDir(d)}>{d === 'all' ? tr(lang, 'सर्व', 'All') : d === 'in' ? tr(lang, 'मिळाले', 'Received') : tr(lang, 'खर्च', 'Expenses')}</button>)}
      </div>

      <div class="chips" role="group" aria-label={tr(lang, 'कालावधी', 'Period')}>
        <button type="button" class={period === 'all' ? 'chip on' : 'chip'} aria-pressed={period === 'all'} onClick={() => setPeriod('all')}>{tr(lang, 'सर्व तारखा', 'All dates')}</button>
        <button type="button" class={period === 'month' ? 'chip on' : 'chip'} aria-pressed={period === 'month'} onClick={() => setPeriod('month')}>{tr(lang, 'या महिन्याचे', 'This month')}</button>
      </div>
      {shown.length === 0 ? <div class="empty">{payments.length === 0 ? tr(lang, 'अजून पैसे नोंदवलेले नाहीत. कार्यक्रमाचा अॅडव्हान्स मिळाला की खाली "+ पैसे नोंदवा" दाबा.', 'No payments recorded yet. When an advance arrives, tap "+ Add payment" below.') : tr(lang, 'काहीही सापडले नाही. शोध किंवा फिल्टर बदलून पाहा.', 'Nothing found. Try changing the search or filter.')}</div> : (
        <div class="list">
          {shown.map((p) => (
            <button type="button" class="list-item" style={{ textAlign: 'left', font: 'inherit', cursor: 'pointer' }} onClick={() => edit(p)}>
              <div class="li-main">
                <div class="li-title">{nameFor(p) || tr(lang, '(नाव नाही)', '(no name)')}</div>
                <div class="li-sub">{fmtDate(p.date, lang)} · {tr(lang, KIND[p.kind].mr, KIND[p.kind].en)} · {tr(lang, METHOD[p.method].mr, METHOD[p.method].en)}{p.eventId && evById.get(p.eventId) ? ' · ' + evById.get(p.eventId)!.title : ''}</div>
              </div>
              <span class={'money ' + (p.direction === 'in' ? 'pay-in' : 'pay-out')}>{p.direction === 'in' ? '+' : '-'}{fmtMoney(p.amount)}</span>
            </button>
          ))}
        </div>
      )}
      <MoreButton lang={lang} paged={paged} />

      {!eventId && !leadId && unpaid.length > 0 && (
        <>
          <h2>{tr(lang, 'बाकी रक्कम', 'Unpaid balances')}</h2>
          <div class="list">
            {unpaid.map((u) => {
              const text = buildBalanceReminder({ name: u.event.customerName ?? u.quote.customerName, eventTitle: u.event.title, eventDate: u.event.date, bal: u.balance }, settings, lang);
              const phone = u.event.customerPhone || u.quote.customerPhone;
              return (
                <div class="card" style="margin:0">
                  <a class="list-item" style="border:0;padding:0" href={href('/payments?event=' + u.event.id)}>
                    <div class="li-main"><div class="li-title">{u.event.title}</div><div class="li-sub">{fmtDate(u.event.date, lang)} · {tr(lang, 'मिळाले ', 'Received ')}{fmtMoney(u.balance.received)} / {fmtMoney(u.balance.expected)}</div></div>
                    <span class="money pay-out">{fmtMoney(u.balance.balance)}</span>
                  </a>
                  <div class="row" style="margin-top:.4rem">
                    <button type="button" class="btn btn-green btn-sm" onClick={() => window.open(waUrl(phone, text), '_blank', 'noopener')}>💬 {tr(lang, 'बाकी रकमेची आठवण', 'Balance reminder')}</button>
                    <CopyButton lang={lang} text={text} />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      <button type="button" class="btn fab" onClick={() => setForm(blank())}>+ {tr(lang, 'पैसे नोंदवा', 'Add payment')}</button>
    </div>
  );
}
