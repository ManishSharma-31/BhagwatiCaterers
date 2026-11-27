import type { Task } from '../../types';
import { addDays } from '../../util';

export type TaskGroupKey = 'today' | 'week' | 'later' | 'nodate' | 'done';
export const isOverdue = (t: Pick<Task, 'done' | 'dueDate'>, todayIso: string) => !t.done && !!t.dueDate && t.dueDate < todayIso;

/** Today = due today or overdue. This week = next 7 days. */
export function groupTasks(tasks: Task[], todayIso: string): Record<TaskGroupKey, Task[]> {
  const out: Record<TaskGroupKey, Task[]> = { today: [], week: [], later: [], nodate: [], done: [] };
  const weekEnd = addDays(todayIso, 7);
  for (const t of tasks) {
    if (t.done) out.done.push(t);
    else if (!t.dueDate) out.nodate.push(t);
    else if (t.dueDate <= todayIso) out.today.push(t);
    else if (t.dueDate <= weekEnd) out.week.push(t);
    else out.later.push(t);
  }
  const byDue = (a: Task, b: Task) => (a.dueDate || '9').localeCompare(b.dueDate || '9') || a.title.localeCompare(b.title);
  (Object.keys(out) as TaskGroupKey[]).forEach((k) => out[k].sort(byDue));
  out.done.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return out;
}
export const progress = (tasks: Pick<Task, 'done'>[]) => ({ done: tasks.filter((t) => t.done).length, total: tasks.length, pct: tasks.length ? Math.round((tasks.filter((t) => t.done).length / tasks.length) * 100) : 0 });
