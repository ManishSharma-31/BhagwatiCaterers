import './admin.css';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { StoreContext, LangContext, tr, useList } from './hooks';
import { useRoute, href, type Route } from './router';
import type { Store } from './store';
import type { Lang } from './types';
import { createStore, getAuthState } from './store-factory';
import { LockGate } from './screens/settings/LockGate';
import { SettingsScreen } from './screens/settings';
import { TodayScreen } from './screens/today';
import { LeadsScreen, LeadDetail } from './screens/leads';
import { QuotesScreen, QuoteEditor } from './screens/quotes';
import { PaymentsScreen } from './screens/payments';
import { EventsScreen, EventDetail } from './screens/events';
import { TasksScreen } from './screens/tasks';
import { SheetsScreen } from './screens/sheets';
import { StaffScreen } from './screens/staff';
import { SearchScreen } from './screens/search';
import { UndoBuffer, withUndo } from './undo';
import { Toast, type ToastData } from './ui';
import { setUnlocked } from './pin';

const tabs = [
  { name: 'today', icon: '🏠', mr: 'आज', en: 'Today' },
  { name: 'leads', icon: '📋', mr: 'चौकशी', en: 'Leads' },
  { name: 'events', icon: '🗓️', mr: 'कार्यक्रम', en: 'Events' },
  { name: 'quotes', icon: '🧾', mr: 'कोटेशन', en: 'Quotes' },
  { name: 'payments', icon: '₹', mr: 'पैसे', en: 'Money' },
  { name: 'more', icon: '☰', mr: 'अधिक', en: 'More' },
] as const;

const moreItems = [
  { path: '/search', icon: '🔍', mr: 'शोधा (नाव, फोन, कार्यक्रम)', en: 'Search everything' },
  { path: '/tasks', icon: '✅', mr: 'कामांची यादी', en: 'Tasks' },
  { path: '/staff', icon: '👥', mr: 'कर्मचारी', en: 'Staff' },
  { path: '/settings', icon: '⚙️', mr: 'सेटिंग्ज, बॅकअप', en: 'Settings and backup' },
];

function MorePage({ lang }: { lang: Lang }) {
  const settings = useList('settings');
  const hasPin = !!settings?.[0]?.pinHash;
  return (
    <div class="page">
      <h1>{tr(lang, 'अधिक', 'More')}</h1>
      <div class="list">
        {moreItems.map((m) => (
          <a class="list-item" href={href(m.path)}><span class="li-icon">{m.icon}</span><span class="li-main">{tr(lang, m.mr, m.en)}</span></a>
        ))}
      </div>
      {hasPin && (
        <p style="margin-top:1rem"><button type="button" class="btn btn-ghost" onClick={() => { setUnlocked(false); location.reload(); }}>🔒 {tr(lang, 'आता लॉक करा', 'Lock now')}</button></p>
      )}
    </div>
  );
}

function Screens({ route, lang }: { route: Route; lang: Lang }) {
  const id = route.parts[0];
  switch (route.name) {
    case '':
    case 'today': return <TodayScreen lang={lang} route={route} />;
    case 'search': return <SearchScreen lang={lang} route={route} />;
    case 'leads': return id ? <LeadDetail lang={lang} route={route} /> : <LeadsScreen lang={lang} route={route} />;
    case 'quotes': return id ? <QuoteEditor lang={lang} route={route} /> : <QuotesScreen lang={lang} route={route} />;
    case 'payments': return <PaymentsScreen lang={lang} route={route} />;
    case 'events': return id ? <EventDetail lang={lang} route={route} /> : <EventsScreen lang={lang} route={route} />;
    case 'sheets': return <SheetsScreen lang={lang} route={route} />;
    case 'tasks': return <TasksScreen lang={lang} route={route} />;
    case 'staff': return <StaffScreen lang={lang} route={route} />;
    case 'settings': return <SettingsScreen lang={lang} route={route} />;
    case 'more': return <MorePage lang={lang} />;
    default: return <div class="page"><h1>404</h1><a class="btn" href={href('/')}>{tr(lang, 'मुख्य पृष्ठ', 'Home')}</a></div>;
  }
}

