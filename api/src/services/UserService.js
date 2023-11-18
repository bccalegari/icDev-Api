const bcrypt = require('bcryptjs');
const UserRepository = require('../repositories/UserRepository');
const jwt = require('jsonwebtoken');
const ApiError = require('../errors/ApiError');

/**
 * User Service Class
 * 
 * Responsible for handling all business logic in the user context
 */
class UserService {

	/**
     * Class constructor
     * 
     * Instantiates all necessary repositories
     */
	constructor() {
		this.userRepository = new UserRepository();
	}

	/**
     * Performs the user authentication
     * @param { String } login user login
     * @param { String } password user password
     * @returns { Promise <String> } jwt token
     * @throws { ApiError<400> | ApiError<401> } If user is not found or password is invalid
     */
	async authenticate(login, password) {

		const user = await this.userRepository.findUserByLogin(login);

		if (!user) {
			return ApiError.badRequest('Invalid login');
		}

		if (!(await bcrypt.compare(password, user.password))) {
			throw ApiError.unauthorized('Invalid password');
		}

		const token = jwt.sign({id: user.id}, user.company.apiKey.key, {expiresIn: 86400});

		return token;

	}

}

module.exports = UserService;
