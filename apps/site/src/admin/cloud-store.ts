// CloudStore: Supabase (PostgREST + Auth) over plain fetch. One generic table `records` (see supabase/migrations/0001_init.sql).
// - Works offline: writes go into an outbox (IndexedDB) and upload when the network is back. Reads use the last downloaded copy.
// - Conflicts: the newer updatedAt wins per record (also enforced by a database trigger).
// - Updates: polls every 20 s while the tab is visible, on window focus, when the network returns, and after our own writes.
// Never logs tokens or customer data.
import type { Store, Draft } from './store';
import { ENTITY_NAMES, type Backup, type Base, type EntityMap, type EntityName } from './types';
import { newId } from './util';
import { type CloudConfig, type SyncStorage } from './cloud-config';
import { CloudAuth, NetError, fetchT, type SignInResult } from './cloud-auth';
import { enqueue, mergeSnapshot, planImport, type Op } from './cloud-core';
import { idbKV, type KV } from './cloud-kv';

const CACHE_KEY = 'bc-cloud:cache';
const OUTBOX_KEY = 'bc-cloud:outbox';
const FAILED_KEY = 'bc-cloud:failed';
const META_KEY = 'bc-cloud:meta';
const PAGE = 1000;
import { enquiryToLead, type EnquiryRow } from './enquiry';
const BATCH = 200;

export interface CloudStatus {
  signedIn: boolean; email?: string;
  access: 'unknown' | 'ok' | 'denied';
  pending: number; failed: number;
  lastSyncAt?: string; lastError?: 'network' | 'auth' | 'server';
  syncing: boolean;
}
export interface CloudOpts {
  cfg: CloudConfig; fetch?: typeof fetch; kv?: KV; storage?: SyncStorage | null; now?: () => number;
  /** false in tests: no timers or window listeners, no automatic sync after writes. */
  auto?: boolean;
}

type Cache = Partial<Record<EntityName, Base[]>>;
const isHardFail = (status: number) => status >= 400 && status < 500 && ![401, 408, 429].includes(status);

export class CloudStore implements Store {
  readonly mode = 'cloud' as const;
  readonly auth: CloudAuth;
  private f: typeof fetch;
  private kv: KV;
  private now: () => number;
  private auto: boolean;
  private cache: Cache = {};
  private outbox: Op[] = [];
  private failed: Op[] = [];
  private lastSyncAt?: string;
  private lastError?: CloudStatus['lastError'];
  private access: CloudStatus['access'] = 'unknown';
  private listeners = new Set<() => void>();
  private loaded: Promise<void> | null = null;
  private syncing: Promise<void> | null = null;
  private lastAttempt = 0;
  private persistChain: Promise<unknown> = Promise.resolve();
  private timer: ReturnType<typeof setInterval> | null = null;
  private flushTimer: ReturnType<typeof setTimeout> | null = null;
  private winOff: (() => void) | null = null;

  constructor(private o: CloudOpts) {
    this.f = o.fetch ?? ((...a) => fetch(...a));
    this.kv = o.kv ?? idbKV;
    this.now = o.now ?? (() => Date.now());
    this.auto = o.auto !== false;
    this.auth = new CloudAuth({ cfg: o.cfg, fetch: this.f, storage: o.storage, now: this.now });
    this.auth.onChange(() => { if (!this.auth.isSignedIn()) this.access = 'unknown'; this.emit(); });
  }

  // ---------- setup ----------
  /** Load the offline copy. Safe to call many times. */
  init(): Promise<void> {
    if (!this.loaded) {
      this.loaded = (async () => {
        try {
          this.cache = (await this.kv.get(CACHE_KEY)) ?? {};
          this.outbox = (await this.kv.get(OUTBOX_KEY)) ?? [];
          this.failed = (await this.kv.get(FAILED_KEY)) ?? [];
          this.lastSyncAt = ((await this.kv.get(META_KEY)) ?? {}).lastSyncAt;
        } catch { /* start empty */ }
        if (this.auth.isSignedIn()) void this.checkAccess();
      })();
    }
    return this.loaded;
  }
  private persist() {
    const cache = this.cache, outbox = this.outbox, failed = this.failed, meta = { lastSyncAt: this.lastSyncAt };
    this.persistChain = this.persistChain.then(async () => {
      try {
        await this.kv.set(CACHE_KEY, cache); await this.kv.set(OUTBOX_KEY, outbox);
        await this.kv.set(FAILED_KEY, failed); await this.kv.set(META_KEY, meta);
      } catch { /* storage full or blocked: keep working in memory */ }
    });
    return this.persistChain;
  }
  private emit() { this.listeners.forEach((cb) => cb()); }

