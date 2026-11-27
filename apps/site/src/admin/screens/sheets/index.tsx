import './sheets.css';
import { useState } from 'preact/hooks';
import { tr, useList, useStore } from '../../hooks';
import { href, type Route } from '../../router';
import type { CatEvent, Lang, MenuItem, Task } from '../../types';
import { fmtDate, orderTypeLabel, waUrl } from '../../util';
import { dishName, townLabel } from '../events/labels';
import { QtyEditor } from './QtyEditor';
import { dishLines, fmtQty, hasQty, shoppingTotals, STARTER_PACKING } from './logic';

type Tab = 'prep' | 'shop' | 'pack';

export function SheetsScreen({ lang, route }: { lang: Lang; route: Route }) {
  const id = route.parts[0];
  const events = useList('events'), menu = useList('menu'), tasks = useList('tasks');
  const [tab, setTab] = useState<Tab>('prep');
  const [editing, setEditing] = useState<string | null>(null);
  if (!events || !menu || !tasks) return <div class="page"><p class="muted">{tr(lang, 'लोड होत आहे…', 'Loading…')}</p></div>;
  const ev = events.find((e) => e.id === id);
  if (!ev) return <div class="page"><h1>{tr(lang, 'कार्यक्रम सापडला नाही', 'Event not found')}</h1><a class="btn" href={href('/events')}>{tr(lang, 'कार्यक्रम यादी', 'All events')}</a></div>;

  const dishes = ev.dishIds.map((d) => menu.find((m) => m.id === d)).filter(Boolean) as MenuItem[];
  const withMat = ev.orderType === 'with-material';
  const packTasks = tasks.filter((t) => t.eventId === ev.id && t.category === 'packing');
  const shop = shoppingTotals(dishes, ev.guests, (m) => dishName(m, lang));
  const noData = dishes.filter((d) => !hasQty(d));

  const shopTitle = withMat ? tr(lang, 'ग्राहकाने द्यायचे साहित्य', 'Ingredients the customer must provide') : tr(lang, 'खरेदी यादी', 'Shopping list');
  const waText = () => {
    const head = `*${ev.title}*\n${fmtDate(ev.date, lang)}${ev.startTime ? ' ' + ev.startTime : ''} | ${[ev.venue, townLabel(ev.town, lang)].filter(Boolean).join(', ')} | ${ev.guests} ${tr(lang, 'पाहुणे', 'guests')}\n`;
    if (tab === 'prep') {
      return head + `\n*${tr(lang, 'तयारी (पदार्थानुसार)', 'Prep by dish')}*\n` + dishes.map((d) => {
        const l = dishLines(d, ev.guests);
        return `\n${dishName(d, lang)}\n` + (l.length ? l.map((r) => `- ${r.ingredient}: ${fmtQty(r.qty, r.unit)}`).join('\n') : `- ${tr(lang, 'प्रमाण भरलेले नाही', 'quantities not entered')}`);
      }).join('\n') + (ev.extraDishes.length ? `\n\n${tr(lang, 'इतर', 'Other')}: ${ev.extraDishes.join(', ')}` : '');
    }
    if (tab === 'shop') {
      let s = head + `\n*${shopTitle}*\n`;
      for (const g of shop.groups) s += `\n(${g.unit})\n` + g.items.map((i) => `- ${i.name}: ${fmtQty(i.qty, i.unit)}`).join('\n') + '\n';
      if (shop.groups.length === 0) s += `\n${tr(lang, 'प्रमाण भरलेले नाही.', 'No quantities entered yet.')}\n`;
      if (noData.length || ev.extraDishes.length) s += `\n${tr(lang, 'प्रमाण नसलेले पदार्थ', 'Dishes without quantities')}: ${[...noData.map((d) => dishName(d, lang)), ...ev.extraDishes].join(', ')}`;
      return s;
    }
    return head + `\n*${tr(lang, 'पॅकिंग यादी', 'Packing list')}*\n` + packTasks.map((t) => `${t.done ? '[x]' : '[ ]'} ${t.title}`).join('\n');
  };
  const share = () => window.open(waUrl('', waText()), '_blank', 'noopener');

  return (
    <div class="page sh-big">
      <div class="no-print"><a href={href('/events/' + ev.id)}>← {tr(lang, 'कार्यक्रम', 'Event')}</a></div>
      <div class="sh-head">
        <h1>{ev.title}</h1>
        <div>📅 {fmtDate(ev.date, lang)}{ev.startTime ? ', ' + ev.startTime : ''} · 👥 {ev.guests} {tr(lang, 'पाहुणे', 'guests')}</div>
        {(ev.venue || ev.town) && <div>📍 {[ev.venue, townLabel(ev.town, lang)].filter(Boolean).join(', ')}</div>}
        <div class="muted">{orderTypeLabel(ev.orderType, lang)}</div>
      </div>

      <div class="sh-tabs no-print" role="tablist">
        {([['prep', tr(lang, 'तयारी', 'Prep')], ['shop', withMat ? tr(lang, 'ग्राहकाचे साहित्य', 'Customer items') : tr(lang, 'खरेदी', 'Shopping')], ['pack', tr(lang, 'पॅकिंग', 'Packing')]] as [Tab, string][]).map(([k, label]) => (
          <button type="button" role="tab" aria-selected={tab === k} class={'chip' + (tab === k ? ' on' : '')} onClick={() => setTab(k)}>{label}</button>
        ))}
      </div>
      <div class="row no-print" style="margin-bottom:.8rem">
        <button type="button" class="btn btn-ghost btn-sm" onClick={() => window.print()}>🖨 {tr(lang, 'प्रिंट', 'Print')}</button>
        <button type="button" class="btn btn-green btn-sm" onClick={share}>💬 {tr(lang, 'WhatsApp वर पाठवा', 'Share on WhatsApp')}</button>
      </div>

      {tab !== 'pack' && dishes.length === 0 && ev.extraDishes.length === 0 && <p class="empty">{tr(lang, 'या कार्यक्रमात पदार्थ निवडलेले नाहीत. कार्यक्रम उघडून पदार्थ निवडा.', 'No dishes chosen for this event. Open the event and pick dishes.')} <a href={href('/events/' + ev.id)}>{tr(lang, 'कार्यक्रम उघडा', 'Open event')}</a></p>}

      {tab === 'prep' && (
        <>
          {noData.length > 0 && <div class="sh-note">{tr(lang, `${noData.length} पदार्थांचे प्रमाण भरलेले नाही. "प्रमाण भरा" दाबून एकदा भरा, पुढच्या वेळी आपोआप दिसेल. आम्ही कोणतेही प्रमाण स्वतः लिहिलेले नाही.`, `${noData.length} dish(es) have no quantities yet. Tap "Add quantities" once and it will be remembered. No quantities are guessed.`)}</div>}
          {dishes.map((d) => {
            const lines = dishLines(d, ev.guests);
            return (
              <div class="card sh-dish" key={d.id}>
                <h3>{dishName(d, lang)}</h3>
                {lines.length > 0 && (
                  <table class="table sh-table"><thead><tr><th>{tr(lang, 'साहित्य', 'Ingredient')}</th><th>{tr(lang, `प्रमाण (${ev.guests} पाहुणे)`, `Qty (${ev.guests} guests)`)}</th></tr></thead>
                    <tbody>{lines.map((r) => <tr><td>{r.ingredient}</td><td>{fmtQty(r.qty, r.unit)}</td></tr>)}</tbody></table>
                )}
                {lines.length === 0 && <p class="muted">{tr(lang, 'प्रमाण भरलेले नाही.', 'No quantities entered.')}</p>}
                {editing === d.id ? <QtyEditor lang={lang} dish={d} onClose={() => setEditing(null)} /> :
                  <button type="button" class="btn btn-sm btn-ghost no-print" onClick={() => setEditing(d.id)}>{lines.length ? '✏️ ' + tr(lang, 'प्रमाण बदला', 'Edit quantities') : '+ ' + tr(lang, 'प्रमाण भरा', 'Add quantities')}</button>}
              </div>
            );
          })}
          {ev.extraDishes.length > 0 && <div class="card"><h3>{tr(lang, 'इतर पदार्थ', 'Other dishes')}</h3><ul>{ev.extraDishes.map((x) => <li>{x}</li>)}</ul><p class="muted small">{tr(lang, 'यांचे प्रमाण मेनूमध्ये नाही.', 'These are not in the menu, so there are no quantities.')}</p></div>}
        </>
      )}

      {tab === 'shop' && (
        <>
          <h2>{shopTitle}</h2>
          {withMat && <div class="sh-note">{tr(lang, 'हे ग्राहकाचे साहित्य आहे: ग्राहकाने खालील साहित्य आणून द्यायचे आहे. ग्राहकाला हे प्रमाण सांगा.', 'This is a with-material order: the customer supplies these ingredients. Tell the customer these quantities.')}</div>}
          {shop.groups.length === 0 ? <p class="muted">{tr(lang, 'अजून कोणत्याही पदार्थाचे प्रमाण भरलेले नाही.', 'No dish has quantities entered yet.')}</p> : shop.groups.map((g) => (
            <div class="card" key={g.unit}>
              <h3>{g.unit === 'kg' ? tr(lang, 'किलो / ग्रॅम (kg)', 'By weight (kg)') : g.unit === 'l' ? tr(lang, 'लिटर (l)', 'By volume (l)') : tr(lang, 'नग (pcs)', 'Pieces (pcs)')}</h3>
              <table class="table sh-table"><tbody>{g.items.map((i) => <tr><td>{i.name}<div class="muted small">{i.from.join(', ')}</div></td><td class="money">{fmtQty(i.qty, i.unit)}</td></tr>)}</tbody></table>
            </div>
          ))}
          {(noData.length > 0 || ev.extraDishes.length > 0) && (
            <div class="sh-note">
              {tr(lang, 'या यादीत खालील पदार्थांचे साहित्य नाही, कारण प्रमाण भरलेले नाही: ', 'Not included, because quantities are missing: ')}
              <strong>{[...noData.map((d) => dishName(d, lang)), ...ev.extraDishes].join(', ')}</strong>
              <div class="no-print" style="margin-top:.4rem">{tr(lang, '"तयारी" टॅबवर जाऊन प्रमाण भरा.', 'Go to the Prep tab to add quantities.')}</div>
            </div>
          )}
        </>
      )}

      {tab === 'pack' && <PackTab lang={lang} ev={ev} packTasks={packTasks} />}
    </div>
  );
}

