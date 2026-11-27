import { useState } from 'preact/hooks';
import { tr, useStore } from '../../hooks';
import { ENTITY_NAMES, type Backup, type EntityName, type Lang } from '../../types';
import { download } from '../../util';
import { BackupError, CSV_ENTITIES, backupFileName, countBackup, csvFileName, daysSinceBackup, entityCsv, getLastBackupAt, markBackupNow, parseBackup, previewImport, type PreviewRow } from '../../backup';
import { isCloudStore } from '../../cloud-store';
import { clearCloudConfig } from '../../cloud-config';

const NAMES: Record<string, [string, string]> = {
  leads: ['चौकशी', 'Leads'], quotes: ['कोटेशन', 'Quotes'], events: ['कार्यक्रम', 'Events'], payments: ['पैसे', 'Payments'],
  tasks: ['कामे', 'Tasks'], staff: ['कर्मचारी', 'Staff'], menu: ['मेनू', 'Menu'], settings: ['सेटिंग्ज', 'Settings'],
};

export function BackupSection({ lang }: { lang: Lang }) {
  const store = useStore();
  const [last, setLast] = useState(getLastBackupAt());
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const [pending, setPending] = useState<{ b: Backup; rows: PreviewRow[]; name: string } | null>(null);
  const [mode, setMode] = useState<'merge' | 'replace'>('merge');
  const [busy, setBusy] = useState(false);
  const name = (e: string) => tr(lang, NAMES[e][0], NAMES[e][1]);

  const backup = async () => {
    const b = await store.exportAll();
    download(backupFileName(), JSON.stringify(b, null, 2), 'application/json');
    markBackupNow(); setLast(getLastBackupAt());
    setMsg({ ok: true, t: tr(lang, 'बॅकअप फाइल डाउनलोड झाली. ती सुरक्षित ठिकाणी (WhatsApp, Drive) ठेवा.', 'Backup file downloaded. Keep it somewhere safe (WhatsApp, Drive).') });
  };
  const csv = async (e: EntityName) => {
    const b = await store.exportAll();
    const items = b.data[e] as unknown as Array<{ id: string }>;
    if (!items.length) return setMsg({ ok: false, t: tr(lang, `${name(e)}: निर्यात करण्यासाठी काही नाही.`, `${name(e)}: nothing to export.`) });
    download(csvFileName(e), entityCsv(items as any), 'text/csv;charset=utf-8');
  };
  const pick = async (ev: Event) => {
    const input = ev.target as HTMLInputElement; const file = input.files?.[0]; input.value = '';
    if (!file) return;
    setMsg(null);
    try {
      const b = parseBackup(await file.text());
      setPending({ b, rows: previewImport(await store.exportAll(), b, mode), name: file.name });
    } catch (e) {
      const c = e instanceof BackupError ? e.code : 'json';
      setMsg({ ok: false, t: c === 'version' ? tr(lang, 'ही बॅकअप फाइल वेगळ्या आवृत्तीची आहे.', 'This backup file is from a different version.') : tr(lang, 'ही भगवती केटरर्सची बॅकअप फाइल नाही.', 'This is not a Bhagwati Caterers backup file.') });
    }
  };
  const changeMode = async (m: 'merge' | 'replace') => { setMode(m); if (pending) setPending({ ...pending, rows: previewImport(await store.exportAll(), pending.b, m) }); };
  const restore = async () => {
    if (!pending) return;
    const c = countBackup(pending.b);
    if (mode === 'replace' && !confirm(tr(lang, `सावधान: सध्याची सर्व माहिती पुसून फाइलमधील माहिती (चौकशी ${c.leads}, कार्यक्रम ${c.events}, कोटेशन ${c.quotes}) भरली जाईल. पुढे जायचे?`, `Careful: ALL current data will be erased and replaced by the file (leads ${c.leads}, events ${c.events}, quotes ${c.quotes}). Continue?`))) return;
    setBusy(true);
    try { await store.importAll(pending.b, mode); setMsg({ ok: true, t: tr(lang, 'माहिती परत आणली.', 'Data restored.') }); setPending(null); }
    catch { setMsg({ ok: false, t: tr(lang, 'परत आणता आले नाही.', 'Could not restore.') }); }
    setBusy(false);
  };
  const clearAll = async () => {
    const cloud = isCloudStore(store);
    if (!confirm(cloud ? tr(lang, 'या फोनवरील प्रत पुसायची आणि बाहेर पडायचे? क्लाउडमधील माहिती तशीच राहील.', 'Erase this phone\'s copy and sign out? Data in the cloud stays.') : tr(lang, 'या फोनवरील सर्व माहिती कायमची पुसायची? बॅकअप घेतला नसेल तर ती परत येणार नाही.', 'Erase ALL data on this phone for good? It cannot come back unless you have a backup.'))) return;
    if (!confirm(tr(lang, 'खात्री आहे का? हे परत करता येणार नाही.', 'Are you really sure? This cannot be undone.'))) return;
    if (isCloudStore(store)) { await store.signOut(true); clearCloudConfig(); }
    else await store.importAll({ app: 'bhagwati-caterers', version: 1, exportedAt: '', data: Object.fromEntries(ENTITY_NAMES.map((e) => [e, []])) as any }, 'replace');
    try { localStorage.removeItem('bc:lastBackupAt'); localStorage.removeItem('bc:pinLock'); sessionStorage.clear(); } catch { /* ignore */ }
    location.hash = '#/'; location.reload();
  };
  const days = daysSinceBackup(last);
  return (
    <details class="card set-section">
      <summary>{tr(lang, 'बॅकअप आणि माहिती', 'Backup and data')}</summary>
      <p class="muted">{last ? tr(lang, `शेवटचा बॅकअप: ${new Date(last).toLocaleDateString(lang === 'mr' ? 'mr-IN' : 'en-IN')} (${days} दिवसांपूर्वी)`, `Last backup: ${new Date(last).toLocaleDateString('en-IN')} (${days} days ago)`) : tr(lang, 'अजून बॅकअप घेतलेला नाही.', 'No backup taken yet.')}</p>
      <div class="set-actions"><button class="btn" type="button" onClick={backup}>{tr(lang, 'बॅकअप डाउनलोड करा (JSON)', 'Download backup (JSON)')}</button></div>

      <h3>{tr(lang, 'बॅकअपमधून परत आणा', 'Restore from a backup')}</h3>
      <div class="field"><label for="bk-file">{tr(lang, 'बॅकअप फाइल निवडा (.json)', 'Choose backup file (.json)')}</label><input id="bk-file" type="file" accept="application/json,.json" onChange={pick} /></div>
      {pending && (
        <div class="card">
          <p><strong>{pending.name}</strong></p>
          <div class="chips">
            <button type="button" class={mode === 'merge' ? 'chip on' : 'chip'} onClick={() => changeMode('merge')}>{tr(lang, 'मिसळा (नवीन ते ठेवा)', 'Merge (keep newer)')}</button>
            <button type="button" class={mode === 'replace' ? 'chip on' : 'chip'} onClick={() => changeMode('replace')}>{tr(lang, 'सर्व बदला', 'Replace everything')}</button>
          </div>
          <table class="table set-table"><thead><tr><th></th><th>{tr(lang, 'फाइलमध्ये', 'In file')}</th><th>{tr(lang, 'नवीन', 'New')}</th><th>{tr(lang, 'बदलणार', 'Updated')}</th>{mode === 'merge' ? <th>{tr(lang, 'तशीच', 'Kept')}</th> : <th>{tr(lang, 'पुसणार', 'Removed')}</th>}</tr></thead>
            <tbody>{pending.rows.filter((r) => r.incoming || r.remove).map((r) => <tr><td>{name(r.entity)}</td><td>{r.incoming}</td><td>{r.add}</td><td>{r.update}</td><td>{mode === 'merge' ? r.keep : r.remove}</td></tr>)}</tbody></table>
          {mode === 'replace' && <p class="set-warn">{tr(lang, 'सर्व बदला निवडल्यास सध्याची सर्व माहिती पुसली जाते.', 'Replace erases all current data first.')}</p>}
          <div class="set-actions">
            <button class="btn" type="button" disabled={busy} onClick={restore}>{mode === 'merge' ? tr(lang, 'मिसळून परत आणा', 'Merge now') : tr(lang, 'सर्व बदला', 'Replace now')}</button>
            <button class="btn btn-ghost" type="button" onClick={() => setPending(null)}>{tr(lang, 'रद्द करा', 'Cancel')}</button>
          </div>
        </div>
      )}
      {msg && <p class={msg.ok ? 'ok' : 'err'} role="status">{msg.t}</p>}

      <h3>{tr(lang, 'Excel साठी CSV', 'CSV for Excel')}</h3>
      <div class="set-actions">{CSV_ENTITIES.map((e) => <button class="btn btn-sm btn-ghost" type="button" onClick={() => csv(e)}>{name(e)}</button>)}</div>

      <h3>{tr(lang, 'धोक्याचे', 'Danger zone')}</h3>
      <button class="btn btn-danger btn-sm" type="button" onClick={clearAll}>{tr(lang, 'या फोनवरील सर्व माहिती पुसा', 'Clear all data on this device')}</button>
    </details>
  );
}
