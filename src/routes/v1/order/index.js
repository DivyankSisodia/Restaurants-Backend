const express = require('express');

const router = express.Router();

const {createOrder, getOrderDetails, updateOrder} = require('../../../controllers/order-controller');
const authMiddleware = require('../../../middlewares/auth-middleware');

router.post('/order/create',createOrder);
router.get('/order/:userId', getOrderDetails);
router.patch('/order/:orderId', updateOrder);

module.exports = router;