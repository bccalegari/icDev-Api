const AbstractRepository = require('./AbstractRepository');

/**
 * Company Repository Class
 * 
 * Responsible for intermediating between the business rule layer and data persistence in the company context
 * @category Repositories
 * @extends AbstractRepository
 */
class CityRepository extends AbstractRepository {

	/**
     * Company Repository Class Constructor
     */
	constructor() {
		super('city');
	}
	
	/**
	 * Find city by name
	 * @param { String } name city name
	 * @returns { Promise<Model<City>> } city model
	 */
	async findCityByName(name) {
		return await super._getOneLazyElement({ name });
	}

}

module.exports = CityRepository;
