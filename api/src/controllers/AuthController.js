const AuthService = require('../services/AuthService');

/**
 * Auth Controller class
 * 
 * Handles user authentication
 * @category Controllers
 */
class AuthController {

	/**
	 * Authenticates a user to register
	 * @param { Promise<Request> } req request
	 * @param { Promise<Response> } res response
	 */
	static async signUpAuth(req, res) {

		const { companyCode } = req.body;

		try {

			const authService = new AuthService();

			const registerToken = await authService.authenticateForRegister(companyCode);

			res.status(200).send({ registerToken });

		} catch (error) {

			res.status(error.status).send({ message: error.message });

		}

	}

	/**
	 * Register a authenticated user
	 * @param { Promise<Request> } req request
	 * @param { Promise<Response> } res response
	 */
	static async signUp(req, res) {

		let user = req.body;

		try {

			const authService = new AuthService();

			user = await authService.register(user, parseInt(req.headers['company-id']));

			res.status(201).send(user);

		} catch (error) {

			res.status(error.status).send({ message: error.message });

		}

	}

	/**
	 * Authenticates a user to use api
	 * @param { Promise<Request> } req request
	 * @param { Promise<Response> } res response
	 */
	static async signIn(req, res) {

		const { login, password } = req.body;

		try {

			const authService = new AuthService();

			const accessToken = await authService.authenticate(login, password);

			res.status(200).send({ accessToken });

		} catch (error) {

			res.status(error.status).send({ message: error.message });

		}

	}

}

module.exports = AuthController;
