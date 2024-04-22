const express = require('express');
const  createCategoryController  = require('../../../controllers/category-controller');
const upload = require('../../../middlewares/multer-middleware');

const router = express.Router();

router.post('/category/create', upload.single('image'),createCategoryController);

module.exports = router;