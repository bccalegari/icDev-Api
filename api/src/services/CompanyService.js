const ApiKeyRepository = require('../repositories/ApiKeyRepository');
const CompanyRepository = require('../repositories/CompanyRepository');
const CompanyDTOFactory = require('../dtos/company/CompanyDTOFactory');
const ApiError = require('../errors/ApiError');
const { logger } = require('../utils/logger');
const ApiKeyDTOFactory = require('../dtos/apikey/ApiKeyDTOFactory');
const { randomBytes } = require('crypto');

/**
 * Company Service Class
 * 
 * Responsible for handling all business logic in the company context
 * @category Services
 */
class CompanyService {

	/**
     * Company Repository
     * @private
     * @constant
     * @type { CompanyRepository }
     */
	#companyRepository;

	/**
     * Api Key Repository
     * @private
     * @constant
     * @type { ApiKeyRepository }
     */
	#apiKeyRepository;

	/**
      * Company DTO Factory
      * @private
      * @constant
      * @type { CompanyDTOFactory }
      */
	#companyDTOFactory;

	/**
	 * Api Key DTO Factory
	 * @private
	 * @constant
	 * @type { ApiKeyDTOFactory }
	 */
	#apiKeyDTOFactory;

	/**
     * Class constructor
     * 
     * Instantiates all necessary repositories
     */
	constructor() {
		this.#companyRepository = new CompanyRepository();
		this.#apiKeyRepository = new ApiKeyRepository();
		this.#companyDTOFactory = new CompanyDTOFactory();
		this.#apiKeyDTOFactory = new ApiKeyDTOFactory();
	}

	/**
	 * Get user company
	 * @param { Number } companyId user company id
	 * @param { Number } userId user id
	 * @returns { Promise<CompanyResponseDTO> } user company
	 */
	async getUserCompany(companyId, userId) {

		logger.trace('=== Getting user company ===');
		logger.trace(`[ Company id: ${companyId}, User id: ${userId} ]`);

		try {

			const userCompany = await this.#companyRepository.findCompanyById(companyId);

			const userCompanyResponseDTO = this.#companyDTOFactory.createCompanyResponseDTO(userCompany);

			logger.trace('=== User company get with success ===');
			logger.trace(`[ User company: ${JSON.stringify(userCompanyResponseDTO)}]`);
               
			return userCompanyResponseDTO;

		} catch (error) {

			logger.error(error);

			ApiError.handleError(error);

		}

	}

	/**
	 * Get user company api key
	 * @param { Number } companyId user company id
	 * @param { Number } userId user id
	 * @returns { Promise<ApiKeyResponseDTO> } user company api key
	 */
	async getUserCompanyApiKey(companyId, userId) {

		logger.trace('=== Getting user company api key ===');
		logger.trace(`[ Company id: ${companyId}, User id: ${userId} ]`);

		try {

			const userCompany = await this.#companyRepository.findCompanyById(companyId);

			const userCompanyApiKey = await userCompany.getApiKey();

			const userCompanyApiKeyResponseDTO = this.#apiKeyDTOFactory.createApiKeyResponseDTO(userCompanyApiKey);

			logger.trace('=== User company api key get with success ===');
			logger.trace(`[ User company api key: ${JSON.stringify(userCompanyApiKeyResponseDTO)}]`);

			return userCompanyApiKeyResponseDTO;

		} catch (error) {

			logger.error(error);

			ApiError.handleError(error);

		}

	}	

	/**
	 * Generate a new api key
	 * @param { Number } companyId user company id
	 * @param { Number } userId user id
	 * @returns { Promise<ApiKeyResponseDTO> } newApiKey
	 * @throws { ApiError<500> } If an error occurs while generating a new api key
	 */
	async generateNewUserCompanyApiKey(companyId, userId) {

		logger.trace('=== Generating new api key ===');
		logger.trace(`[ Company id: ${companyId}, User id: ${userId} ]`);
		
		try {

			const newKey = (randomBytes((Math.ceil(16 / 2))).toString('hex')).substring(0, 16);

			const userCompany = await this.#companyRepository.findCompanyById(companyId);

			const userCompanyApiKey = await userCompany.getApiKey();

			const isApiKeyUpdated = await this.#apiKeyRepository.updateApiKey(userCompanyApiKey.idApiKey, newKey);

			if (!isApiKeyUpdated) {
				throw ApiError.internalServerError('Error generating new api key');
			}

			const newApiKey = await this.#apiKeyRepository.findApiKeyByIdApiKey(userCompanyApiKey.idApiKey);

			const userCompanyApiKeyResponseDTO = this.#apiKeyDTOFactory.createApiKeyResponseDTO(newApiKey);

			logger.trace('=== New api key generated with success ===');
			logger.trace(`[ New api key: ${JSON.stringify(userCompanyApiKeyResponseDTO)}]`);

			return userCompanyApiKeyResponseDTO;

		} catch (error) {

			logger.error(error);

			ApiError.handleError(error);

		}

	}

}

module.exports = CompanyService;
