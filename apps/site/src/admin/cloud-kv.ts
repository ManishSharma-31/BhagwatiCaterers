// Small async key-value storage used by CloudStore for its offline copy and upload queue (IndexedDB via idb-keyval).
import { get, set, del } from 'idb-keyval';
export interface KV { get(k: string): Promise<any>; set(k: string, v: any): Promise<void>; del(k: string): Promise<void> }
export const idbKV: KV = { get: (k) => get(k), set: (k, v) => set(k, v), del: (k) => del(k) };
