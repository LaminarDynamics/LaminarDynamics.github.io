var filesToAdd = [
    "./src/bible_kjv.json",
    "./src/index_mobile.css",
    "./src/index.css",
    "./src/index.js",
    "./src/jquery.js",
    "./src/style.js",
    "./src/verse_selector.js",
    "./index.html",
    "./manifest.json",
    "./sw.js"];

self.addEventListener("install", e => { // When service worker installed
    console.log("Installed");
    e.waitUntil(
        caches.open("static").then(cache => { // Promise to settle-Get stuff to cache
            return cache.addAll(filesToAdd);
            // return cache.addAll(["./", "./src/index.css", "./images/logo192.png", "./index.html", "./src/bible_kjv.json"]);
        })
    )
});

self.addEventListener("fetch", e => {
    console.log("Intercepting fetch request for : " + e.request.url);
    e.respondWith(
        caches.match(e.request).then(response => { // Check if items availible in cache before resorting to network
            return response || fetch(e.request); // response = cached ELSE fetch from network
        })
    );
})