  status(): CloudStatus {
    return {
      signedIn: this.auth.isSignedIn(), email: this.auth.email(), access: this.access,
      pending: this.outbox.length, failed: this.failed.length,
      lastSyncAt: this.lastSyncAt, lastError: this.lastError, syncing: !!this.syncing,
    };
  }

  // ---------- network ----------
  private async rest(path: string, init: RequestInit = {}, retry = true): Promise<Response> {
    const tok = await this.auth.getAccessToken();
    if (!tok) throw Object.assign(new Error('auth'), { auth: true });
    const r = await fetchT(this.f, `${this.o.cfg.url}/rest/v1/${path}`, {
      ...init, headers: { apikey: this.o.cfg.anonKey, Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json', ...(init.headers as Record<string, string>) },
    });
    if (r.status === 401 && retry) { if (await this.auth.refresh()) return this.rest(path, init, false); }
    return r;
  }

  /** Is this signed-in user in the allowed_users table? (They can only ever see their own row there.) */
  async checkAccess(): Promise<CloudStatus['access']> {
    try {
      const r = await this.rest('allowed_users?select=user_id&limit=1');
      if (r.ok) { const j = await r.json().catch(() => null); this.access = Array.isArray(j) && j.length ? 'ok' : 'denied'; }
    } catch { /* unknown stays */ }
    this.emit();
    return this.access;
  }

  async signIn(email: string, password: string): Promise<SignInResult | { ok: false; code: 'not-allowed' }> {
    const r = await this.auth.signIn(email, password);
    if (!r.ok) return r;
    this.cache = {}; // never show another account's cached data
    const acc = await this.checkAccess();
    if (acc === 'denied') return { ok: false, code: 'not-allowed' };
    void this.sync();
    return r;
  }

  /** Sign out. If changes are still waiting to upload, ask first (force=true to throw them away). */
  async signOut(force = false): Promise<{ ok: boolean; pending: number }> {
    await this.init();
    if (!force && this.auth.isSignedIn()) { await this.flush(); if (this.outbox.length) return { ok: false, pending: this.outbox.length }; }
    await this.auth.signOut();
    await this.clearLocalCopy();
    return { ok: true, pending: 0 };
  }
  /** Forget the offline copy, queue and sign-in on this device (cloud data is untouched). */
  async clearLocalCopy() {
    this.cache = {}; this.outbox = []; this.failed = []; this.lastSyncAt = undefined; this.access = 'unknown';
    await this.persist();
    this.emit();
  }

  // ---------- upload ----------
  private rowOf(o: Op) {
    if (o.op === 'put') return { entity: o.entity, id: o.id, data: o.record, created_at: o.record.createdAt, updated_at: o.record.updatedAt, deleted: false };
    return null;
  }
  private drop(...ops: Op[]) { this.outbox = this.outbox.filter((x) => !ops.includes(x)); }

  /** Upload the outbox in order. Stops at a network or server problem. Returns true when nothing is left waiting. */
  async flush(): Promise<boolean> {
    await this.init();
    if (!this.auth.isSignedIn()) return this.outbox.length === 0;
    while (this.outbox.length) {
      const first = this.outbox[0];
      try {
        if (first.op === 'put') {
          const run: Op[] = [];
          for (const o of this.outbox) { if (o.op !== 'put' || run.length >= BATCH) break; run.push(o); }
          const r = await this.rest('records?on_conflict=entity,id', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify(run.map((o) => this.rowOf(o))) });
          if (r.ok) { this.drop(...run); }
          else if (isHardFail(r.status) && run.length > 1) {
            // find the bad one: send one by one
            for (const o of run) {
              const r1 = await this.rest('records?on_conflict=entity,id', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify([this.rowOf(o)]) });
              if (r1.ok) this.drop(o);
              else if (isHardFail(r1.status)) { this.drop(o); this.failed.push(o); }
              else throw this.httpErr(r1.status);
            }
          } else if (isHardFail(r.status)) { this.drop(first); this.failed.push(first); }
          else throw this.httpErr(r.status);
        } else {
          const r = await this.rest(`records?entity=eq.${encodeURIComponent(first.entity)}&id=eq.${encodeURIComponent(first.id)}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ deleted: true, updated_at: first.at }) });
          if (r.ok) this.drop(first);
          else if (isHardFail(r.status)) { this.drop(first); this.failed.push(first); }
          else throw this.httpErr(r.status);
        }
        await this.persist();
      } catch (e: any) {
        this.lastError = e?.auth || e?.status === 401 ? 'auth' : e instanceof NetError ? 'network' : 'server';
        await this.persist();
        return false;
      }
    }
    return true;
  }
  private httpErr(status: number) { return Object.assign(new Error('http'), { status }); }

  /** Move failed uploads back to the outbox for another try. */
  async retryFailed() {
    for (const o of this.failed) this.outbox = enqueue(this.outbox, o);
    this.failed = [];
    await this.persist(); this.emit();
    return this.sync();
  }

  // ---------- website enquiries ----------
  private enquiryIds: string[] = [];
  /** Copy new website enquiries into Leads (once each: the lead id is 'enq-<id>'). Never throws; a missing table is ignored. */
  private async importEnquiries() {
    try {
      const r = await this.rest('enquiries?select=*&imported_at=is.null&order=created_at.asc&limit=100');
      if (!r.ok) return;
      const rows = (await r.json()) as EnquiryRow[];
      for (const row of rows) {
        const id = 'enq-' + row.id;
        if (!(this.cache.leads ?? []).some((l) => l.id === id)) await this.put('leads', enquiryToLead(row));
        this.enquiryIds.push(row.id);
      }
    } catch { /* try again next sync */ }
  }
  /** After the new leads have been uploaded, tell the server they are imported. */
  private async markEnquiriesImported() {
    if (!this.enquiryIds.length || this.outbox.length) return;
    try {
      const ids = this.enquiryIds.join(',');
      const r = await this.rest(`enquiries?id=in.(${ids})`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ imported_at: new Date().toISOString() }) });
      if (r.ok) this.enquiryIds = [];
    } catch { /* try again next sync */ }
  }

  // ---------- download ----------
  /** Download everything and merge it with changes still waiting to upload. Returns true if something changed. */
  private async pull(): Promise<boolean> {
    const server: Record<string, Base[]> = {};
    for (let offset = 0; ; offset += PAGE) {
      const r = await this.rest(`records?select=entity,data&deleted=eq.false&order=entity.asc,id.asc&limit=${PAGE}&offset=${offset}`);
      if (!r.ok) throw this.httpErr(r.status);
      const rows = (await r.json()) as Array<{ entity: string; data: Base }>;
      for (const row of rows) { if ((ENTITY_NAMES as string[]).includes(row.entity) && row.data?.id) (server[row.entity] ??= []).push(row.data); }
      if (rows.length < PAGE) break;
    }
    let changed = false;
    const next: Cache = {};
    for (const e of ENTITY_NAMES) {
      const merged = mergeSnapshot(server[e] ?? [], this.outbox, e);
      next[e] = merged;
      if (JSON.stringify(sortById(merged)) !== JSON.stringify(sortById(this.cache[e] ?? []))) changed = true;
    }
    this.cache = next;
    this.lastSyncAt = new Date(this.now()).toISOString();
    return changed;
  }

  /** Upload waiting changes, then download. Never throws. Calls made at the same time share one run. */
  sync(): Promise<void> {
    if (this.syncing) return this.syncing;
    this.syncing = (async () => {
      await this.init();
      this.lastAttempt = this.now();
      if (!this.auth.isSignedIn()) return;
      this.emit();
      try {
        await this.importEnquiries();
        await this.flush();
        await this.markEnquiriesImported();
        const changed = await this.pull();
        this.lastError = undefined;
        await this.persist();
        if (changed) this.emit();
      } catch (e: any) {
        this.lastError = e?.auth || e?.status === 401 ? 'auth' : e instanceof NetError ? 'network' : 'server';
      }
    })().finally(() => { this.syncing = null; this.emit(); });
    return this.syncing;
  }
  private syncSoon() {
    if (!this.auto || this.flushTimer) return;
    this.flushTimer = setTimeout(() => { this.flushTimer = null; void this.sync(); }, 300);
  }

  // ---------- Store interface ----------
  async list<K extends EntityName>(entity: K): Promise<EntityMap[K][]> {
    await this.init();
    if (!this.auth.isSignedIn()) return [];
    if (!this.lastSyncAt) await this.sync();                       // first time: wait for the download
    else if (this.auto && this.now() - this.lastAttempt > 10000) void this.sync(); // later: show the copy, refresh quietly
    return [...((this.cache[entity] ?? []) as EntityMap[K][])];
  }
  async get<K extends EntityName>(entity: K, id: string) {
    return (await this.list(entity)).find((x) => x.id === id);
  }
  async put<K extends EntityName>(entity: K, item: Draft<EntityMap[K]>): Promise<EntityMap[K]> {
    await this.init();
    if (!this.auth.isSignedIn()) throw new Error('Not signed in');
    const now = new Date(this.now()).toISOString();
    const full = { ...item, id: item.id || newId(), createdAt: item.createdAt || now, updatedAt: now } as EntityMap[K];
    this.setLocal(entity, full);
    this.outbox = enqueue(this.outbox, { op: 'put', entity, id: full.id, record: full, at: now });
    await this.persist(); this.emit(); this.syncSoon();
    return full;
  }
  async remove(entity: EntityName, id: string) {
    await this.init();
    if (!this.auth.isSignedIn()) throw new Error('Not signed in');
    this.cache[entity] = (this.cache[entity] ?? []).filter((x) => x.id !== id);
    this.outbox = enqueue(this.outbox, { op: 'remove', entity, id, at: new Date(this.now()).toISOString() });
    await this.persist(); this.emit(); this.syncSoon();
  }
  private setLocal(entity: EntityName, rec: Base) {
    const all = [...(this.cache[entity] ?? [])];
    const i = all.findIndex((x) => x.id === rec.id);
    if (i >= 0) all[i] = rec; else all.push(rec);
    this.cache[entity] = all;
  }

  subscribe(cb: () => void) {
    this.listeners.add(cb);
    if (this.auto) this.startPolling();
    return () => { this.listeners.delete(cb); if (!this.listeners.size) this.stopPolling(); };
  }
  private startPolling() {
    if (this.timer || typeof window === 'undefined') return;
    const visible = () => typeof document === 'undefined' || document.visibilityState === 'visible';
    this.timer = setInterval(() => { if (visible()) void this.sync(); }, 20000);
    const on = () => { if (visible()) void this.sync(); };
    window.addEventListener('focus', on); window.addEventListener('online', on); document.addEventListener('visibilitychange', on);
    this.winOff = () => { window.removeEventListener('focus', on); window.removeEventListener('online', on); document.removeEventListener('visibilitychange', on); };
  }
  private stopPolling() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null; this.winOff?.(); this.winOff = null;
  }

  async exportAll(): Promise<Backup> {
    await this.init();
    if (this.auth.isSignedIn()) await this.sync();
    const data = {} as Backup['data'];
    for (const e of ENTITY_NAMES) (data as Record<string, unknown>)[e] = [...(this.cache[e] ?? [])];
    return { app: 'bhagwati-caterers', version: 1, exportedAt: new Date(this.now()).toISOString(), data };
  }

  async importAll(backup: Backup, mode: 'merge' | 'replace') {
    if (backup?.app !== 'bhagwati-caterers' || backup.version !== 1) throw new Error('Not a Bhagwati Caterers backup file');
    await this.init();
    if (!this.auth.isSignedIn()) throw new Error('Not signed in');
    await this.sync();
    const nowIso = new Date(this.now()).toISOString();
    for (const e of ENTITY_NAMES) {
      const incoming = ((backup.data as Record<string, Base[]>)[e] ?? []) as Base[];
      const plan = planImport(this.cache[e] ?? [], incoming, mode, nowIso);
      for (const id of plan.removeIds) {
        this.cache[e] = (this.cache[e] ?? []).filter((x) => x.id !== id);
        this.outbox = enqueue(this.outbox, { op: 'remove', entity: e, id, at: nowIso });
      }
      for (const rec of plan.puts) {
        this.setLocal(e, rec);
        this.outbox = enqueue(this.outbox, { op: 'put', entity: e, id: rec.id, record: rec, at: rec.updatedAt });
      }
    }
    await this.persist(); this.emit();
    await this.sync();
  }
}

const sortById = (a: Base[]) => [...a].sort((x, y) => (x.id < y.id ? -1 : x.id > y.id ? 1 : 0));
export const isCloudStore = (s: Store): s is CloudStore => s.mode === 'cloud' && 'auth' in s;

/** Quick check of a project before saving: does the server answer, and are sign-ups still open? */
export async function checkProject(cfg: CloudConfig, f: typeof fetch = (...a) => fetch(...a)): Promise<{ reachable: boolean; signupsOpen?: boolean }> {
  try {
    const r = await fetchT(f, `${cfg.url}/auth/v1/settings`, { headers: { apikey: cfg.anonKey } }, 10000);
    if (!r.ok) return { reachable: false };
    const j = await r.json().catch(() => null);
    return { reachable: true, signupsOpen: typeof j?.disable_signup === 'boolean' ? !j.disable_signup : undefined };
  } catch { return { reachable: false }; }
}
