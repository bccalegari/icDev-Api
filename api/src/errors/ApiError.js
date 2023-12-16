const { ValidationError } = require('sequelize');

/**
 * Api Error Class
 * 
 * Handles exceptions and returns errors with http codes
 * @extends Error
 */
class ApiError extends Error {

	/**
	 * Api Error Class Constructor
	 * @param { String } status http code
	 * @param { String } message error message
	 */
	constructor (status, message) {
		super(message);
		this.status = status;
	}

	/**
	 * Bad Request Error
	 * 
	 * Default message is 'Bad Request'
	 * @param { String } message custom error message
	 * @returns { ApiError<400> } error with http code 400
	 */
	static badRequest(message='Bad Request') {
		return new ApiError(400, message);
	}

	/**
	 * Unauthorized Error
	 * 
	 * Default message is 'Unauthorized'
	 * @param { String } message custom error message
	 * @returns { ApiError<401> } error with http code 401
	 */
	static unauthorized(message='Unauthorized') {
		return new ApiError(401, message);
	}

	/**
	 * Forbidden Error
	 * 
	 * Default message is 'Forbidden'
	 * @param { String } message custom error message
	 * @returns { ApiError<403> } error with http code 403
	 */
	static forbidden(message='Forbidden') {
		return new ApiError(403, message);
	}

	/**
	 * Not Found Error
	 * 
	 * Default message is 'Not Found'
	 * @param { String } message custom error message
	 * @returns { ApiError<404> } error with http code 404
	 */
	static notFound(message='Not Found') {
		return new ApiError(404, message);
	}

	/**
	 * Internal Server Error Error
	 * 
	 * Default message is 'Internal Server Error'
	 * @param { String } message custom error message
	 * @returns { ApiError<500> } error with http code 500
	 */
	static internalServerError(message='Internal Server Error') {
		return new ApiError(500, message);
	}

	/**
	 * Handles errors to return to the controller
	 * @param { Error } error 
	 * @throws { ApiError<400> | ApiError<401> | ApiError<403> | ApiError<404> | ApiError<500> } If error is not an instance of ApiError
	 * @throws { ApiError<400> } If error is an instance of ValidationError
	 * @throws { ApiError<500> } If error is not an instance of ApiError or ValidationError
	 */
	static handleError(error) {

		if (error instanceof ApiError) {
			throw error;
		}

		if (error instanceof ValidationError) {
			throw ApiError.badRequest(error.message);
		}

		throw ApiError.internalServerError();
	}

}

module.exports = ApiError;
