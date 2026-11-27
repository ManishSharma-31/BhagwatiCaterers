// Shows a PIN screen (local mode), or the login screen (cloud mode), before the app. Otherwise shows the app.
import './settings.css';
import type { ComponentChildren } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import type { Store } from '../../store';
import type { Lang } from '../../types';
import { tr } from '../../hooks';
import { getAuthState } from '../../store-factory';
import { isCloudStore } from '../../cloud-store';
import { PIN_MAX, isUnlocked, loadLock, registerFail, saveLock, setUnlocked, verifyPin, waitSeconds, freshLock } from '../../pin';

export function LockGate({ store, lang, children }: { store: Store; lang: Lang; children: ComponentChildren }) {
  const [, force] = useState(0);
  const [pinHash, setPinHash] = useState<{ hash?: string; salt?: string } | null>(null);

  useEffect(() => {
    let alive = true;
    const load = () => store.list('settings').then((l) => alive && setPinHash({ hash: l[0]?.pinHash, salt: l[0]?.pinSalt })).catch(() => alive && setPinHash({}));
    if (store.mode === 'local') load();
    const off = store.subscribe(() => { force((n) => n + 1); if (store.mode === 'local') load(); });
    return () => { alive = false; off(); };
  }, [store]);

  // Lock again when the app was in the background for 5 minutes or more (a deterrent on a shared phone).
  useEffect(() => {
    let hiddenAt = 0;
    const on = () => {
      if (document.visibilityState === 'hidden') hiddenAt = Date.now();
      else if (hiddenAt && Date.now() - hiddenAt > 5 * 60 * 1000 && isUnlocked()) { setUnlocked(false); force((n) => n + 1); }
    };
    document.addEventListener('visibilitychange', on);
    return () => document.removeEventListener('visibilitychange', on);
  }, []);

  const state = getAuthState(store);
  if (state === 'cloud-locked') return <Login store={store} lang={lang} />;
  if (state === 'cloud-denied') return <Denied store={store} lang={lang} />;
  if (state === 'local') {
    if (!pinHash) return <div class="page"><p class="muted">…</p></div>;
    if (pinHash.hash && !isUnlocked()) return <PinPad lang={lang} hash={pinHash.hash} salt={pinHash.salt ?? ''} onOk={() => { setUnlocked(true); force((n) => n + 1); }} />;
  }
  return <>{children}</>;
}

function PinPad({ lang, hash, salt, onOk }: { lang: Lang; hash: string; salt: string; onOk: () => void }) {
  const [pin, setPin] = useState('');
  const [msg, setMsg] = useState('');
  const [lock, setLock] = useState(loadLock());
  const [, tick] = useState(0);
  useEffect(() => { const t = setInterval(() => tick((n) => n + 1), 1000); return () => clearInterval(t); }, []);
  const wait = waitSeconds(lock, Date.now());

  const submit = async () => {
    if (wait > 0 || pin.length < 4) return;
    if (await verifyPin(pin, salt, hash)) { saveLock(freshLock()); onOk(); return; }
    const next = registerFail(lock, Date.now());
    saveLock(next); setLock(next); setPin('');
    setMsg(next.lockedUntil > Date.now() ? '' : tr(lang, 'PIN चुकीचा आहे. पुन्हा प्रयत्न करा.', 'Wrong PIN. Try again.'));
  };
  const press = (d: string) => { if (wait === 0 && pin.length < PIN_MAX) { setPin(pin + d); setMsg(''); } };
  // Keyboard support (desktop, or a phone with a keyboard).
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (/^\d$/.test(e.key)) press(e.key);
      else if (e.key === 'Backspace') setPin((p) => p.slice(0, -1));
      else if (e.key === 'Enter') void submit();
    };
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  });

  return (
    <div class="lock-wrap">
      <div class="lock-box card">
        <h1>{tr(lang, 'PIN टाका', 'Enter PIN')}</h1>
        <div class="lock-dots" aria-label={tr(lang, `${pin.length} अंक टाकले`, `${pin.length} digits entered`)}>
          {Array.from({ length: Math.max(4, pin.length) }).map((_, i) => <span class={i < pin.length ? 'lock-dot on' : 'lock-dot'} />)}
        </div>
        {wait > 0 && <p class="err" role="alert">{tr(lang, `खूप चुकीचे प्रयत्न. ${wait} सेकंद थांबा.`, `Too many wrong tries. Wait ${wait} seconds.`)}</p>}
        {msg && <p class="err" role="alert">{msg}</p>}
        <div class="lock-pad">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => <button type="button" class="lock-key" onClick={() => press(d)}>{d}</button>)}
          <button type="button" class="lock-key" aria-label={tr(lang, 'मागे', 'Delete')} onClick={() => setPin(pin.slice(0, -1))}>⌫</button>
          <button type="button" class="lock-key" onClick={() => press('0')}>0</button>
          <button type="button" class="lock-key" aria-label="OK" disabled={pin.length < 4 || wait > 0} onClick={submit}>✓</button>
        </div>
        <p class="muted small">{tr(lang, 'PIN हा या फोनवरील साधा कुलूप आहे, मजबूत सुरक्षा नाही.', 'The PIN is a simple lock on this phone, not strong security.')}</p>
        <details class="small"><summary>{tr(lang, 'PIN विसरलात?', 'Forgot the PIN?')}</summary>
          <p class="muted">{tr(lang, 'PIN परत मिळवता येत नाही. बॅकअप फाइल असेल तर: फोनच्या ब्राउझर सेटिंग्जमध्ये या साइटचा डेटा पुसा, अॅप पुन्हा उघडा आणि सेटिंग्जमधून बॅकअप परत आणा. बॅकअप नसेल तर माहिती परत मिळणार नाही, म्हणून नियमित बॅकअप घ्या.', 'The PIN cannot be recovered. If you have a backup file: clear this site\'s data in the browser settings, open the app again and restore the backup from Settings. Without a backup the data cannot be recovered, so back up regularly.')}</p></details>
      </div>
    </div>
  );
}

