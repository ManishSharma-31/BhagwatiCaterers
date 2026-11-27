import './leads.css';
import { useState } from 'preact/hooks';
import { useList, tr } from '../../hooks';
import { href, type Route } from '../../router';
import { LEAD_STATUSES, type Lang, type LeadStatus } from '../../types';
import { fmtDate, orderTypeLabel, today, telUrl, waUrl } from '../../util';
import { MoreButton, usePaged } from '../../ui';
import { countByStatus, filterLeads, followUpDue, sortLeads, townLabel, type LeadSort } from './logic';

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
  const [sort, setSort] = useState<LeadSort>('followup');
  const [dueOnly, setDueOnly] = useState(false);
  const t = today();
  const shownAll = leads ? sortLeads(filterLeads(leads, status, q, dueOnly, t), sort) : [];
  const paged = usePaged(shownAll, 60, status + q + sort + dueOnly);
  if (!leads) return <div class="page"><p class="muted">{tr(lang, 'लोड होत आहे…', 'Loading…')}</p></div>;
  const counts = countByStatus(leads);
  const shown = paged.shown;
  const dueCount = leads.filter((l) => followUpDue(l, t)).length;
  return (
    <div class="page">
      <h1>{tr(lang, 'चौकशी', 'Leads')}</h1>
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
      <div class="chips" role="group" aria-label={tr(lang, 'क्रम', 'Sort')}>
        <button type="button" class={dueOnly ? 'chip on' : 'chip'} aria-pressed={dueOnly} onClick={() => setDueOnly(!dueOnly)}>⏰ {tr(lang, 'फॉलो-अप बाकी', 'Follow-up due')} <span class="lead-count">{dueCount}</span></button>
        {([['followup', 'फॉलो-अप क्रमाने', 'By follow-up'], ['newest', 'नवीन आधी', 'Newest first'], ['eventdate', 'कार्यक्रम तारखेनुसार', 'By event date']] as [LeadSort, string, string][]).map(([k, mr, en]) => (
          <button type="button" class={sort === k ? 'chip on' : 'chip'} aria-pressed={sort === k} onClick={() => setSort(k)}>{tr(lang, mr, en)}</button>
        ))}
      </div>
      {shown.length === 0 ? (
        <div class="empty">{leads.length === 0 ? tr(lang, 'अजून एकही चौकशी नाही. फोन किंवा WhatsApp वर आलेली पहिली चौकशी खाली "+ नवीन चौकशी" दाबून नोंदवा.', 'No leads yet. Tap "+ New lead" below.') : tr(lang, 'काहीही सापडले नाही. शोध किंवा फिल्टर बदलून पाहा.', 'Nothing found. Try changing the search or filter.')}</div>
      ) : (
        <div class="list list-cols">
          {shown.map((l) => (
            <div class="item-wrap">
            <a class="list-item" href={href('/leads/' + l.id)}>
              <div class="li-main">
                <div class="li-title">{l.name}</div>
                <div class="li-sub">{l.phone} · 
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
            {l.phone && (
              <div class="item-actions no-print">
                <a class="btn btn-sm btn-ghost" href={telUrl(l.phone)} aria-label={tr(lang, 'फोन करा', 'Call') + ' ' + l.name}>📞 {tr(lang, 'फोन', 'Call')}</a>
                <a class="btn btn-sm btn-green" href={waUrl(l.phone, tr(lang, `नमस्कार ${l.name}, भगवती केटरर्स कडून बोलतोय.`, `Hello ${l.name}, this is Bhagwati Caterers.`))} target="_blank" rel="noopener" aria-label={'WhatsApp ' + l.name}>💬 WhatsApp</a>
              </div>
            )}
            </div>
          ))}
        </div>
      )}
      <MoreButton lang={lang} paged={paged} />
      <a class="btn fab" href={href('/leads/new')}>+ {tr(lang, 'नवीन चौकशी', 'New lead')}</a>
    </div>
  );
}
