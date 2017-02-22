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
  var role     = req.body.role;

  var location = {
    type: 'Point',
    coordinates: [req.body.lat, req.body.long]
  };

  var password = req.body.password;


  if (name === "" || surname === "" || email === "" || password === "" || role === "" ) {
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
      role,
      location,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
      	req.flash('error', 'The email address already exists' );
        res.render("auth/signup", { message: req.flash('error') });
      } else {
        passport.authenticate("local")(req, res, function () {
           res.redirect('/login');
        });
      }
    });
  });
});



router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
} ));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
