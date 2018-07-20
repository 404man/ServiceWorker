if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(reg => {
      // console.log('scope is '+reg.scope);
      // reg.pushManager.subscribe({
      //   userVisibleOnly: true,
      // })
    })
    .catch(err => {
      console.log("fail" + err);
    });

  navigator.serviceWorker.ready
    .then(reg => {
      return reg.pushManager.getSubscription().then(function(subscription) {
        if (!subscription) {
          return subscribeUser(reg);
        } else {
          console.log("You have subscribed");
          return subscription;
        }
      });
    })
    .then(subscription => {
      var button = document.createElement("input");
      button.type = "button";
      button.id = "notify";
      button.value = "Send Notification";
      document.body.appendChild(button);
      document.getElementById("notify").addEventListener("click", function() {
        fetch("/webPush/sendNotification", {
          method: "post",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            subscription: subscription
          })
        });
      });
    });
}
async function subscribeUser(reg) {
  const response = await fetch("/webPush/vapidPublicKey");
  const vapidPublicKey = await response.text();
  const convertedVaipidKey = urlBase64ToUint8Array(vapidPublicKey);
  return reg.pushManager
    .subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVaipidKey
    })
    .then(function(subscription) {
      fetch("/webPush/register", {
        method: "post",
        headers: {
          "Content-type": "applicatcion/json"
        },
        body: JSON.stringify({
          subscription: subscription
        })
      });
      return subscription;
    })
    .catch(err => {
      console.log("Failed to subscribe the user:", err);
    });
}
// Utility function for browser interoperability
function urlBase64ToUint8Array(base64String) {
  var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
