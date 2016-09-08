'use strict';

var express    = require('express');
var app        = express();
// var subdomain = require('express-subdomain');
var mongoose   = require('mongoose');
var path       = require('path');
var morgan     = require('morgan');
var bodyParser = require('body-parser');
var http       = require('http').Server(app);
var io         = require('socket.io').listen(http);
// var Twitter    = require('node-tweet-stream');
var Config     = require('./config');
var conf       = new Config();

// var tw = new Twitter({
//   consumer_key    : conf.twitter_consumer_key,
//   consumer_secret : conf.twitter_consumer_secret,
//   token           : conf.twitter_token,
//   token_secret    : conf.twitter_token_secret
// });

app.set('port', conf.port);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
app.use(express.static('src/views'));
app.use(express.static('.tmp'));

// mongoose.Promise = global.Promise;
// mongoose.connection.on('open', function() {
//   console.log('Connected to mongo server.');
// });
// mongoose.connection.on('error', function(err) {
//   console.log('Could not connect to mongo server!');
//   console.log(err);
// });
// mongoose.connect(conf.database);

// var apiRoutes = require('./src/routes/api')(app, express, io);
// app.use('/api', apiRoutes);

// var dashboardRouter = require('./src/routes/dashboard.js')(app, express, io);
// app.use(subdomain('dashboard', dashboardRouter));

// Set AngularJS entry point for HTML5 Mode
// ===============================================
app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/src/index.html'));
});

// var server = app.listen(app.get('port'), function() {
//   console.log('Express server listening on port ' + server.address().port);
// });

io.on('connection', function(socket) {
  console.log('*** Client Connected');
});

// Set up twitter stream tracking
// tw.track('pizza');
// tw.on('tweet', function(tweet) {
//   io.emit('tweet', tweet);
// });

http.listen(app.get('port'), function(err) {
  if(err) {
    console.log('Check your shizzle, unable to initialize server');
  }
  console.log('Server listening on port', http.address().port);
});

exports.io = io;

