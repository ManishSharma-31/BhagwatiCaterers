import type { Backup, Base, EntityMap, EntityName } from './types';

/** A draft can omit the generated fields. `put` creates id/createdAt if missing and always sets updatedAt. */
export type Draft<T extends Base> = Omit<T, 'id' | 'createdAt' | 'updatedAt'> & Partial<Base>;

/**
 * Storage contract. Two implementations: LocalStore (this device, works offline, no account)
 * and CloudStore (Supabase, shared across devices). Screens only use this interface.
 */
export interface Store {
  readonly mode: 'local' | 'cloud';
  list<K extends EntityName>(entity: K): Promise<EntityMap[K][]>;
  get<K extends EntityName>(entity: K, id: string): Promise<EntityMap[K] | undefined>;
  /** Insert or update (upsert by id). Returns the saved item. */
  put<K extends EntityName>(entity: K, item: Draft<EntityMap[K]>): Promise<EntityMap[K]>;
  remove(entity: EntityName, id: string): Promise<void>;
  /** Called after any change (including changes made in other tabs for local mode). Returns an unsubscribe function. */
  subscribe(cb: () => void): () => void;
  exportAll(): Promise<Backup>;
  /** merge: keep the newer updatedAt per id. replace: wipe then load. */
  importAll(backup: Backup, mode: 'merge' | 'replace'): Promise<void>;
}
