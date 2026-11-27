import { useEffect, useState } from 'preact/hooks';
import { tr, useList, useStore } from '../../hooks';
import type { Lang } from '../../types';
import { LocalStore } from '../../local-store';
import { seedMenu } from '../../seed';
import { checkProject, isCloudStore, type CloudStatus } from '../../cloud-store';
import { clearCloudConfig, loadCloudConfig, saveCloudConfig, validateAnonKey, validateCloudUrl } from '../../cloud-config';
import { DEFAULT_CLOUD_KEY, DEFAULT_CLOUD_URL } from '../../cloud-defaults';
import { countBackup } from '../../backup';

export function CloudSection({ lang }: { lang: Lang }) {
  const store = useStore();
  return (
    <details class="card set-section" open={store.mode === 'cloud'}>
      <summary>{tr(lang, 'क्लाउड (ऑनलाइन साठवण)', 'Cloud (online storage)')}</summary>
      {isCloudStore(store) ? <Connected lang={lang} /> : <Connect lang={lang} />}
    </details>
  );
}

function Connect({ lang }: { lang: Lang }) {
  const saved = loadCloudConfig();
  const [url, setUrl] = useState(saved?.url ?? DEFAULT_CLOUD_URL);
  const [key, setKey] = useState(saved?.anonKey ?? DEFAULT_CLOUD_KEY);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const connect = async (e: Event) => {
    e.preventDefault(); setErr('');
    const u = validateCloudUrl(url);
    if (!u.ok) return setErr(u.reason === 'not-https' ? tr(lang, 'पत्ता https ने सुरू झाला पाहिजे.', 'The address must start with https.') : tr(lang, 'प्रोजेक्ट URL बरोबर नाही. तो असा दिसतो: https://xxxx.supabase.co', 'The project URL is not valid. It looks like https://xxxx.supabase.co'));
    const k = validateAnonKey(key);
    if (!k.ok) return setErr(k.reason === 'secret' ? tr(lang, 'ही गुप्त (secret) चावी आहे. ती कधीही येथे टाकू नका. "anon" किंवा "publishable" चावी वापरा.', 'This is a SECRET key. Never paste it here. Use the "anon" or "publishable" key.') : tr(lang, 'चावी बरोबर दिसत नाही. पूर्ण कॉपी करा.', 'The key does not look right. Copy all of it.'));
    if (u.custom && !confirm(tr(lang, 'हा पत्ता .supabase.co नाही. तुम्हाला हा पत्ता खात्रीने माहीत आहे का?', 'This address does not end with .supabase.co. Are you sure you trust it?'))) return;
    setBusy(true);
    const p = await checkProject({ url: u.url, anonKey: key.trim() });
    setBusy(false);
    if (!p.reachable && !confirm(tr(lang, 'सर्व्हर मिळाला नाही (इंटरनेट किंवा चुकीचा पत्ता). तरीही जोडायचे?', 'Could not reach the server (no internet or wrong address). Connect anyway?'))) return;
    saveCloudConfig({ url: u.url, anonKey: key.trim() });
    location.reload();
  };
  return (
    <form onSubmit={connect}>
      <p>{tr(lang, 'सध्या माहिती फक्त या फोनवर आहे. क्लाउड जोडल्यावर सर्व फोनवर तीच माहिती दिसते. आधी docs/supabase-setup.md मधील पायऱ्या करा.', 'Right now your data is only on this phone. With the cloud, every phone shows the same data. Do the steps in docs/supabase-setup.md first.')}</p>
      <div class="field"><label for="cl-url">Project URL</label><input id="cl-url" type="url" inputmode="url" autocomplete="off" value={url} onInput={(e) => setUrl((e.target as HTMLInputElement).value)} /></div>
      <div class="field"><label for="cl-key">{tr(lang, 'सार्वजनिक चावी (anon / publishable key)', 'Public key (anon / publishable key)')}</label><input id="cl-key" autocomplete="off" value={key} onInput={(e) => setKey((e.target as HTMLInputElement).value)} /></div>
      <p class="set-note">{tr(lang, 'फक्त "anon" किंवा "publishable" चावी टाका. "service_role" / "secret" चावी आणि database पासवर्ड कधीही टाकू नका.', 'Paste only the "anon" or "publishable" key. Never paste the "service_role" / "secret" key or the database password.')}</p>
      {err && <p class="err" role="alert">{err}</p>}
      <button class="btn" type="submit" disabled={busy}>{busy ? '…' : tr(lang, 'क्लाउड जोडा', 'Connect cloud')}</button>
      <p class="muted small">{tr(lang, 'जोडल्यावर लॉग इन करावे लागेल. या फोनवरील जुनी माहिती तशीच राहते; लॉग इन नंतर ती क्लाउडमध्ये हलवता येते.', 'After connecting you log in. Data on this phone stays; after login you can move it to the cloud.')}</p>
    </form>
  );
}

