var express          = require('express');
var mongoose          = require('mongoose');
var router = express.Router();
var auth = require('../helpers/auth');
const Pet           = require("../models/pet");
const User           = require("../models/user");
const Request           = require("../models/request");

router.get('/profile', auth.checkLoggedIn('You must be login', '/login'), (req, res, next) => {
    User
      .findOne({_id: req.user._id})
      .populate("pets")
      .populate("reservations")
      .exec((err, users) => {
        if (err) {
          next(err);
          return;
        }
        console.log(users);
      res.render('dashboard/profile', {users});
      });
});


  router.post('/profilepet', (req, res, next) => {
    var  name = req.body.petname;
    var	 description = req.body.description;
    var  typeOfAnimal = req.body.typeOfAnimal;
    var  age = req.body.age;
    var  gender = req.body.gender;
    var  healthInfo = req.body.healthInfo;
    var  owner = req.user._id;

      var newPet = Pet({
        name,
        description,
        typeOfAnimal,
        age,
        gender,
        healthInfo,
        owner
      });

      newPet.save((err, pet) => {
          if (err) {
              req.flash('error', 'Unable to save');
              res.render("auth/signup", {
                  message: req.flash('error')
              });
          } else {
              User.findByIdAndUpdate({_id: owner},{$push: { pets: pet._id }}, (err) => {
                      if (err) {
                          console.log("GOT AN ERROR");
                          next(err);
                      } else {res.redirect('/profile');}
            });
          }
      });
  });



module.exports = router;
