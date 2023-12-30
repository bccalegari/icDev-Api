const bcrypt = require('bcryptjs');
const UserRepository = require('../repositories/UserRepository');
const { sign, verify } = require('jsonwebtoken');
const ApiError = require('../errors/ApiError');
const CompanyRepository = require('../repositories/CompanyRepository');
const CityRepository = require('../repositories/CityRepository');
const UserDTOFactory = require('../dtos/user/UserDTOFactory');
const { logger } = require('../utils/logger');
const UserTaxIdRepository = require('../repositories/UserTaxIdRepository');
const TaxIdDTOFactory = require('../dtos/taxId/TaxIdDTOFactory');
const TransactionManager = require('../db/utils/TransactionManager');

/**
 * Auth Service Class
 * 
 * Responsible for handling all business logic in the user auth context
 * @category Services
 */
class AuthService {

	/**
	 * User Repository
     * @private
     * @constant
     * @type { UserRepository }
     */
	#userRepository;

	/**
	 * Company Repository
     * @private
     * @constant
     * @type { CompanyRepository }
     */
	#companyRepository;

	/**
	 * City Repository
     * @private
     * @constant
     * @type { CityRepository }
     */
	#cityRepository;

	/**
	 * User DTO Factory
	 * @private
	 * @constant
	 * @type { UserDTOFactory }
	 */
	#userDTOFactory;

	/**
	 * User Tax Identification Repository
	 * @private
	 * @constant
	 * @type { UserTaxIdRepository }
	 */
	#userTaxIdRepository;

	/**
	 * Tax Identification DTO Factory
	 * @private
	 * @constant
	 * @type { TaxIdDTOFactory }
	 */
	#taxIdDTOFactory;

	/**
	 * Database transaction manager
	 * @private
	 * @constant
	 * @type { TransactionManager }
	 */
	#transactionManager;

	/**
     * Class constructor
     * 
     * Instantiates all necessary repositories and dto factories
     */
	constructor() {
		this.#userRepository = new UserRepository();
		this.#companyRepository = new CompanyRepository();
		this.#cityRepository = new CityRepository();
		this.#userDTOFactory = new UserDTOFactory();
		this.#userTaxIdRepository = new UserTaxIdRepository();
		this.#taxIdDTOFactory = new TaxIdDTOFactory();
		this.#transactionManager = new TransactionManager();
	}

	/**
     * Performs the user authentication to access
     * @param { String } login user login
     * @param { String } password user password
     * @returns { Promise<String> } jwt access token
     * @throws { ApiError<404> | ApiError<401>, | ApiError<500> } If user is not found, password is invalid or something goes wrong
     */
	async authenticate(login, password) {

		logger.trace('=== Authenticating user ===');

		logger.trace(`[ Login: ${login}, Password: ${password} ]`);

		try {

			const userSignInRequestDTO = this.#userDTOFactory.createUserSignInRequestDTO(login, password);
	
			const user = await this.#userRepository.findUserByLogin(userSignInRequestDTO.login);
	
			if (!user) {
				throw ApiError.notFound('User not found');
			}
	
			if (!(await bcrypt.compare(password, user.password))) {
				throw ApiError.unauthorized('Invalid login or password');
			}
	
			const accessToken = sign({ id: user.idUser }, user.company.apiKey.key, { expiresIn: 86400 });
			
			logger.trace('=== User authenticated to login ===');
			logger.trace(`[ Access token: ${accessToken} ]`);
	
			return accessToken;
			
		} catch (error) {

			logger.error(error);

			ApiError.handleError(error);

		}

	}

	/**
	 * Performs user authentication to register
	 * @param { String } companyCode company code
	 * @returns { Promise<String> } jwt register token
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

			ApiError.handleError(error);

		}
		
	}

	/**
	 * Validates the register token
	 * @param { String } registerToken 
	 * @param { Number } companyId
	 * @returns { Promise<Boolean> } Is authenticated ?
	 * @throws { ApiError<401> | ApiError<500> } If register token is invalid, company is not found or something goes wrong
	 */
	async validateRegisterToken(registerToken, companyId) {

		logger.trace('=== Validating register token ===');
		logger.trace(`[ Company id: ${companyId}, Register token: ${registerToken} ]`);

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
	 * Validates the access token
	 * @param { String } accessToken 
	 * @param { Number } companyId 
	 * @returns { Promise<Object> } JWT Payload
	 * @throws { ApiError<401> | ApiError<500> } If access token is invalid, company is not found or something goes wrong
	 */
	async validateAccessToken(accessToken, companyId) {

		logger.trace('=== Validating access token ===');
		logger.trace(`[ Company id: ${companyId}, Access token: ${accessToken} ]`);

		try {

			const company = await this.#companyRepository.findCompanyById(companyId);

			const apiKey = await company.getApiKey();

			if (!company) {
				throw ApiError.unauthorized('Invalid access token');
			}

			const payload = verify(accessToken, apiKey.key);

			logger.trace('=== Access token valited ===');
			logger.trace(`[ Payload: ${JSON.stringify(payload)}]`);

			return payload;

		} catch (error) {

			throw ApiError.unauthorized('Invalid access token');
		}
		
	}

	/**
	 * Perform user registration
	 * @param { Object } user user data
	 * @param { Number } companyId company id
	 * @returns { Promise<UserSignUpResponseDTO> } user 
	 * @throws { ApiError<400> | ApiError<500> } If user data is invalid or registration fails
	 */
	async register(user, companyId) {

		logger.trace('=== Registering a new user ===');
		logger.trace(`[ Company id: ${companyId}, User data: ${JSON.stringify(user)} ]`);

		const transaction = await this.#transactionManager.getTransaction();

		try {
	
			const userCity = await this.#cityRepository.findCityByName(user.city ?? null);

			const userSignUpRequestDTO = this.#userDTOFactory.createUserSignUpRequestDTO(user, userCity, companyId);

			userSignUpRequestDTO.password = await bcrypt.hash(userSignUpRequestDTO.password, 10);

			const newUser = await this.#userRepository.createUser(userSignUpRequestDTO, transaction);

			const newUserCity = await newUser.getCity();

			const newUserCountry = await newUserCity.getState().then(state => state.getCountry());

			if (await this.#userTaxIdRepository.findUserTaxIdByTaxIdAndIdCountry(user.taxId, newUserCountry.idCountry)) {
				throw ApiError.badRequest('Tax id already exists');
			}

			const newUserTaxIdentificationDTO = this.#taxIdDTOFactory.createUserTaxIdDTO(user.taxId, newUser.idUser, newUserCountry.idCountry);

			const newUserTaxIdentification = await this.#userTaxIdRepository.createUserTaxId(newUserTaxIdentificationDTO, transaction);

			const newUserCompany = await newUser.getCompany();

			const userSignUpResponseDTO = this.#userDTOFactory.createUserSignUpResponseDTO(newUser, newUserTaxIdentification, newUserCity, newUserCompany);

			logger.trace('=== User registered successfully ===');
			logger.trace(`[ User id: ${newUser.idUser} ]`);

			await transaction.commit();

			return userSignUpResponseDTO;

		} catch (error) {

			await transaction.rollback();

			logger.error(error);

			ApiError.handleError(error);

		}

	}

}

module.exports = AuthService;