const loginError = (lang: Lang, code: string) => ({
  'bad-credentials': tr(lang, 'ईमेल किंवा पासवर्ड चुकीचा आहे.', 'Wrong email or password.'),
  network: tr(lang, 'इंटरनेट नाही किंवा सर्व्हर मिळाला नाही. नंतर प्रयत्न करा.', 'No internet, or the server could not be reached. Try later.'),
  'rate-limit': tr(lang, 'खूप प्रयत्न झाले. थोड्या वेळाने पुन्हा करा.', 'Too many tries. Please wait a little.'),
  'not-allowed': tr(lang, 'हे खाते अजून परवानगी यादीत नाही. सेटअप मार्गदर्शकातील "allowed_users" पायरी करा.', 'This account is not on the allowed list yet. Do the "allowed_users" step in the setup guide.'),
} as Record<string, string>)[code] ?? tr(lang, 'काहीतरी चुकले. पुन्हा प्रयत्न करा.', 'Something went wrong. Please try again.');

function Login({ store, lang }: { store: Store; lang: Lang }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  if (!isCloudStore(store)) return null;
  const submit = async (e: Event) => {
    e.preventDefault(); setBusy(true); setErr('');
    const r = await store.signIn(email, pw);
    setBusy(false);
    if (!r.ok) setErr(loginError(lang, r.code)); else setPw('');
  };
  return (
    <div class="lock-wrap">
      <form class="lock-box card" onSubmit={submit}>
        <h1>{tr(lang, 'लॉग इन', 'Log in')}</h1>
        <div class="field"><label for="lg-email">{tr(lang, 'ईमेल', 'Email')}</label>
          <input id="lg-email" type="email" autocomplete="username" required value={email} onInput={(e) => setEmail((e.target as HTMLInputElement).value)} /></div>
        <div class="field"><label for="lg-pw">{tr(lang, 'पासवर्ड', 'Password')}</label>
          <input id="lg-pw" type="password" autocomplete="current-password" required value={pw} onInput={(e) => setPw((e.target as HTMLInputElement).value)} /></div>
        {err && <p class="err" role="alert">{err}</p>}
        <button class="btn" type="submit" disabled={busy} style="width:100%">{busy ? '…' : tr(lang, 'लॉग इन', 'Log in')}</button>
      </form>
    </div>
  );
}

function Denied({ store, lang }: { store: Store; lang: Lang }) {
  if (!isCloudStore(store)) return null;
  return (
    <div class="lock-wrap">
      <div class="lock-box card">
        <h1>{tr(lang, 'परवानगी नाही', 'Not allowed yet')}</h1>
        <p>{loginError(lang, 'not-allowed')}</p>
        <button class="btn btn-ghost" type="button" onClick={() => void store.signOut(true)}>{tr(lang, 'बाहेर पडा', 'Sign out')}</button>
      </div>
    </div>
  );
}
