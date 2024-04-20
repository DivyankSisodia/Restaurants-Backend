const express = require('express');
const { registerController, loginController } = require('../../../controllers/auth-controller');
const upload = require('../../../middlewares/multer-middleware');

const router = express.Router();

//  http://localhost:3000/api/v1/auth/register
router.route("/auth/register").post(
    upload,
    registerController
);

//  http://localhost:3000/api/v1/auth/login
router.post('/auth/login', loginController);

module.exports = router;