const express = require('express');

const router = express.Router();

const {createOrder, getOrderDetails} = require('../../../controllers/order-controller');
const authMiddleware = require('../../../middlewares/auth-middleware');

router.post('/order/create',createOrder);
router.get('/order/:userId', getOrderDetails);

module.exports = router;