import { get, set } from 'idb-keyval';
import type { Store, Draft } from './store';
import { ENTITY_NAMES, type Backup, type Base, type EntityMap, type EntityName } from './types';
import { newId } from './util';
import { seedMenu, defaultSettings } from './seed';

const key = (e: EntityName) => `bc:${e}`;

/** Local-first store: data stays in this browser (IndexedDB). Works offline. Back it up regularly (Settings > Backup). */
export class LocalStore implements Store {
  readonly mode = 'local' as const;
  private listeners = new Set<() => void>();
  private channel: BroadcastChannel | null = null;
  private queue: Promise<unknown> = Promise.resolve();

  constructor() {
    if (typeof BroadcastChannel !== 'undefined') {
      this.channel = new BroadcastChannel('bc-store');
      this.channel.onmessage = () => this.emit(false);
    }
  }

  /** Serialise writes so two quick saves never overwrite each other. */
  private serial<T>(fn: () => Promise<T>): Promise<T> {
    const run = this.queue.then(fn, fn);
    this.queue = run.catch(() => undefined);
    return run;
  }
  private emit(broadcast = true) {
    this.listeners.forEach((cb) => cb());
    if (broadcast) this.channel?.postMessage('changed');
  }

  /** First run: add the starter menu and default settings. */
  async init() {
    await this.serial(async () => {
      if (!((await get(key('menu'))) as unknown[] | undefined)?.length) await set(key('menu'), seedMenu());
      if (!((await get(key('settings'))) as unknown[] | undefined)?.length) await set(key('settings'), [defaultSettings()]);
    });
  }

  async list<K extends EntityName>(entity: K): Promise<EntityMap[K][]> {
    return ((await get(key(entity))) as EntityMap[K][] | undefined) ?? [];
  }
  async get<K extends EntityName>(entity: K, id: string) {
    return (await this.list(entity)).find((x) => x.id === id);
  }
  put<K extends EntityName>(entity: K, item: Draft<EntityMap[K]>): Promise<EntityMap[K]> {
    return this.serial(async () => {
      const all = await this.list(entity);
      const now = new Date().toISOString();
      const full = { ...item, id: item.id || newId(), createdAt: item.createdAt || now, updatedAt: now } as EntityMap[K];
      const i = all.findIndex((x) => x.id === full.id);
      if (i >= 0) all[i] = full; else all.push(full);
      await set(key(entity), all);
      this.emit();
      return full;
    });
  }
  remove(entity: EntityName, id: string) {
    return this.serial(async () => {
      const all = (await this.list(entity)).filter((x) => x.id !== id);
      await set(key(entity), all);
      this.emit();
    });
  }
  subscribe(cb: () => void) {
    this.listeners.add(cb);
    return () => { this.listeners.delete(cb); };
  }

  async exportAll(): Promise<Backup> {
    const data = {} as Backup['data'];
    for (const e of ENTITY_NAMES) (data as Record<string, unknown>)[e] = await this.list(e);
    return { app: 'bhagwati-caterers', version: 1, exportedAt: new Date().toISOString(), data };
  }

  importAll(backup: Backup, mode: 'merge' | 'replace') {
    if (backup?.app !== 'bhagwati-caterers' || backup.version !== 1) return Promise.reject(new Error('Not a Bhagwati Caterers backup file'));
    return this.serial(async () => {
      for (const e of ENTITY_NAMES) {
        const incoming = ((backup.data as Record<string, Base[]>)[e] ?? []) as Base[];
        if (mode === 'replace') { await set(key(e), incoming); continue; }
        const map = new Map((await this.list(e)).map((x) => [x.id, x as Base]));
        for (const it of incoming) {
          const cur = map.get(it.id);
          if (!cur || (it.updatedAt ?? '') > (cur.updatedAt ?? '')) map.set(it.id, it);
        }
        await set(key(e), [...map.values()]);
      }
      this.emit();
    });
  }
}
