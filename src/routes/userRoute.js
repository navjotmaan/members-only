const { Router } = require('express');
const userRouter = Router();
const passport = require('passport');

const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');

userRouter.get('/', userController.showHomePage);

userRouter.get('/sign-up', userController.showSignUpForm);
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

userRouter.get('/dashboard', userController.ensureAuthenticated, messageController.getAllMessages);

module.exports = userRouter;