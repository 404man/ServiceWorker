const webpush = require('web-push');
var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
// //VAPID keys should only be generated only once.
// const vapidKeys = webpush.generateVAPIDKeys();
// console.log('key1:' + vapidKeys.publicKey, 'key2:' + vapidKeys.privateKey);
const vapidKeys = {
  publicKey:
    "BBWQGXtPKV1cNIPqxG5lXFcBLAIrxppq7AxHuIdzMpwuBm4XYvvhnCJf_tqrUSAOrp3Dh6ZzKRStzjzgkDZEP2c",
  privateKey: "lYjesBA7eVcVwCRjTr6YzJQ7fI3EK-02Sx7ryxwQcAg"
};

webpush.setVapidDetails(
  "mailto:404man@github.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get("/vapidPublicKey", function(req, res) {
  res.send(vapidKeys.publicKey);
});

router.post("/register", bodyParser.json(), function(req, res) {
  // A real world application would store the subscription info.
  console.log(req.body);
  res.sendStatus(200);
});

router.post("/sendNotification", bodyParser.json(), function(req, res) {
  console.log(req.body);
  const subscription = req.body.subscription;
  const payload = "payload";
  const options = null;

  webpush
    .sendNotification(subscription, payload, options)
    .then(function() {
      res.sendStatus(201);
    })
    .catch(function(error) {
      res.sendStatus(500);
      console.log(error);
    });
});

module.exports = router;