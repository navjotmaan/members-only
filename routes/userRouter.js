const { Router } = require('express');
const userRouter = Router();
const passport = require('passport');

const userController = require('../controllers/userController');

userRouter.get('/', userController.showSignUpForm);
userRouter.post('/sign-up', userController.createUser);
userRouter.get('/login', userController.showLogInForm);

userRouter.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
}));

userRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

userRouter.get('/dashboard', userController.ensureAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.user });
});

module.exports = userRouter;