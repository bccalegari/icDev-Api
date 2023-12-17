const AbstractRepository = require('./AbstractRepository');

/**
 * Api Key Repository Class
 * 
 * Responsible for intermediating between the business rule layer and data persistence in the api key context
 * @category Repositories
 * @extends AbstractRepository
 */
class ApiKeyRepository extends AbstractRepository {

	/**
     * Api Key Repository Class Constructor
     */
	constructor() {
		super('apiKey');
	}

	/**
	 * Find api key by id
	 * @param { Number } idApiKey api key id
	 * @returns { Promise<Model<ApiKey>> } api key model
	 */
	findApiKeyByIdApiKey(idApiKey) {
		return super._getLazyElementByPk(idApiKey);
	}

	/**
	 * Update api key
	 * @param { Number } idApiKey api key id
	 * @param { String } key new api key
	 * @returns { Promise<Model<ApiKey>> } api key updated model
	 */
	async updateApiKey(idApiKey, key) {
		return await super._updateElement({ key }, idApiKey);
	}

}

module.exports = ApiKeyRepository;
