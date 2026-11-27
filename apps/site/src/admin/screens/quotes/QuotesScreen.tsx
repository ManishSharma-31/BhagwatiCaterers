import './quotes.css';
import { useState } from 'preact/hooks';
import { useList, tr } from '../../hooks';
import { href, type Route } from '../../router';
import { QUOTE_STATUSES, type Lang, type QuoteStatus } from '../../types';
import { fmtDate, fmtMoney, quoteTotal } from '../../util';
import { MoreButton, usePaged } from '../../ui';
import { matchesQuote, sortQuotes, type QuoteSort } from './logic';

export const QSTATUS: Record<QuoteStatus, { mr: string; en: string }> = {
  draft: { mr: 'मसुदा', en: 'Draft' }, sent: { mr: 'पाठवले', en: 'Sent' }, accepted: { mr: 'मान्य', en: 'Accepted' }, rejected: { mr: 'नामंजूर', en: 'Rejected' },
};

export function QuotesScreen({ lang }: { lang: Lang; route: Route }) {
  const quotes = useList('quotes');
  const [st, setSt] = useState<QuoteStatus | 'all'>('all');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<QuoteSort>('recent');
  const all = quotes ? sortQuotes(quotes.filter((x) => (st === 'all' || x.status === st) && matchesQuote(x, q)), sort) : [];
  const paged = usePaged(all, 60, st + q + sort);
  if (!quotes) return <div class="page"><p class="muted">{tr(lang, 'लोड होत आहे…', 'Loading…')}</p></div>;
  const shown = paged.shown;
  const cnt = (s: QuoteStatus) => quotes.filter((x) => x.status === s).length;
  return (
    <div class="page">
      <h1>{tr(lang, 'कोटेशन', 'Quotes')}</h1>
      <div class="field"><label for="quote-search">{tr(lang, 'नाव, फोन किंवा कार्यक्रम शोधा', 'Search name, phone or event')}</label>
        <input id="quote-search" type="search" inputMode="search" value={q} onInput={(e) => setQ((e.target as HTMLInputElement).value)} /></div>
      <div class="chips" role="group" aria-label={tr(lang, 'स्थिती', 'Status')}>
        <button type="button" class={st === 'all' ? 'chip on' : 'chip'} onClick={() => setSt('all')}>{tr(lang, 'सर्व', 'All')} <span class="lead-count">{quotes.length}</span></button>
        {QUOTE_STATUSES.map((s) => <button type="button" class={st === s ? 'chip on' : 'chip'} onClick={() => setSt(s)}>{tr(lang, QSTATUS[s].mr, QSTATUS[s].en)} <span class="lead-count">{cnt(s)}</span></button>)}
      </div>
      <div class="chips" role="group" aria-label={tr(lang, 'क्रम', 'Sort')}>
        {([['recent', 'अलीकडील आधी', 'Recent first'], ['eventdate', 'कार्यक्रम तारखेनुसार', 'By event date'], ['total', 'रक्कम जास्त आधी', 'Highest total']] as [QuoteSort, string, string][]).map(([k, mr, en]) => (
          <button type="button" class={sort === k ? 'chip on' : 'chip'} aria-pressed={sort === k} onClick={() => setSort(k)}>{tr(lang, mr, en)}</button>
        ))}
      </div>
      {shown.length === 0 ? <div class="empty">{tr(lang, quotes.length === 0 ? 'अजून कोटेशन नाही. चौकशी उघडून "कोटेशन बनवा" दाबा किंवा खाली "+ नवीन कोटेशन" दाबा.' : 'काहीही सापडले नाही. शोध किंवा फिल्टर बदलून पाहा.', quotes.length === 0 ? 'No quotes yet. Open a lead and tap "Create quote", or tap "+ New quote" below.' : 'Nothing found. Try changing the search or filter.')}</div> : (
        <div class="list">
          {shown.map((q) => (
            <a class="list-item" href={href('/quotes/' + q.id)}>
              <div class="li-main">
                <div class="li-title">{q.customerName || '—'}</div>
                <div class="li-sub">{q.eventTitle}{q.eventDate ? ' · ' + fmtDate(q.eventDate, lang) : ''}</div>
                <div class="money">{q.perPlate > 0 ? fmtMoney(quoteTotal(q)) : tr(lang, 'दर भरायचा आहे', 'Rate not entered')}</div>
              </div>
              <span class={'badge ' + q.status}>{tr(lang, QSTATUS[q.status].mr, QSTATUS[q.status].en)}</span>
            </a>
          ))}
        </div>
      )}
      <MoreButton lang={lang} paged={paged} />
      <a class="btn fab" href={href('/quotes/new')}>+ {tr(lang, 'नवीन कोटेशन', 'New quote')}</a>
    </div>
  );
}
