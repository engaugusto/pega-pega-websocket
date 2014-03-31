var express = require('express')
  , app = express()
  , io = require('socket.io')
  , server = require('http').createServer(app);

io.listen(server);
server.listen(8083);

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/main.html');
});
