var User        = require('../models/user');
var jwt         = require('jsonwebtoken');
// var server   = require('./server');
// var io       = server.io;
var Config      = require('../../config');
var conf        = new Config();

var superUser   = conf.user;
var superPass   = conf.pass;
var superSecret = conf.secret;

module.exports = function(app, express, io) {
  var apiRouter = express.Router();
  // API ROUTES
  // ===============================================
  apiRouter.get('/', function(req, res) {
    res.json({
      message: 'Welcome to trainerWeb api'
    });
  });

  apiRouter.get('/dashboard', function(req, res) {
    res.json({
      message: 'Welcome to the dashboard'
    });
  });

  //  authenticate the user ======================
  apiRouter.post('/authenticate', function(req, res) {
    var user = new User();
    user.name = req.body.data.name;
    console.log('login request recieved');
    if(req.body.data.user == superUser && req.body.data.pass == superPass) {
      console.log('its a match');
      var token = jwt.sign({
        name: req.body.data.name,
        user: req.body.data.user
      }, superSecret, {
        expiresIn: '24h'
      });
      // io.sockets.emit('user_connected', {
      //   user: req.body.data.name
      // });
      user.save(function(err) {
        if(err) {
          console.log('error');
          return res.json({
            success: false,
            message: 'Unable to save user - something went wrong'
          });
        }
        console.log('success so far');
        res.json({
          success : true,
          name    : req.body.data.name,
          token   : token
        });
      });
    } else {
      console.log('not a match');
      res.json({
        success: false,
        message: 'something didn\'t add up'
      });
    }
  });

  return apiRouter;
}
