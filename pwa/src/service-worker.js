// service-worker.js

const CACHE_NAME = 'mi-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/main.js',
  '/images/logo.png',
  // Agrega más URLs de recursos que deseas almacenar en caché
];

self.addEventListener('install', (event) => {
  // Realiza la instalación del Service Worker
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  // Intercepta las solicitudes de recursos y las sirve desde la caché si están disponibles
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si se encuentra en caché, se devuelve el recurso desde la caché
        if (response) {
          return response;
        }
        // Si no se encuentra en caché, se realiza una solicitud de red
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  // Elimina caches antiguos que ya no son necesarios
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
