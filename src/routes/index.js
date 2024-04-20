const express = require('express');
const router = express.Router();

const v1AuthApiRoutes = require('./v1/auth/index');
const v1UserApiRoutes = require('./v1/user/index');

router.use('/v1', v1AuthApiRoutes);
router.use('/v1', v1UserApiRoutes);

module.exports = router;