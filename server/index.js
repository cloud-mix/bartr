const path = require('path');
const express = require('express');
const http = require('http');
const expressSession = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
// Socket io connection
const server = http.createServer(app);
const io = require('socket.io').listen(server);

io.on('connection', socket => {
  socket.on('join', data => {
    socket.join(data.name);
  });

  socket.on('sendId', data => {
    io.sockets.in(data.name).emit('fetchPeerId', data.peerId);
  });

  socket.on('leave', data => {
    socket.leave(data.name);
    io.sockets.in(data.name).emit('userLeft');
  })
});

// if (process.env.NODE_ENV === 'development') {
  app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
    res.header("Access-Control-Allow-Methods", 'GET, POST, PUT ,DELETE');
    next();
  });
// }

app.use(morgan());
// app.use(expressSession({secret: 'bigboost'}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/static')));

const router = require('./router');

app.use('/', router);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  } else {
    console.log(err)
    res.status(500).end('error unknown')
  }
});

app.set('port', (process.env.PORT));

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
