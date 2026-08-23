/**
 * Daystack Service Worker (sw.js)
 * 
 * WHY IS THIS HERE?
 * Modern mobile browsers (specifically Chrome on Android) have strict security rules:
 * 1. They block standard browser-based notifications (new Notification()).
 * 2. They require a Service Worker (reg.showNotification()) to display any notification.
 * 3. They block Service Workers registered from 'blob:' or 'data:' URLs.
 * 
 * To support native background notifications on mobile while maintaining the app's 
 * minimalist philosophy, this physical sw.js file is required in the root directory.
 */

const CACHE_NAME = 'daystack-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        // Fetch from network in the background to keep the cache fresh
        const fetchPromise = fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          // Ignore network errors when fully offline
        });

        // Return cached response instantly if available, otherwise wait for the network
        return cachedResponse || fetchPromise;
      });
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if ('focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(self.registration.scope);
      }
    })
  );
});
