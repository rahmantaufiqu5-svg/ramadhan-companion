const cacheName = "ramadhan-companion-v1";
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/main.js",
  "/js/checklist.js",
  "/js/tilawah.js",
  "/js/theme.js",
  "/js/prayer.js",
  "/js/muhasabah.js",
  "/js/stats.js"
];

self.addEventListener("install", e=>{
  e.waitUntil(
    caches.open(cacheName).then(cache=>cache.addAll(assets))
  );
});

self.addEventListener("fetch", e=>{
  e.respondWith(
    caches.match(e.request).then(resp=>resp||fetch(e.request))
  );
});
