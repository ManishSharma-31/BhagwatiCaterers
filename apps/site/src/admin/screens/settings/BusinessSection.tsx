import { useEffect, useState } from 'preact/hooks';
import { tr, useList, useStore } from '../../hooks';
import type { Lang, Settings } from '../../types';
import { defaultSettings } from '../../seed';

export function BusinessSection({ lang }: { lang: Lang }) {
  const store = useStore();
  const list = useList('settings');
  const cur: Settings | undefined = list?.[0];
  const [f, setF] = useState({ businessName: '', ownerName: '', phone: '', fssai: '', upiId: '', defaultTerms: '' });
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState('');
  useEffect(() => {
    if (!list) return;
    const s = cur ?? defaultSettings();
    setF({ businessName: s.businessName, ownerName: s.ownerName, phone: s.phone, fssai: s.fssai, upiId: s.upiId ?? '', defaultTerms: s.defaultTerms ?? '' });
  }, [list === null, cur?.updatedAt]);
  const set = (k: keyof typeof f) => (e: Event) => { setF({ ...f, [k]: (e.target as HTMLInputElement).value }); setSaved(false); };
  const save = async (e: Event) => {
    e.preventDefault(); setErr('');
    try { await store.put('settings', { ...(cur ?? defaultSettings()), ...f, upiId: f.upiId.trim() || undefined }); setSaved(true); }
    catch { setErr(tr(lang, 'सेव्ह झाले नाही. पुन्हा प्रयत्न करा.', 'Could not save. Please try again.')); }
  };
  const fld = (k: keyof typeof f, mr: string, en: string, type = 'text') => (
    <div class="field"><label for={'bs-' + k}>{tr(lang, mr, en)}</label><input id={'bs-' + k} type={type as 'text'} value={f[k]} onInput={set(k)} /></div>
  );
  return (
    <details class="card set-section" open>
      <summary>{tr(lang, 'व्यवसायाची माहिती', 'Business details')}</summary>
      <form onSubmit={save}>
        {fld('businessName', 'व्यवसायाचे नाव', 'Business name')}
        {fld('ownerName', 'मालकाचे नाव', 'Owner name')}
        {fld('phone', 'फोन', 'Phone', 'tel')}
        {fld('fssai', 'FSSAI क्रमांक', 'FSSAI number')}
        {fld('upiId', 'UPI आयडी', 'UPI id')}
        <div class="field"><label for="bs-terms">{tr(lang, 'कोटेशनवरील नेहमीच्या अटी', 'Default quote terms')}</label>
          <textarea id="bs-terms" value={f.defaultTerms} onInput={set('defaultTerms')} /></div>
        <p class="muted small">{tr(lang, 'भाषा: वरच्या पट्टीतील "English / मराठी" बटणाने बदला. निवड या फोनवर लक्षात राहते.', 'Language: change it with the "English / मराठी" button at the top. It is remembered on this phone.')}</p>
        {err && <p class="err">{err}</p>}
        <button class="btn" type="submit" disabled={!list}>{tr(lang, 'सेव्ह करा', 'Save')}</button>
        {saved && <span class="ok" style="margin-left:.75rem">{tr(lang, 'सेव्ह झाले', 'Saved')}</span>}
      </form>
    </details>
  );
}
