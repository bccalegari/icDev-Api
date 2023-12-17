const ApiKeyResponseDTO = require('./ApiKeyResponseDTO');

/**
 * Api Key DTO Factory Class
 * 
 * Responsible for creating new DTO's in the api key context
 * @category DTOs
 */
class ApiKeyDTOFactory {

	/**
	 * Create an new api key DTO to use data in response
	 * @param { Model<ApiKey> } apiKeyModel Api Key model
	 * @returns { ApiKeyResponseDTO } ApiKeyResponseDTO
	 */
	createApiKeyResponseDTO(apiKeyModel) {
		
		const { key } = apiKeyModel;

		const apiKeyResponseDTO = new ApiKeyResponseDTO(key);

		return apiKeyResponseDTO;
	
	}

}

module.exports = ApiKeyDTOFactory;
