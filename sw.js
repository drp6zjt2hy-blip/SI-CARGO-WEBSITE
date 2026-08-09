const CACHE = 'si-cargo-v1';
const FILES = [
  '/',
  '/index.html',
  '/tracking.html',
  '/about.html',
  '/contact.html',
  '/services.html',
  '/faq.html',
  '/css/style.css',
  '/js/main.js',
  '/js/layout.js',
  '/si.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
