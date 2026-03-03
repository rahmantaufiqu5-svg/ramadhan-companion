self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("ramadhan-cache").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/css/style.css",
        "/js/main.js",
        "/js/checklist.js",
        "/js/tilawah.js",
        "/js/theme.js"
      ]);
    })
  );
});