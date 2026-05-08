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

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
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
