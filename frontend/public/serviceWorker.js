const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime-cache-v1';

const PRECACHE_URLS = [
    "/",
    "./index.html",
    "/styles/PetList.css",
    "/service-worker.js",
    "/images/favicon-96x96.png",
    "/images/web-app-manifest-192x192.png",
    "/images/web-app-manifest-512x512.png",
    "/manifest.json"
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(PRECACHE)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        }).then(() => self.clients.claim())
    );
});


self.addEventListener('fetch', event => {
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return caches.open(RUNTIME).then(cache => {
                    return fetch(event.request).then(response => {
                        return cache.put(event.request, response.clone()).then(() => {
                            return response;
                        });
                    });
                });
            })
        );
    }
});



self.addEventListener("push", (event) => {
    console.log('Potiskam obvestilo!');
    const title = "iPets";
    const options = {
        body: "Novo obvestilo!"
    };
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});