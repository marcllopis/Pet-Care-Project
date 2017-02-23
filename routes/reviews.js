var express          = require('express');
var mongoose          = require('mongoose');
var router            = express.Router();
var auth = require('../helpers/auth');
const Request           = require("../models/request");
const User           = require("../models/user");
const Rating         =  require("../models/rating");

router.get('/reviews/:requestId', auth.checkLoggedIn('You must be login', '/login'), (req, res, next) => {
  let requestId = req.params.requestId;
  Request.findById(requestId, (err, booking) => {
    if (err) {  next(err); }
    Request
      .findOne({_id: requestId})
      .populate("petcaretaker")
      .exec((err, booking) => {
        if (err) {
          next(err);
          return;
        }
        console.log(users);
    res.render('booking/review', { booking });
      });
  });
});

  router.post('/createreview', (req, res, next) => {
    var  stars = req.body.stars;
    var	 evaluation = req.body.evaluation;
    var  owner = req.user._id;
    var  petcaretaker = req.body.petcaretaker;
    var  request = req.body.bookingId;

      var newReview = Rating({
        stars,
        evaluation,
        request,
        owner,
        petcaretaker
      });

      newReview.save((err, review) => {
          if (err) {
              req.flash('error', 'Unable to save');
              res.render("auth/signup", {
                  message: req.flash('error')
              });
          } else { User.findByIdAndUpdate({_id: owner},{$push: { reviews: review._id }}, (err) => {
                  if (err) {
                      console.log("GOT AN ERROR");
                      next(err);
                  } else {  User.findByIdAndUpdate({_id: petcaretaker},{$push: { reviews: review._id }}, (err) => {
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
                              res.render('dashboard/profile', {review});
                              });}
                  });
      }
        });
}
          });

})


module.exports = router;
