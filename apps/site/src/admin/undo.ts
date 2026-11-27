// Undo for deletes. Wraps the store so that every remove() is remembered for a short time and can be put back.
// Works the same for the local store and the cloud store (put after remove writes the record again with a newer updatedAt).
import type { Store } from './store';
import type { Base, EntityName } from './types';

export interface Deleted { entity: EntityName; item: Base }
export interface UndoGroup { items: Deleted[]; at: number }

const GROUP_MS = 2500;   // removes this close together (event + its tasks) form one undo
const KEEP_MS = 12000;   // how long the Undo button stays

export class UndoBuffer {
  private group: UndoGroup | null = null;
  private listeners = new Set<() => void>();
  private timer: ReturnType<typeof setTimeout> | null = null;
  constructor(private now: () => number = () => Date.now()) {}

  current() { return this.group; }
  subscribe(cb: () => void) { this.listeners.add(cb); return () => { this.listeners.delete(cb); }; }
  private emit() { this.listeners.forEach((cb) => cb()); }

  record(d: Deleted) {
    const t = this.now();
    if (this.group && t - this.group.at <= GROUP_MS) this.group = { items: [...this.group.items, d], at: t };
    else this.group = { items: [d], at: t };
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => this.dismiss(), KEEP_MS);
    this.emit();
  }
  dismiss() { this.group = null; if (this.timer) clearTimeout(this.timer); this.timer = null; this.emit(); }

  /** Put everything in the current group back. Newest delete first, so an event comes back before... order does not matter for ids. */
  async undo(store: Store): Promise<number> {
    const g = this.group;
    if (!g) return 0;
    this.dismiss();
    for (const d of g.items) await store.put(d.entity, d.item as never);
    return g.items.length;
  }
}

/** Returns a store that behaves exactly like `store` but remembers deletes in `buf`. */
export function withUndo(store: Store, buf: UndoBuffer): Store {
  return new Proxy(store, {
    get(target, prop) {
      if (prop === 'remove') {
        return async (entity: EntityName, id: string) => {
          let old: Base | undefined;
          try { old = (await target.get(entity, id)) as Base | undefined; } catch { /* cannot remember: delete anyway */ }
          await target.remove(entity, id);
          if (old && entity !== 'settings') buf.record({ entity, item: old });
        };
      }
      const v = Reflect.get(target, prop, target);
      return typeof v === 'function' ? v.bind(target) : v;
    },
  });
}
