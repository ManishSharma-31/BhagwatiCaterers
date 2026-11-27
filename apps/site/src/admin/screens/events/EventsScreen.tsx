import './events.css';
import { useMemo, useState } from 'preact/hooks';
import { tr, useList } from '../../hooks';
import { href, type Route } from '../../router';
import type { CatEvent, Lang } from '../../types';
import { fmtDate, today } from '../../util';
import { busyDays, daysFrom, groupByDate, monthGrid, monthName, pastEvents, shiftMonth, upcoming, weekdayNames } from './calendar';
import { eventStatusLabel, eventTypeLabel, townLabel } from './labels';

export function EventRow({ ev, lang, busy }: { ev: CatEvent; lang: Lang; busy?: boolean }) {
  const left = daysFrom(today(), ev.date);
  const leftText = left === 0 ? tr(lang, 'आज', 'Today') : left === 1 ? tr(lang, 'उद्या', 'Tomorrow') : left > 1 ? tr(lang, `${left} दिवस बाकी`, `in ${left} days`) : tr(lang, `${-left} दिवसांपूर्वी`, `${-left} days ago`);
  return (
    <a class="list-item" href={href('/events/' + ev.id)}>
      <span class="li-main">
        <span class="li-title">{ev.title}</span>
        <span class="li-sub ev-sub">
          <span>{fmtDate(ev.date, lang)}{ev.startTime ? ' • ' + ev.startTime : ''}</span>
          {ev.town && <span>• {townLabel(ev.town, lang)}</span>}
          <span>• {ev.guests} {tr(lang, 'पाहुणे', 'guests')}</span>
        </span>
        <span class="ev-sub">
          <span class={'badge ' + ev.status}>{eventStatusLabel(ev.status, lang)}</span>
          {busy && <span class="badge warn">{tr(lang, 'व्यस्त दिवस', 'Busy day')}</span>}
          <span class="small muted">{leftText}</span>
        </span>
      </span>
    </a>
  );
}

export function EventsScreen({ lang }: { lang: Lang; route: Route }) {
  const events = useList('events');
  const t0 = today();
  const [ym, setYm] = useState(() => ({ y: Number(t0.slice(0, 4)), m0: Number(t0.slice(5, 7)) - 1 }));
  const [sel, setSel] = useState<string | null>(null);
  const list = events ?? [];
  const byDate = useMemo(() => groupByDate(list), [events]);
  const busy = useMemo(() => busyDays(list), [events]);
  const up = useMemo(() => upcoming(list, t0, 30), [events]);
  const past = useMemo(() => pastEvents(list, t0), [events]);
  const weeks = monthGrid(ym.y, ym.m0);
  const wd = weekdayNames(lang);
  const upBusy = [...busy.entries()].filter(([d]) => d >= t0 && daysFrom(t0, d) <= 30).sort((a, b) => a[0].localeCompare(b[0]));
  const selList = sel ? list.filter((e) => e.date === sel).sort((a, b) => (a.startTime || '').localeCompare(b.startTime || '')) : [];
  const go2 = (d: number) => { setYm(shiftMonth(ym.y, ym.m0, d)); setSel(null); };

  return (
    <div class="page">
      <h1>{tr(lang, 'कार्यक्रम', 'Events')}</h1>
      {events === null && <p class="muted">{tr(lang, 'लोड होत आहे…', 'Loading…')}</p>}
      {upBusy.map(([d, b]) => (
        <div class="ev-warn" role="alert">
          ⚠️ {tr(lang, `${fmtDate(d, lang)}: एकाच दिवशी ${b.count} कार्यक्रम, एकूण ${b.guests} पाहुणे. नियोजन करा!`, `${fmtDate(d, lang)}: ${b.count} events on one day, ${b.guests} guests in total. Plan carefully.`)}
        </div>
      ))}
      <div class="card ev-cal">
        <div class="ev-head">
          <button type="button" class="btn btn-ghost btn-sm" onClick={() => go2(-1)} aria-label={tr(lang, 'मागील महिना', 'Previous month')}>◀</button>
          <h2>{monthName(ym.y, ym.m0, lang)}</h2>
          <button type="button" class="btn btn-ghost btn-sm" onClick={() => go2(1)} aria-label={tr(lang, 'पुढील महिना', 'Next month')}>▶</button>
          <button type="button" class="btn btn-sm" onClick={() => { setYm({ y: Number(t0.slice(0, 4)), m0: Number(t0.slice(5, 7)) - 1 }); setSel(t0); }}>{tr(lang, 'आज', 'Today')}</button>
        </div>
        <div class="ev-grid">
          {wd.map((w) => <div class="ev-wd">{w}</div>)}
          {weeks.flat().map((d, i) => {
            if (!d) return <div class="ev-day pad" key={'p' + i} />;
            const n = byDate.get(d)?.length ?? 0;
            const cls = ['ev-day', d === t0 ? 'today' : '', d === sel ? 'sel' : '', busy.has(d) ? 'busy' : ''].join(' ');
            return (
              <button type="button" key={d} class={cls} onClick={() => setSel(d === sel ? null : d)}
                aria-label={fmtDate(d, lang) + (n ? `, ${n} ${tr(lang, 'कार्यक्रम', 'events')}` : '')}>
                <span>{Number(d.slice(8))}</span>
                {n > 0 && <span class="ev-dots">{n === 1 ? <i class="ev-dot" /> : <><i class="ev-dot" />{n}</>}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {sel && (
        <div class="card">
          <h3>{fmtDate(sel, lang)}</h3>
          {busy.has(sel) && <div class="ev-warn">⚠️ {tr(lang, `व्यस्त दिवस: ${busy.get(sel)!.count} कार्यक्रम, ${busy.get(sel)!.guests} पाहुणे`, `Busy day: ${busy.get(sel)!.count} events, ${busy.get(sel)!.guests} guests`)}</div>}
          {selList.length === 0 ? <p class="muted">{tr(lang, 'या दिवशी कार्यक्रम नाही.', 'No events on this day.')}</p> : <div class="list">{selList.map((e) => <EventRow ev={e} lang={lang} busy={busy.has(e.date)} />)}</div>}
          <p style="margin-top:.7rem"><a class="btn btn-sm" href={href('/events/new?date=' + sel)}>+ {tr(lang, 'या दिवशी नवीन कार्यक्रम', 'New event on this day')}</a></p>
        </div>
      )}

      <h2>{tr(lang, 'पुढील ३० दिवस', 'Upcoming (next 30 days)')}</h2>
      {up.length === 0 && events !== null ? <p class="empty">{tr(lang, 'पुढील ३० दिवसांत कार्यक्रम नाही.', 'No events in the next 30 days.')}</p> : <div class="list">{up.map((e) => <EventRow ev={e} lang={lang} busy={busy.has(e.date)} />)}</div>}

      <details class="ev-sec">
        <summary><strong>{tr(lang, `मागील कार्यक्रम (${past.length})`, `Past (${past.length})`)}</strong></summary>
        <div class="list" style="margin-top:.5rem">{past.map((e) => <EventRow ev={e} lang={lang} />)}</div>
      </details>

      <a class="btn fab" href={href('/events/new')}>+ {tr(lang, 'नवीन कार्यक्रम', 'New event')}</a>
    </div>
  );
}
