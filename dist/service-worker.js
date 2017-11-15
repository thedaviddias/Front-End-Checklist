// importScripts('/cache-polyfill.js');
'use strict';

var version = 'v1::';

self.addEventListener("install", function(event) {
  // console.log('WORKER: install event in progress.');
  event.waitUntil(
    /* The caches built-in is a promise-based API that helps you cache responses,
       as well as finding and deleting them.
    */
    caches
      /* You can open a cache by name, and this method returns a promise. We use
         a versioned cache name here so that we can remove old cache entries in
         one fell swoop later, when phasing out an older service worker.
      */
      .open(version + 'fundamentals')
      .then(function(cache) {
        /* After the cache is opened, we can fill it with the offline fundamentals.
           The method below will add all resources we've indicated to the cache,
           after making HTTP requests for each of them.
        */
        return cache.addAll([
          '/',
          '/index.html',
          '/styles/main.min.css',
          '/scripts/app.bundle.js'
        ]);
      })
      .then(function() {
        // console.log('WORKER: install completed');
      })
  );
});
