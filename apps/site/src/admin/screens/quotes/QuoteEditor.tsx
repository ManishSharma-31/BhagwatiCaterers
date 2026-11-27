import './quotes.css';
import { useEffect, useState } from 'preact/hooks';
import { useList, useStore, tr } from '../../hooks';
import { go, href, type Route } from '../../router';
import { ORDER_TYPES, type Lang, type OrderType, type Quote, type QuoteStatus } from '../../types';
import { defaultSettings } from '../../seed';
import { fmtDate, fmtMoney, newId, orderTypeLabel, quoteTotal, waNumber, waUrl } from '../../util';
import { CUISINE_LABEL, balanceAfterAdvance, buildQuoteMessage, cleanLines, dishNames, fromEvent, fromLead, groupMenu, leadStatusAfterQuote, perPlateLabel, validateQuote, type QuoteErrors } from './logic';
import { QSTATUS } from './QuotesScreen';

type F = {
  leadId?: string; eventId?: string; customerName: string; customerPhone: string; eventTitle: string; eventDate: string; town: string; orderType: OrderType;
  dishIds: string[]; extraDishes: string[]; guests: string; perPlate: string; lines: { label: string; amount: string }[]; discount: string; advance: string;
  validUntil: string; terms: string; notes: string; status: QuoteStatus;
};
const num = (s: string) => { const n = Number(s); return Number.isFinite(n) && n > 0 ? n : 0; };
const numStr = (n: number) => (n ? String(n) : '');

const toQuote = (f: F, id: string, base?: Quote): Quote => ({
  id, createdAt: base?.createdAt ?? new Date().toISOString(), updatedAt: new Date().toISOString(),
  leadId: f.leadId, eventId: f.eventId, customerName: f.customerName.trim(), customerPhone: f.customerPhone.trim(), eventTitle: f.eventTitle.trim(),
  eventDate: f.eventDate || undefined, town: f.town.trim() || undefined, orderType: f.orderType, dishIds: f.dishIds, extraDishes: f.extraDishes.map((d) => d.trim()).filter(Boolean),
  guests: num(f.guests), perPlate: num(f.perPlate), lines: cleanLines(f.lines.map((l) => ({ label: l.label.trim(), amount: Number(l.amount) || 0 }))),
  discount: num(f.discount), advanceAmount: num(f.advance), status: f.status, validUntil: f.validUntil || undefined, terms: f.terms.trim() || undefined, notes: f.notes.trim() || undefined,
});
const toForm = (q: Quote): F => ({
  leadId: q.leadId, eventId: q.eventId, customerName: q.customerName, customerPhone: q.customerPhone, eventTitle: q.eventTitle, eventDate: q.eventDate ?? '', town: q.town ?? '',
  orderType: q.orderType, dishIds: q.dishIds, extraDishes: q.extraDishes, guests: numStr(q.guests), perPlate: numStr(q.perPlate),
  lines: q.lines.map((l) => ({ label: l.label, amount: String(l.amount) })), discount: numStr(q.discount), advance: numStr(q.advanceAmount),
  validUntil: q.validUntil ?? '', terms: q.terms ?? '', notes: q.notes ?? '', status: q.status,
});

