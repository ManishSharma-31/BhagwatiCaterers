import './today.css';
import { useEffect, useState } from 'preact/hooks';
import { useList, useStore, tr } from '../../hooks';
import { href, type Route } from '../../router';
import type { Backup, Lang } from '../../types';
import { fmtDate, fmtMoney, today, waUrl, telUrl } from '../../util';
import { LEAD_STATUSES } from '../../types';
import { STATUS_LABEL } from '../leads/LeadsScreen';
import { countByStatus } from '../leads/logic';
import { buildBalanceReminder } from '../payments/logic';
import { backupFileName, backupLevel, daysSinceBackup, getLastBackupAt, hasUserData, markBackupNow } from '../../backup';
import { download } from '../../util';
import { greetingKey, summarize } from './logic';
import { townLabel } from '../events/labels';

type P = { lang: Lang; route: Route };

export function TodayScreen({ lang }: P) {
  const store = useStore();
  const leads = useList('leads'), events = useList('events'), quotes = useList('quotes'), payments = useList('payments'), settings = useList('settings'), tasks = useList('tasks');
  const [lastBackup, setLastBackup] = useState<string | null>(getLastBackupAt());
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  useEffect(() => { setLastBackup(getLastBackupAt()); }, []);

  const t = today();
  const owner = settings?.[0]?.ownerName;
  const g = greetingKey(new Date().getHours());
  const hello = tr(lang, g === 'morning' ? 'सुप्रभात' : g === 'afternoon' ? 'नमस्कार' : 'शुभ संध्या', g === 'morning' ? 'Good morning' : g === 'afternoon' ? 'Good afternoon' : 'Good evening');

  const ready = leads && events && quotes && payments && tasks;
  const s = ready ? summarize({ leads, events, quotes, payments, tasks }, t) : null;

  // Backup reminder: local mode only (cloud mode keeps the data online).
  const days = daysSinceBackup(lastBackup);
  const dataExists = !!ready && (leads.length + events.length + quotes.length + payments.length > 0);
  const level = store.mode === 'local' ? backupLevel(days, dataExists) : 'none';

  const backupNow = async () => {
    setBusy(true);
    try {
      const b: Backup = await store.exportAll();
      download(backupFileName(), JSON.stringify(b, null, 2), 'application/json');
      markBackupNow(); setLastBackup(getLastBackupAt()); setDone(true);
    } finally { setBusy(false); }
  };

  return (
    <div class="page">
      <h1 class="today-hello">{hello}{owner ? `, ${owner}` : ''}</h1>
      <p class="muted today-sub">{tr(lang, 'आज ', 'Today is ')}{fmtDate(t, lang)}</p>


      <div class="today-quick">
        <a class="btn" href={href('/leads/new')}><span class="q-ico" aria-hidden="true">➕</span>{tr(lang, 'नवी चौकशी', 'New lead')}</a>
        <a class="btn" href={href('/events/new')}><span class="q-ico" aria-hidden="true">🗓️</span>{tr(lang, 'नवा कार्यक्रम', 'New event')}</a>
        <a class="btn btn-green" href={href('/payments?new=1')}><span class="q-ico" aria-hidden="true">₹</span>{tr(lang, 'पैसे नोंदवा', 'Add payment')}</a>
        <a class="btn btn-ghost" href={href('/search')}><span class="q-ico" aria-hidden="true">🔍</span>{tr(lang, 'शोधा', 'Search')}</a>
      </div>


      {s && (() => {
        const owed = [...s.pending, ...s.unpaidPast].reduce((n, p) => n + p.balance, 0);
        const month = t.slice(0, 7);
        const inMonth = (payments ?? []).filter((p) => p.direction === 'in' && p.date.startsWith(month)).reduce((n, p) => n + p.amount, 0);
        const outMonth = (payments ?? []).filter((p) => p.direction === 'out' && p.date.startsWith(month)).reduce((n, p) => n + p.amount, 0);
        const counts = countByStatus(leads ?? []);
        const tiles: Array<{ k: string; n: string; label: string; to: string; tone?: string }> = [
          { k: 'new', n: String(s.newLeads), label: tr(lang, 'नवी चौकशी', 'New leads'), to: '/leads', tone: s.newLeads ? 'hot' : '' },
          { k: 'fu', n: String(s.followUps.length), label: tr(lang, 'आज फॉलो-अप', 'Follow-ups due'), to: '/leads', tone: s.followUps.length ? 'hot' : '' },
          { k: 'ev', n: String(s.upcoming.length), label: tr(lang, 'पुढील ७ दिवसांत कार्यक्रम', 'Events in 7 days'), to: '/events' },
          { k: 'owed', n: fmtMoney(owed), label: tr(lang, 'येणे बाकी', 'To collect'), to: '/payments', tone: owed ? 'warn' : '' },
          { k: 'in', n: fmtMoney(inMonth), label: tr(lang, 'या महिन्यात मिळाले', 'Received this month'), to: '/payments', tone: 'good' },
          { k: 'net', n: fmtMoney(inMonth - outMonth), label: tr(lang, 'या महिन्याचा नफा (अंदाजे)', 'Net this month'), to: '/payments' },
        ];
        return (
          <>
            <div class="kpis">
              {tiles.map((x) => <a class={'kpi ' + (x.tone ?? '')} href={href(x.to)}><span class="kpi-n">{x.n}</span><span class="kpi-l">{x.label}</span></a>)}
            </div>
            <div class="pipe card no-print" aria-label={tr(lang, 'चौकशीची स्थिती', 'Lead pipeline')}>
              <div class="pipe-title">{tr(lang, 'चौकशी प्रवास', 'Lead pipeline')}</div>
              <div class="pipe-row">
                {LEAD_STATUSES.filter((st) => st !== 'lost').map((st) => (
                  <a class={'pipe-step ' + st} href={href('/leads')}><span class="pipe-n">{counts[st]}</span><span class="pipe-l">{tr(lang, STATUS_LABEL[st].mr, STATUS_LABEL[st].en)}</span></a>
                ))}
              </div>
            </div>
          </>
        );
      })()}


      {!s ? <p class="muted">{tr(lang, 'थोडा वेळ थांबा…', 'Loading…')}</p> : (
        <div class="today-cols">
          {s.upcoming.filter((u) => u.days <= 1).length > 0 && (
            <div class="today-alert yellow" role="status">
              <strong>{tr(lang, 'आज / उद्याचे कार्यक्रम', 'Events today / tomorrow')}</strong>
              {s.upcoming.filter((u) => u.days <= 1).map(({ event, days: d }) => {
                const gap = s.gaps.find((g) => g.event.id === event.id);
                return (
                  <p style="margin:.4rem 0 0">
                    <a href={href('/events/' + event.id)}><strong>{d === 0 ? tr(lang, 'आज', 'Today') : tr(lang, 'उद्या', 'Tomorrow')}: {event.title}</strong></a>
                    {event.startTime ? ` · ${event.startTime}` : ''} · {tr(lang, `${event.guests} पाहुणे`, `${event.guests} guests`)}
                    {gap?.noDishes && <span class="badge warn" style="margin-left:.3rem">{tr(lang, 'पदार्थ निवडले नाहीत', 'No dishes')}</span>}
                    {gap?.noStaff && <span class="badge warn" style="margin-left:.3rem">{tr(lang, 'कर्मचारी नेमले नाहीत', 'No staff')}</span>}
                    {' '}<a href={href('/sheets/' + event.id)}>🍳 {tr(lang, 'याद्या', 'Sheets')}</a>
                  </p>
                );
              })}
            </div>
          )}

          <div class="col">
          <h2>{tr(lang, 'आज फोन करायचे', 'Follow-ups due')}</h2>
          {s.followUps.length === 0 ? <p class="muted">{tr(lang, 'आज किंवा मागील कोणताही फॉलो-अप बाकी नाही.', 'No follow-ups due today or overdue.')}</p> : (
            <div class="list">
              {s.followUps.map(({ lead, daysOverdue }) => (
                <div class="item-wrap"><a class="list-item" href={href('/leads/' + lead.id)}>
                  <span class="li-main">
                    <div class="li-title">{lead.name}</div>
                    <div class="li-sub">{lead.phone}{lead.eventDate ? ` · ${fmtDate(lead.eventDate, lang)}` : ''}</div>
                  </span>
                  <span class={daysOverdue > 0 ? 'today-late' : 'today-days'}>
                    {daysOverdue > 0 ? tr(lang, `${daysOverdue} दिवस उशीर`, `${daysOverdue} d late`) : tr(lang, 'आज', 'Today')}
                  </span>
                </a>
                {lead.phone && <div class="item-actions"><a class="btn btn-sm btn-ghost" href={telUrl(lead.phone)}>📞 {tr(lang, 'फोन', 'Call')}</a><a class="btn btn-sm btn-green" target="_blank" rel="noopener" href={waUrl(lead.phone, tr(lang, `नमस्कार ${lead.name}, भगवती केटरर्स कडून बोलतोय.`, `Hello ${lead.name}, this is Bhagwati Caterers.`))}>💬 WhatsApp</a></div>}
                </div>
              ))}
            </div>
          )}

          {s.tasksDue.length > 0 && (
            <>
              <h2>{tr(lang, 'आजची कामे (व उशीर झालेली)', 'Tasks due (and overdue)')} <span class="badge warn">{s.tasksDue.length}</span></h2>
              <div class="list">
                {s.tasksDue.slice(0, 5).map((t) => (
                  <a class="list-item" href={href(t.eventId ? '/tasks?event=' + t.eventId : '/tasks')}>
                    <span class="li-main"><div class="li-title">{t.title}</div><div class="li-sub">{fmtDate(t.dueDate, lang)}</div></span>
                    {t.dueDate! < today() && <span class="today-late">{tr(lang, 'उशीर', 'Late')}</span>}
                  </a>
                ))}
              </div>
              {s.tasksDue.length > 5 && <p><a href={href('/tasks')}>{tr(lang, `सर्व ${s.tasksDue.length} कामे पाहा`, `See all ${s.tasksDue.length} tasks`)}</a></p>}
            </>
          )}

          </div>
          <div class="col">
          <h2>{tr(lang, 'पुढील ७ दिवसांतील कार्यक्रम', 'Events in the next 7 days')}</h2>
          {s.upcoming.length === 0 ? <p class="muted">{tr(lang, 'पुढील ७ दिवसांत कार्यक्रम नाही.', 'No events in the next 7 days.')}</p> : (
            <div class="list">
              {s.upcoming.map(({ event, days: d }) => {
                const gap = s.gaps.find((g) => g.event.id === event.id);
                return (
                  <a class="list-item" href={href('/events/' + event.id)}>
                    <span class="li-main">
                      <div class="li-title">{event.title}</div>
                      <div class="li-sub">{fmtDate(event.date, lang)} · {tr(lang, `${event.guests} पाहुणे`, `${event.guests} guests`)}{event.town ? ` · ${townLabel(event.town, lang)}` : ''}</div>
                      {gap && <div class="li-sub">{gap.noDishes ? '⚠️ ' + tr(lang, 'पदार्थ निवडले नाहीत ', 'No dishes chosen ') : ''}{gap.noStaff ? '⚠️ ' + tr(lang, 'कर्मचारी नेमले नाहीत', 'No staff assigned') : ''}</div>}
                    </span>
                    <span class="today-days">{d === 0 ? tr(lang, 'आज', 'Today') : d === 1 ? tr(lang, 'उद्या', 'Tomorrow') : tr(lang, `${d} दिवस`, `${d} days`)}</span>
                  </a>
                );
              })}
            </div>
          )}

          <h2>{tr(lang, 'येणे बाकी (पक्क्या कार्यक्रमांचे)', 'Balance to collect (confirmed events)')}</h2>
          {s.pending.length === 0 && s.unpaidPast.length === 0 ? <p class="muted">{tr(lang, 'सध्या कोणतीही बाकी रक्कम दिसत नाही. (कोटेशन मान्य झाले असेल तरच येथे दिसते.)', 'No balance to show. (Only events with an accepted quote appear here.)')}</p> : (
            <div class="list">
              {[...s.unpaidPast.map((p) => ({ ...p, past: true })), ...s.pending.map((p) => ({ ...p, past: false }))].map((p) => (
                <div class="card" style="margin:0">
                  <a class="list-item" style="border:0;padding:0" href={href('/events/' + p.event.id)}>
                    <span class="li-main">
                      <div class="li-title">{p.event.title}</div>
                      <div class="li-sub">{fmtDate(p.event.date, lang)} · {tr(lang, 'एकूण', 'Total')} {fmtMoney(p.total)} · {tr(lang, 'मिळाले', 'Received')} {fmtMoney(p.received)}</div>
                      {p.past && <div class="lead-flag">{tr(lang, 'कार्यक्रम होऊन गेला, पैसे बाकी', 'Event is over, money still due')}</div>}
                    </span>
                    <span class="money" style="color:var(--a-red)">{fmtMoney(p.balance)}</span>
                  </a>
                  <p style="margin:.4rem 0 0"><button type="button" class="btn btn-green btn-sm" onClick={() => window.open(waUrl(p.event.customerPhone || p.quote.customerPhone, buildBalanceReminder({ name: p.event.customerName ?? p.quote.customerName, eventTitle: p.event.title, eventDate: p.event.date, bal: { expected: p.total, received: p.received, balance: p.balance } }, settings?.[0] ?? {}, lang)), '_blank', 'noopener')}>💬 {tr(lang, 'बाकी रकमेची आठवण', 'Balance reminder')}</button></p>
                </div>
              ))}
            </div>
          )}

          {s.staleQuotes.length > 0 && (
            <>
              <h2>{tr(lang, 'कोटेशनचे उत्तर आलेले नाही', 'Quotes waiting for an answer')}</h2>
              <div class="list">
                {s.staleQuotes.slice(0, 5).map(({ quote, days: d }) => (
                  <a class="list-item" href={href('/quotes/' + quote.id)}>
                    <span class="li-main"><div class="li-title">{quote.customerName}</div><div class="li-sub">{quote.eventTitle}</div></span>
                    <span class="today-late">{tr(lang, `${d} दिवस`, `${d} days`)}</span>
                  </a>
                ))}
              </div>
            </>
          )}

          </div>
        </div>
      )}
      {level !== 'none' && (
        <div class={`today-alert ${level}`} role="alert">
          <strong>{days === null
            ? tr(lang, 'अजून बॅकअप घेतलेला नाही.', 'You have not taken a backup yet.')
            : tr(lang, `शेवटचा बॅकअप ${days} दिवसांपूर्वी घेतला.`, `Last backup was ${days} days ago.`)}</strong>
          <p class="small" style="margin:.3rem 0 .6rem">{tr(lang, 'फोन हरवला तर सर्व माहिती जाऊ शकते. आठवड्यातून एकदा बॅकअप घ्या.', 'If the phone is lost, all data can be lost. Take a backup once a week.')}</p>
          <button class="btn" type="button" disabled={busy} onClick={backupNow}>{tr(lang, 'आता बॅकअप घ्या', 'Backup now')}</button>
        </div>
      )}
      {done && level === 'none' && <p class="ok">{tr(lang, 'बॅकअप फाइल डाउनलोड झाली. ती WhatsApp किंवा Drive मध्ये सुरक्षित ठेवा.', 'Backup file downloaded. Keep it safe in WhatsApp or Drive.')}</p>}
      {store.mode === 'cloud' && <p class="muted small" style="margin-top:1rem">{tr(lang, 'माहिती ऑनलाइन सुरक्षित आहे. तरीही अधूनमधून बॅकअप घेणे चांगले (सेटिंग्ज).', 'Your data is saved online. A backup now and then is still a good idea (Settings).')}</p>}
    </div>
  );
}
