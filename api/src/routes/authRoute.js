const { Router } = require('express');
const AuthController = require('../controllers/AuthController');

const router = Router();

router
	.post('/auth/signupAuth', AuthController.signupAuth);

module.exports = router;