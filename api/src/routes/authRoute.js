const { Router } = require('express');
const AuthController = require('../controllers/AuthController');
const signUpAuthMiddleware = require('../middlewares/signUpAuthMiddleware');

const router = Router();

router
	.post('/auth/signupAuth', AuthController.signUpAuth)
	.post('/auth/signup/', signUpAuthMiddleware, AuthController.signUp)
	.post('/auth/signin', AuthController.signIn);

module.exports = router;