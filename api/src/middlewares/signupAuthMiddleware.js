const ApiError = require('../errors/ApiError');
const AuthService = require('../services/AuthService');
const { logger } = require('../utils/logger');

module.exports = async (req, res, next) => {

	const token = req.headers.authorization;

	const companyId = req.params.companyId;

	try {

		if (!token) {
			throw ApiError.unauthorized('Register token is required');
		}
    
		const [, registerToken] = token.split(' ');

		const authService = new AuthService();

		await authService.validateRegisterToken(registerToken, companyId);

		return next();

	} catch (error) {

		logger.error(error);

		res.status(error.status).send({ message: error.message });
		
	}

};
