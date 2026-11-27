import { useState } from 'preact/hooks';
import { tr, useStore } from '../../hooks';
import { TASK_CATEGORIES, type CatEvent, type Lang, type Staff, type Task } from '../../types';
import { categoryLabel } from '../events/labels';
import { fmtDate } from '../../util';

export function TaskForm({ lang, task, defaults, events, staff, onClose }: { lang: Lang; task?: Task; defaults?: Partial<Task>; events: CatEvent[]; staff: Staff[]; onClose: () => void }) {
  const store = useStore();
  const [t, setT] = useState<Partial<Task>>(task ?? { category: 'other', done: false, ...defaults });
  const [err, setErr] = useState('');
  const set = (p: Partial<Task>) => setT({ ...t, ...p });
  const save = async () => {
    if (!t.title?.trim()) return setErr(tr(lang, 'कामाचे नाव लिहा.', 'Please enter the task.'));
    await store.put('tasks', { ...(t as Task), title: t.title.trim(), category: t.category ?? 'other', done: !!t.done });
    onClose();
  };
  const remove = async () => {
    if (task && confirm(tr(lang, 'हे काम हटवायचे?', 'Delete this task?'))) { await store.remove('tasks', task.id); onClose(); }
  };
  const evs = [...events].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div class="card" role="form">
      <h3>{task ? tr(lang, 'काम बदला', 'Edit task') : tr(lang, 'नवीन काम', 'New task')}</h3>
      <div class="field"><label for="tk-title">{tr(lang, 'काम', 'Task')}</label><input id="tk-title" value={t.title || ''} onInput={(e) => set({ title: (e.target as HTMLInputElement).value })} /></div>
      <div class="grid2">
        <div class="field"><label for="tk-cat">{tr(lang, 'प्रकार', 'Category')}</label>
          <select id="tk-cat" value={t.category} onChange={(e) => set({ category: (e.target as HTMLSelectElement).value as Task['category'] })}>{TASK_CATEGORIES.map((c) => <option value={c}>{categoryLabel(c, lang)}</option>)}</select></div>
        <div class="field"><label for="tk-due">{tr(lang, 'अंतिम तारीख', 'Due date')}</label><input id="tk-due" type="date" value={t.dueDate || ''} onInput={(e) => set({ dueDate: (e.target as HTMLInputElement).value || undefined })} /></div>
        <div class="field"><label for="tk-ev">{tr(lang, 'कार्यक्रम', 'Event')}</label>
          <select id="tk-ev" value={t.eventId || ''} onChange={(e) => set({ eventId: (e.target as HTMLSelectElement).value || undefined })}>
            <option value="">{tr(lang, '— कार्यक्रम नाही —', '— none —')}</option>
            {evs.map((e) => <option value={e.id}>{e.title} ({fmtDate(e.date, lang)})</option>)}
          </select></div>
        <div class="field"><label for="tk-as">{tr(lang, 'कोणाकडे', 'Assigned to')}</label>
          <select id="tk-as" value={t.assigneeId || ''} onChange={(e) => set({ assigneeId: (e.target as HTMLSelectElement).value || undefined })}>
            <option value="">{tr(lang, '— कोणी नाही —', '— nobody —')}</option>
            {staff.filter((s) => s.active || s.id === t.assigneeId).map((s) => <option value={s.id}>{s.name}</option>)}
          </select></div>
      </div>
      <div class="field"><label for="tk-notes">{tr(lang, 'नोंद', 'Notes')}</label><input id="tk-notes" value={t.notes || ''} onInput={(e) => set({ notes: (e.target as HTMLInputElement).value })} /></div>
      {err && <p class="err" role="alert">{err}</p>}
      <div class="row">
        <button type="button" class="btn btn-green" onClick={save}>{tr(lang, 'जतन करा', 'Save')}</button>
        <button type="button" class="btn btn-ghost" onClick={onClose}>{tr(lang, 'रद्द', 'Cancel')}</button>
        {task && <button type="button" class="btn btn-danger" onClick={remove}>{tr(lang, 'हटवा', 'Delete')}</button>}
      </div>
    </div>
  );
}
