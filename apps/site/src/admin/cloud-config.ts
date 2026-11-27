// Cloud (Supabase) connection settings kept in localStorage under 'bc:cloud', so the app can start before any store exists.
// The anon key is public by design: it only works together with a logged-in allowed user (row-level security).
// NEVER put a service-role / secret key here. We refuse to save one.

export interface CloudConfig { url: string; anonKey: string }
export interface SyncStorage { getItem(k: string): string | null; setItem(k: string, v: string): void; removeItem(k: string): void }

export const CLOUD_KEY = 'bc:cloud';
const ls = (): SyncStorage | null => { try { return typeof localStorage !== 'undefined' ? localStorage : null; } catch { return null; } };

/** Trim spaces, remove trailing slashes and a pasted '/rest/v1' or '/auth/v1' tail. */
export function normalizeUrl(input: string): string {
  let u = (input || '').trim().replace(/\/+$/, '');
  u = u.replace(/\/(rest|auth)\/v1$/i, '');
  return u;
}

export type UrlCheck = { ok: true; custom: boolean; url: string } | { ok: false; reason: 'empty' | 'invalid' | 'not-https' };
/** Must be https. A '*.supabase.co' host is accepted directly; any other host is "custom" and the caller must ask the owner to confirm. */
export function validateCloudUrl(input: string): UrlCheck {
  const url = normalizeUrl(input);
  if (!url) return { ok: false, reason: 'empty' };
  let u: URL;
  try { u = new URL(url); } catch { return { ok: false, reason: 'invalid' }; }
  if (u.protocol !== 'https:') return { ok: false, reason: 'not-https' };
  if (u.username || u.password || u.search || u.hash || (u.pathname && u.pathname !== '/')) return { ok: false, reason: 'invalid' };
  const host = u.hostname.toLowerCase();
  const custom = !(host.endsWith('.supabase.co') && host.length > '.supabase.co'.length);
  return { ok: true, custom, url: u.origin };
}

export type KeyCheck = { ok: true } | { ok: false; reason: 'empty' | 'secret' | 'format' };
/** Accepts the public anon / publishable key. Refuses secret keys (service_role) so they never get stored. */
export function validateAnonKey(input: string): KeyCheck {
  const k = (input || '').trim();
  if (!k) return { ok: false, reason: 'empty' };
  if (/\s/.test(k)) return { ok: false, reason: 'format' };
  if (k.startsWith('sb_secret_')) return { ok: false, reason: 'secret' };
  if (k.startsWith('sb_publishable_')) return { ok: true };
  const parts = k.split('.');
  if (parts.length !== 3) return { ok: false, reason: 'format' };
  try {
    const b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = JSON.parse(atob(b64 + '='.repeat((4 - (b64.length % 4)) % 4)));
    if (json && json.role === 'service_role') return { ok: false, reason: 'secret' };
  } catch { return { ok: false, reason: 'format' }; }
  return { ok: true };
}

export function loadCloudConfig(storage: SyncStorage | null = ls()): CloudConfig | null {
  try {
    const raw = storage?.getItem(CLOUD_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw);
    if (c && typeof c.url === 'string' && typeof c.anonKey === 'string' && c.url && c.anonKey) return { url: c.url, anonKey: c.anonKey };
  } catch { /* ignore */ }
  return null;
}
export function saveCloudConfig(cfg: CloudConfig, storage: SyncStorage | null = ls()) {
  storage?.removeItem(LOCAL_ONLY_KEY);
  storage?.setItem(CLOUD_KEY, JSON.stringify({ url: cfg.url, anonKey: cfg.anonKey }));
}
/** Disconnect on purpose from inside the dashboard: this device then works on its own (local only). */
export function clearCloudConfig(storage: SyncStorage | null = ls()) { storage?.removeItem(CLOUD_KEY); storage?.setItem(LOCAL_ONLY_KEY, '1'); }
export const LOCAL_ONLY_KEY = 'bc:local-only';
/** True when someone chose, from inside the dashboard, to use this device without the cloud. */
export function isLocalOnly(storage: SyncStorage | null = ls()): boolean { try { return storage?.getItem(LOCAL_ONLY_KEY) === '1'; } catch { return false; } }
