const { Router } = require('express');
const signInAuthMiddleware = require('../middlewares/signInAuthMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const CompanyController = require('../controllers/CompanyController');

const router = Router();

router
	.get('/company', signInAuthMiddleware, roleMiddleware(['Master']), CompanyController.listCompany)
	.put('/company/apikey/new', signInAuthMiddleware, roleMiddleware(['Master']), CompanyController.newApiKey);

module.exports = router;