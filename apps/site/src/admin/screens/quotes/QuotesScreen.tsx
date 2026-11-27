import './quotes.css';
import { useState } from 'preact/hooks';
import { useList, tr } from '../../hooks';
import { href, type Route } from '../../router';
import { QUOTE_STATUSES, type Lang, type QuoteStatus } from '../../types';
import { fmtDate, fmtMoney, quoteTotal } from '../../util';

export const QSTATUS: Record<QuoteStatus, { mr: string; en: string }> = {
  draft: { mr: 'मसुदा', en: 'Draft' }, sent: { mr: 'पाठवले', en: 'Sent' }, accepted: { mr: 'मान्य', en: 'Accepted' }, rejected: { mr: 'नामंजूर', en: 'Rejected' },
};

export function QuotesScreen({ lang }: { lang: Lang; route: Route }) {
  const quotes = useList('quotes');
  const [st, setSt] = useState<QuoteStatus | 'all'>('all');
  if (!quotes) return <div class="page"><p class="muted">{tr(lang, 'लोड होत आहे…', 'Loading…')}</p></div>;
  const shown = quotes.filter((q) => st === 'all' || q.status === st).sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  return (
    <div class="page">
      <h1>{tr(lang, 'कोटेशन', 'Quotes')}</h1>
      <div class="chips">
        <button type="button" class={st === 'all' ? 'chip on' : 'chip'} onClick={() => setSt('all')}>{tr(lang, 'सर्व', 'All')}</button>
        {QUOTE_STATUSES.map((s) => <button type="button" class={st === s ? 'chip on' : 'chip'} onClick={() => setSt(s)}>{tr(lang, QSTATUS[s].mr, QSTATUS[s].en)}</button>)}
      </div>
      {shown.length === 0 ? <div class="empty">{tr(lang, 'कोटेशन नाही. चौकशीतून "कोटेशन बनवा" दाबा किंवा खाली + दाबा.', 'No quotes. Use "Create quote" on a lead, or tap + below.')}</div> : (
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
      <a class="btn fab" href={href('/quotes/new')}>+ {tr(lang, 'नवीन कोटेशन', 'New quote')}</a>
    </div>
  );
}
