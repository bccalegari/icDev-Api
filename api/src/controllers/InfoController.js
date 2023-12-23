const InfoService = require('../services/InfoService');

/**
 * Info Controller class
 * 
 * Handles all static information that can be consulted to be used in other requests
 * @category Controllers
 */
class InfoController {

	/**
	 * List all cities
	 * @param { Promise<Request> } req request
	 * @param { Promise<Response> } res response
	 */
	static async listAllCities(req, res) {

		const { city, offset } = req.query;

		try {

			const infoService = new InfoService();

			const cities = await infoService.getAllCities(city, offset);

			res.status(200).send(cities);

		} catch (error) {

			res.status(error.status).send({ message: error.message });

		}

	}

	/**
	 * List all unit types
	 * @param { Promise<Request> } req request
	 * @param { Promise<Response> } res response
	 */
	static async listAllUnitTypes(req, res) {
		
		try {

			const infoService = new InfoService();

			const unitTypes = await infoService.getAllUnitTypes();

			res.status(200).send(unitTypes);

		} catch (error) {

			res.status(error.status).send({ message: error.message });

		}

	}

}

module.exports = InfoController;
