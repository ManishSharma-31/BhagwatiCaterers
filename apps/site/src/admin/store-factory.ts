// OWNED BY the cloud-sync agent. Default: local store. When Settings has a cloud config and the user is logged in,
// return the CloudStore instead (see docs/phase2-design.md and docs/supabase-setup.md).
import { LocalStore } from './local-store';
import type { Store } from './store';

export async function createStore(): Promise<Store> {
  const s = new LocalStore();
  await s.init();
  return s;
}
