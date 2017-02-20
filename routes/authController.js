var express          = require('express');
const passport       = require("passport");
const bcrypt         = require("bcrypt");
const User           = require("../models/user");

var router = express.Router();
const bcryptSalt     = 10;

/* GET users listing. */



router.get('/signup', function(req, res, next) {
  res.render('auth/signup', { "message": req.flash("error") });
});


router.post("/signup", (req, res, next) => {
  var name     = req.body.name;
  var surname  = req.body.surname;
  var email    = req.body.email;
  var address  = req.body.address;

  var location = {
    lat : req.body.lat,
    long: req.body.long
  };

  var password = req.body.password;
console.log(address);
console.log(location);

  if (name === "" || surname === "" || email === "" || password === "" ) {
  	req.flash('error', 'Indicate name, surname, email and password' );
    res.render("auth/signup", { "message": req.flash("error") });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
    	req.flash('error', 'The email already exists' );
      res.render("auth/signup", { message: req.flash("error") });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
      name,
      surname,
      email,
      address,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
      	req.flash('error', 'The email address already exists' );
        res.render("auth/signup", { message: req.flash('error') });
      } else {
        passport.authenticate("local")(req, res, function () {
           res.redirect('/secret');
        });
      }
    });
  });
});



router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
