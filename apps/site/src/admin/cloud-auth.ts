// Supabase Auth over plain fetch: email + password, refresh tokens, session kept in localStorage.
// Tokens and passwords are never logged.
import { type CloudConfig, type SyncStorage } from './cloud-config';

export interface Session { access_token: string; refresh_token: string; expires_at: number; email?: string; user_id?: string }
export type SignInResult = { ok: true } | { ok: false; code: 'bad-credentials' | 'network' | 'rate-limit' | 'other' };
export const SESSION_KEY = 'bc:cloud:session';

export class NetError extends Error { constructor() { super('network'); } }

/** fetch with a timeout. Throws NetError when the network fails or times out. */
export async function fetchT(f: typeof fetch, url: string, init: RequestInit = {}, ms = 15000): Promise<Response> {
  const ctl = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer = ctl ? setTimeout(() => ctl.abort(), ms) : null;
  try { return await f(url, { ...init, signal: ctl?.signal }); }
  catch { throw new NetError(); }
  finally { if (timer) clearTimeout(timer); }
}

export interface AuthOpts { cfg: CloudConfig; fetch?: typeof fetch; storage?: SyncStorage | null; now?: () => number }

export class CloudAuth {
  private session: Session | null = null;
  private listeners = new Set<() => void>();
  private refreshing: Promise<boolean> | null = null;
  private f: typeof fetch;
  private storage: SyncStorage | null;
  private now: () => number;
  constructor(private o: AuthOpts) {
    this.f = o.fetch ?? ((...a) => fetch(...a));
    this.storage = o.storage === undefined ? (typeof localStorage !== 'undefined' ? localStorage : null) : o.storage;
    this.now = o.now ?? (() => Date.now());
    try {
      const raw = this.storage?.getItem(SESSION_KEY);
      if (raw) { const s = JSON.parse(raw); if (s?.refresh_token && s?.access_token) this.session = s; }
    } catch { /* ignore */ }
  }
  private headers() { return { apikey: this.o.cfg.anonKey, 'Content-Type': 'application/json' }; }
  private save(s: Session | null) {
    this.session = s;
    try { if (s) this.storage?.setItem(SESSION_KEY, JSON.stringify(s)); else this.storage?.removeItem(SESSION_KEY); } catch { /* ignore */ }
    this.listeners.forEach((cb) => cb());
  }
  private fromResponse(j: any, prevEmail?: string): Session {
    const nowSec = Math.floor(this.now() / 1000);
    return {
      access_token: j.access_token, refresh_token: j.refresh_token,
      expires_at: typeof j.expires_at === 'number' ? j.expires_at : nowSec + (Number(j.expires_in) || 3600),
      email: j.user?.email ?? prevEmail, user_id: j.user?.id,
    };
  }
  /** Signed in = we hold a refresh token (an offline phone with an expired access token still counts). */
  isSignedIn() { return !!this.session?.refresh_token; }
  email() { return this.session?.email; }
  userId() { return this.session?.user_id; }
  onChange(cb: () => void) { this.listeners.add(cb); return () => { this.listeners.delete(cb); }; }

  async signIn(email: string, password: string): Promise<SignInResult> {
    let r: Response;
    try {
      r = await fetchT(this.f, `${this.o.cfg.url}/auth/v1/token?grant_type=password`, { method: 'POST', headers: this.headers(), body: JSON.stringify({ email: email.trim(), password }) });
    } catch { return { ok: false, code: 'network' }; }
    if (r.status === 429) return { ok: false, code: 'rate-limit' };
    if (r.status === 400 || r.status === 401 || r.status === 422) return { ok: false, code: 'bad-credentials' };
    if (!r.ok) return { ok: false, code: 'other' };
    const j = await r.json().catch(() => null);
    if (!j?.access_token || !j?.refresh_token) return { ok: false, code: 'other' };
    this.save(this.fromResponse(j, email.trim()));
    return { ok: true };
  }

  /** Refresh the access token. Returns false only when the server says the session is no longer valid (then we sign out). */
  refresh(): Promise<boolean> {
    if (!this.session) return Promise.resolve(false);
    if (this.refreshing) return this.refreshing;
    const rt = this.session.refresh_token;
    const prevEmail = this.session.email;
    this.refreshing = (async () => {
      try {
        const r = await fetchT(this.f, `${this.o.cfg.url}/auth/v1/token?grant_type=refresh_token`, { method: 'POST', headers: this.headers(), body: JSON.stringify({ refresh_token: rt }) });
        if (r.status === 400 || r.status === 401 || r.status === 403 || r.status === 422) { this.save(null); return false; }
        if (!r.ok) return true; // server trouble: keep the session, try again later
        const j = await r.json().catch(() => null);
        if (!j?.access_token || !j?.refresh_token) return true;
        this.save(this.fromResponse(j, prevEmail));
        return true;
      } catch { return true; /* offline: keep the session */ }
      finally { this.refreshing = null; }
    })();
    return this.refreshing;
  }

  /** A usable access token, refreshing it first when it is about to expire. Null when signed out. */
  async getAccessToken(): Promise<string | null> {
    if (!this.session) return null;
    if (this.session.expires_at - Math.floor(this.now() / 1000) < 60) await this.refresh();
    return this.session?.access_token ?? null;
  }

  async signOut() {
    const tok = this.session?.access_token;
    this.save(null);
    if (tok) { try { await fetchT(this.f, `${this.o.cfg.url}/auth/v1/logout`, { method: 'POST', headers: { apikey: this.o.cfg.anonKey, Authorization: `Bearer ${tok}` } }, 5000); } catch { /* best effort */ } }
  }
}
