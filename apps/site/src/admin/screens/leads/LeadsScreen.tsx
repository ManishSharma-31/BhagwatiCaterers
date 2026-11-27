import './leads.css';
import { useState } from 'preact/hooks';
import { useList, tr } from '../../hooks';
import { href, type Route } from '../../router';
import { LEAD_STATUSES, type Lang, type LeadStatus } from '../../types';
import { fmtDate, orderTypeLabel, today } from '../../util';
import { countByStatus, filterLeads, followUpDue, sortLeads, townLabel } from './logic';

export const EVENT_LABEL: Record<string, { mr: string; en: string }> = {
  wedding: { mr: 'लग्न', en: 'Wedding' }, engagement: { mr: 'साखरपुडा', en: 'Engagement' }, haldi: { mr: 'हळद', en: 'Haldi' },
  housewarming: { mr: 'वास्तुशांती', en: 'Housewarming' }, puja: { mr: 'पूजा', en: 'Puja' }, birthday: { mr: 'वाढदिवस', en: 'Birthday' },
  office: { mr: 'ऑफिस कार्यक्रम', en: 'Office event' }, 'home-food': { mr: 'घरचे जेवण', en: 'Home food' }, other: { mr: 'इतर', en: 'Other' },
};
export const STATUS_LABEL: Record<LeadStatus, { mr: string; en: string }> = {
  new: { mr: 'नवीन', en: 'New' }, contacted: { mr: 'संपर्क झाला', en: 'Contacted' }, quoted: { mr: 'कोटेशन दिले', en: 'Quoted' },
  confirmed: { mr: 'पक्के', en: 'Confirmed' }, completed: { mr: 'पूर्ण', en: 'Completed' }, lost: { mr: 'गमावले', en: 'Lost' },
};
export { orderTypeLabel };

export function LeadsScreen({ lang }: { lang: Lang; route: Route }) {
  const leads = useList('leads');
  const [status, setStatus] = useState<LeadStatus | 'all'>('all');
  const [q, setQ] = useState('');
  if (!leads) return <div class="page"><p class="muted">{tr(lang, 'लोड होत आहे…', 'Loading…')}</p></div>;
  const counts = countByStatus(leads);
  const shown = sortLeads(filterLeads(leads, status, q));
  const t = today();
  return (
    <div class="page">
      <h1>{tr(lang, 'चौकशी (लीड्स)', 'Leads')}</h1>
      <div class="field">
        <label for="lead-search">{tr(lang, 'नाव किंवा फोन शोधा', 'Search by name or phone')}</label>
        <input id="lead-search" type="search" inputMode="search" value={q} onInput={(e) => setQ((e.target as HTMLInputElement).value)} />
      </div>
      <div class="chips" role="group" aria-label={tr(lang, 'स्थिती', 'Status')}>
        <button type="button" class={status === 'all' ? 'chip on' : 'chip'} onClick={() => setStatus('all')}>{tr(lang, 'सर्व', 'All')} <span class="lead-count">{leads.length}</span></button>
        {LEAD_STATUSES.map((s) => (
          <button type="button" class={status === s ? 'chip on' : 'chip'} onClick={() => setStatus(s)}>{tr(lang, STATUS_LABEL[s].mr, STATUS_LABEL[s].en)} <span class="lead-count">{counts[s]}</span></button>
        ))}
      </div>
      {shown.length === 0 ? (
        <div class="empty">{leads.length === 0 ? tr(lang, 'अजून एकही चौकशी नाही. खाली "+ नवीन चौकशी" दाबा.', 'No leads yet. Tap "+ New lead" below.') : tr(lang, 'काहीही सापडले नाही.', 'Nothing found.')}</div>
      ) : (
        <div class="list">
          {shown.map((l) => (
            <a class="list-item" href={href('/leads/' + l.id)}>
              <div class="li-main">
                <div class="li-title">{l.name}</div>
                <div class="li-sub">
                  {tr(lang, EVENT_LABEL[l.eventType].mr, EVENT_LABEL[l.eventType].en)}
                  {l.eventDate ? ' · ' + fmtDate(l.eventDate, lang) : ''}
                  {l.guests ? ' · ' + l.guests + tr(lang, ' पाहुणे', ' guests') : ''}
                  {l.town ? ' · ' + townLabel(l.town, lang) : ''}
                </div>
                {followUpDue(l, t) && <div class="lead-flag">⏰ {tr(lang, 'फॉलो-अप करायचा आहे', 'Follow-up due')} {fmtDate(l.nextFollowUp, lang)}</div>}
                {!followUpDue(l, t) && l.nextFollowUp && <div class="li-sub">⏰ {fmtDate(l.nextFollowUp, lang)}</div>}
              </div>
              <span class={'badge ' + l.status}>{tr(lang, STATUS_LABEL[l.status].mr, STATUS_LABEL[l.status].en)}</span>
            </a>
          ))}
        </div>
      )}
      <a class="btn fab" href={href('/leads/new')}>+ {tr(lang, 'नवीन चौकशी', 'New lead')}</a>
    </div>
  );
}
