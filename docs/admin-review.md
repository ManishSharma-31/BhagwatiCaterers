# Owner dashboard review (Phase 2) and fixes

Scope: `apps/site/src/admin/**`. Verified with `tsc --noEmit`, `astro build --outDir /tmp/dist-admin`, and Playwright at 390px (local mode, script in /tmp/e2e2/run.py).

## (a) Findings

| Area | Problem | Sev | Fixed |
|---|---|---|---|
| Navigation | Today screen had no tab (reachable only via More) | Med | Yes (6 tabs: Today first) |
| Search | No global search | High | Yes (`/search`, topbar icon, More) |
| Leads | No duplicate-phone detection; phone stored as typed (+91, spaces) | High | Yes (warning + confirm; phones normalised to 10 digits on save) |
| Leads | List lacked phone, sort, "follow-up due" filter, paging (500+ rows) | Med | Yes |
| Validation | Past event date, guests not whole number, event/staff/settings phone, FSSAI/UPI format, payment date in future, overpayment, duplicate UPI reference | Med | Yes (soft warnings/confirm for dates; errors for format) |
| Events | New events from lead/quote silently defaulted to 100 guests (invented data) | Med | Yes (empty, must be typed) |
| Events | Staff double-booked on same day not flagged | Med | Yes |
| Quote flow | "Create event" offered again after event already exists | Med | Yes (opens existing) |
| Quotes | No search/sort/counts/paging | Med | Yes |
| Quote message | "x" multiplication, no UPI id, no terms, hidden chars in names, "उरलेली" vs "बाकी" | Low | Yes |
| Copy | No copy buttons for messages | Low | Yes (quote, lead, receipt, reminder, sheets, event) |
| Kitchen sheet | Could not try another guest count or add margin | High | Yes (guests override + 5/10/15% margin, not saved to event; no prices) |
| Receipts/reminders | No receipt or balance reminder | High | Yes (WhatsApp + copy; Payments, Today) |
| Today | Missing: today/tomorrow events, overdue tasks, unpaid past events, stale quotes, events lacking dishes/staff | High | Yes |
| Staff wages | No wage tracking | Med | Yes (additive optional `Payment.staffId`; month days x typed daily wage = estimate, paid, due) |
| Undo | Deletes were permanent | High | Yes (global undo toast for every delete, groups event+tasks) |
| Restore | Replace/merge could destroy data; only replace was confirmed; PIN overwritten by file | High | Yes (confirm both modes with counts, automatic pre-restore download, PIN of device kept, size cap, empty-file warning) |
| Clear all data | No safety copy | Med | Yes (auto download first) |
| Strings | English leaking in Marathi UI (quote status, payment kind/method on lead page, event quote status, Loading/Error) | Med | Yes |
| Strings | Inconsistent: जतन/सेव्ह, हटवा/काढा, उरलेली/बाकी, two spellings of अॅडव्हान्स, निश्चित/पक्के | Low | Yes |
| Empty states | Generic, no next step (leads, quotes, payments, search) | Low | Yes |
| Accessibility | 38px buttons/chips, no focus ring | Med | Yes (44px, focus-visible) |
| PIN | Never relocks; no forgot-PIN guidance; no keyboard | Med | Yes (relock after 5 min hidden, Lock now in More, help text, keyboard) |
| Offline/PWA | No offline indicator; storage may be evicted | Low | Yes (banner, `navigator.storage.persist()`) |
| Errors | Failed saves were silent (unhandled rejection) | Med | Yes (global error toast); cloud auth/server errors now shown in Settings |
| Security | CSV formula injection | Med | Yes (quote prefix) |
| Security | HTML rendering | - | No issue: Preact escapes, no innerHTML. WhatsApp text uses encodeURIComponent; phone digits only; control/bidi chars stripped |
| Secrets | Only the public publishable key in cloud-defaults.ts | - | OK |
| Cloud | Whole-record last-write-wins can lose edits made on two phones to the same record | Med | No |
| Events | Lead status not updated when an event is created/completed | Low | No |
| Perf | Every screen re-reads whole lists via useList; fine to ~1000 records, paging added to long lists only | Low | Partly |

## (b) Changed files (all under apps/site/src/admin)
New: `undo.ts`, `ui.tsx`, `screens/search/{index.tsx,logic.ts}`, `screens/staff/logic.ts`.
Edited: `App.tsx`, `admin.css`, `util.ts`, `types.ts` (Payment.staffId optional), `backup.ts`, `screens/leads/*`, `screens/quotes/*`, `screens/payments/*`, `screens/events/{EventDetail.tsx,labels.ts}`, `screens/sheets/index.tsx`, `screens/today/*`, `screens/staff/index.tsx`, `screens/settings/{BackupSection,BusinessSection,CloudSection,LockGate}.tsx`, plus string normalisation across screens. No stored field renamed or removed; no migration needed.

## (c) Recommended, not done
- Field-level merge for cloud conflicts (2-3 days).
- Set lead to confirmed/completed when an event is created/marked done (0.5 day).
- Per-day wage attendance (mark who worked, not just assigned) (1 day).
- Printable receipt/PDF and payment schedule per event (1 day).
- Indexed reads / one shared list cache for 2000+ records (1-2 days).
- Service worker precache of all hashed assets for first-offline-load (0.5 day).
- Native Marathi review of new strings by the owner (0.5 day).
- WhatsApp message length cap for very long menus (0.5 day).
- Reminders as push notifications (needs server; Phase 3).

## (d) Not verified
- Supabase/cloud mode (sandbox offline): auth-expiry and server-error messages are untested.
- Real WhatsApp opening (only the generated text/clipboard checked), real-device PWA install, offline reload after install, iOS Safari download/clipboard behaviour.
- Performance with 500+ records (not load-tested).
- Marathi glyph of "अॅडव्हान्स" showed a dotted-circle artifact in one headless screenshot; check on a phone.
- Print layouts not re-checked.
