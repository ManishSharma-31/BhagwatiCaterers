import './settings.css';
import type { Route } from '../../router';
import type { Lang } from '../../types';
import { tr } from '../../hooks';
import { BusinessSection } from './BusinessSection';
import { PinSection } from './PinSection';
import { CloudSection } from './CloudSection';
import { BackupSection } from './BackupSection';

export function SettingsScreen({ lang }: { lang: Lang; route: Route }) {
  return (
    <div class="page">
      <h1>{tr(lang, 'सेटिंग्ज', 'Settings')}</h1>
      <BusinessSection lang={lang} />
      <BackupSection lang={lang} />
      <CloudSection lang={lang} />
      <PinSection lang={lang} />
    </div>
  );
}
