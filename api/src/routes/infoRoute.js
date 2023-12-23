const { Router } = require('express');
const InfoController = require('../controllers/InfoController');
const infoAuthHandler = require('../middlewares/infoAuthHandler');

const router = Router();

router
	.get('/info/cities', infoAuthHandler, InfoController.listAllCities)
	.get('/info/unit-types', infoAuthHandler, InfoController.listAllUnitTypes);

module.exports = router;