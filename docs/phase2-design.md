# Phase 2: Owner Dashboard Design

_2026-11-27. Read this before touching `apps/site/src/admin/`._

## What it is
A phone-first web app at `/admin/` (installable as a PWA) for Shanti Lal Maharaj and staff to run the business: leads, quotes, events, tasks, kitchen sheets, staff and payments. Marathi first, English toggle. It is **not linked** from the public site, is `noindex`, and is excluded from the sitemap (robots.txt is not security).

## Storage: local first, cloud later
- **Local mode (default, no account needed):** data lives in IndexedDB on that device (`LocalStore`). Works offline. Risk: lost phone or cleared browser data means lost data, so Settings has JSON/CSV backup and the Today screen reminds the owner to back up weekly.
- **Cloud mode (optional):** Supabase (Postgres + Auth + row-level security) through `CloudStore`, shared by every device. Needs a free Supabase project created by the owner (`docs/supabase-setup.md`). Screens do not know which mode they are in; they only use the `Store` interface (`src/admin/store.ts`).
- **Security honesty:** the local PIN lock is a deterrent against casual snooping only, not strong security. Real protection is cloud mode with login and row-level security. Do not store secrets in the repo; the Supabase anon key is public by design and is protected by row-level security.

## Code map (`apps/site/src/admin/`)
| File | Purpose | Owner |
|---|---|---|
| `types.ts` | Data model (Lead, Quote, CatEvent, Task, Staff, Payment, MenuItem, Settings, Backup) | Lead (shared, read-only) |
| `store.ts`, `local-store.ts`, `hooks.ts`, `router.ts`, `util.ts`, `seed.ts`, `admin.css`, `App.tsx` | Shared foundation | Lead (shared, read-only) |
| `store-factory.ts`, `cloud-store.ts`, `screens/settings/*`, `screens/today/*` | Storage choice, cloud, lock/login, backup, Today summary | Agent A |
| `screens/leads/*`, `screens/quotes/*`, `screens/payments/*` | Leads, quotes, payments | Agent B |
| `screens/events/*`, `screens/tasks/*`, `screens/sheets/*`, `screens/staff/*` | Events, tasks, kitchen sheets, staff | Agent C |

Each screen folder has an `index.tsx` exporting the components the shell imports (see stubs). Put extra components, logic and CSS inside your own folder. Do **not** edit shared files; write change requests to `docs/phase2-requests-<A|B|C>.md`.

## Screen contract
Every screen is a Preact component `({ lang, route }: { lang: 'mr'|'en'; route: Route })`.
- Data: `useList('leads')`, `useItem('leads', id)`, `useStore().put/remove` (from `../../hooks`). `useList` returns `null` while loading.
- Text: `tr(lang, 'मराठी', 'English')` for every visible string. Marathi first and natural; no machine-translation tone.
- Navigation: `go('/leads/abc')` and `href('/leads/abc')` from `../../router`. Hash routes.
- Style: use classes in `admin.css` (`page card list list-item btn btn-ghost btn-sm field chips chip badge money table fab toolbar empty muted`). Extra CSS goes in your own `.css` file imported from your component, with class names prefixed by your screen (e.g. `.lead-`).
- Touch targets at least 44 px, readable on a phone, forms with labels, Marathi dates via `fmtDate`, money via `fmtMoney` (rupees, no paise).
- Printable views (quotes, kitchen sheets) use `no-print` / `print-only` classes and `window.print()`.
- Never invent data. No prices are pre-filled; the owner types them.

## Routes
| Route | Screen |
|---|---|
| `/` | Today (A) |
| `/leads`, `/leads/new`, `/leads/:id` | Leads list (B), lead form and detail (B) |
| `/quotes`, `/quotes/new?lead=ID` or `?event=ID`, `/quotes/:id` | Quotes list and editor (B) |
| `/payments`, `/payments?event=ID&new=1&kind=advance` | Payments (B). `event`, `lead` filter; `new=1` opens the add form |
| `/events`, `/events/new?lead=ID`, `/events/:id` | Calendar and list, event form prefilled from a lead, event detail (C) |
| `/sheets/:eventId` | Kitchen prep, shopping and packing sheets (C) |
| `/tasks`, `/tasks?event=ID` | Task checklists (C) |
| `/staff` | Staff (C) |
| `/settings` | Settings, lock, cloud, backup (A) |

## Cross-screen behaviour (agree on this exactly)
- **Lead to quote:** lead detail has "Create quote" linking to `/quotes/new?lead=ID`; the quote editor prefills name, phone, date, guests, town, order type from the lead. Saving a quote with status `sent` sets the lead to `quoted` if the lead was `new` or `contacted`.
- **Quote accepted to event:** accepting a quote sets the lead to `confirmed` and offers "Create event" (`/events/new?quote=ID`). The event form (C) accepts `?lead=ID` or `?quote=ID` and prefills.
- **Event detail (C)** shows: details, dishes, staff, tasks (with progress), linked quote, payments summary (received, expected total from the linked quote, balance) with a button to `/payments?event=ID&new=1`, and a link to `/sheets/ID`.
- **Money:** quote total = `guests * perPlate + sum(lines) - discount` (`quoteTotal` in `util.ts`). Payments with `direction:'in'` count as received.
- **Task templates (C):** creating an event offers a checklist template by event type (shopping, prep, packing, transport, service, cleanup, payment). Templates are suggestions the owner can edit.
- **Kitchen sheets (C):** built from the event's dishes and guest count. Per-dish quantities come from `MenuItem.perHundred` if the owner entered them; otherwise the sheet shows the dish with an editable quantity box and never invents quantities. Three print-friendly views: prep (by dish), shopping (ingredients totalled across dishes), packing (utensils and items checklist the owner can edit).

## Privacy
Customer names and phone numbers are personal data. Collect only what is needed, never log them to the console, never put them in URLs except record ids, and include them in backups only (user-initiated downloads).

## Testing
Pure logic goes in `.ts` files without JSX so it can be tested: bundle with `npx esbuild <file>.ts --bundle --platform=node --format=esm --outfile=/tmp/x.mjs` and run with node. Build check: `cd apps/site && npx astro build --outDir /tmp/dist-<agent>` (never the default `dist`; other agents build at the same time).

## Not in Phase 2
Payment gateway, SMS or WhatsApp Business API, accounting integration, customer login. (See `MASTER-PLAN.md`.)
