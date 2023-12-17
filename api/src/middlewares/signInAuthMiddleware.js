const ApiError = require('../errors/ApiError');
const AuthService = require('../services/AuthService');
const { logger } = require('../utils/logger');

/**
 * Checks if the user is logged in and authenticates their access token
 * @category Middlewares
 * @param { Promise<Request> } req request
 * @param { Promise<Response> } res response
 * @param { Promise<Function> } next next
 * @returns { Promise<Function> } next middleware or controller
 * @throws { ApiError<401> } If the access token is not valid, expired or does not exist
 */
module.exports = async (req, res, next) => {

	const token = req.headers.authorization;

	const companyId = req.headers['company-id'];

	try {

		if (!token) {
			throw ApiError.unauthorized('Access token is required');
		}
    
		const [, accessToken] = token.split(' ');

		const authService = new AuthService();

		const { id } = await authService.validateAccessToken(accessToken, parseInt(companyId));

		req.headers['user-id'] = id;

		return next();

	} catch (error) {

		logger.error(error);

		res.status(error.status).send({ message: error.message });
		
	}

};
