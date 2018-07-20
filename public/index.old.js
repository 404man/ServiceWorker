if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(reg => {
      // console.log('scope is '+reg.scope);
      // reg.pushManager.subscribe({
      //   userVisibleOnly: true,
      // })
      const messaging = firebase.messaging();
      messaging.useServiceWorker(reg);
      getToken(messaging);
    })
    .catch(err => {
      console.log("fail" + err);
    });
}
function getToken(messaging) {

  messaging.onMessage(payload => {
    console.log('front', payload);
  })

  messaging.requestPermission().then(function () {
    // TODO(developer): Retrieve an Instance ID token for use with FCM.
    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.getToken().then(function (currentToken) {
      if (currentToken) {
        console.log(currentToken)
        fetch('/pushToken?token=' + currentToken).then(res => console.log(res));
        // sendTokenToServer(currentToken);
        // updateUIForPushEnabled(currentToken);
      } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
      }
    }).catch(function (err) {
      console.log('An error occurred while retrieving token. ', err);
    });
    // ...
  }).catch(function (err) {
    console.log('Unable to get permission to notify.', err);
  });
  // Callback fired if Instance ID token is updated.
  messaging.onTokenRefresh(function () {
    messaging.getToken().then(function (refreshedToken) {
      console.log('Token refreshed.');
      // Indicate that the new Instance ID token has not yet been sent to the
      // app server.
      fetch('/pushToken?token=' + refreshedToken).then(res => console.log(res));
      
      // ...
    }).catch(function (err) {
      console.log('Unable to retrieve refreshed token ', err);
    });
  });
}

