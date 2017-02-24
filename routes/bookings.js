var express          = require('express');
var mongoose          = require('mongoose');
var router = express.Router();
var auth = require('../helpers/auth');
const Request           = require("../models/request");
const User           = require("../models/user");



router.get('/users/book', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
  res.render('booking/booktaker');
});

  router.post('/booking', (req, res, next) => {
    var  start = req.body.datefrom;
    var	 end = req.body.dateto;
    var  starttime = req.body.starttime;
    var  endtime = req.body.endtime;
    var  comment = req.body.comment;
    var  service = req.body.service;
    var  owner = req.user._id;
    var petcaretaker = req.body.takerid;
    var starttimeNumber = parseInt(starttime);
    var endtimeNumber = parseInt(endtime);
    var startNumber = parseInt(start.slice(8,10));
    var endNumber = parseInt(end.slice(8,10));
    var hours = 24;
    var numberofdays = 1;
    console.log(service);
    if (starttimeNumber > endtimeNumber) {hours = starttimeNumber - endtimeNumber;}
    else if (starttimeNumber < endtimeNumber) {hours = endtimeNumber - starttimeNumber;}
    else if (starttimeNumber === endtimeNumber) {hours = hours;}


    if (startNumber > endNumber) {numberofdays = startNumber - endNumber;}
    else if (startNumber < endNumber) {numberofdays = endNumber - startNumber;}
    else if (startNumber === endNumber) {numberofdays = numberofdays;}



      var newRequest = Request({
        start,
        end,
        starttime,
        endtime,
        hours,
        numberofdays,
        comment,
        service,
        owner,
        petcaretaker
      });
console.log(newRequest);
      newRequest.save((err, booking) => {
          if (err) {
              req.flash('error', 'Unable to save');
              res.render("auth/signup", {
                  message: req.flash('error')
              });
          } else {
            User.findByIdAndUpdate({_id: owner},{$push: { reservations: booking._id }}, (err) => {
                    if (err) {
                        console.log("GOT AN ERROR");
                        next(err);
                    } else {  User.findByIdAndUpdate({_id: petcaretaker},{$push: { reservations: booking._id }}, (err) => {
                              if (err) {
                                  console.log("GOT AN ERROR");
                                  next(err);
                              } else {Request
                                .findOne({_id: booking._id})
                                .populate("owner")
                                .populate("petcaretaker")
                                .exec((err, booking) => {
                                  if (err) {
                                    next(err);
                                    return;
                                  }
                                  console.log(booking);
                                res.render('booking/booktaker', {booking});
                                });}
                    });
        }
          });

      }
          });

})


router.get('/booking/:bookingId', auth.checkLoggedIn('You must be login', '/login'), (req, res, next) => {
  let bookingId = req.params.bookingId;
  Request.findById(bookingId, (err, booking) => {
    if (err) {  next(err); }
    console.log("HERE IS THE BOOKING");

    Request
      .findOne({_id: bookingId})
      .populate("petcaretaker")
      .exec((err, booking) => {
        if (err) {
          next(err);
          return;
        }
        console.log(booking);
        console.log(bookingId);
    res.render('booking/bookinginfo', { booking: booking });
  });
  });
});


module.exports = router;
