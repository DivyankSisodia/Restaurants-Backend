const express = require('express');
const authMiddleware = require('../../../middlewares/auth-middleware');
const { getUserController , updateUserController, changeUserPasswordController, deleteUserController} = require('../../../controllers/user-controller');

const router = express.Router();

router.get('/user/getUser', authMiddleware, getUserController);

router.put('/user/updateUser', authMiddleware, updateUserController );

router.post('/user/changePassword', authMiddleware, changeUserPasswordController);

router.delete('/user/deleteUser', authMiddleware, deleteUserController);

module.exports = router;