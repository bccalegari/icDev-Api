const AbstractRepository = require('./AbstractRepository');
const { Op } = require('sequelize');

/**
 * City Repository Class
 * 
 * Responsible for intermediating between the business rule layer and data persistence in the city context
 * @category Repositories
 * @extends AbstractRepository
 */
class CityRepository extends AbstractRepository {

	/**
     * City Repository Class Constructor
     */
	constructor() {
		super('city');
	}

	/**
	 * Find all cities paginated
	 * @param { string } cityName city name to be searched in query (like)
	 * @param { number } offset offset of cities query to be returned
	 * @param { number } limit limit of cities query to be returned
	 * @returns { Promise<Array<Model<City>>> } cities models
	 */
	async findAllCitiesPaginated(cityName, offset, limit) {

		if (cityName) {
			return await super._getAllEagerElements({ name: { [Op.like]: cityName } }, [ { model: this._getDatabaseModel('state'), include: [ 'country' ] } ], [], 
				{ offset: offset, limit: limit, order: [ ['name', 'ASC'], ['stateAcronym', 'ASC'] ] });
		} else {
			return await super._getAllEagerElements({}, [ { model: this._getDatabaseModel('state'), include: [ 'country' ] } ], [], 
				{ offset: offset, limit: limit, order: [ ['name', 'ASC'], ['stateAcronym', 'ASC'] ] });
		}
		
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
