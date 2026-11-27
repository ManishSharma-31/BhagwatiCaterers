import { useEffect, useState } from 'preact/hooks';
import { tr, useList, useStore } from '../../hooks';
import type { Lang, Settings } from '../../types';
import { defaultSettings } from '../../seed';
import { isValidPhone } from '../../util';

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
    if (!f.businessName.trim()) return setErr(tr(lang, 'व्यवसायाचे नाव लिहा.', 'Please enter the business name.'));
    if (f.phone.trim() && !isValidPhone(f.phone)) return setErr(tr(lang, 'फोन १० अंकी मोबाईल नंबर हवा (किंवा रिकामा ठेवा).', 'Phone must be a 10-digit mobile number (or leave it empty).'));
    if (f.fssai.trim() && !/^\d{14}$/.test(f.fssai.replace(/\s/g, ''))) return setErr(tr(lang, 'FSSAI क्रमांक १४ अंकी असतो. तपासा किंवा रिकामा ठेवा.', 'An FSSAI number has 14 digits. Please check it, or leave it empty.'));
    if (f.upiId.trim() && !/^[\w.\-]{2,}@[A-Za-z][\w.\-]{1,}$/.test(f.upiId.trim())) return setErr(tr(lang, 'UPI आयडी असा हवा: नाव@बँक (उदा. name@upi).', 'UPI id should look like name@bank (e.g. name@upi).'));
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
        {fld('upiId', 'UPI आयडी (ऐच्छिक)', 'UPI id (optional)')}
        <p class="muted small" style="margin-top:-.4rem">{tr(lang, 'हा आयडी कोटेशन व आठवण संदेशात "UPI वर पाठवण्यासाठी" म्हणून जोडला जातो.', 'This id is added to quote and reminder messages as "Pay by UPI".')}</p>
        <div class="field"><label for="bs-terms">{tr(lang, 'कोटेशनवरील नेहमीच्या अटी', 'Default quote terms')}</label>
          <textarea id="bs-terms" value={f.defaultTerms} onInput={set('defaultTerms')} />
          <span class="muted small">{tr(lang, 'नवीन कोटेशनमध्ये आपोआप येतात; प्रत्येक कोटेशनमध्ये बदलता येतात. WhatsApp संदेशातही जातात.', 'Copied into each new quote (editable there) and included in the WhatsApp message.')}</span></div>
        <p class="muted small">{tr(lang, 'भाषा: वरच्या पट्टीतील "English / मराठी" बटणाने बदला. निवड या फोनवर लक्षात राहते.', 'Language: change it with the "English / मराठी" button at the top. It is remembered on this phone.')}</p>
        {err && <p class="err">{err}</p>}
        <button class="btn" type="submit" disabled={!list}>{tr(lang, 'सेव्ह करा', 'Save')}</button>
        {saved && <span class="ok" style="margin-left:.75rem">{tr(lang, 'सेव्ह झाले', 'Saved')}</span>}
      </form>
    </details>
  );
}
