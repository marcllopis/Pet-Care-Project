var express = require('express');
// const ensureLogin = require("connect-ensure-login");
var router = express.Router();
var auth = require('../helpers/auth');
const User           = require("../models/user");

//route to show a list of users on the search page
router.get('/search', (req, res, next) => {
  User.find({}, (err, takers) => {

    if (err) { return next(err) }

    res.render('map/search', {
      takers: takers
    });
  });
});


router.get('/users/:takerId', auth.checkLoggedIn('You must be login', '/login'), (req, res, next) => {
  let takerId = req.params.takerId;
  User.findById(takerId, (err, takers) => {
    if (err) {  next(err); }
    console.log("here is the takers info");
    console.log(takers);
    console.log("-------------------------");
    res.render('takerInfo/taker', { takers: takers });
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
