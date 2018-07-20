let express = require("express"),
  app = express();
(http = require("http").Server(app)), (io = require("socket.io")(http));

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.sendFile("index.html");
});

app.get("/pushToken", function(req, res) {
  console.log(req.query);
  res.send("hello");
});
// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('notification1', function(msg){
//     console.log(msg);
//      io.emit('notification1', msg);
//   });
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });
var admin = require("firebase-admin");

var serviceAccount = require(__dirname + "/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://weizhijie924.firebaseio.com"
});
var message = {
  data: {
    score: "850",
    time: "2:45"
  },
  token: "f9QfEfQRhJQ:APA91bHTkco3efc1JTeGu7BEGs700Ju3fD5K8EuVA2bkEB9FpAb587VknsH_uVx3IeflZxcIYT9Z1s1-fWwv_-jXMnN02mkXXEt6NpKvlutqz5yYToTMnAOMJyAU8-XFCPSfXcSrzlPf"
};
setInterval(function(){
  console.log(11);
  admin
  .messaging()
  .send(message, true)
  .then(response => {
    // Response is a message ID string.
    console.log("Successfully sent message:", response);
  })
  .catch(error => {
    console.log("Error sending message:", error);
  });
},60000)

http.listen(8081, function() {
  console.log("listen on port 8081");
});
