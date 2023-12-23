const ApiError = require('../errors/ApiError');
const UserRepository = require('../repositories/UserRepository');
const { logger } = require('../utils/logger');

/**
 * Checks whether the user has the necessary role to access the route
 * @category Middlewares
 * @param { Array<String> } roleList list of roles
 */
const roleMiddleware = (roleList) => {

	/**
	 * @param { Promise<Request> } req request
	 * @param { Promise<Response> } res response
	 * @param { Promise<Function> } next next
	 * @returns { Promise<Function> } next middleware or controller
	 * @throws { ApiError<403> } If user is not authorized to perform this action
	 */
	return async (req, res, next) => {

		const userId = req.headers['user-id'];
	
		try {

			logger.trace('=== Checking if user is authorized to perform this action ===');

			logger.trace(`[ User id: ${userId}, Route: ${req.route.path}, Method: ${req.method} ]`);

			logger.trace(`[ Role list: ${roleList} ]`);
	
			const userRepository = new UserRepository();
	
			const userRoles = await userRepository.findUserRolesByIdUser(userId);
			
			logger.trace(`[ User roles: ${userRoles.map(role => role.name)} ]`);

			const userRolesList = userRoles.map(role => role.name);

			const userIsAuthenticated = userRolesList.some(role => roleList.includes(role));

			logger.trace(`=== User is authenticated: ${userIsAuthenticated} ===`);

			if (!userIsAuthenticated) throw ApiError.forbidden('User is not authorized to perform this action');
	
			return next();
	
		} catch (error) {
	
			logger.error(error);
	
			res.status(error.status).send({ message: error.message });
			
		}
	
	};

};

module.exports = roleMiddleware;
