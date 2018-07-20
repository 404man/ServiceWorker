
importScripts("https://www.gstatic.com/firebasejs/5.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.2.0/firebase-messaging.js");

firebase.initializeApp({'messagingSenderId': '988684450053'});
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  var notificationTitle = "Background Message Title";
  var notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png"
  };
  
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

this.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open("v4").then(cache =>
      cache.addAll([
        "/index.js",
        // '/socket.io/socket.io.js',
        "/index.html"
      ])
    )
  );
});
this.addEventListener("activate", function(event) {
  var cacheWhitelist = ["v4"];

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
        fetch(event.request.clone())
          .then(res => {
            if(!res || res.status !== 200 || res.type != 'basic'){
              return res;
            }
            var responseToCache = res.clone();
            caches.open("v4").then(cache => {
              cache.put(event.request, responseToCache);
            });
            return res;
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