function PackTab({ lang, ev, packTasks }: { lang: Lang; ev: CatEvent; packTasks: Task[] }) {
  const store = useStore();
  const [text, setText] = useState('');
  const add = async (title: string) => { if (title.trim()) await store.put('tasks', { eventId: ev.id, title: title.trim(), category: 'packing', done: false }); };
  const addStarter = async () => {
    const have = new Set(packTasks.map((t) => t.title));
    for (const s of STARTER_PACKING) { const title = tr(lang, s.mr, s.en); if (!have.has(title)) await add(title); }
  };
  const sorted = [...packTasks].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const left = packTasks.filter((t) => !t.done).length;
  return (
    <div class="card">
      <h3>{tr(lang, 'पॅकिंग यादी', 'Packing list')} {packTasks.length > 0 && <span class="badge">{packTasks.length - left}/{packTasks.length}</span>}</h3>
      {packTasks.length === 0 && <p class="muted no-print">{tr(lang, 'यादी रिकामी आहे. सुरुवातीची यादी घ्या किंवा स्वतः जोडा.', 'The list is empty. Load the starter list or add your own.')}</p>}
      {sorted.map((t) => (
        <div class="sh-pack" key={t.id}>
          <input type="checkbox" class="no-print" aria-label={t.title} checked={t.done} onChange={() => store.put('tasks', { ...t, done: !t.done })} />
          <span class="sh-box print-only" />
          <span class="grow" style={t.done ? 'text-decoration:line-through;opacity:.6' : ''}>{t.title}</span>
          <button type="button" class="btn btn-ghost btn-sm no-print" aria-label={tr(lang, 'काढा', 'Remove')} onClick={() => store.remove('tasks', t.id)}>×</button>
        </div>
      ))}
      <div class="no-print" style="margin-top:.8rem">
        <div class="row">
          <input style="flex:1" aria-label={tr(lang, 'नवीन वस्तू', 'New item')} placeholder={tr(lang, 'नवीन वस्तू लिहा', 'Type a new item')} value={text} onInput={(e) => setText((e.target as HTMLInputElement).value)} onKeyDown={(e) => { if (e.key === 'Enter') { add(text); setText(''); } }} />
          <button type="button" class="btn btn-sm" onClick={() => { add(text); setText(''); }}>+ {tr(lang, 'जोडा', 'Add')}</button>
        </div>
        <p style="margin-top:.6rem"><button type="button" class="btn btn-ghost btn-sm" onClick={addStarter}>{tr(lang, 'सुरुवातीची यादी घ्या', 'Load starter list')}</button></p>
      </div>
    </div>
  );
}
