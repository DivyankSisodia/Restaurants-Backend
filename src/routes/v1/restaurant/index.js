const express = require('express');
const upload = require('../../../middlewares/multer-middleware');
const authMiddleware = require('../../../middlewares/auth-middleware');
const { createRestaurantController, getAllRestaurantsController, getRestaurantByIdController, deleteRestaurantController } = require('../../../controllers/restaurant-controller');

const router = express.Router();

// Create a restaurant
router.post('/restaurant/create', upload.single('imageUrl'), async (req, res) => {
    createRestaurantController(req, res);
});

// Get all restaurants
router.get('/restaurant/all', getAllRestaurantsController);

// get restaurant by id
router.get('/restaurant/get/:id', getRestaurantByIdController);

// delete restaurant by id
router.delete('/restaurant/delete/:id', authMiddleware, deleteRestaurantController);

module.exports = router;