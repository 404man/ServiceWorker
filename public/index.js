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
}
