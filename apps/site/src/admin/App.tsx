import './admin.css';
import { useEffect, useState } from 'preact/hooks';
import { StoreContext, LangContext, tr } from './hooks';
import { useRoute, href, type Route } from './router';
import type { Store } from './store';
import type { Lang } from './types';
import { createStore } from './store-factory';
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

const tabs = [
  { name: 'leads', icon: '📋', mr: 'चौकशी', en: 'Leads' },
  { name: 'events', icon: '🗓️', mr: 'कार्यक्रम', en: 'Events' },
  { name: 'quotes', icon: '🧾', mr: 'कोटेशन', en: 'Quotes' },
  { name: 'payments', icon: '₹', mr: 'पैसे', en: 'Money' },
  { name: 'more', icon: '☰', mr: 'अधिक', en: 'More' },
] as const;

const moreItems = [
  { path: '/', icon: '🏠', mr: 'आजचे काम', en: 'Today' },
  { path: '/tasks', icon: '✅', mr: 'कामांची यादी', en: 'Tasks' },
  { path: '/staff', icon: '👥', mr: 'कर्मचारी', en: 'Staff' },
  { path: '/settings', icon: '⚙️', mr: 'सेटिंग्ज, बॅकअप', en: 'Settings and backup' },
];

function MorePage({ lang }: { lang: Lang }) {
  return (
    <div class="page">
      <h1>{tr(lang, 'अधिक', 'More')}</h1>
      <div class="list">
        {moreItems.map((m) => (
          <a class="list-item" href={href(m.path)}><span class="li-icon">{m.icon}</span><span class="li-main">{tr(lang, m.mr, m.en)}</span></a>
        ))}
      </div>
    </div>
  );
}

function Screens({ route, lang }: { route: Route; lang: Lang }) {
  const id = route.parts[0];
  switch (route.name) {
    case '': return <TodayScreen lang={lang} route={route} />;
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

function Shell({ store }: { store: Store }) {
  const route = useRoute();
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem('bc:lang') as Lang) || 'mr');
  const setLang = (l: Lang) => { localStorage.setItem('bc:lang', l); setLangState(l); document.documentElement.lang = l; };
  useEffect(() => { document.documentElement.lang = lang; window.scrollTo(0, 0); }, [route.path]);
  const active = route.name === '' ? 'more' : ['leads', 'events', 'quotes', 'payments', 'sheets'].includes(route.name) ? (route.name === 'sheets' ? 'events' : route.name) : 'more';

  return (
    <StoreContext.Provider value={store}>
      <LangContext.Provider value={lang}>
        <div class="app">
          <header class="topbar no-print">
            <a class="brand" href={href('/')}>{tr(lang, 'भगवती केटरर्स', 'Bhagwati Caterers')}</a>
            <span class="store-mode" title={store.mode === 'local' ? 'Data is saved on this device only' : 'Data is saved online'}>
              {store.mode === 'local' ? tr(lang, 'या फोनवर', 'This device') : tr(lang, 'ऑनलाइन', 'Online')}
            </span>
            <button class="btn btn-ghost btn-sm" type="button" onClick={() => setLang(lang === 'mr' ? 'en' : 'mr')}>{lang === 'mr' ? 'English' : 'मराठी'}</button>
          </header>
          <main class="main">
            <LockGate store={store} lang={lang}>
              <Screens route={route} lang={lang} />
            </LockGate>
          </main>
          <nav class="tabs no-print" aria-label="Main">
            {tabs.map((t) => (
              <a href={href('/' + t.name)} class={active === t.name ? 'tab on' : 'tab'} aria-current={active === t.name ? 'page' : undefined}>
                <span class="tab-icon" aria-hidden="true">{t.icon}</span>
                <span>{tr(lang, t.mr, t.en)}</span>
              </a>
            ))}
          </nav>
        </div>
      </LangContext.Provider>
    </StoreContext.Provider>
  );
}

export default function AdminApp() {
  const [store, setStore] = useState<Store | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    createStore().then(setStore).catch((e) => setError(String(e?.message || e)));
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/admin/sw.js', { scope: '/admin/' }).catch(() => {});
  }, []);
  if (error) return <div class="page"><h1>Error</h1><p>{error}</p></div>;
  if (!store) return <div class="page"><p class="muted">Loading…</p></div>;
  return <Shell store={store} />;
}
