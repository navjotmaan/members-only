const { Router } = require('express');
const userRouter = Router();
const validateUser = require('../validators/userValidator');

const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');

userRouter.get('/', userController.showHomePage);

userRouter.get('/sign-up', userController.showSignUpForm);
userRouter.post('/sign-up', validateUser.validateSignUp, userController.createUser);

userRouter.get('/login', userController.showLogInForm);
userRouter.post('/login', validateUser.validateLogin, userController.checkLoginInfo);

userRouter.get('/logout', userController.logoutUser);
userRouter.get('/dashboard', userController.ensureAuthenticated, messageController.getAllMessages);

module.exports = userRouter;