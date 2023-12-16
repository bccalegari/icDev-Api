const bodyParser = require('body-parser');
const auth = require('./authRoute');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');

module.exports = app => {

	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
	
	app.use(
		'/v1',
		bodyParser.json(),
		auth
	);

};
