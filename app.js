var app, express, getimage, port, request;

express = require('express');

request = require('request');

getimage = require('./lib/getimage.js');

app = express();

app.get('/', function(req, res) {
  return res.send('hello');
});

app.get('/face/:q', function(req, res) {
  var q;
  q = req.param('q');
  return request("http://bing.com/images/search?qpvt=" + q + "&q=" + q + "&qft=+filterui:face-face&FORM=R5IR30", function(err, response, body) {
    var img_url, ok;
    ok = false;
    console.log(response.statusCode + ' - ' + err);
    if (!err && response.statusCode === 200) {
      img_url = getimage.get(body);
      console.log('url: ' + img_url);
      if (img_url) {
        ok = true;
      }
    }
    if (ok) {
      return res.redirect(img_url);
    } else {
      return res.status(500).send('500');
    }
  });
});

app.get('/flag/:q', function(req, res) {
  var q;
  q = req.param('q');
  q = q + '+national+flag';
  return request("http://bing.com/images/search?qpvt=" + q + "&q=" + q, function(err, response, body) {
    var img_url, ok;
    ok = false;
    console.log(response.statusCode + ' - ' + err);
    if (!err && response.statusCode === 200) {
      img_url = getimage.get(body);
      console.log('url: ' + img_url);
      if (img_url) {
        ok = true;
      }
    }
    if (ok) {
      return res.redirect(img_url);
    } else {
      return res.status(500).send('500');
    }
  });
});

app.get('/proxy', function(req, res) {
  var url;
  url = req.param('url');
  return request(url, function(err, response, body) {
    if (!err && response.statusCode === 200) {
      return res.send(body);
    } else {
      return res.status(500).send('500');
    }
  });
});

exports.app = app;

port = process.env.PORT || 5000;

app.listen(port);
