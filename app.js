var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const portDB = require('./config').portDB;
const databaseName = require('./config').databaseName;
const session       = require("express-session");
const auth = require('./helpers/auth');
const passport = require('passport');
const flash = require("connect-flash");


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/petcare");

// routes
var index = require('./routes/index');
var authController = require('./routes/authController');
var profile = require('./routes/profile');
var bookings = require('./routes/bookings');
var reviews = require('./routes/reviews');

var app = express();

// view engine setup


app.use(expressLayouts);
app.set('layout', 'layouts/main');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// session
app.use(session({
  secret: "passport-local-strategy",
  resave: true,
  saveUninitialized: true,
  cookie           : { maxAge: 6000000 }

}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
auth.passport(passport);

app.use('/', authController);
app.use('/', index);
app.use('/', profile);
app.use('/', bookings);
app.use('/', reviews);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
