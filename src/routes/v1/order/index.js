const express = require('express');

const router = express.Router();

const {createOrder, getOrderDetails, updateOrder} = require('../../../controllers/order-controller');
const authMiddleware = require('../../../middlewares/auth-middleware');

router.post('/order/create',authMiddleware,createOrder);
router.get('/order/:userId', authMiddleware, getOrderDetails);
router.patch('/order/:orderId', authMiddleware, updateOrder);

module.exports = router;