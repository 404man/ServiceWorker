
var FILES = [
  "/index.js",
  // '/socket.io/socket.io.js',
  "/index.html"
];
var CACHENAME = 'v4';
var BLACKLIST = [];

this.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHENAME).then(cache =>
      cache.addAll(FILES)
    )
  );
});
this.addEventListener("activate", function(event) {
  var cacheWhitelist = [CACHENAME];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          if (cacheWhitelist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

this.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(
      res =>
        res ||
        fetch(event.request)
          .then(res => {
            if (!res || res.status !== 200 || res.type != "basic") {
              return res;
            }
            var shouldCache = res.ok;
            
            for (var i = 0; i < BLACKLIST.length; ++i) {
              var b = new RegExp(BLACKLIST[i]);
              if (b.test(event.request.url)) {
                shouldCache = false;
                break;
              }
            }

            if (event.request.method == "POST") {
              shouldCache = false;
            }

            if (shouldCache) {
              return caches.open(CACHENAME).then(function(cache) {
                cache.put(event.request, res.clone());
                return res;
              });
            } else {
              return res;
            }
            // var requestToCache = event.request.clone();
          })
          .catch(() => {
            caches.match(event.request);
          })
    )
  );
});
// self.addEventListener('push', (event) => {
//   console.log('Received a push event', event)
//   const options = {
//     title: 'I got a message for you!',
//     body: 'Here is the body of the message',
//     icon: '',
//     tag: 'tag-for-this-notification',
//   }
//   event.waitUntil(
//     self.registration.showNotification(title, options)
//   )
// })
