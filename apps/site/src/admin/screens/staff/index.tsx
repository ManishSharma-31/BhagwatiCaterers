import './staff.css';
import { useState } from 'preact/hooks';
import { tr, useList, useStore } from '../../hooks';
import { href, type Route } from '../../router';
import type { Lang, Staff } from '../../types';
import { fmtDate, fmtMoney, telUrl, today, waUrl, waNumber } from '../../util';
import { roleLabel } from '../events/labels';

const ROLES: Staff['role'][] = ['cook', 'helper', 'server', 'driver', 'manager', 'other'];

export function StaffScreen({ lang }: { lang: Lang; route: Route }) {
  const store = useStore();
  const staff = useList('staff'), events = useList('events');
  const [form, setForm] = useState<Partial<Staff> | null>(null);
  const [err, setErr] = useState('');
  if (!staff || !events) return <div class="page"><p class="muted">{tr(lang, 'लोड होत आहे…', 'Loading…')}</p></div>;
  const t0 = today();
  const assignedTo = (id: string) => events.filter((e) => e.staffIds.includes(id) && e.status !== 'cancelled');
  const sorted = [...staff].sort((a, b) => Number(b.active) - Number(a.active) || a.name.localeCompare(b.name));

  const save = async () => {
    if (!form?.name?.trim()) return setErr(tr(lang, 'नाव लिहा.', 'Please enter the name.'));
    const phone = form.phone?.trim();
    if (phone && !waNumber(phone)) return setErr(tr(lang, 'फोन नंबर १० अंकी (६-९ ने सुरू) हवा.', 'Phone must be a 10-digit mobile number.'));
    await store.put('staff', { ...(form as Staff), name: form.name.trim(), phone: phone || undefined, role: form.role ?? 'helper', active: form.active ?? true, dailyWage: form.dailyWage || undefined });
    setForm(null); setErr('');
  };
  const del = async (s: Staff) => {
    const used = events.filter((e) => e.staffIds.includes(s.id)).length;
    if (used) {
      if (confirm(tr(lang, `${s.name} ${used} कार्यक्रमांत नेमलेले आहेत, म्हणून हटवता येत नाही. निष्क्रिय करायचे?`, `${s.name} is assigned to ${used} event(s) so cannot be deleted. Make inactive instead?`))) await store.put('staff', { ...s, active: false });
      return;
    }
    if (confirm(tr(lang, `${s.name} कायमचे हटवायचे?`, `Delete ${s.name} permanently?`))) { await store.remove('staff', s.id); setForm(null); }
  };

  return (
    <div class="page">
      <h1>{tr(lang, 'कर्मचारी', 'Staff')}</h1>
      {form && (
        <div class="card" role="form">
          <h3>{form.id ? tr(lang, 'माहिती बदला', 'Edit staff') : tr(lang, 'नवीन कर्मचारी', 'New staff')}</h3>
          <div class="field"><label for="st-name">{tr(lang, 'नाव', 'Name')}</label><input id="st-name" value={form.name || ''} onInput={(e) => setForm({ ...form, name: (e.target as HTMLInputElement).value })} /></div>
          <div class="grid2">
            <div class="field"><label for="st-phone">{tr(lang, 'फोन', 'Phone')}</label><input id="st-phone" type="tel" inputMode="tel" value={form.phone || ''} onInput={(e) => setForm({ ...form, phone: (e.target as HTMLInputElement).value })} /></div>
            <div class="field"><label for="st-role">{tr(lang, 'काम / भूमिका', 'Role')}</label>
              <select id="st-role" value={form.role ?? 'helper'} onChange={(e) => setForm({ ...form, role: (e.target as HTMLSelectElement).value as Staff['role'] })}>{ROLES.map((r) => <option value={r}>{roleLabel(r, lang)}</option>)}</select></div>
            <div class="field"><label for="st-wage">{tr(lang, 'रोजंदारी (₹, ऐच्छिक)', 'Daily wage (₹, optional)')}</label><input id="st-wage" type="number" inputMode="numeric" min="0" value={form.dailyWage ?? ''} onInput={(e) => setForm({ ...form, dailyWage: Number((e.target as HTMLInputElement).value) || undefined })} /></div>
          </div>
          <label class="check"><input type="checkbox" checked={form.active ?? true} onChange={() => setForm({ ...form, active: !(form.active ?? true) })} /> {tr(lang, 'सध्या कामावर (सक्रिय)', 'Currently working (active)')}</label>
          <div class="field"><label for="st-notes">{tr(lang, 'नोंदी', 'Notes')}</label><textarea id="st-notes" value={form.notes || ''} onInput={(e) => setForm({ ...form, notes: (e.target as HTMLTextAreaElement).value })} /></div>
          {err && <p class="err" role="alert">{err}</p>}
          <div class="row">
            <button type="button" class="btn btn-green" onClick={save}>{tr(lang, 'जतन करा', 'Save')}</button>
            <button type="button" class="btn btn-ghost" onClick={() => { setForm(null); setErr(''); }}>{tr(lang, 'रद्द', 'Cancel')}</button>
            {form.id && <button type="button" class="btn btn-danger" onClick={() => del(form as Staff)}>{tr(lang, 'हटवा', 'Delete')}</button>}
          </div>
        </div>
      )}
      {sorted.length === 0 && !form && <p class="empty">{tr(lang, 'अजून कर्मचारी जोडलेले नाहीत.', 'No staff added yet.')}</p>}
      {sorted.map((s) => {
        const up = assignedTo(s.id).filter((e) => e.date >= t0).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 5);
        const wa = s.phone && waNumber(s.phone);
        return (
          <div class={'card st-card' + (s.active ? '' : ' st-off')} key={s.id}>
            <div class="row between">
              <div><strong>{s.name}</strong> <span class="badge">{roleLabel(s.role, lang)}</span>{!s.active && <span class="badge cancelled"> {tr(lang, 'निष्क्रिय', 'Inactive')}</span>}
                {s.dailyWage ? <div class="muted small">{tr(lang, 'रोजंदारी ', 'Daily wage ')}{fmtMoney(s.dailyWage)}</div> : null}</div>
              <label class="check"><input type="checkbox" checked={s.active} onChange={() => store.put('staff', { ...s, active: !s.active })} /> {tr(lang, 'सक्रिय', 'Active')}</label>
            </div>
            {s.notes && <p class="muted small">{s.notes}</p>}
            <div class="row">
              {s.phone && <a class="btn btn-sm" href={telUrl(s.phone)}>📞 {tr(lang, 'फोन', 'Call')}</a>}
              {wa && <a class="btn btn-sm btn-green" href={waUrl(s.phone!, '')} target="_blank" rel="noopener">💬 WhatsApp</a>}
              <button type="button" class="btn btn-sm btn-ghost" onClick={() => { setForm(s); window.scrollTo(0, 0); }}>✏️ {tr(lang, 'बदला', 'Edit')}</button>
            </div>
            {up.length > 0 && (
              <div><div class="small" style="margin-top:.5rem"><strong>{tr(lang, 'पुढील कार्यक्रम', 'Upcoming assignments')}</strong></div>
                <ul class="st-up">{up.map((e) => <li><a href={href('/events/' + e.id)}>{e.title}</a> · {fmtDate(e.date, lang)}</li>)}</ul></div>
            )}
          </div>
        );
      })}
      {!form && <button type="button" class="btn fab" onClick={() => setForm({ active: true, role: 'helper' })}>+ {tr(lang, 'नवीन कर्मचारी', 'Add staff')}</button>}
    </div>
  );
}
