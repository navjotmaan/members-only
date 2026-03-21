const { Router } = require('express');
const messageRouter = Router();
const validateUser = require('../validators/userValidator');

const messageController = require('../controllers/messageController');

messageRouter.get('/form', messageController.showMessageForm);
messageRouter.post('/add', validateUser.validateMessage, messageController.createMessage);

module.exports = messageRouter;