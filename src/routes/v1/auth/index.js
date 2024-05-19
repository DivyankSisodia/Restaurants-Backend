const express = require('express');
const { registerController, loginController, logoutController } = require('../../../controllers/auth-controller');
const upload = require('../../../middlewares/multer-middleware');

const router = express.Router();

//  http://localhost:3001/api/v1/auth/register
router.route("/auth/register").post(
    upload.single('profile'), // Make sure the field name matches what you're sending from Postman
    registerController
);

//  http://localhost:3001/api/v1/auth/login
router.post('/auth/login', loginController);

//  http://localhost:3001/api/v1/auth/logout
router.post('/auth/logout', logoutController);

module.exports = router;