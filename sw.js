let cache_name = "my_cache_v1.0";

let filesToAdd = [
    "/",
    "sw.js",
    "index.html",
    "images/apple.png",
    "src/bible_kjv.json",
    "src/index_mobile.css",
    "src/index.css",
    "src/index.js",
    "src/jquery.js",
    "src/style.js",
    "src/verse_selector.js",
    "manifest.json",
    ];


// Install Service Worker
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil((async () => {
        const cache = await caches.open(cache_name);
        console.log('[Service Worker] Caching all: app shell and content');
        await cache.addAll(filesToAdd);
    })());
});


//  Fetch request
self.addEventListener('fetch', (e) => { // Fires when resourse is grabbed from local. If not in local adds needed file to local after download
    e.respondWith((async () => {
        const r = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (r) { return r; }
        const response = await fetch(e.request);
        const cache = await caches.open(cache_name);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response;
    })());
});