import './tasks.css';
import { useState } from 'preact/hooks';
import { tr, useList, useStore } from '../../hooks';
import { href, type Route } from '../../router';
import { TASK_CATEGORIES, type Lang, type Task, type TaskCategory } from '../../types';
import { fmtDate, today } from '../../util';
import { categoryLabel } from '../events/labels';
import { groupTasks, isOverdue, type TaskGroupKey } from './logic';
import { TaskForm } from './TaskForm';

export function TasksScreen({ lang, route }: { lang: Lang; route: Route }) {
  const store = useStore();
  const tasks = useList('tasks'), events = useList('events'), staff = useList('staff');
  const eventId = route.query.get('event') || '';
  const [cat, setCat] = useState<TaskCategory | ''>('');
  const [who, setWho] = useState('');
  const [form, setForm] = useState<{ task?: Task } | null>(null);
  const [showDone, setShowDone] = useState(false);
  const t0 = today();
  if (!tasks || !events || !staff) return <div class="page"><p class="muted">{tr(lang, 'लोड होत आहे…', 'Loading…')}</p></div>;

  const evById = new Map(events.map((e) => [e.id, e]));
  const stById = new Map(staff.map((s) => [s.id, s]));
  const filtered = tasks.filter((t) => (!eventId || t.eventId === eventId) && (!cat || t.category === cat) && (!who || (who === '_none' ? !t.assigneeId : t.assigneeId === who)));
  const g = groupTasks(filtered, t0);
  const filterEv = eventId ? evById.get(eventId) : undefined;
  const titles: [TaskGroupKey, string][] = [['today', tr(lang, 'आज (व उशीर झालेली)', 'Today (and overdue)')], ['week', tr(lang, 'या आठवड्यात', 'This week')], ['later', tr(lang, 'नंतर', 'Later')], ['nodate', tr(lang, 'तारीख नाही', 'No date')]];
  const closeForm = () => setForm(null);

  const row = (t: Task) => {
    const ev = t.eventId ? evById.get(t.eventId) : undefined;
    const over = isOverdue(t, t0);
    return (
      <div class={'tk-item' + (over ? ' over' : '')} key={t.id}>
        <button type="button" class={'tk-box' + (t.done ? ' on' : '')} role="checkbox" aria-checked={t.done} aria-label={tr(lang, 'पूर्ण झाले', 'Mark done')} onClick={() => store.put('tasks', { ...t, done: !t.done })}>{t.done ? '✓' : ''}</button>
        <button type="button" class="tk-main" onClick={() => setForm({ task: t })} aria-label={tr(lang, 'काम बदला: ', 'Edit task: ') + t.title}>
          <span class={'tk-title' + (t.done ? ' done' : '')}>{t.title}</span>
          <span class="tk-sub">
            <span class="badge">{categoryLabel(t.category, lang)}</span>
            {t.dueDate && <span class={over ? 'err' : ''}>{over ? '⚠ ' + tr(lang, 'उशीर: ', 'Overdue: ') : ''}{fmtDate(t.dueDate, lang)}</span>}
            {t.assigneeId && stById.get(t.assigneeId) && <span>👤 {stById.get(t.assigneeId)!.name}</span>}
          </span>
        </button>
        {ev && <a class="btn btn-ghost btn-sm" href={href('/events/' + ev.id)} title={ev.title}>🗓 {ev.title.length > 14 ? ev.title.slice(0, 13) + '…' : ev.title}</a>}
      </div>
    );
  };

  return (
    <div class="page">
      <h1>{tr(lang, 'कामांची यादी', 'Tasks')}</h1>
      {filterEv && <p>{tr(lang, 'कार्यक्रम: ', 'Event: ')}<a href={href('/events/' + filterEv.id)}><strong>{filterEv.title}</strong></a> · <a href={href('/tasks')}>{tr(lang, 'सर्व कामे दाखवा', 'Show all tasks')}</a></p>}
      <div class="chips" role="group" aria-label={tr(lang, 'प्रकारानुसार', 'Filter by category')}>
        <button type="button" class={'chip' + (!cat ? ' on' : '')} onClick={() => setCat('')}>{tr(lang, 'सर्व', 'All')}</button>
        {TASK_CATEGORIES.map((c) => <button type="button" class={'chip' + (cat === c ? ' on' : '')} onClick={() => setCat(cat === c ? '' : c)}>{categoryLabel(c, lang)}</button>)}
      </div>
      <div class="field"><label for="tk-who">{tr(lang, 'कोणाकडे', 'Assigned to')}</label>
        <select id="tk-who" value={who} onChange={(e) => setWho((e.target as HTMLSelectElement).value)}>
          <option value="">{tr(lang, 'सर्व', 'Everyone')}</option>
          <option value="_none">{tr(lang, 'कोणाकडेही नाही', 'Unassigned')}</option>
          {staff.map((s) => <option value={s.id}>{s.name}</option>)}
        </select></div>

      {form && <TaskForm key={form.task?.id ?? 'new'} lang={lang} task={form.task} defaults={{ eventId: eventId || undefined, category: cat || 'other', assigneeId: who && who !== '_none' ? who : undefined }} events={events} staff={staff} onClose={closeForm} />}

      {filtered.length === 0 && <p class="empty">{tr(lang, 'कामे नाहीत. खाली + दाबून नवीन काम जोडा.', 'No tasks yet. Tap + to add one.')}</p>}
      {titles.map(([k, title]) => g[k].length > 0 && (
        <section key={k} class="tk-sec"><h2>{title} <span class="badge">{g[k].length}</span></h2><div class="list">{g[k].map(row)}</div></section>
      ))}
      {g.done.length > 0 && (
        <section class="tk-sec">
          <button type="button" class="btn btn-ghost btn-sm" aria-expanded={showDone} onClick={() => setShowDone(!showDone)}>{showDone ? '▾' : '▸'} {tr(lang, `पूर्ण झालेली (${g.done.length})`, `Done (${g.done.length})`)}</button>
          {showDone && <div class="list" style="margin-top:.6rem">{g.done.map(row)}</div>}
        </section>
      )}
      {!form && <button type="button" class="btn fab" onClick={() => { setForm({}); window.scrollTo(0, 0); }}>+ {tr(lang, 'नवीन काम', 'New task')}</button>}
    </div>
  );
}
