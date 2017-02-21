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
  const userName = req.session.currentUser.name;
  console.log("THIS IS THE USER LOGGED");
  console.log(userName);
  User.find({}, (err, users) => {

   if (err) { return next(err)}

    res.render('dashboard/profile', {
     users : userName

   });
 });
});


//route to show a list of users on the search page
router.get('/search/:format?', (req, res, next) => {
  User.find({},(err, takers) => {

    if (err) {
      return next(err);
    }

    if(req.params.format === "json"){
      res.json((takers));
    } else {
      console.log(takers);
    res.render('map/search', {takers:takers});
    }
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











module.exports = router;
