const AuthService = require('../services/AuthService');

const authService = new AuthService();

/**
 * Auth Controller class
 * 
 * Handles user authentication
 */
class AuthController {


	/**
	 * Authenticates a user to register
	 * @param { Request } req 
	 * @param { Response } res 
	 */
	static async signupAuth(req, res) {

		const { companyCode } = req.body;

		try {

			const registerToken = await authService.authenticateForRegister(companyCode);

			res.status(200).send({registerToken});

		} catch (error) {

			res.status(error.status).send({ message: error.message });

		}

	}

}

module.exports = AuthController;