export function QuoteEditor({ lang, route }: { lang: Lang; route: Route }) {
  const store = useStore();
  const rid = route.parts[0];
  const isNew = rid === 'new';
  const quotes = useList('quotes');
  const leads = useList('leads');
  const events = useList('events');
  const menu = useList('menu');
  const settingsList = useList('settings');
  const leadQ = route.query.get('lead'), eventQ = route.query.get('event');
  const [f, setF] = useState<F | null>(null);
  const [qid, setQid] = useState(() => newId());
  const [errs, setErrs] = useState<QuoteErrors>({});
  const [msg, setMsg] = useState('');
  const [search, setSearch] = useState('');
  const [extra, setExtra] = useState('');
  const [accepted, setAccepted] = useState(false);

  const ready = !!quotes && !!leads && !!events && !!menu && !!settingsList;
  const settings = settingsList?.find((s) => s.id === 'main') ?? defaultSettings();
  const existing = isNew ? undefined : quotes?.find((q) => q.id === rid);

  useEffect(() => {
    if (!ready || f) return;
    if (existing) { setF(toForm(existing)); setQid(existing.id); return; }
    if (!isNew) return;
    const base: F = { customerName: '', customerPhone: '', eventTitle: '', eventDate: '', town: '', orderType: 'not-sure', dishIds: [], extraDishes: [], guests: '', perPlate: '', lines: [], discount: '', advance: '', validUntil: '', terms: settings.defaultTerms ?? '', notes: '', status: 'draft' };
    const lead = leadQ ? leads!.find((l) => l.id === leadQ) : undefined;
    const ev = eventQ ? events!.find((e) => e.id === eventQ) : undefined;
    if (ev) { const p = fromEvent(ev); setF({ ...base, ...p, eventDate: p.eventDate ?? '', town: p.town ?? '', guests: numStr(p.guests) }); }
    else if (lead) { const p = fromLead(lead, lang); setF({ ...base, ...p, eventDate: p.eventDate ?? '', town: p.town ?? '', guests: numStr(p.guests) }); }
    else setF(base);
  }, [ready, existing?.id]);

  if (!ready || !f) {
    if (ready && !isNew && !existing) return <div class="page"><h1>{tr(lang, 'कोटेशन सापडले नाही', 'Quote not found')}</h1><a class="btn" href={href('/quotes')}>{tr(lang, 'यादीकडे', 'Back to list')}</a></div>;
    return <div class="page"><p class="muted">{tr(lang, 'लोड होत आहे…', 'Loading…')}</p></div>;
  }

  const set = <K extends keyof F>(k: K, v: F[K]) => { setF((p) => (p ? { ...p, [k]: v } : p)); setMsg(''); };
  const txt = (k: keyof F) => (e: Event) => set(k, (e.target as HTMLInputElement).value as never);
  const cur = toQuote(f, qid, existing);
  const total = quoteTotal(cur);
  const balance = balanceAfterAdvance(cur);
  const names = dishNames(cur, menu!, lang);
  const check = () => { const e = validateQuote(cur, !!waNumber(cur.customerPhone), lang); setErrs(e); if (Object.keys(e).length) { setMsg(tr(lang, 'कृपया लाल रंगातील चुका दुरुस्त करा.', 'Please fix the errors shown in red.')); return false; } return true; };

  const persist = async (status: QuoteStatus): Promise<Quote> => {
    const q = toQuote({ ...f, status }, qid, existing);
    const saved = await store.put('quotes', q);
    set('status', status);
    if (q.leadId) {
      const lead = leads!.find((l) => l.id === q.leadId);
      const ns = lead && leadStatusAfterQuote(status, lead.status);
      if (lead && ns) await store.put('leads', { ...lead, status: ns });
    }
    if (isNew) go('/quotes/' + saved.id);
    return saved;
  };
  const saveDraft = async () => { if (!check()) return; await persist(f.status === 'draft' || f.status === 'rejected' ? 'draft' : f.status); setMsg(tr(lang, 'सेव्ह झाले ✔', 'Saved ✔')); };
  const share = () => {
    if (!check()) return;
    const status: QuoteStatus = f.status === 'accepted' ? 'accepted' : 'sent';
    const text = buildQuoteMessage({ ...cur, status }, names, settings, lang);
    window.open(waUrl(cur.customerPhone, text), '_blank', 'noopener');
    void persist(status).then(() => setMsg(tr(lang, 'WhatsApp उघडले; कोटेशन "पाठवले" म्हणून नोंदवले ✔', 'WhatsApp opened; quote marked as sent ✔')));
  };
  const accept = async () => { if (!check()) return; await persist('accepted'); setAccepted(true); setMsg(''); };
  const reject = async () => { if (!check()) return; await persist('rejected'); setMsg(tr(lang, 'नामंजूर म्हणून नोंदवले', 'Marked as rejected')); };
  const remove = async () => { if (existing && confirm(tr(lang, 'हे कोटेशन कायमचे काढायचे?', 'Delete this quote permanently?'))) { await store.remove('quotes', existing.id); go('/quotes'); } };
  const toggleDish = (id: string) => set('dishIds', f.dishIds.includes(id) ? f.dishIds.filter((x) => x !== id) : [...f.dishIds, id]);
  const addExtra = () => { if (extra.trim()) { set('extraDishes', [...f.extraDishes, extra.trim()]); setExtra(''); } };
  const setLine = (i: number, k: 'label' | 'amount', v: string) => set('lines', f.lines.map((l, j) => (j === i ? { ...l, [k]: v } : l)));
  const savedId = existing?.id ?? (isNew ? undefined : rid);
  const groups = groupMenu(menu!, search, f.dishIds);
  const lines = cleanLines(cur.lines);
  const wm = f.orderType === 'with-material';

  return (
    <div class="page">
      <div class="no-print">
        <p><a href={href('/quotes')}>← {tr(lang, 'कोटेशन यादी', 'All quotes')}</a></p>
        <h1>{isNew ? tr(lang, 'नवीन कोटेशन', 'New quote') : tr(lang, 'कोटेशन', 'Quote')} <span class={'badge ' + f.status}>{tr(lang, QSTATUS[f.status].mr, QSTATUS[f.status].en)}</span></h1>

        {(accepted || f.status === 'accepted') && savedId && (
          <div class="quote-done">
            <p><b>{tr(lang, 'कोटेशन मान्य झाले. चौकशी "पक्के" केली.', 'Quote accepted. Lead marked as confirmed.')}</b></p>
            <a class="btn btn-green" href={href('/events/new?quote=' + savedId)}>🗓️ {tr(lang, 'कार्यक्रम बनवा', 'Create event')}</a>
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); void saveDraft(); }} noValidate>
          <div class="card">
            <h3>{tr(lang, 'ग्राहक', 'Customer')}</h3>
            <div class="field"><label for="q-name">{tr(lang, 'ग्राहकाचे नाव *', 'Customer name *')}</label><input id="q-name" value={f.customerName} onInput={txt('customerName')} aria-invalid={!!errs.name} />{errs.name && <div class="err">{errs.name}</div>}</div>
            <div class="field"><label for="q-phone">{tr(lang, 'मोबाईल नंबर * (१० अंक)', 'Mobile number * (10 digits)')}</label><input id="q-phone" type="tel" inputMode="tel" value={f.customerPhone} onInput={txt('customerPhone')} aria-invalid={!!errs.phone} />{errs.phone && <div class="err">{errs.phone}</div>}</div>
          </div>

          <div class="card">
            <h3>{tr(lang, 'कार्यक्रम', 'Event')}</h3>
            <div class="field"><label for="q-title">{tr(lang, 'कार्यक्रमाचे नाव', 'Event title')}</label><input id="q-title" value={f.eventTitle} onInput={txt('eventTitle')} /></div>
            <div class="grid2">
              <div class="field"><label for="q-date">{tr(lang, 'तारीख', 'Event date')}</label><input id="q-date" type="date" value={f.eventDate} onInput={txt('eventDate')} /></div>
              <div class="field"><label for="q-town">{tr(lang, 'गाव / शहर', 'Town')}</label><input id="q-town" value={f.town} onInput={txt('town')} /></div>
            </div>
            <div class="field"><label for="q-order">{tr(lang, 'ऑर्डरचा प्रकार', 'Order type')}</label>
              <select id="q-order" value={f.orderType} onChange={txt('orderType')}>{ORDER_TYPES.map((x) => <option value={x}>{orderTypeLabel(x, lang)}</option>)}</select></div>
            <div class="quote-note">
              <b>{tr(lang, 'साहित्यासह:', 'We bring everything:')}</b> {tr(lang, 'आम्ही सामान, भांडी आणि स्वयंपाक सर्व करतो; दर प्रति थाळी.', 'we supply ingredients and cook; the rate is per plate.')}<br />
              <b>{tr(lang, 'ग्राहकाचे साहित्य:', 'Customer provides ingredients:')}</b> {tr(lang, 'ग्राहक किराणा/भाजीपाला देतात, आम्ही फक्त स्वयंपाक करतो; मजुरी प्रति थाळी.', 'the customer gives the groceries and vegetables, we only cook; a labour charge per plate.')}
            </div>
          </div>

          <div class="card">
            <h3>{tr(lang, 'पदार्थ (मेनू)', 'Dishes (menu)')}</h3>
            <div class="field"><label for="q-search">{tr(lang, 'पदार्थ शोधा', 'Search dishes')}</label><input id="q-search" type="search" value={search} onInput={(e) => setSearch((e.target as HTMLInputElement).value)} /></div>
            <div class="quote-pick">
              {groups.length === 0 && <p class="muted">{tr(lang, 'काहीही सापडले नाही', 'Nothing found')}</p>}
              {groups.map((g) => (
                <div><h4>{tr(lang, CUISINE_LABEL[g.cuisine].mr, CUISINE_LABEL[g.cuisine].en)}</h4>
                  {g.items.map((m) => <label class="quote-dish"><input type="checkbox" checked={f.dishIds.includes(m.id)} onChange={() => toggleDish(m.id)} /> {tr(lang, m.nameMr, m.nameEn)}</label>)}
                </div>
              ))}
            </div>
            <p class="muted small">{tr(lang, 'निवडलेले: ', 'Selected: ')}{f.dishIds.length}</p>
            <div class="field"><label for="q-extra">{tr(lang, 'यादीत नसलेला पदार्थ जोडा', 'Add a dish not in the list')}</label>
              <div class="row"><input id="q-extra" style={{ flex: 1 }} value={extra} onInput={(e) => setExtra((e.target as HTMLInputElement).value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addExtra(); } }} /><button class="btn btn-ghost" type="button" onClick={addExtra}>+ {tr(lang, 'जोडा', 'Add')}</button></div></div>
            {f.extraDishes.map((d, i) => <div class="row between"><span>{d}</span><button class="btn btn-ghost btn-sm" type="button" aria-label={tr(lang, 'काढा', 'Remove')} onClick={() => set('extraDishes', f.extraDishes.filter((_, j) => j !== i))}>✕</button></div>)}
          </div>

          <div class="card">
            <h3>{tr(lang, 'दर आणि रक्कम', 'Rates and amount')}</h3>
            <div class="grid2">
              <div class="field"><label for="q-guests">{tr(lang, 'पाहुण्यांची संख्या *', 'Number of guests *')}</label><input id="q-guests" type="number" inputMode="numeric" min="1" value={f.guests} onInput={txt('guests')} aria-invalid={!!errs.guests} />{errs.guests && <div class="err">{errs.guests}</div>}</div>
              <div class="field"><label for="q-rate">{perPlateLabel(f.orderType, lang)} (₹) *</label><input id="q-rate" type="number" inputMode="decimal" min="0" value={f.perPlate} onInput={txt('perPlate')} aria-invalid={!!errs.perPlate} />{errs.perPlate && <div class="err">{errs.perPlate}</div>}</div>
            </div>
            <h3>{tr(lang, 'इतर खर्च (वाहतूक, सजावट, भांडी…)', 'Extra charges (transport, decoration, utensils…)')}</h3>
            {f.lines.map((l, i) => (
              <div class="quote-line">
                <div class="field" style={{ marginBottom: 0 }}><label for={'q-ll' + i}>{tr(lang, 'तपशील', 'Description')}</label><input id={'q-ll' + i} value={l.label} onInput={(e) => setLine(i, 'label', (e.target as HTMLInputElement).value)} /></div>
                <div class="field" style={{ marginBottom: 0 }}><label for={'q-la' + i}>₹</label><input id={'q-la' + i} type="number" inputMode="decimal" value={l.amount} onInput={(e) => setLine(i, 'amount', (e.target as HTMLInputElement).value)} /></div>
                <button class="btn btn-ghost btn-sm" type="button" aria-label={tr(lang, 'काढा', 'Remove')} onClick={() => set('lines', f.lines.filter((_, j) => j !== i))}>✕</button>
              </div>
            ))}
            <button class="btn btn-ghost btn-sm" type="button" onClick={() => set('lines', [...f.lines, { label: '', amount: '' }])}>+ {tr(lang, 'खर्च जोडा', 'Add charge')}</button>
            <div class="grid2" style={{ marginTop: '.8rem' }}>
              <div class="field"><label for="q-disc">{tr(lang, 'सूट (₹)', 'Discount (₹)')}</label><input id="q-disc" type="number" inputMode="decimal" min="0" value={f.discount} onInput={txt('discount')} /></div>
              <div class="field"><label for="q-adv">{tr(lang, 'आगाऊ रक्कम (अॅडव्हान्स) (₹)', 'Advance asked (₹)')}</label><input id="q-adv" type="number" inputMode="decimal" min="0" value={f.advance} onInput={txt('advance')} /></div>
            </div>
            <div class="quote-sum">
              <div class="quote-total"><span>{tr(lang, 'एकूण', 'Total')}</span><span class="money">{fmtMoney(total)}</span></div>
              <div><span>{tr(lang, 'आगाऊ रक्कम नंतर उरलेली', 'Balance after advance')}</span><span class="money">{fmtMoney(balance)}</span></div>
            </div>
          </div>

          <div class="card">
            <div class="field"><label for="q-valid">{tr(lang, 'कोटेशन कधीपर्यंत वैध?', 'Valid until')}</label><input id="q-valid" type="date" value={f.validUntil} onInput={txt('validUntil')} /></div>
            <div class="field"><label for="q-terms">{tr(lang, 'अटी व शर्ती', 'Terms and conditions')}</label><textarea id="q-terms" value={f.terms} onInput={txt('terms')} /></div>
            <div class="field"><label for="q-notes">{tr(lang, 'आतल्या नोंदी (ग्राहकाला दिसत नाहीत)', 'Private notes (not shown to customer)')}</label><textarea id="q-notes" value={f.notes} onInput={txt('notes')} /></div>
          </div>

          {msg && <p class={msg.includes('✔') ? 'ok' : 'err'} role="status">{msg}</p>}
          <div class="quote-actions">
            <button class="btn" type="submit">💾 {tr(lang, 'मसुदा सेव्ह करा', 'Save draft')}</button>
            <button class="btn btn-green" type="button" onClick={share}>💬 {tr(lang, 'WhatsApp वर पाठवा', 'Share on WhatsApp')}</button>
            <button class="btn btn-ghost" type="button" onClick={() => { if (check()) window.print(); }}>🖨️ {tr(lang, 'प्रिंट / PDF', 'Print / Save as PDF')}</button>
            <button class="btn btn-green" type="button" onClick={accept}>✔ {tr(lang, 'मान्य झाले', 'Accepted')}</button>
            <button class="btn btn-ghost" type="button" onClick={reject}>✖ {tr(lang, 'नामंजूर', 'Rejected')}</button>
            {existing && <button class="btn btn-danger" type="button" onClick={remove}>🗑️ {tr(lang, 'काढा', 'Delete')}</button>}
          </div>
        </form>
      </div>

      <div class="print-only quote-print">
        <h1>{settings.businessName}</h1>
        <div class="qp-sub">{settings.phone && <>{tr(lang, 'फोन: ', 'Phone: ')}{settings.phone}</>}{settings.fssai && <> &nbsp;|&nbsp; FSSAI: {settings.fssai}</>}</div>
        <h2 style={{ textAlign: 'center', color: '#000' }}>{tr(lang, 'कोटेशन', 'QUOTATION')}</h2>
        <p>
          <b>{tr(lang, 'ग्राहक: ', 'Customer: ')}</b>{cur.customerName} ({cur.customerPhone})<br />
          {cur.eventTitle && <><b>{tr(lang, 'कार्यक्रम: ', 'Event: ')}</b>{cur.eventTitle}<br /></>}
          {cur.eventDate && <><b>{tr(lang, 'दिनांक: ', 'Date: ')}</b>{fmtDate(cur.eventDate, lang)}<br /></>}
          {cur.town && <><b>{tr(lang, 'ठिकाण: ', 'Place: ')}</b>{cur.town}<br /></>}
          <b>{tr(lang, 'पाहुणे: ', 'Guests: ')}</b>{cur.guests} &nbsp; <b>{tr(lang, 'प्रकार: ', 'Type: ')}</b>{orderTypeLabel(cur.orderType, lang)}
        </p>
        {names.length > 0 && <><b>{tr(lang, 'पदार्थ', 'Menu')}</b><ol>{names.map((n) => <li>{n}</li>)}</ol></>}
        <table>
          <thead><tr><th>{tr(lang, 'तपशील', 'Item')}</th><th class="r">{tr(lang, 'रक्कम', 'Amount')}</th></tr></thead>
          <tbody>
            <tr><td>{perPlateLabel(cur.orderType, lang)}: {fmtMoney(cur.perPlate)} × {cur.guests}</td><td class="r">{fmtMoney(cur.perPlate * cur.guests)}</td></tr>
            {lines.map((l) => <tr><td>{l.label}</td><td class="r">{fmtMoney(l.amount)}</td></tr>)}
            {cur.discount > 0 && <tr><td>{tr(lang, 'सूट', 'Discount')}</td><td class="r">-{fmtMoney(cur.discount)}</td></tr>}
            <tr><td><b>{tr(lang, 'एकूण', 'Total')}</b></td><td class="r"><b>{fmtMoney(total)}</b></td></tr>
            {cur.advanceAmount > 0 && <tr><td>{tr(lang, 'आगाऊ रक्कम', 'Advance')}</td><td class="r">{fmtMoney(cur.advanceAmount)}</td></tr>}
            {cur.advanceAmount > 0 && <tr><td>{tr(lang, 'उरलेली रक्कम', 'Balance')}</td><td class="r">{fmtMoney(balance)}</td></tr>}
          </tbody>
        </table>
        {cur.validUntil && <p>{tr(lang, 'कोटेशन वैध: ', 'Valid until: ')}{fmtDate(cur.validUntil, lang)}</p>}
        {cur.terms && <><b>{tr(lang, 'अटी व शर्ती', 'Terms and conditions')}</b><p style={{ whiteSpace: 'pre-wrap' }}>{cur.terms}</p></>}
        <div class="qp-sign"><div>{tr(lang, 'ग्राहकाची सही', 'Customer signature')}</div><div>{tr(lang, 'केटरर्सची सही', 'Caterer signature')}</div></div>
        {wm && <p class="small">{tr(lang, 'टीप: साहित्य ग्राहक देणार.', 'Note: ingredients are provided by the customer.')}</p>}
      </div>
    </div>
  );
}
