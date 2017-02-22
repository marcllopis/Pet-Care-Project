var express = require('express');
// const ensureLogin = require("connect-ensure-login");
var router = express.Router();
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;
var auth = require('../helpers/auth');
const User           = require("../models/user");
const Pet           = require("../models/pet");



router.get('/users/book', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
  res.render('booking/booktaker');
});


router.get('/profile', auth.checkLoggedIn('You must be login', '/login'), (req, res, next) => {
  // Pet
  //   .findOne({owner: req.user._id})
  //   .populate('owner')
  //   .exec((err, pets) => {
  //     if (err) {
  //       next(err);
  //       return;
  //     }
  // console.log(pets);
    User
      .findOne({_id: req.user._id})
      .populate("pets")
      .exec((err, user) => {
        if (err) {
          next(err);
          return;
        }
        console.log(user);
      });
  res.render('dashboard/profile', { users: req.user });
});



//route to show a list of users on the search page
router.get('/search/:format?', (req, res, next) => {

function locateUsers(location, resCallback){
  User.where('location')
    .near({ center: { coordinates: [location.lng, location.lat], type: 'Point' }, maxDistance: 2000 })

    .find((err, takers) => {
    if (err) {
      return next(err);
    }
    resCallback(takers)
  });
}

    if(req.params.format === "json"){
      //send params through ajax call
      let location = req.query
      locateUsers(location, function(takers){res.json(takers)});
    } else {
        let location = {
          lat: req.param('lat'),
          lng: req.param('long')
        };
        locateUsers(location, function(takers){res.render('map/search', {takers:takers, location: location});})
    }


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
