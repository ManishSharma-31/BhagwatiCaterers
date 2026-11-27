// Chooses where data lives. No cloud config in localStorage 'bc:cloud' => this phone only (LocalStore).
// Cloud configured => CloudStore. If nobody is signed in yet it starts "locked": LockGate shows the login form.
import { LocalStore } from './local-store';
import type { Store } from './store';
import { loadCloudConfig } from './cloud-config';
import { CloudStore, isCloudStore } from './cloud-store';

export async function createStore(): Promise<Store> {
  const cfg = loadCloudConfig();
  if (cfg) {
    const c = new CloudStore({ cfg });
    await c.init();
    return c;
  }
  const s = new LocalStore();
  await s.init();
  return s;
}

export type AuthState = 'local' | 'cloud-locked' | 'cloud-denied' | 'cloud-ready';
/** What LockGate should show for this store. */
export function getAuthState(store: Store): AuthState {
  if (!isCloudStore(store)) return 'local';
  const st = store.status();
  if (!st.signedIn) return 'cloud-locked';
  if (st.access === 'denied') return 'cloud-denied';
  return 'cloud-ready';
}
