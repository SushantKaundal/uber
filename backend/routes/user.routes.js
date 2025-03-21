const express = require('express');
const router = express.Router();
const { UserMiddeware, AuthMiddleware } = require('../middlewares');
const { UserController } = require('../controllers');


router.post('/register',UserMiddeware.ValidateRegister,UserController.registerUser,);
router.post('/login',UserMiddeware.validateSignIn,UserController.loginUser);
router.get('/profile', AuthMiddleware.validateUser, UserController.getUserProfile);
router.get('/logout', AuthMiddleware.validateUser, UserController.logoutUser);


module.exports = router;