// Service Worker for charles1ding.github.io — PWA offline cache
const CACHE = 'charles-chem-v2';
const STATIC = [
  '/',
  '/index.html',
  '/past-papers.html',
  '/simulation-models.html',
  '/music.html',
  '/gaming.html',
  '/private-space.html',
  '/review-notes.html',
  '/study-tips.html',
  '/pearls-of-wisdom.html',
  '/training-routine.html',
  '/ai-applications.html',
  '/404.html',
  '/bg.webp',
  '/favicon.png',
  '/dark-mode.css',
  '/dark-mode.js',
  '/search-widget.js',
  '/search-index.json',
  '/gaming/element-match.html',
  '/gaming/periodic-quiz.html',
  '/gaming/speed-quiz.html',
];

// Install — cache static assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(STATIC))
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

// Fetch — network first for HTML, cache first for static assets
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  
  // HTML: network first, fallback to cache
  if (e.request.destination === 'document' || url.pathname.endsWith('.html')) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request).then(r => r || caches.match('/404.html')))
    );
    return;
  }
  
  // Static assets & images: cache first
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      });
    })
  );
});
