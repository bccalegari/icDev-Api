const ApiError = require('../errors/ApiError');
const AuthService = require('../services/AuthService');
const { logger } = require('../utils/logger');

/**
 * Checks if the user has an register token or a access token and validates it
 * @category Middlewares
 * @param { Promise<Request> } req request
 * @param { Promise<Response> } res response
 * @param { Promise<Function> } next next
 * @returns { Promise<Function> } next middleware or controller
 * @throws { ApiError<401> } If the register or access token is not valid, expired or does not exist
 */
async function infoAuthHandler (req, res, next) {

	const token = req.headers.authorization;

	const companyId = req.headers['company-id'];

	try {

		if (!token) {
			throw ApiError.unauthorized('Register or Access token is required');
		}
    
		const [tokenName, tokenCode] = token.split(' ');

		const registerToken = tokenName === 'registerToken' ? tokenCode : null;

		const accessToken = tokenName === 'accessToken' ? tokenCode : null;

		if (!registerToken && !accessToken) {
			throw ApiError.unauthorized('Invalid token name');
		} else if (registerToken) {
			
			const authService = new AuthService();

			await authService.validateRegisterToken(registerToken, parseInt(companyId));

		} else if (accessToken) {
			
			const authService = new AuthService();

			const { id } = await authService.validateAccessToken(accessToken, parseInt(companyId));

			req.headers['user-id'] = id;
		}

		return next();

	} catch (error) {

		logger.error(error);

		res.status(error.status).send({ message: error.message });
		
	}

}

module.exports = infoAuthHandler;
