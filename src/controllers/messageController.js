const db = require('../db/queries');

const showMessageForm = (req, res) => {
  res.render('message');
};

async function createMessage(req, res) {
    try {
        const { title, message } = req.body;

        await db.createMessage(req.user.id, title, message);
        res.status(201).json('message created');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error creating message');
    }
}

async function getAllMessages(req, res) {
    const userId = req.user.id;
    const messages = await db.getAllMessages();
    res.render('dashboard', { userId, messages });
}

module.exports = {
    createMessage,
    showMessageForm,
    getAllMessages
};