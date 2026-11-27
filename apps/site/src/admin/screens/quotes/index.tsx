// STUB: replace with the real screen. Props contract: see docs/phase2-design.md
import type { Route } from '../../router';
import type { Lang } from '../../types';
type P = { lang: Lang; route: Route };
export const QuotesScreen = ({ lang }: P) => <div class="page"><h1>QuotesScreen</h1><p class="muted">{lang === 'mr' ? 'लवकरच' : 'Coming soon'}</p></div>;
export const QuoteEditor = ({ lang }: P) => <div class="page"><h1>QuoteEditor</h1><p class="muted">{lang === 'mr' ? 'लवकरच' : 'Coming soon'}</p></div>;
