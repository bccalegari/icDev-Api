const { Router } = require('express');
const AuthController = require('../controllers/AuthController');
const signupAuthMiddleware = require('../middlewares/signupAuthMiddleware');

const router = Router();

router
	.post('/auth/signupAuth', AuthController.signupAuth)
	.post('/auth/signup/:companyId', signupAuthMiddleware, AuthController.signup)
	.post('/auth/signin', AuthController.signin);

module.exports = router;