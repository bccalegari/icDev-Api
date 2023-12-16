const UserSignUpRequestDTO = require('./UserSignUpRequestDTO');
const UserSignUpResponseDTO = require('./UserSignUpResponseDTO');
const ApiError = require('../errors/ApiError');
const UserSignInRequestDTO = require('./UserSignInRequestDTO');

/**
 * User DTO Factory Class
 * 
 * Responsible for creating new DTO's in the user context
 */
class UserDTOFactory {

	/**
     * Create an new user DTO to use data in sign up
	 * @param { Object } userData User data
	 * @param { Model<City> } cityModel User city model
	 * @param { Number } idCompany User company id
	 * @throws { ApiError<400> } If user data is invalid
     * @returns { UserSignUpRequestDTO } createUserSignUpRequestDTO
     */
	createUserSignUpRequestDTO(userData, cityModel, idCompany) {

		if (Object.keys(userData).length === 0) {
			throw ApiError.badRequest('User data is required');
		} 

		const { name, lastName, login, password, cpf, street, streetNumber, district, complement, city, birthDate, phone, email } = userData;
		
		if (!password) {
			throw ApiError.badRequest('Password is required');
		}

		if (!city) {
			throw ApiError.badRequest('City is required');
		}

		if (!cityModel) {
			throw ApiError.badRequest('Invalid city name');
		}

		return new UserSignUpRequestDTO(name, lastName, login, password, cpf, street, streetNumber, 
			district, complement, birthDate, phone, email, cityModel.idCity, idCompany);
	}

	/**
     * Create an new user DTO to return data of sign up
     * @param { Model<User> } userModel User model
	 * @param { Model<City> } cityModel User city model
	 * @param { Model<Company> } idCompany User company model
     * @returns { UserSignUpResponseDTO } UserSignUpResponseDTO
     */
	createUserSignUpResponseDTO(userModel, cityModel, companyModel) {

		const { name, lastName, login, cpf, street, streetNumber, district, complement, birthDate, phone, email, createdAt } = userModel;

		return new UserSignUpResponseDTO(name, lastName, login, cpf, street, streetNumber, district, complement, cityModel.name, birthDate, phone, email, companyModel.name, createdAt);
	}

	/**
	 * Create an new user DTO to use data in sign in
	 * @param { String } login User login
	 * @param { String } password User password
	 * @returns { UserSignInRequestDTO } UserSignInRequestDTO
	 * @throws { ApiError<400> } If user data is invalid
	 */
	createUserSignInRequestDTO(login, password) {

		if (!login || !password) {
			throw ApiError.badRequest('Login and password are required');
		}

		return new UserSignInRequestDTO(login, password);
	}

}

module.exports = UserDTOFactory;
