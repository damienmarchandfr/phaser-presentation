/**
 * Created by damien on 27/09/16.
 */
var express = require('express');
var path = require('path');
var app = express();
app.set('view engine', 'jade');
app.set('views', './views');

var http = require('http').Server(app);
http.listen(8080, "127.0.0.1");


//save assets
app.use('/games', express.static('games'));
app.use('/presentation', express.static('presentation'));
//js front lib
app.use('/js', express.static('bower_components'));

app.get('/', function (req, res) {
  res.render('index', {title: 'Hey', items: getRoutes(app)});
});

app.get('/presentation', function (req, res) {
  res.sendFile(path.join(__dirname + '/presentation/index.html'))
});

/**
 * How to create animation with canvas
 */
app.get('/animation/canvas', function (req, res) {
  res.sendFile(path.join(__dirname + '/games/animation-canvas/index.html'));
});


/**
 * How to create animation with phaser
 */
app.get('/animation/phaser', function (req, res) {
  res.sendFile(path.join(__dirname + '/games/animation-phaser/index.html'));
});


/**
 * Arcade presentation
 */
app.get('/collision/arcade', function (req, res) {
  res.sendFile(path.join(__dirname + '/games/collision-arcade/index.html'));
});

/**
 * P2 presentation
 */
app.get('/collision/p2', function (req, res) {
  res.sendFile(path.join(__dirname + '/games/collision-p2/index.html'));
});

/**
 * Tiles map presentation
 */
app.get('/tilemap', function (req, res) {
  res.sendFile(path.join(__dirname + '/games/tilemap/index.html'));
});


app.get('/pad', function (req, res) {
  res.sendFile(path.join(__dirname + '/games/tilemap/pad.html'));
});


function getRoutes(app) {
  var r = [];
  app._router.stack.forEach(function (route) {
    if (route.name === 'bound dispatch' && route.route) {
      r.push(route.route);
    }
  });
  return r;
}