var app, express, port;

express = require('express');

app = express();

app.get('/', function(req, res) {
  return res.send('hello');
});

port = process.env.PORT || 5000;

app.listen(port);
