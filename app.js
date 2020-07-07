var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var passport = require('passport');

const { router } = require('./config/admin');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const mongoose = require("mongoose");
const flash = require('connect-flash');

mongoose
  .connect('mongodb+srv://server:server@staycation.exex2.mongodb.net/test?retryWrites=true&w=majority', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { })
  .catch(error => {
    console.log(error);
  });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'staycationproject',
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/admin', router)
app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;
