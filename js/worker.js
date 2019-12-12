const CACHE = 'cache-and-update-v1';
const CACHED_FILES = [
    '/js/app.js',
    '/js/worker.js',
    '/js/Color.js',
    '/js/Game.js',
    '/js/Grid.js',
    '/js/Node.js',
    '/js/Popup.js',
    '/css/app.css',
    '/img/android-chrome-192x192.png',
    '/img/android-chrome-512x512.png',
    '/img/apple-touch-icon.png',
    '/img/favicon.ico',
    '/img/favicon-16x16.png',
    '/img/favicon-32x32.png',
    '/img/mstile-150x150.png',
    '/img/safari-pinned-tab.svg',
    '/index.html'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => cache.addAll(CACHED_FILES))
    );
});

self.addEventListener('activate', (event) => {
    console.log('activated');
});

self.addEventListener('fetch', (event) => {
    console.log('test1');
    event.respondWith(fromCache(event.request));
    event.waitUntil(update(event.request));
});

function fromCache(request) {
    return caches.open(CACHE).then((cache) =>
        cache.match(request).then((matching) => matching || Promise.reject('no-match'))
    );
}

function update(request) {
    return caches.open(CACHE).then((cache) =>
        fetch(request).then((response) =>
            cache.put(request, response)
        )
    );
}