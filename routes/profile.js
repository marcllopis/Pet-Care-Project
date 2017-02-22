var express          = require('express');
var mongoose          = require('mongoose');
var router = express.Router();
var auth = require('../helpers/auth');
const Pet           = require("../models/pet");
const User           = require("../models/user");

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


  router.post('/profile', (req, res, next) => {
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
