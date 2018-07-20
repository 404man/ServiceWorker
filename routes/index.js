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

http.listen(8081, function() {
  console.log("listen on port 8081");
});