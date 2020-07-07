const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/services.controller');
const ReviewController = require('../controllers/reviews.controller');
const passport = require('passport');
const User = require('../models/users.model');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

passport.use(
  "local",
  new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },
    (req, email, password, done) => {
      User.findOne({
        email: email
      },
        function (err, user) {
          if (err) return done(err);

          if (!user)
            return done(null, false, {
              message: "Please check email and try again"
            });

          if (!bcrypt.compare(password, user.password))
            return done(null, false, {
              message: "Password incorrect"
            });

          return done(null, user);
        }
      );
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

router.get('/', (req, res) => {
  const user = req.user ? req.user : null
  res.render('index', { title: 'Staycation', user}); 
});

router.get('/signup', forwardAuthenticated, (req, res) => {
  res.render('signup', { title: 'Sign Up - StayCation' });
});

router.get('/login', forwardAuthenticated, (req, res) => {
  res.render('login', { title: 'Login - Staycation' }); 
});

router.get('/review/:services', [ServiceController.loadOne]);
router.get('/service', [ServiceController.loadAll]);
router.post('/review', [ensureAuthenticated, ReviewController.add]);
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.render('signup', {
      message: 'All field is required',
    });
  }

  User.findOne({ email: email }).then(async (user) => {
    if (user) {
      res.render('signup', {
        message: 'Email already exists'
      });
    } else {
      let newUser = new User({
        name,
        email,
        password
      });
      newUser = await newUser.save();
      console.log(newUser);
      res.render('login', {title: "Login - StayCation", sucesss: "Acount created, login now"});
    }
  });
});

// Login
router.post("/signin", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
}));
// router.post('/signin', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }), (req, res) => {
//     console.log(req.user);
//     res.redirect('/');
// });

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
  
module.exports = router;
