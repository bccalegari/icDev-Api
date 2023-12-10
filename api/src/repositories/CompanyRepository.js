const AbstractRepository = require('./AbstractRepository');

/**
 * Company Repository Class
 * 
 * Responsible for intermediating between the business rule layer and data persistence in the company context
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
	 * @param { String } id 
	 * @returns { Promise<Model> }
	 */
	async findCompanyById(idCompany) {
		return await super.getOneLazyElement({ idCompany });
	}

	/**
	 * Find company by code
	 * @param { String } code 
	 * @returns { Promise<Model> }
	 */
	async findCompanyByCode(code) {
		return await super.getOneLazyElement({ code });
	}

}

module.exports = CompanyRepository;
