const AbstractRepository = require('./AbstractRepository');

/**
 * Unit Type Repository Class
 * 
 * Responsible for intermediating between the business rule layer and data persistence in the unit type context
 * @category Repositories
 * @extends AbstractRepository
 */
class UnitTypeRepository extends AbstractRepository {

	/**
     * Unit Type Repository Class Constructor
     */
	constructor() {
		super('unitType');
	}

	/**
	 * Find all unit types
	 * @returns { Promise<Model<UnitType>> } unit type model
	 */
	async findAllUnitTypes() {
		return await super._getAllLazyElements();
	}

}

module.exports = UnitTypeRepository;
