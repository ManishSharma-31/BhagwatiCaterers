import { useState } from 'preact/hooks';
import { tr, useList, useStore } from '../../hooks';
import type { Lang } from '../../types';
import { defaultSettings } from '../../seed';
import { hashPin, isValidPin, makeSalt, verifyPin, setUnlocked } from '../../pin';

export function PinSection({ lang }: { lang: Lang }) {
  const store = useStore();
  const list = useList('settings');
  const cur = list?.[0];
  const has = !!cur?.pinHash;
  const [oldPin, setOld] = useState('');
  const [pin, setPin] = useState('');
  const [pin2, setPin2] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);

  if (store.mode === 'cloud') {
    return (
      <details class="card set-section">
        <summary>{tr(lang, 'PIN लॉक', 'PIN lock')}</summary>
        <p class="muted">{tr(lang, 'ऑनलाइन (क्लाउड) मोडमध्ये लॉग इन हेच कुलूप आहे. PIN फक्त या फोनवरील मोडसाठी आहे.', 'In online (cloud) mode the login is the lock. The PIN is only for the this-phone-only mode.')}</p>
      </details>
    );
  }
  const reset = () => { setOld(''); setPin(''); setPin2(''); };
  const fail = (t: string) => setMsg({ ok: false, t });
  const base = () => cur ?? defaultSettings();

  const save = async (e: Event) => {
    e.preventDefault(); setMsg(null);
    if (has && !(await verifyPin(oldPin, cur!.pinSalt ?? '', cur!.pinHash!))) return fail(tr(lang, 'सध्याचा PIN चुकीचा आहे.', 'Current PIN is wrong.'));
    if (!isValidPin(pin)) return fail(tr(lang, 'PIN ४ ते ६ अंकांचा असावा.', 'PIN must be 4 to 6 digits.'));
    if (pin !== pin2) return fail(tr(lang, 'दोन्ही PIN सारखे नाहीत.', 'The two PINs do not match.'));
    const salt = makeSalt();
    setUnlocked(true); // you just proved you are the owner; do not lock out this session
    await store.put('settings', { ...base(), pinSalt: salt, pinHash: await hashPin(pin, salt) });
    reset(); setMsg({ ok: true, t: tr(lang, 'PIN सेव्ह झाला.', 'PIN saved.') });
  };
  const remove = async () => {
    setMsg(null);
    if (!(await verifyPin(oldPin, cur!.pinSalt ?? '', cur!.pinHash!))) return fail(tr(lang, 'सध्याचा PIN चुकीचा आहे.', 'Current PIN is wrong.'));
    await store.put('settings', { ...base(), pinHash: undefined, pinSalt: undefined });
    reset(); setMsg({ ok: true, t: tr(lang, 'PIN काढला.', 'PIN removed.') });
  };
  const num = (id: string, label: string, v: string, set: (s: string) => void) => (
    <div class="field"><label for={id}>{label}</label>
      <input id={id} type="password" inputmode="numeric" pattern="[0-9]*" maxLength={6} autocomplete="off" value={v} onInput={(e) => set((e.target as HTMLInputElement).value.replace(/\D/g, ''))} /></div>
  );
  return (
    <details class="card set-section">
      <summary>{tr(lang, 'PIN लॉक', 'PIN lock')} {has ? '✓' : ''}</summary>
      <p class="set-note">{tr(lang, 'PIN हा या फोनवरील साधा कुलूप आहे, मजबूत सुरक्षा नाही. कोणी फोनमधील माहिती तांत्रिक मार्गाने काढू शकतो. खरी सुरक्षा हवी असेल तर क्लाउड लॉगिन वापरा.', 'The PIN is a simple lock on this phone, not strong security. Someone with technical skill can still reach the data. For real protection use the cloud login.')}</p>
      <form onSubmit={save}>
        {has && num('pn-old', tr(lang, 'सध्याचा PIN', 'Current PIN'), oldPin, setOld)}
        {num('pn-new', has ? tr(lang, 'नवीन PIN (४ ते ६ अंक)', 'New PIN (4 to 6 digits)') : tr(lang, 'PIN (४ ते ६ अंक)', 'PIN (4 to 6 digits)'), pin, setPin)}
        {num('pn-new2', tr(lang, 'PIN पुन्हा टाका', 'Repeat PIN'), pin2, setPin2)}
        {msg && <p class={msg.ok ? 'ok' : 'err'} role="status">{msg.t}</p>}
        <div class="set-actions">
          <button class="btn" type="submit" disabled={!list}>{has ? tr(lang, 'PIN बदला', 'Change PIN') : tr(lang, 'PIN लावा', 'Set PIN')}</button>
          {has && <button class="btn btn-ghost" type="button" onClick={remove}>{tr(lang, 'PIN काढा (सध्याचा PIN वर टाका)', 'Remove PIN (type current PIN above)')}</button>}
        </div>
      </form>
    </details>
  );
}
