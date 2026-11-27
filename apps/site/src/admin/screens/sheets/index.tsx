// STUB: replace with the real screen. Props contract: see docs/phase2-design.md
import type { Route } from '../../router';
import type { Lang } from '../../types';
type P = { lang: Lang; route: Route };
export const SheetsScreen = ({ lang }: P) => <div class="page"><h1>SheetsScreen</h1><p class="muted">{lang === 'mr' ? 'लवकरच' : 'Coming soon'}</p></div>;
