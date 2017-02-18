const bcrypt        = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
let User 						= require('../models/user');

module.exports = {

	checkLoggedIn: function(message, route) {
	  return function(req, res, next) {
	    if (req.isAuthenticated()) {
				console.log('checkLoggedIn');
	      return next();
	    } else {
				console.log('checkLoggedInelse');
	    	req.flash('error', message )
	      res.redirect(route)
	    }
	  }
	},

	checkCredentials: function(role) {
	  return function(req, res, next) {
	    if (req.user.role === role) {
				console.log('checkCredentials');
	      return next();
	    } else {
					console.log('checkCredentialselse');
	    	req.flash('error', "you don't have permission" );
	      res.redirect('/login');
	    }
	  }
	},

	passport: function(passport) {
		passport.serializeUser((user, cb) => {
				console.log('passport');
		  cb(null, user);
		});

		passport.deserializeUser((user, cb) => {
		  User.findOne({ "_id": user._id }, (err, user) => {
		    if (err) {return cb(err); }
		    cb(null, user);
		  });
		});

		passport.use(new LocalStrategy({
	  		passReqToCallback: true
			}, (req, email, password, next) => {
			  User.findOne({ email }, (err, user) => {
			    if (err) {
							console.log('passport1');
			      return next(err);
			    }
			    if (!user) {
							console.log('passport2');
			      return next(null, false, { message: "Incorrect username" });
			    }
			    if (!bcrypt.compareSync(password, user.password)) {
							console.log('passport3');
			      return next(null, false, { message: "Incorrect password" });
			    }

			    return next(null, user);
			  });
			}));
	}

}
