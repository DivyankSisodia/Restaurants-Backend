const express = require('express');
const { createCategoryController, getAllCategoryController, updateCategoryController, deleteCategoryController }  = require('../../../controllers/category-controller');
const upload = require('../../../middlewares/multer-middleware');
const authMiddleware = require('../../../middlewares/auth-middleware');

const router = express.Router();

router.post('/category/create', upload.single('image'), authMiddleware,createCategoryController);

router.get('/category/getAll', getAllCategoryController);

router.put('/category/update/:id',authMiddleware , updateCategoryController);

router.delete('/category/delete/:id', authMiddleware, deleteCategoryController);

module.exports = router;