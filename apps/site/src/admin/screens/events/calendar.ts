// Pure calendar math. Dates are YYYY-MM-DD strings; uses UTC arithmetic so time zones cannot shift a day.
export interface DatedEvent { id: string; date: string; guests: number; status: string }

const z = (n: number) => String(n).padStart(2, '0');
export const iso = (y: number, m0: number, d: number) => `${y}-${z(m0 + 1)}-${z(d)}`;
export const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
export const daysInMonth = (y: number, m0: number) => new Date(Date.UTC(y, m0 + 1, 0)).getUTCDate();
/** 0 = Monday ... 6 = Sunday */
export const mondayIndex = (y: number, m0: number, d: number) => (new Date(Date.UTC(y, m0, d)).getUTCDay() + 6) % 7;

/** Weeks (Monday first) of ISO dates; null pads days outside the month. */
export function monthGrid(y: number, m0: number): (string | null)[][] {
  const cells: (string | null)[] = Array(mondayIndex(y, m0, 1)).fill(null);
  for (let d = 1; d <= daysInMonth(y, m0); d++) cells.push(iso(y, m0, d));
  while (cells.length % 7) cells.push(null);
  const weeks: (string | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export function shiftMonth(y: number, m0: number, delta: number): { y: number; m0: number } {
  const t = y * 12 + m0 + delta;
  return { y: Math.floor(t / 12), m0: ((t % 12) + 12) % 12 };
}

export const isActive = (e: { status: string }) => e.status !== 'cancelled';

export function groupByDate<T extends DatedEvent>(events: T[]): Map<string, T[]> {
  const m = new Map<string, T[]>();
  for (const e of events) {
    if (!e.date || !isActive(e)) continue;
    const a = m.get(e.date) ?? [];
    a.push(e);
    m.set(e.date, a);
  }
  return m;
}

/** Dates with two or more (non-cancelled) events, with the total guests that day. */
export function busyDays<T extends DatedEvent>(events: T[]): Map<string, { count: number; guests: number }> {
  const out = new Map<string, { count: number; guests: number }>();
  for (const [date, list] of groupByDate(events)) {
    if (list.length >= 2) out.set(date, { count: list.length, guests: list.reduce((s, e) => s + (e.guests || 0), 0) });
  }
  return out;
}

const dayDiff = (a: string, b: string) => Math.round((Date.parse(b + 'T00:00:00Z') - Date.parse(a + 'T00:00:00Z')) / 86400000);

/** Events from today up to `days` days ahead (inclusive), cancelled excluded, sorted by date then time. */
export function upcoming<T extends DatedEvent & { startTime?: string }>(events: T[], todayIso: string, days = 30): T[] {
  return events
    .filter((e) => isActive(e) && e.date >= todayIso && dayDiff(todayIso, e.date) <= days)
    .sort((a, b) => (a.date + (a.startTime || '')).localeCompare(b.date + (b.startTime || '')));
}
export const pastEvents = <T extends DatedEvent>(events: T[], todayIso: string): T[] =>
  events.filter((e) => e.date < todayIso).sort((a, b) => b.date.localeCompare(a.date));
export const daysFrom = dayDiff;

export function monthName(y: number, m0: number, lang: 'mr' | 'en'): string {
  try {
    return new Intl.DateTimeFormat(lang === 'mr' ? 'mr-IN' : 'en-IN', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(y, m0, 1)));
  } catch {
    return new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(y, m0, 1)));
  }
}
/** Monday-first weekday names. 2024-01-01 was a Monday. */
export function weekdayNames(lang: 'mr' | 'en'): string[] {
  const f = (loc: string) => new Intl.DateTimeFormat(loc, { weekday: 'short', timeZone: 'UTC' });
  let fmt: Intl.DateTimeFormat;
  try { fmt = f(lang === 'mr' ? 'mr-IN' : 'en-IN'); } catch { fmt = f('en-IN'); }
  return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(Date.UTC(2024, 0, 1 + i))));
}