function Connected({ lang }: { lang: Lang }) {
  const store = useStore();
  if (!isCloudStore(store)) return null;
  const menu = useList('menu');
  const [st, setSt] = useState<CloudStatus>(store.status());
  const [signupsOpen, setSignupsOpen] = useState<boolean | undefined>();
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const off = store.subscribe(() => setSt(store.status()));
    const cfg = loadCloudConfig();
    if (cfg) void checkProject(cfg).then((p) => setSignupsOpen(p.signupsOpen));
    return off;
  }, [store]);

  const run = async (fn: () => Promise<void>) => { setBusy(true); setMsg(''); try { await fn(); } catch { setMsg(tr(lang, 'काम झाले नाही. इंटरनेट तपासून पुन्हा प्रयत्न करा.', 'That did not work. Check the internet and try again.')); } setBusy(false); setSt(store.status()); };

  const move = () => run(async () => {
    const local = await new LocalStore().exportAll();
    const c = countBackup(local);
    const n = c.leads + c.quotes + c.events + c.payments + c.tasks + c.staff + c.menu;
    if (n === 0) { setMsg(tr(lang, 'या फोनवर हलवण्यासाठी माहिती नाही.', 'There is no data on this phone to move.')); return; }
    const txt = tr(lang,
      `या फोनवरील माहिती क्लाउडमध्ये मिसळायची?\nचौकशी ${c.leads}, कोटेशन ${c.quotes}, कार्यक्रम ${c.events}, पैसे ${c.payments}, कामे ${c.tasks}, कर्मचारी ${c.staff}, मेनू ${c.menu}.\nक्लाउडमधील माहिती पुसली जाणार नाही. नवीन तारीख असलेली प्रत टिकते.`,
      `Merge this phone's data into the cloud?\nLeads ${c.leads}, quotes ${c.quotes}, events ${c.events}, payments ${c.payments}, tasks ${c.tasks}, staff ${c.staff}, menu ${c.menu}.\nNothing in the cloud is erased. The newer copy of each record is kept.`);
    if (!confirm(txt)) return;
    await store.importAll(local, 'merge');
    setMsg(tr(lang, 'माहिती क्लाउडमध्ये हलवली. या फोनवरील मूळ प्रत तशीच आहे.', 'Data moved to the cloud. The original copy on this phone is still there.'));
  });
  const starter = () => run(async () => { for (const m of seedMenu()) await store.put('menu', m); });
  const signOut = () => run(async () => {
    const r = await store.signOut(false);
    if (!r.ok) {
      if (confirm(tr(lang, `${r.pending} बदल अजून अपलोड झालेले नाहीत. आता बाहेर पडल्यास ते जातील. तरीही बाहेर पडायचे?`, `${r.pending} changes have not uploaded yet. If you sign out now they are lost. Sign out anyway?`))) await store.signOut(true);
    }
  });
  const disconnect = () => run(async () => {
    if (!confirm(tr(lang, 'क्लाउड जोडणी काढायची? ही माहिती या फोनवरून पुसली जाईल आणि अॅप फक्त या फोनवरचे राहील. क्लाउडमधील माहिती सुरक्षित राहते.', 'Disconnect the cloud? The cloud copy on this phone is erased and the app goes back to this-phone-only. Data in the cloud stays safe.'))) return;
    await store.signOut(true); clearCloudConfig(); location.reload();
  });
  const when = st.lastSyncAt ? new Date(st.lastSyncAt).toLocaleString(lang === 'mr' ? 'mr-IN' : 'en-IN') : tr(lang, 'अजून नाही', 'not yet');
  return (
    <div>
      <p><span class="ok">● {tr(lang, 'जोडलेले', 'Connected')}</span> · {st.email}</p>
      <p class="small muted">{tr(lang, 'शेवटचे सिंक', 'Last sync')}: {when}{st.syncing ? ' …' : ''}</p>
      {st.pending > 0 && <p class="set-note">{tr(lang, `${st.pending} बदल अपलोडसाठी थांबले आहेत (इंटरनेट आल्यावर आपोआप जातील).`, `${st.pending} changes are waiting to upload (they go automatically when the internet is back).`)}</p>}
      {st.failed > 0 && <div class="set-warn">{tr(lang, `${st.failed} बदल सर्व्हरने स्वीकारले नाहीत.`, `${st.failed} changes were refused by the server.`)} <button class="btn btn-sm" type="button" onClick={() => run(() => store.retryFailed())}>{tr(lang, 'पुन्हा प्रयत्न', 'Try again')}</button></div>}
      {st.lastError === 'network' && <p class="small muted">{tr(lang, 'सध्या इंटरनेट नाही. शेवटची डाउनलोड केलेली माहिती दिसत आहे.', 'No internet right now. You are seeing the last downloaded copy.')}</p>}
      {st.lastError === 'auth' && <p class="set-warn" role="alert">{tr(lang, 'लॉगिन संपले आहे. बदल फोनवर सुरक्षित आहेत. "आता सिंक करा" दाबून पाहा. अपलोड न झालेले बदल शिल्लक असताना "बाहेर पडा" करू नका.', 'Your login has expired. Your changes are safe on this phone. Try "Sync now". Do not sign out while changes are still waiting to upload.')}</p>}
      {st.lastError === 'server' && <p class="small muted">{tr(lang, 'सर्व्हरशी बोलताना अडचण आली. बदल फोनवर सुरक्षित आहेत; थोड्या वेळाने पुन्हा सिंक होईल.', 'The server had a problem. Your changes are safe on this phone and will sync again shortly.')}</p>}
      {signupsOpen === true && <p class="set-warn">{tr(lang, 'सावधान: नवीन लोकांना साइन-अप करण्याची परवानगी अजून चालू आहे. Supabase मध्ये "Allow new users to sign up" बंद करा. (तुमची माहिती तरी सुरक्षित आहे, पण बंद करणे योग्य.)', 'Warning: sign-ups are still open. Turn off "Allow new users to sign up" in Supabase. (Your data is still protected, but turn it off anyway.)')}</p>}
      {msg && <p class="ok" role="status">{msg}</p>}
      <div class="set-actions">
        <button class="btn btn-sm" type="button" disabled={busy} onClick={() => run(() => store.sync())}>{tr(lang, 'आता सिंक करा', 'Sync now')}</button>
        <button class="btn btn-sm btn-green" type="button" disabled={busy} onClick={move}>{tr(lang, 'माझी फोनवरील माहिती क्लाउडमध्ये हलवा', 'Move my local data to the cloud')}</button>
        {menu && menu.length === 0 && <button class="btn btn-sm btn-ghost" type="button" disabled={busy} onClick={starter}>{tr(lang, 'सुरुवातीचा मेनू भरा', 'Load starter menu')}</button>}
      </div>
      <div class="set-actions">
        <button class="btn btn-sm btn-ghost" type="button" disabled={busy} onClick={signOut}>{tr(lang, 'बाहेर पडा (sign out)', 'Sign out')}</button>
        <button class="btn btn-sm btn-ghost" type="button" disabled={busy} onClick={disconnect}>{tr(lang, 'क्लाउड जोडणी काढा', 'Disconnect cloud')}</button>
      </div>
    </div>
  );
}
