const { Router } = require('express');
const InfoController = require('../controllers/InfoController');
const infoAuthHandler = require('../middlewares/infoAuthHandler');

const router = Router();

router
	.get('/info/cities', infoAuthHandler, InfoController.listAllCities);

module.exports = router;