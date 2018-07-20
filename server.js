let express = require("express");
let  app = express();
let http = require("http").Server(app);
// let io = require("socket.io")(http);
// const bodyParser = require('body-parser');
const webPush = require('./routes/webPush.js');
// const upload = require('multer')(); // for parsing multipart/form-data
// const cookieParser = require('cookie-parser');

// app.use(bodyParser.json({ type: 'application/*+json' })); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// // parse some custom thing into a Buffer
// app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
// app.use(bodyParser.text({ type: 'text/html' }))

// app.use(cookieParser);
// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })
// Express 中提供静态文件
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.sendFile("index.html");
});

app.get("/pushToken", function(req, res) {
  console.log('pushToken',req.query);
  res.send("hello");
});

// app.route('/book')
//   .get(function(req, res) {
//     res.send('Get a random book');
//   })
//   .post(function(req, res) {
//     res.send('Add a book');
//   })
//   .put(function(req, res) {
//     res.send('Update the book');
//   });
app.use('/webPush', webPush);

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