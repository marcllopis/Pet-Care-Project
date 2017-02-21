var express = require('express');
// const ensureLogin = require("connect-ensure-login");
var router = express.Router();
var auth = require('../helpers/auth');
const User           = require("../models/user");



router.get('/users/book', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
  res.render('booking/booktaker');
});

router.get('/profile', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
  res.render('dashboard/profile');
});

router.get('/profile', (req, res, next) => {
  const users = req.session.currentUser.name;
  console.log("THIS IS THE USER LOGGED");
  console.log(users);
  User.find({}, (err, users) => {

   if (err) { return next(err)}

    res.render('dashboard/profile', {
     users : users

   });
 });
});


//route to show a list of users on the search page
router.get('/search/:format?', (req, res, next) => {
  console.log(req.params)
  User.find({},(err, takers) => {

    if (err) {
      return next(err);
    }

    let location = {
      lat: req.param('lat'),
      lng: req.param('long')
    };


    if(req.params.format === "json"){
      res.json((takers));
    } else {
    res.render('map/search', {takers:takers, location: location});
    }
  });
});





router.get('/users/:takerId', auth.checkLoggedIn('You must be login', '/login'), (req, res, next) => {
  let takerId = req.params.takerId;
  User.findById(takerId, (err, takers) => {
    if (err) {  next(err); }

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











module.exports = router;
