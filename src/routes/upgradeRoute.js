const { Router } = require('express');
const upgradeRouter = Router();
const validator = require('../validators/userValidator');

const upgradeController = require('../controllers/upgradeController');

upgradeRouter.post('/', validator.validateMembership, upgradeController.upgradeMembership);
upgradeRouter.get('/', upgradeController.showMembershipForm);

module.exports = upgradeRouter;