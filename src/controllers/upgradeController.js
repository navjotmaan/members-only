const db = require('../db/queries');
const { validationResult } = require('express-validator');

const showMembershipForm = (req, res) => {
    if (req.user.membership) {
        return res.redirect('/dashboard');
    }
    res.render('membership');
};

async function upgradeMembership(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('membership', { 
            errors: errors.array()
        });
    }

  try {
    if (req.body.code === '01583') {
      await db.upgradeMembership(req.user.id);
      res.redirect('/dashboard')
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error upgrading membership');
  }
}

module.exports = {
    showMembershipForm,
    upgradeMembership
};