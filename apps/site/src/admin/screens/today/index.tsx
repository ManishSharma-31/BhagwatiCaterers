import './today.css';
import { useEffect, useState } from 'preact/hooks';
import { useList, useStore, tr } from '../../hooks';
import { href, type Route } from '../../router';
import type { Backup, Lang } from '../../types';
import { fmtDate, fmtMoney, today } from '../../util';
import { backupFileName, backupLevel, daysSinceBackup, getLastBackupAt, hasUserData, markBackupNow } from '../../backup';
import { download } from '../../util';
import { greetingKey, summarize } from './logic';
import { townLabel } from '../events/labels';

type P = { lang: Lang; route: Route };

export function TodayScreen({ lang }: P) {
  const store = useStore();
  const leads = useList('leads'), events = useList('events'), quotes = useList('quotes'), payments = useList('payments'), settings = useList('settings');
  const [lastBackup, setLastBackup] = useState<string | null>(getLastBackupAt());
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  useEffect(() => { setLastBackup(getLastBackupAt()); }, []);

  const t = today();
  const owner = settings?.[0]?.ownerName;
  const g = greetingKey(new Date().getHours());
  const hello = tr(lang, g === 'morning' ? 'सुप्रभात' : g === 'afternoon' ? 'नमस्कार' : 'शुभ संध्या', g === 'morning' ? 'Good morning' : g === 'afternoon' ? 'Good afternoon' : 'Good evening');

  const ready = leads && events && quotes && payments;
  const s = ready ? summarize({ leads, events, quotes, payments }, t) : null;

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

      <div class="today-quick">
        <a class="btn" href={href('/leads/new')}><span class="q-ico" aria-hidden="true">➕</span>{tr(lang, 'नवी चौकशी', 'New lead')}</a>
        <a class="btn" href={href('/events/new')}><span class="q-ico" aria-hidden="true">🗓️</span>{tr(lang, 'नवा कार्यक्रम', 'New event')}</a>
        <a class="btn btn-green" href={href('/payments?new=1')}><span class="q-ico" aria-hidden="true">₹</span>{tr(lang, 'पैसे नोंदवा', 'Add payment')}</a>
      </div>

      {!s ? <p class="muted">{tr(lang, 'थोडा वेळ थांबा…', 'Loading…')}</p> : (
        <>
          <a class="card today-stat" href={href('/leads')}>
            <span class="n">{s.newLeads}</span>
            <span>{s.newLeads === 0 ? tr(lang, 'नवी चौकशी नाही', 'No new leads') : tr(lang, 'नवी चौकशी (अजून संपर्क केलेला नाही)', 'New leads (not contacted yet)')}</span>
          </a>

          <h2>{tr(lang, 'आज फोन करायचे', 'Follow-ups due')}</h2>
          {s.followUps.length === 0 ? <p class="muted">{tr(lang, 'आज किंवा मागील कोणताही फॉलो-अप बाकी नाही.', 'No follow-ups due today or overdue.')}</p> : (
            <div class="list">
              {s.followUps.map(({ lead, daysOverdue }) => (
                <a class="list-item" href={href('/leads/' + lead.id)}>
                  <span class="li-main">
                    <div class="li-title">{lead.name}</div>
                    <div class="li-sub">{lead.phone}{lead.eventDate ? ` · ${fmtDate(lead.eventDate, lang)}` : ''}</div>
                  </span>
                  <span class={daysOverdue > 0 ? 'today-late' : 'today-days'}>
                    {daysOverdue > 0 ? tr(lang, `${daysOverdue} दिवस उशीर`, `${daysOverdue} d late`) : tr(lang, 'आज', 'Today')}
                  </span>
                </a>
              ))}
            </div>
          )}

          <h2>{tr(lang, 'पुढील ७ दिवसांतील कार्यक्रम', 'Events in the next 7 days')}</h2>
          {s.upcoming.length === 0 ? <p class="muted">{tr(lang, 'पुढील ७ दिवसांत कार्यक्रम नाही.', 'No events in the next 7 days.')}</p> : (
            <div class="list">
              {s.upcoming.map(({ event, days: d }) => (
                <a class="list-item" href={href('/events/' + event.id)}>
                  <span class="li-main">
                    <div class="li-title">{event.title}</div>
                    <div class="li-sub">{fmtDate(event.date, lang)} · {tr(lang, `${event.guests} पाहुणे`, `${event.guests} guests`)}{event.town ? ` · ${townLabel(event.town, lang)}` : ''}</div>
                  </span>
                  <span class="today-days">{d === 0 ? tr(lang, 'आज', 'Today') : d === 1 ? tr(lang, 'उद्या', 'Tomorrow') : tr(lang, `${d} दिवस`, `${d} days`)}</span>
                </a>
              ))}
            </div>
          )}

          <h2>{tr(lang, 'येणे बाकी (पक्क्या कार्यक्रमांचे)', 'Balance to collect (confirmed events)')}</h2>
          {s.pending.length === 0 ? <p class="muted">{tr(lang, 'सध्या कोणतीही बाकी रक्कम दिसत नाही. (कोटेशन मंजूर झाले असेल तरच येथे दिसते.)', 'No balance to show. (Only events with an accepted quote appear here.)')}</p> : (
            <div class="list">
              {s.pending.map((p) => (
                <a class="list-item" href={href('/events/' + p.event.id)}>
                  <span class="li-main">
                    <div class="li-title">{p.event.title}</div>
                    <div class="li-sub">{fmtDate(p.event.date, lang)} · {tr(lang, 'एकूण', 'Total')} {fmtMoney(p.total)} · {tr(lang, 'मिळाले', 'Received')} {fmtMoney(p.received)}</div>
                  </span>
                  <span class="money" style="color:var(--a-red)">{fmtMoney(p.balance)}</span>
                </a>
              ))}
            </div>
          )}
        </>
      )}
      {store.mode === 'cloud' && <p class="muted small" style="margin-top:1rem">{tr(lang, 'माहिती ऑनलाइन सुरक्षित आहे. तरीही अधूनमधून बॅकअप घेणे चांगले (सेटिंग्ज).', 'Your data is saved online. A backup now and then is still a good idea (Settings).')}</p>}
    </div>
  );
}
