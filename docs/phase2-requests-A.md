# Change requests from Agent A (cloud, lock, settings, today)

No change to shared files is required. Notes for the lead:

1. `types.ts` Settings.cloud is not used. The cloud URL and key live only in localStorage `bc:cloud` (the Settings record is inside the store that needs them). Please leave the field unused or remove it.
2. `public/admin/sw.js` (service worker): make sure it does NOT cache requests to `*.supabase.co` (network only). Cached API responses could show old data or old login results. Needs a check by whoever owns sw.js.
3. Optional: in `App.tsx` the top bar could show a sync warning using `isCloudStore(store) && store.status().pending > 0` (exported from `cloud-store.ts`). Not required.
4. Cross-agent: the Today screen links "Add payment" to `/payments?new=1` (no event). Agent B's Payments screen should open the add form for `new=1` even without `event`.
5. Cloud table `records.id` is `text`, not uuid, because Settings uses the fixed id `main` and `newId()` may fall back to non-uuid ids.