function Shell({ rawStore }: { rawStore: Store }) {
  const route = useRoute();
  const { buf, store } = useMemo(() => { const b = new UndoBuffer(); return { buf: b, store: withUndo(rawStore, b) }; }, [rawStore]);
  const [undoGroup, setUndoGroup] = useState(buf.current());
  useEffect(() => buf.subscribe(() => setUndoGroup(buf.current())), [buf]);
  const [, bump] = useState(0);
  useEffect(() => rawStore.subscribe(() => bump((n) => n + 1)), [rawStore]);
  const signedOut = ['cloud-locked', 'cloud-denied'].includes(getAuthState(rawStore));
  const [notice, setNotice] = useState<ToastData | null>(null);
  const [online, setOnline] = useState(typeof navigator === 'undefined' || navigator.onLine !== false);
  useEffect(() => {
    const on = () => setOnline(true), off = () => setOnline(false);
    addEventListener('online', on); addEventListener('offline', off);
    // A save that fails must never be silent. Message only; never log record contents.
    const rej = () => setNotice({ kind: 'error', text: (localStorage.getItem('bc:lang') || 'mr') === 'mr' ? 'काहीतरी चुकले. पुन्हा प्रयत्न करा. (आवश्यक असल्यास सेव्ह केले का ते तपासा.)' : 'Something went wrong. Please try again (check that your change was saved).' });
    addEventListener('unhandledrejection', rej);
    return () => { removeEventListener('online', on); removeEventListener('offline', off); removeEventListener('unhandledrejection', rej); };
  }, []);
  useEffect(() => { if (!notice) return; const t = setTimeout(() => setNotice(null), 7000); return () => clearTimeout(t); }, [notice]);
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem('bc:lang') as Lang) || 'mr');
  const setLang = (l: Lang) => { localStorage.setItem('bc:lang', l); setLangState(l); document.documentElement.lang = l; };
  useEffect(() => { document.documentElement.lang = lang; window.scrollTo(0, 0); }, [route.path]);
  const active = route.name === '' || route.name === 'today' ? 'today' : ['leads', 'events', 'quotes', 'payments', 'sheets'].includes(route.name) ? (route.name === 'sheets' ? 'events' : route.name) : 'more';

  return (
    <StoreContext.Provider value={store}>
      <LangContext.Provider value={lang}>
        <div class="app">
          <header class="topbar no-print">
            <a class="brand" href={href('/')}>{tr(lang, 'भगवती केटरर्स', 'Bhagwati Caterers')}</a>
            {!signedOut && <a class="btn btn-ghost btn-sm top-search" href={href('/search')} aria-label={tr(lang, 'शोधा', 'Search')}>🔍</a>}
            <span class="store-mode" title={store.mode === 'local' ? 'Data is saved on this device only' : 'Data is saved online'}>
              {store.mode === 'local' ? tr(lang, 'या फोनवर', 'This device') : tr(lang, 'ऑनलाइन', 'Online')}
            </span>
            <button class="btn btn-ghost btn-sm" type="button" onClick={() => setLang(lang === 'mr' ? 'en' : 'mr')}>{lang === 'mr' ? 'English' : 'मराठी'}</button>
          </header>
          {!online && (
            <div class="offline-bar no-print" role="status">
              {store.mode === 'local'
                ? tr(lang, 'इंटरनेट नाही. काळजी नाही: अॅप चालू आहे आणि माहिती या फोनवर सेव्ह होते.', 'No internet. That is fine: the app works and data is saved on this phone.')
                : tr(lang, 'इंटरनेट नाही. बदल फोनवर सेव्ह होतात आणि नेट आल्यावर आपोआप अपलोड होतील.', 'No internet. Changes are kept on this phone and upload when you are back online.')}
            </div>
          )}
          <main class="main">
            <LockGate store={store} lang={lang}>
              <Screens route={route} lang={lang} />
            </LockGate>
          </main>
          <Toast
            toast={undoGroup
              ? { text: undoGroup.items.length > 1 ? tr(lang, `${undoGroup.items.length} नोंदी काढल्या.`, `${undoGroup.items.length} items deleted.`) : tr(lang, 'नोंद काढली.', 'Item deleted.'), action: { label: tr(lang, 'परत आणा', 'Undo'), run: () => { void buf.undo(store); } } }
              : notice}
            onClose={() => (undoGroup ? buf.dismiss() : setNotice(null))}
          />
          {!signedOut && <nav class="tabs no-print" aria-label="Main">
            {tabs.map((t) => (
              <a href={href(t.name === 'today' ? '/' : '/' + t.name)} class={active === t.name ? 'tab on' : 'tab'} aria-current={active === t.name ? 'page' : undefined}>
                <span class="tab-icon" aria-hidden="true">{t.icon}</span>
                <span>{tr(lang, t.mr, t.en)}</span>
              </a>
            ))}
          </nav>}
        </div>
      </LangContext.Provider>
    </StoreContext.Provider>
  );
}

export default function AdminApp() {
  const [store, setStore] = useState<Store | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    // Ask the browser not to evict our data when the phone is low on space (local mode keeps everything in IndexedDB).
    try { void navigator.storage?.persist?.(); } catch { /* ignore */ }
    createStore().then(setStore).catch((e) => setError(String(e?.message || e)));
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/admin/sw.js', { scope: '/admin/' }).catch(() => {});
  }, []);
  if (error) return <div class="page"><h1>त्रुटी / Error</h1><p>{error}</p><p class="muted">पान पुन्हा उघडा. / Please reload the page.</p></div>;
  if (!store) return <div class="page"><p class="muted">लोड होत आहे… / Loading…</p></div>;
  return <Shell rawStore={store} />;
}
