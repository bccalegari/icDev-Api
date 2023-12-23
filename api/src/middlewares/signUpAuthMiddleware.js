const ApiError = require('../errors/ApiError');
const AuthService = require('../services/AuthService');
const { logger } = require('../utils/logger');

/**
 * Checks whether the user is affiliated with any company present in the application, and authenticates their register token
 * @category Middlewares
 * @param { Promise<Request> } req request
 * @param { Promise<Response> } res response
 * @param { Promise<Function> } next next
 * @returns { Promise<Function> } next middleware or controller
 * @throws { ApiError<401> } If the register token is not valid, expired or does not exist
 */
async function signUpAuthMiddleware (req, res, next) {

	const token = req.headers.authorization;

	const companyId = req.headers['company-id'];

	try {

		if (!token) {
			throw ApiError.unauthorized('Register token is required');
		}
    
		const [, registerToken] = token.split(' ');

		const authService = new AuthService();

		await authService.validateRegisterToken(registerToken, parseInt(companyId));

		return next();

	} catch (error) {

		logger.error(error);

		res.status(error.status).send({ message: error.message });
		
	}

}

module.exports = signUpAuthMiddleware;
