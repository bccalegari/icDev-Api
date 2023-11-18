const bcrypt = require('bcryptjs');
const UserRepository = require('../repositories/UserRepository');
const jwt = require('jsonwebtoken');
const ApiError = require('../errors/ApiError');
const CompanyRepository = require('../repositories/CompanyRepository');

/**
 * Auth Service Class
 * 
 * Responsible for handling all business logic in the user auth context
 */
class AuthService {

	/**
     * Class constructor
     * 
     * Instantiates all necessary repositories
     */
	constructor() {
		this.userRepository = new UserRepository();
		this.companyRepository = new CompanyRepository();
	}

	/**
     * Performs the user authentication to access
     * @param { String } login user login
     * @param { String } password user password
     * @returns { Promise <String> } jwt access token
     * @throws { ApiError<404> | ApiError<401> } If user is not found or password is invalid
     */
	async authenticate(login, password) {

		const user = await this.userRepository.findUserByLogin(login);

		if (!user) {
			throw ApiError.notFound('User not found');
		}

		if (!(await bcrypt.compare(password, user.password))) {
			throw ApiError.unauthorized('Invalid login or password');
		}

		const accessToken = jwt.sign({id: user.id}, user.company.apiKey.key, {expiresIn: 86400});

		return accessToken;

	}

	/**
	 * Performs user authentication to register
	 * @param { String } companyCode company code
	 * @returns { Promise <String> } jwt register token
	 * @throws { ApiError<404> | ApiError<400>  } If company is not found or company code is invalid
	 */
	async authenticateForRegister(companyCode) {

		const company = await this.companyRepository.findCompanyByCode(companyCode);

		if (!company) {
			throw ApiError.notFound('Invalid company code');
		}

		const registerToken = jwt.sign({id: company.id}, company.code, {expiresIn: 86400});

		return registerToken;
	}


	/**
	 * Perform user registration
	 * @param { Object } user user data
	 * @returns { Promise <Model> } user
	 * @throws { ApiError<400> } If user registration fails
	 */
	async register(user) {

		try {
			return await this.userRepository.insertUser(user);
		} catch (error) {
			throw ApiError.badRequest(error.message);
		}

	}

}

module.exports = AuthService;
