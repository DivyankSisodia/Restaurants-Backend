const express = require('express');
const router = express.Router();

const v1AuthApiRoutes = require('./v1/auth/index');
const v1UserApiRoutes = require('./v1/user/index');
const v1RestaurantApiRoutes = require('./v1/restaurant/index');

router.use('/v1', v1AuthApiRoutes);
router.use('/v1', v1UserApiRoutes);
router.use('/v1', v1RestaurantApiRoutes);

module.exports = router;