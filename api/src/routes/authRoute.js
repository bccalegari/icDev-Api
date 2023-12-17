const { Router } = require('express');
const AuthController = require('../controllers/AuthController');
const signupAuthMiddleware = require('../middlewares/signUpAuthMiddleware');

const router = Router();

router
	.post('/auth/signupAuth', AuthController.signUpAuth)
	.post('/auth/signup/', signupAuthMiddleware, AuthController.signUp)
	.post('/auth/signin', AuthController.signIn);

module.exports = router;