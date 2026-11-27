// PIN lock for local mode. A deterrent against casual snooping on a shared phone, NOT strong security.
// The PIN is hashed with PBKDF2 (WebCrypto) and a random salt; only the hash and salt are stored in Settings.

const ITER = 150000;
const enc = new TextEncoder();
export const PIN_MIN = 4, PIN_MAX = 6, MAX_TRIES = 5, LOCK_MS = 30000;

export const isValidPin = (pin: string) => /^\d{4,6}$/.test(pin);

const toB64 = (u: Uint8Array) => { let s = ''; u.forEach((b) => (s += String.fromCharCode(b))); return btoa(s); };
const fromB64 = (b: string) => Uint8Array.from(atob(b), (c) => c.charCodeAt(0));

export function makeSalt(): string { return toB64(crypto.getRandomValues(new Uint8Array(16))); }

/** Returns "pbkdf2$<iterations>$<base64 hash>". */
export async function hashPin(pin: string, saltB64: string, iterations = ITER): Promise<string> {
  const key = await crypto.subtle.importKey('raw', enc.encode(pin), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: fromB64(saltB64), iterations }, key, 256);
  return `pbkdf2$${iterations}$${toB64(new Uint8Array(bits))}`;
}

export async function verifyPin(pin: string, saltB64: string, stored: string): Promise<boolean> {
  const m = /^pbkdf2\$(\d+)\$(.+)$/.exec(stored || '');
  if (!m || !saltB64) return false;
  const again = await hashPin(pin, saltB64, Number(m[1]));
  const a = enc.encode(again), b = enc.encode(stored);
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

/** Wrong-try counter: 5 wrong tries => wait 30 seconds. */
export interface LockState { fails: number; lockedUntil: number }
export const freshLock = (): LockState => ({ fails: 0, lockedUntil: 0 });
export function registerFail(s: LockState, now: number): LockState {
  const fails = s.fails + 1;
  return fails >= MAX_TRIES ? { fails: 0, lockedUntil: now + LOCK_MS } : { fails, lockedUntil: s.lockedUntil };
}
/** Seconds left to wait (0 = can try). */
export const waitSeconds = (s: LockState, now: number) => Math.max(0, Math.ceil((s.lockedUntil - now) / 1000));

const LOCK_KEY = 'bc:pinLock', UNLOCK_KEY = 'bc:unlocked';
export function loadLock(): LockState {
  try { const j = JSON.parse(localStorage.getItem(LOCK_KEY) || ''); if (typeof j?.fails === 'number') return j; } catch { /* none */ }
  return freshLock();
}
export const saveLock = (s: LockState) => { try { localStorage.setItem(LOCK_KEY, JSON.stringify(s)); } catch { /* ignore */ } };
export const isUnlocked = () => { try { return sessionStorage.getItem(UNLOCK_KEY) === '1'; } catch { return false; } };
export const setUnlocked = (v: boolean) => { try { v ? sessionStorage.setItem(UNLOCK_KEY, '1') : sessionStorage.removeItem(UNLOCK_KEY); } catch { /* ignore */ } };
