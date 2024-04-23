const express = require('express');
const router = express.Router();
const { createFoodController, getAllFoodController, getSingleFoodController, searchFoodController } = require('../../../controllers/food-controller');
const upload = require('../../../middlewares/multer-middleware');

const authMiddleware = require('../../../middlewares/auth-middleware');

// create a food
router.post('/food/create', upload.single('image'), authMiddleware, createFoodController);

// get all foods
router.get('/food/all', getAllFoodController);

// get food by id
router.get('/food/get/:id', getSingleFoodController);

router.get('/food/search/:key', searchFoodController);

module.exports = router;