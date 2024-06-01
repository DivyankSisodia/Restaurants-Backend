const express = require('express');
const router = express.Router();

const v1AuthApiRoutes = require('./v1/auth/index');
const v1UserApiRoutes = require('./v1/user/index');
const v1RestaurantApiRoutes = require('./v1/restaurant/index');
const v1CategoryApiRoutes = require('./v1/category/index');
const v1FoodApiRoutes = require('./v1/food/index');
const v1OrderApiRoutes = require('./v1/order/index');

router.use('/v1', v1AuthApiRoutes);
router.use('/v1', v1UserApiRoutes);
router.use('/v1', v1RestaurantApiRoutes);
router.use('/v1', v1CategoryApiRoutes);
router.use('/v1', v1FoodApiRoutes);
router.use('/v1', v1OrderApiRoutes);

module.exports = router;