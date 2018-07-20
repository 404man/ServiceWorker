var FILES = [
  // "/index.js",
  // '/socket.io/socket.io.js',
  // "/index.html"
];
var CACHENAME = "v4";
var BLACKLIST = [];

this.addEventListener("install", function(event) {
  event.waitUntil(caches.open(CACHENAME).then(cache => cache.addAll(FILES)));
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

// this.addEventListener("fetch", function(event) {
//   event.respondWith(
//     caches.match(event.request).then(
//       res =>
//         res ||
//         fetch(event.request)
//           .then(res => {
//             if (!res || res.status !== 200 || res.type != "basic") {
//               return res;
//             }
//             var shouldCache = res.ok;

//             for (var i = 0; i < BLACKLIST.length; ++i) {
//               var b = new RegExp(BLACKLIST[i]);
//               if (b.test(event.request.url)) {
//                 shouldCache = false;
//                 break;
//               }
//             }

//             if (event.request.method == "POST") {
//               shouldCache = false;
//             }

//             if (shouldCache) {
//               return caches.open(CACHENAME).then(function(cache) {
//                 cache.put(event.request, res.clone());
//                 return res;
//               });
//             } else {
//               return res;
//             }
//             // var requestToCache = event.request.clone();
//           })
//           .catch(() => {
//             caches.match(event.request);
//           })
//     )
//   );
// });

//Respond to a server push with a user notification
self.addEventListener("push", function(event) {
  if ("granted" === Notification.permission) {
    var payload = event.data ? event.data.text() : "no payload";
    const promiseChain = self.registration.showNotification("Sample PWA", {
      body: payload,
      icon: "images/chrome/chrome-extensionmanagementpage-48-48.png"
    });
    //Ensure the toast notification is displayed before exiting this function
    event.waitUntil(promiseChain);
  }
});

//Respond to the user clicking the toast notification
self.addEventListener("notificationclick", function(event) {
  console.log("On notification click: ", event.notification.tag);
  event.notification.close();

  // This looks to see if the current is already open and focuses it
  event.waitUntil(
    clients
      .matchAll({
        type: "window"
      })
      .then(function(clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url == "http://localhost:8081/" && "focus" in client)
            return client.focus();
        }
        if (clients.openWindow) return clients.openWindow("/");
      })
  );
});
