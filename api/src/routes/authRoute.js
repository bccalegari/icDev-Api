const { Router } = require('express');
const AuthController = require('../controllers/AuthController');
const signupAuthMiddleware = require('../middlewares/signupAuthMiddleware');

const router = Router();

router
	.post('/auth/signupAuth', AuthController.signUpAuth)
	.post('/auth/signup/:companyId', signupAuthMiddleware, AuthController.signUp)
	.post('/auth/signin', AuthController.signIn);

module.exports = router;