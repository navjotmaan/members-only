const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { validationResult } = require('express-validator');

const showSignUpForm = (req, res) => {
    res.render('sign-up');
};

async function createUser(req, res) { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('sign-up', { 
            errors: errors.array(),
            oldInput: req.body
        });
    }

    try {
        const { firstname, lastname, email, password } = req.body;
        const separator = email.indexOf('@');
        const username = email.slice(0, separator);
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.createUser(firstname, lastname, email, username, hashedPassword);
        res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error creating user');
    }
}

const showLogInForm = (req, res) => {
    res.render('login');
};

const logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

const checkLoginInfo = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('login', { 
      errors: errors.array(),
      oldInput: req.body
    });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err); 

    if (!user) {
      return res.render('login', { 
        authError: info.message,
        oldInput: req.body 
      });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect('/dashboard');
    });
  })(req, res, next); 
};

const showHomePage = (req, res) => {
    if (req.isAuthenticated()) {
       return res.redirect('/dashboard');
    }
    res.render('home');
};

module.exports = {
    createUser,
    showLogInForm,
    logoutUser,
    showHomePage,
    showSignUpForm,
    ensureAuthenticated,
    checkLoginInfo
};