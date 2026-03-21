const db = require('../db/queries');
const { validationResult } = require('express-validator');

const showMessageForm = (req, res) => {
  res.render('message');
};

async function createMessage(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('message', { 
        errors: errors.array(),
        oldInput: req.body
        });
    }

    try {
        const { title, message } = req.body;

        await db.createMessage(req.user.id, title, message);
        res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error creating message');
    }
}

async function getAllMessages(req, res) {
    try {
        const userId = req.user.id;
        const messages = await db.getAllMessages();
        res.render('dashboard', { userId, messages });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error getting messages');
    }
}

module.exports = {
    createMessage,
    showMessageForm,
    getAllMessages,
};