const ApiError = require('../errors/ApiError');
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
	 * Find company by code
	 * @param { String } code 
	 * @returns { Model }
	 * @throws { ApiError<400> } If where parameter is invalid
	 */
	async findCompanyByCode(code) {

		try {

			const company = await super.getOneLazyElement({code: code});
			return company;
			
		} catch (error) {
			throw ApiError.badRequest(error.message);
		}

	}

}

module.exports = CompanyRepository;
