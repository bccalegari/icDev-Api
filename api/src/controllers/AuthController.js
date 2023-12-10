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
	 * @param { Promise<Request> } req 
	 * @param { Promise<Response> } res 
	 */
	static async signupAuth(req, res) {

		const { companyCode } = req.body;

		try {

			const registerToken = await authService.authenticateForRegister(companyCode);

			res.status(200).send({ registerToken });

		} catch (error) {

			res.status(error.status).send({ message: error.message });

		}

	}

	/**
	 * Register a authenticate user
	 * @param { Promise<Request> } req 
	 * @param { Promise<Response> } res 
	 */
	static async signup(req, res) {

		const companyId = req.params.companyId;
		let user = req.body;

		try {

			user = await authService.register(user, parseInt(companyId));

			res.status(201).send(user);

		} catch (error) {

			res.status(error.status).send({ message: error.message });

		}

	}

	/**
	 * Authenticates a user to use api
	 * @param { Promise<Request> } req 
	 * @param { Promise<Response> } res 
	 */
	static async signin(req, res) {

		const { login, password } = req.body;

		try {

			const accessToken = await authService.authenticate(login, password);

			res.status(200).send({ accessToken });

		} catch (error) {

			res.status(error.status).send({ message: error.message });

		}

	}

}

module.exports = AuthController;
