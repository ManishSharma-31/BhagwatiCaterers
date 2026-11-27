// Pure sync logic for CloudStore (no network, no browser). Tested with node.
import type { Base, EntityName } from './types';

export type PutOp = { op: 'put'; entity: EntityName; id: string; record: Base; at: string };
export type RemoveOp = { op: 'remove'; entity: EntityName; id: string; at: string };
export type Op = PutOp | RemoveOp;

/** Add an operation to the outbox. Only the newest operation per record is kept; order of different records stays first-in first-out. */
export function enqueue(queue: Op[], op: Op): Op[] {
  return [...queue.filter((o) => !(o.entity === op.entity && o.id === op.id)), op];
}

/** Newer updatedAt wins; on a tie the existing (a) copy stays. */
export function newer<T extends Base>(a: T | undefined, b: T): T {
  if (!a) return b;
  return (b.updatedAt ?? '') > (a.updatedAt ?? '') ? b : a;
}

/**
 * Result of a full download for one entity: the server copy, with our not-yet-uploaded changes laid on top
 * unless the server copy is strictly newer. Things that exist only in our old cache (not on the server, not pending) were deleted elsewhere and are dropped.
 */
export function mergeSnapshot<T extends Base>(server: T[], pending: Op[], entity: EntityName): T[] {
  const map = new Map(server.map((x) => [x.id, x]));
  for (const o of pending) {
    if (o.entity !== entity) continue;
    const cur = map.get(o.id);
    if (o.op === 'put') {
      const rec = o.record as T;
      if (!cur || (rec.updatedAt ?? '') >= (cur.updatedAt ?? '')) map.set(o.id, rec);
    } else if (cur && (cur.updatedAt ?? '') > o.at) {
      // someone changed it after we deleted it: keep their version
    } else {
      map.delete(o.id);
    }
  }
  return [...map.values()];
}

export interface ImportPlan { puts: Base[]; removeIds: string[]; add: number; update: number; same: number }
/**
 * Decide what an import does for one entity.
 * merge: add unknown ids, replace when the file's copy is newer, keep ours otherwise.
 * replace: everything in the file is written, everything else is removed.
 * A record we do not currently have may have been deleted earlier (soft delete), so it gets updatedAt = now to beat the old delete.
 */
export function planImport(current: Base[], incoming: Base[], mode: 'merge' | 'replace', nowIso: string): ImportPlan {
  const cur = new Map(current.map((x) => [x.id, x]));
  const puts: Base[] = [];
  let add = 0, update = 0, same = 0;
  for (const it of incoming) {
    if (!it || typeof it.id !== 'string' || !it.id) continue;
    const c = cur.get(it.id);
    if (!c) { puts.push({ ...it, updatedAt: nowIso, createdAt: it.createdAt || nowIso }); add++; continue; }
    if (mode === 'replace') { puts.push({ ...it, updatedAt: nowIso > (c.updatedAt ?? '') ? nowIso : c.updatedAt }); update++; continue; }
    if ((it.updatedAt ?? '') > (c.updatedAt ?? '')) { puts.push(it); update++; } else same++;
  }
  const removeIds = mode === 'replace' ? current.filter((c) => !incoming.some((i) => i?.id === c.id)).map((c) => c.id) : [];
  return { puts, removeIds, add, update, same };
}
