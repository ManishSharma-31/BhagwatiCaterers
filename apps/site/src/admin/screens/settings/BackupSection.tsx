import { useState } from 'preact/hooks';
import { tr, useStore } from '../../hooks';
import { ENTITY_NAMES, type Backup, type EntityName, type Lang } from '../../types';
import { download } from '../../util';
import { BackupError, CSV_ENTITIES, MAX_BACKUP_BYTES, backupFileName, countBackup, csvFileName, daysSinceBackup, entityCsv, getLastBackupAt, hasUserData, keepDevicePin, markBackupNow, parseBackup, preRestoreFileName, previewImport, type PreviewRow } from '../../backup';
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
    if (file.size > MAX_BACKUP_BYTES) return setMsg({ ok: false, t: tr(lang, 'ही फाइल खूप मोठी आहे; ही बॅकअप फाइल नसावी.', 'This file is too large to be a backup.') });
    try {
      const b = parseBackup(await file.text());
      setPending({ b, rows: previewImport(await store.exportAll(), b, mode), name: file.name });
    } catch (e) {
      const c = e instanceof BackupError ? e.code : 'json';
      setMsg({ ok: false, t: c === 'version' ? tr(lang, 'ही बॅकअप फाइल वेगळ्या आवृत्तीची आहे.', 'This backup file is from a different version.') : tr(lang, 'ही भगवती केटरर्सची बॅकअप फाइल नाही.', 'This is not a Bhagwati Caterers backup file.') });
    }
  };
  const changeMode = async (m: 'merge' | 'replace') => { setMode(m); if (pending) setPending({ ...pending, rows: previewImport(await store.exportAll(), pending.b, m) }); };
  /** Save the data that is on this device right now to a file, so a restore can always be undone by restoring that file. */
  const safetyCopy = async (): Promise<string | null> => {
    const cur = await store.exportAll();
    if (!hasUserData(cur)) return null;
    const fname = preRestoreFileName();
    download(fname, JSON.stringify(cur, null, 2), 'application/json');
    return fname;
  };
  const restore = async () => {
    if (!pending) return;
    const c = countBackup(pending.b);
    const incoming = `(${tr(lang, 'चौकशी', 'leads')} ${c.leads}, ${tr(lang, 'कार्यक्रम', 'events')} ${c.events}, ${tr(lang, 'कोटेशन', 'quotes')} ${c.quotes}, ${tr(lang, 'पैसे', 'payments')} ${c.payments})`;
    const sum = pending.rows.reduce((t, r) => ({ add: t.add + r.add, update: t.update + r.update, remove: t.remove + r.remove }), { add: 0, update: 0, remove: 0 });
    const ok = mode === 'replace'
      ? confirm(tr(lang, `सावधान: सध्याची सर्व माहिती पुसून फाइलमधील माहिती ${incoming} भरली जाईल. ${sum.remove} नोंदी पुसल्या जातील.\n\nपुढे जाण्यापूर्वी सध्याच्या माहितीची सुरक्षा-फाइल आपोआप डाउनलोड होईल. पुढे जायचे?`, `Careful: ALL current data will be erased and replaced by the file ${incoming}. ${sum.remove} record(s) will be removed.\n\nA safety copy of your current data will be downloaded first. Continue?`))
        && (hasUserData(pending.b) || confirm(tr(lang, 'या फाइलमध्ये एकही चौकशी/कार्यक्रम/कोटेशन/पैसे नाही! तरीही सर्व माहिती पुसायची?', 'This file has NO leads, events, quotes or payments! Still erase everything?')))
      : confirm(tr(lang, `फाइलमधील ${sum.add} नवीन नोंदी जोडल्या जातील आणि ${sum.update} नोंदी नवीन आवृत्तीने बदलल्या जातील. काहीही पुसले जाणार नाही.\n\nसुरक्षेसाठी आधी सध्याच्या माहितीची प्रत डाउनलोड होईल. पुढे जायचे?`, `${sum.add} new record(s) will be added and ${sum.update} updated with newer versions. Nothing is deleted.\n\nA safety copy of your current data will be downloaded first. Continue?`));
    if (!ok) return;
    setBusy(true);
    try {
      const current = await store.exportAll();
      const saved = await safetyCopy();
      await store.importAll(keepDevicePin(pending.b, current), mode);
      setMsg({ ok: true, t: tr(lang, `माहिती परत आणली.${saved ? ` आधीची माहिती "${saved}" नावाने डाउनलोड केली आहे; चुकले असल्यास तीच फाइल परत आणा.` : ''}`, `Data restored.${saved ? ` Your previous data was saved as "${saved}"; restore that file if this was a mistake.` : ''}`) });
      setPending(null);
    } catch { setMsg({ ok: false, t: tr(lang, 'परत आणता आले नाही. तुमची सध्याची माहिती तशीच आहे का ते तपासा.', 'Could not restore. Please check that your current data is still there.') }); }
    setBusy(false);
  };
  const clearAll = async () => {
    const cloud = isCloudStore(store);
    if (!cloud) { try { const saved = await safetyCopy(); if (saved) setMsg({ ok: true, t: tr(lang, `सुरक्षेसाठी माहितीची प्रत "${saved}" नावाने डाउनलोड केली आहे.`, `A safety copy was downloaded as "${saved}".`) }); } catch { /* continue to the confirmation */ } }
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
          {mode === 'replace' ? <p class="set-warn">{tr(lang, 'सर्व बदला निवडल्यास सध्याची सर्व माहिती पुसली जाते. पुसण्यापूर्वी तिची सुरक्षा-प्रत आपोआप डाउनलोड होते.', 'Replace erases all current data. A safety copy is downloaded automatically first.')}</p> : <p class="muted small">{tr(lang, 'मिसळल्यास काहीही पुसले जात नाही. आपली सध्याची PIN या फोनवर तशीच राहते.', 'Merge deletes nothing. The PIN on this phone is kept either way.')}</p>}
          <div class="set-actions">
            <button class="btn" type="button" disabled={busy} onClick={restore}>{mode === 'merge' ? tr(lang, 'मिसळून परत आणा', 'Merge now') : tr(lang, 'सर्व बदला', 'Replace now')}</button>
            <button class="btn btn-ghost" type="button" onClick={() => setPending(null)}>{tr(lang, 'रद्द करा', 'Cancel')}</button>
          </div>
        </div>
      )}
      {msg && <p class={msg.ok ? 'ok' : 'err'} role="status">{msg.t}</p>}

      <h3>{tr(lang, 'Excel साठी CSV', 'CSV for Excel')}</h3>
      <p class="muted small">{tr(lang, 'ही फक्त पाहण्यासाठी यादी आहे; यातून माहिती परत आणता येत नाही. परत आणण्यासाठी वरचा JSON बॅकअप वापरा.', 'For viewing only: you cannot restore from CSV. Use the JSON backup above for that.')}</p>
      <div class="set-actions">{CSV_ENTITIES.map((e) => <button class="btn btn-sm btn-ghost" type="button" onClick={() => csv(e)}>{name(e)}</button>)}</div>

      <h3>{tr(lang, 'धोक्याचे', 'Danger zone')}</h3>
      <button class="btn btn-danger btn-sm" type="button" onClick={clearAll}>{tr(lang, 'या फोनवरील सर्व माहिती पुसा', 'Clear all data on this device')}</button>
    </details>
  );
}
