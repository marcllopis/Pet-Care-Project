var express = require('express');
// const ensureLogin = require("connect-ensure-login");
var router = express.Router();
var auth = require('../helpers/auth');
const User           = require("../models/user");


router.get('/search', (req, res, next) => {
  User.find({}, (err, takers) => {

    if (err) { return next(err) }

    res.render('map/search', {
      takers: takers
    });
  });
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search', function(req, res, next) {
  res.render('map/search', { title: 'Express' });
});

router.get('/secret', auth.checkLoggedIn('You must be login', '/signup'), function(req, res, next) {
  res.render('secret', { user: req.user });
});

router.get('/admin', auth.checkLoggedIn('You must be login', '/signup'), auth.checkCredentials('ADMIN'), function(req, res, next) {
  res.render('admin', { user: req.user });
});








module.exports = router;
