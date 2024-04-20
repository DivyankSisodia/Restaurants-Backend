const express = require('express');
const { registerController, loginController } = require('../../../controllers/auth-controller');

const router = express.Router();

router.post('/auth/register', registerController);
router.post('/auth/login', loginController);

module.exports = router;