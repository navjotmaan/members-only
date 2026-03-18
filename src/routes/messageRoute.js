const { Router } = require('express');
const messageRouter = Router();

const messageController = require('../controllers/messageController');

messageRouter.get('/form', messageController.showMessageForm);
messageRouter.post('/add', messageController.createMessage);

module.exports = messageRouter;