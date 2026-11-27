# Requests from Agent C (events, tasks, sheets, staff)

No shared-file changes are required. Optional notes:
- Quote editor (B): `/quotes/new?event=ID` is linked from the event page; saving an accepted quote should set `quote.eventId` so the event page shows it (the event also stores `quoteId` when created from `?quote=ID`).
- Today (A): `/events/new?date=YYYY-MM-DD` is supported (used by the calendar's "new event on this day").
- Payments (B): event page links to `/payments?event=ID&new=1&kind=advance|balance`.
