const db = require('../db/queries');
const bcrypt = require('bcryptjs');

const showSignUpForm = (req, res) => {
    res.render('sign-up');
};

async function createUser(req, res) {
    try {
        const { firstname, lastname, email, password } = req.body;
        const separator = email.indexOf('@');
        const username = email.slice(0, separator);
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.createUser(firstname, lastname, email, username, hashedPassword);
        res.status(201).json('user created');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error creating user');
    }
}

const showLogInForm = (req, res) => {
    res.render('login');
};

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

module.exports = {
    createUser,
    showLogInForm,
    showSignUpForm,
    ensureAuthenticated
};