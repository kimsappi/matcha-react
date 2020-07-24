const fs = require('fs');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const config = require('./config.json');
const {authenticationMiddleware} = require('./modules/authentication');
//const pool = require('./modules/dbConnect');

// Routes
var routes = require('./routes/routes');

var app = express();

// view engine setup
app.engine('pug', require('pug').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: config.secret,
  cookie: {
    sameSite: false,
    httpOnly: false
  }
}));
app.use(cors());
app.use(authenticationMiddleware);

// -----------------------------------------------------------------------------
// Routes
// -----------------------------------------------------------------------------
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

// Creating required directories
if (!fs.existsSync('public/img/userPhotos'))
  fs.mkdirSync('public/img/userPhotos');

module.exports = app;
