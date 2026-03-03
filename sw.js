const cacheName = "ramadhan-companion-v1";
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/main.js",
  "/js/checklist.js",
  "/js/tilawah.js",
  "/js/muhasabah.js",
  "/js/stats.js",
  "/js/theme.js"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assets))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
