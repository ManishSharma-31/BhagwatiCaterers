// Minimal offline support for the dashboard: network first, fall back to the last cached copy.
// Only handles same-origin GET requests under /admin/ and the hashed /_astro/ assets. Data is NOT cached here (it lives in IndexedDB / the API).
const CACHE = 'bc-admin-v1';
self.addEventListener('install', (e) => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['/admin/']).catch(() => {}))); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  if (!(url.pathname.startsWith('/admin/') || url.pathname.startsWith('/_astro/') || url.pathname.startsWith('/art/'))) return;
  e.respondWith(
    fetch(req).then((res) => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); } return res; })
      .catch(() => caches.match(req).then((hit) => hit || caches.match('/admin/')))
  );
});
