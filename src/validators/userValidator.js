const { body } = require('express-validator');
const db = require('../db/queries');

exports.validateSignUp = [
  body('firstname').trim()
    .isLength({ min: 1, max: 20 }).withMessage('Firstname must be between 1 and 20 characters'),

  body('lastname').trim()
    .isLength({ min: 1, max: 20 }).withMessage('Lastname must be between 1 and 20 characters'),

  body('email')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(), 
  
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .trim(),

  body('email').custom(async (value) => {
  const user = await db.checkEmail(value);
  if (user.length !== 0) {
    throw new Error('E-mail already in use');
  }
  }),

  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    })
];

exports.validateLogin = [
  body('email')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(), 
  
  body('password')
    .isLength({ min: 1 }).withMessage('Please enter a password')
    .trim()
];