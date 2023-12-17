const CompanyService = require('../services/CompanyService');
const companyService = new CompanyService();

/**
 * Company Controller class
 * 
 * Handles company management
 * @category Controllers
 */
class CompanyController {

	/**
	 * Get company
	 * @param { Promise<Request> } req request
	 * @param { Promise<Response> } res response
	 */
	static async getCompany(req, res) {

		try {

			const company = await companyService.getUserCompany(req.headers['company-id'], req.headers['user-id']);

			res.status(200).send(company);

		} catch (error) {

			res.status(error.status).send({ message: error.message });

		}

	}

	/**
	 * Generate a new company api key
	 * @param { Promise<Request> } req request
	 * @param { Promise<Response> } res response
	 */
	static async newApiKey(req, res) {

		try {

			const newApiKey = await companyService.generateNewUserCompanyApiKey(req.headers['company-id'], req.headers['user-id']);

			res.status(200).send(newApiKey);

		} catch (error) {

			res.status(error.status).send({ message: error.message });

		}

	}

}

module.exports = CompanyController;
