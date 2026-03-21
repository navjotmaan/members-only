const { Router } = require('express');
const messageRouter = Router();
const validator = require('../validators/userValidator');

const messageController = require('../controllers/messageController');

messageRouter.get('/form', messageController.showMessageForm);
messageRouter.post('/add', validator.validateMessage, messageController.createMessage);

module.exports = messageRouter;