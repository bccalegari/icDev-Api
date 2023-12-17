const AbstractRepository = require('./AbstractRepository');

/**
 * Company Repository Class
 * 
 * Responsible for intermediating between the business rule layer and data persistence in the company context
 * @category Repositories
 * @extends AbstractRepository
 */
class CompanyRepository extends AbstractRepository {

	/**
     * Company Repository Class Constructor
     */
	constructor() {
		super('company');
	}

	/**
	 * Find company by id
	 * @param { String } idCompany id of the company
	 * @returns { Promise<Model<Company>> } company model
	 */
	async findCompanyById(idCompany) {
		return await super._getLazyElementByPk(idCompany);
	}

	/**
	 * Find company by code
	 * @param { String } code code of the company
	 * @returns { Promise<Model<Company>>  } company model
	 */
	async findCompanyByCode(code) {
		return await super._getOneLazyElement({ code });
	}

}

module.exports = CompanyRepository;
