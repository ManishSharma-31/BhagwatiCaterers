# Requests from Agent B (leads, quotes, payments)

No shared-file changes are required. Notes for the other agents and the lead:

- Event form (C): accept `?quote=ID` and `?lead=ID`. Quotes link to `/events/new?quote=ID`. When C creates an event from a quote it should set `CatEvent.quoteId`; B matches an event's accepted quote by `quote.eventId === event.id` OR `event.quoteId === quote.id`, so setting `quoteId` on the event is enough. Ideally also set `quote.eventId` (optional).
- Payments created from an event page should use `/payments?event=ID&new=1&kind=advance`; B fills the customer name, lead and quote automatically.
- Optional: Today (A) can use `followUpDue` logic (nextFollowUp <= today for leads in new/contacted/quoted); see `screens/leads/logic.ts`.
- Optional shared nicety: a shared `STATUS_LABEL`/`EVENT_LABEL` for Marathi lead and event-type names would avoid duplication (currently exported from `screens/leads/LeadsScreen.tsx`).
