// Backup helpers: file name, parsing and checking a backup file, preview counts, CSV, "last backup" reminder.
import { ENTITY_NAMES, type Backup, type Base, type EntityName } from './types';
import { toCsv, toISODate } from './util';

export const LAST_BACKUP_KEY = 'bc:lastBackupAt';
export const CSV_ENTITIES = ['leads', 'quotes', 'events', 'payments', 'tasks', 'staff'] as const;

export const backupFileName = (d: Date = new Date()) => `bhagwati-backup-${toISODate(d)}.json`;
export const preRestoreFileName = (d: Date = new Date()) => {
  const z = (n: number) => String(n).padStart(2, '0');
  return `bhagwati-before-restore-${toISODate(d)}-${z(d.getHours())}${z(d.getMinutes())}.json`;
};
export const MAX_BACKUP_BYTES = 25 * 1024 * 1024;
export const csvFileName = (entity: string, d: Date = new Date()) => `bhagwati-${entity}-${toISODate(d)}.csv`;

export class BackupError extends Error { constructor(public code: 'json' | 'format' | 'version') { super(code); } }

/** Parse and check a backup file's text. Missing lists become empty; anything that is not a list of records with ids is dropped. */
export function parseBackup(text: string): Backup {
  let j: any;
  try { j = JSON.parse(text); } catch { throw new BackupError('json'); }
  if (!j || j.app !== 'bhagwati-caterers' || typeof j.data !== 'object' || j.data === null) throw new BackupError('format');
  if (j.version !== 1) throw new BackupError('version');
  const data: any = {};
  for (const e of ENTITY_NAMES) {
    const arr = Array.isArray(j.data[e]) ? j.data[e] : [];
    data[e] = arr.filter((x: any) => x && typeof x === 'object' && typeof x.id === 'string' && x.id);
  }
  return { app: 'bhagwati-caterers', version: 1, exportedAt: String(j.exportedAt ?? ''), data };
}

/**
 * A restore must never change this device's PIN lock or lock the owner out with an old PIN:
 * the PIN fields in the incoming settings are replaced by the ones currently on this device (or dropped if there is none).
 */
export function keepDevicePin(incoming: Backup, current: Backup): Backup {
  const cur = ((current.data.settings ?? []) as Array<{ pinHash?: string; pinSalt?: string }>)[0];
  const settings = ((incoming.data.settings ?? []) as unknown as Array<Record<string, unknown>>).map((x) => {
    const { pinHash: _h, pinSalt: _s, ...rest } = x;
    return cur?.pinHash ? { ...rest, pinHash: cur.pinHash, pinSalt: cur.pinSalt } : rest;
  });
  return { ...incoming, data: { ...incoming.data, settings: settings as unknown as Backup['data']['settings'] } };
}

export const countBackup = (b: Backup): Record<EntityName, number> => {
  const out = {} as Record<EntityName, number>;
  for (const e of ENTITY_NAMES) out[e] = (b.data[e] as Base[] | undefined)?.length ?? 0;
  return out;
};
export const hasUserData = (b: Backup) => CSV_ENTITIES.some((e) => (b.data[e] as Base[]).length > 0);

export interface PreviewRow { entity: EntityName; add: number; update: number; keep: number; remove: number; incoming: number }
/** What an import would do, per entity, so the owner sees the numbers before confirming. */
export function previewImport(current: Backup, incoming: Backup, mode: 'merge' | 'replace'): PreviewRow[] {
  return ENTITY_NAMES.map((entity) => {
    const cur = new Map(((current.data[entity] ?? []) as Base[]).map((x) => [x.id, x]));
    const inc = (incoming.data[entity] ?? []) as Base[];
    let add = 0, update = 0, keep = 0;
    for (const it of inc) {
      const c = cur.get(it.id);
      if (!c) add++;
      else if (mode === 'replace') update++;
      else if ((it.updatedAt ?? '') > (c.updatedAt ?? '')) update++;
      else keep++;
    }
    const remove = mode === 'replace' ? [...cur.keys()].filter((id) => !inc.some((i) => i.id === id)).length : 0;
    return { entity, add, update, keep, remove, incoming: inc.length };
  });
}

/** Local-only version of the import (used to test the merge/replace rules; stores use the same rules). */
export function applyImport(current: Backup, incoming: Backup, mode: 'merge' | 'replace'): Backup {
  const data: any = {};
  for (const e of ENTITY_NAMES) {
    const inc = (incoming.data[e] ?? []) as Base[];
    if (mode === 'replace') { data[e] = inc; continue; }
    const map = new Map(((current.data[e] ?? []) as Base[]).map((x) => [x.id, x]));
    for (const it of inc) { const c = map.get(it.id); if (!c || (it.updatedAt ?? '') > (c.updatedAt ?? '')) map.set(it.id, it); }
    data[e] = [...map.values()];
  }
  return { ...current, data };
}

export const entityCsv = (items: Base[]) =>
  toCsv([...items].sort((a, b) => (a.createdAt ?? '').localeCompare(b.createdAt ?? '')) as unknown as Array<Record<string, unknown>>);

// ---- last backup reminder ----
export const getLastBackupAt = (): string | null => { try { return localStorage.getItem(LAST_BACKUP_KEY); } catch { return null; } };
export const markBackupNow = (now = new Date()) => { try { localStorage.setItem(LAST_BACKUP_KEY, now.toISOString()); } catch { /* ignore */ } };
/** Whole days since the last backup, or null if never. */
export const daysSinceBackup = (iso: string | null, now = new Date()) => {
  if (!iso) return null;
  const t = Date.parse(iso);
  return Number.isNaN(t) ? null : Math.max(0, Math.floor((now.getTime() - t) / 86400000));
};
/** none: fine or nothing to protect. yellow: 7 to 13 days. red: 14+ days, or never backed up while data exists. */
export function backupLevel(days: number | null, hasData: boolean): 'none' | 'yellow' | 'red' {
  if (!hasData) return 'none';
  if (days === null) return 'red';
  if (days >= 14) return 'red';
  if (days >= 7) return 'yellow';
  return 'none';
}
