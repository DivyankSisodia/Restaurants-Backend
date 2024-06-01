const express = require('express');

const router = express.Router();

const {createOrder} = require('../../../controllers/order-controller');
const authMiddleware = require('../../../middlewares/auth-middleware');

router.post('/order/create', authMiddleware,createOrder);

module.exports = router;