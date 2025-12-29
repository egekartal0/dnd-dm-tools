// Service Worker for offline support

const CACHE_NAME = 'dnd-dm-tools-v7';
const ASSETS = [
    '/',
    '/index.html',
    '/styles/main.css',
    '/styles/combat.css',
    '/styles/rules.css',
    '/styles/encounters.css',
    '/styles/notes.css',
    '/styles/generators.css',
    '/styles/dmscreen.css',
    '/styles/npc.css',
    '/styles/mapmaker.css',
    '/styles/spells.css',
    '/styles/shop.css',
    '/styles/quests.css',
    '/scripts/app.js',
    '/scripts/storage.js',
    '/scripts/combat.js',
    '/scripts/rules.js',
    '/scripts/encounters.js',
    '/scripts/notes.js',
    '/scripts/generators.js',
    '/scripts/dmscreen.js',
    '/scripts/npc.js',
    '/scripts/mapmaker.js',
    '/scripts/spells.js',
    '/scripts/shop.js',
    '/scripts/custom-entries.js',
    '/scripts/quests.js',
    '/data/rules-data.js',
    '/data/monsters-data.js',
    '/data/generators-data.js',
    '/data/npc-data.js',
    '/data/spells-data.js',
    '/manifest.json'
];

// Install event - cache assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching assets...');
                return cache.addAll(ASSETS);
            })
            .catch(err => console.log('Cache error:', err))
    );
    self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                return response || fetch(event.request)
                    .then(fetchResponse => {
                        // Cache new requests
                        if (fetchResponse.ok) {
                            const responseClone = fetchResponse.clone();
                            caches.open(CACHE_NAME)
                                .then(cache => cache.put(event.request, responseClone));
                        }
                        return fetchResponse;
                    });
            })
            .catch(() => {
                // Offline fallback
                if (event.request.mode === 'navigate') {
                    return caches.match('/index.html');
                }
            })
    );
});
