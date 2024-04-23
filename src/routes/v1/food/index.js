const express = require('express');
const router = express.Router();
const createFoodController = require('../../../controllers/food-controller');
const upload = require('../../../middlewares/multer-middleware');

const authMiddleware = require('../../../middlewares/auth-middleware');

router.post('/food/create', upload.single('image'), authMiddleware, createFoodController);

module.exports = router;