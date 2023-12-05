const bcrypt = require('bcryptjs');
const UserRepository = require('../repositories/UserRepository');
const { sign, verify } = require('jsonwebtoken');
const ApiError = require('../errors/ApiError');
const CompanyRepository = require('../repositories/CompanyRepository');
const CityRepository = require('../repositories/CityRepository');
const { ValidationError } = require('sequelize');
const { logger } = require('../utils/logger');

/**
 * Auth Service Class
 * 
 * Responsible for handling all business logic in the user auth context
 */
class AuthService {

	/**
	 * User Repository
     * @private
     * @constant
     * @type { Object }
     */
	#userRepository;

	/**
	 * Company Repository
     * @private
     * @constant
     * @type { Object }
     */
	#companyRepository;

	/**
	 * City Repository
     * @private
     * @constant
     * @type { Object }
     */
	#cityRepository;

	/**
     * Class constructor
     * 
     * Instantiates all necessary repositories
     */
	constructor() {
		this.#userRepository = new UserRepository();
		this.#companyRepository = new CompanyRepository();
		this.#cityRepository = new CityRepository();
	}

	/**
     * Performs the user authentication to access
     * @param { String } login user login
     * @param { String } password user password
     * @returns { Promise <String> } jwt access token
     * @throws { ApiError<404> | ApiError<401>, | ApiError<500> } If user is not found, password is invalid or something goes wrong
     */
	async authenticate(login, password) {

		logger.trace('=== Authenticating user ===');

		logger.trace(`[ Login: ${login}, password: ${password} ]`);

		try {

			if (!login || !password) {
				throw ApiError.badRequest('Login and password are required');
			}
	
			const user = await this.#userRepository.findUserByLogin(login);
	
			if (!user) {
				throw ApiError.notFound('User not found');
			}
	
			if (!(await bcrypt.compare(password, user.password))) {
				throw ApiError.unauthorized('Invalid login or password');
			}
	
			const accessToken = sign({ id: user.id }, user.company.apiKey.key, { expiresIn: 86400 });
			
			logger.trace('=== User authenticated to login ===');
			logger.trace(`[ Access token: ${accessToken} ]`);
	
			return accessToken;
			
		} catch (error) {

			logger.error(error);

			if (error instanceof ValidationError) {
				throw ApiError.badRequest(error.message);
			}

			if (!(error instanceof ApiError)) {
				throw ApiError.internalServerError();
			}

			throw error;

		}

	}

	/**
	 * Performs user authentication to register
	 * @param { String } companyCode company code
	 * @returns { Promise <String> } jwt register token
	 * @throws { ApiError<400> | ApiError<404> | ApiError<500> } If company code is invalid, company is not found or something goes wrong
	 */
	async authenticateForRegister(companyCode) {

		logger.trace('=== Authenticating user for register ===');

		logger.trace(`[ Company code: ${companyCode} ]`);

		try {

			if (!companyCode) {
				throw ApiError.badRequest('Company code is required');
			} 
	
			if (companyCode.length !== 16) {
				throw ApiError.badRequest('Company code must be 16 characters long');
			}
	
			const company = await this.#companyRepository.findCompanyByCode(companyCode);
	
			if (!company) {
				throw ApiError.notFound('Invalid company code');
			}
	
			const registerToken = sign({}, company.code, { expiresIn: 86400 });

			logger.trace('=== User authenticated for register ===');
			logger.trace(`[ Register token: ${registerToken} ]`);
	
			return registerToken;
			
		} catch (error) {

			logger.error(error);

			if (error instanceof ValidationError) {
				throw ApiError.badRequest(error.message);
			}

			if (!(error instanceof ApiError)) {
				throw ApiError.internalServerError();
			}

			throw error;

		}
		
	}

	/**
	 * Validates the register token
	 * @param { String } registerToken 
	 * @param { String } companyId
	 * @returns { Promise<Boolean> } Is authenticated ?
	 * @throws { ApiError<401> | ApiError<500> } If register token is invalid, company is not found or something goes wrong
	 */
	async validateRegisterToken(registerToken, companyId) {

		logger.trace('=== Validating register token ===');
		logger.trace(`[ Company id: ${companyId}, register token: ${registerToken} ]`);

		try {

			const company = await this.#companyRepository.findCompanyById(companyId);

			if (!company) {
				throw ApiError.unauthorized('Invalid register token');
			}

			verify(registerToken, company.code);

			logger.trace('=== Register token valited ===');

			return true;

		} catch (error) {

			throw ApiError.unauthorized('Invalid register token');
		}

	}

	/**
	 * Perform user registration
	 * @param { Object } user user data
	 * @returns { Promise <Model> } user
	 * @throws { ApiError<400> | ApiError<500> } If user data is invalid or registration fails
	 */
	async register(user, companyId) {

		logger.trace('=== Registering a new user ===');
		logger.trace(`[ Company id: ${companyId}, user data: ${JSON.stringify(user)} ]`);

		try {

			if (Object.keys(user).length === 0) {
				throw ApiError.badRequest('User data is required');
			} 
			
			if (!user.password) {
				throw ApiError.badRequest('Password is required');
			}

			user.password = await bcrypt.hash(user.password, 10);
	
			if (!user.city) {
				throw ApiError.badRequest('City name is required');
			}
	
			const userCity = await this.#cityRepository.findCityByName(user.city);

			if (!userCity) {
				throw ApiError.badRequest('Invalid city name');
			}
	
			user.idCity = userCity.idCity;
	
			user.companyId = companyId;

			const newUser = await this.#userRepository.createUser(user);

			logger.trace('=== User registered successfully ===');
			logger.trace(`[ User id: ${newUser.idUser} ]`);

			return newUser;

		} catch (error) {

			logger.error(error);

			if (error instanceof ValidationError) {
				throw ApiError.badRequest(error.message);
			}

			if (!(error instanceof ApiError)) {
				throw ApiError.internalServerError();
			}

			throw error;

		}

	}

}

module.exports = AuthService;
