var express = require('express')
  , app = express()
  , server = require('http').createServer(app);

server.listen(8083);

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/main.html');
});
