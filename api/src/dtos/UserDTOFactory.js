const UserBeforeSignUpDTO = require('./UserBeforeSignUpDTO');
const UserAfterSignUpDTO = require('./UserAfterSignUpDTO');
const ApiError = require('../errors/ApiError');

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
     * @returns { UserBeforeSignUpDTO } UserBeforeSignUpDTO
     */
	createUserBeforeSignUpDTO(userData, cityModel, idCompany) {

		if (Object.keys(userData).length === 0) {
			throw ApiError.badRequest('User data is required');
		} 

		const { name, lastName, login, password, cpf, street, streetNumber, district, city, birthDate, phone, email } = userData;
		
		if (!password) {
			throw ApiError.badRequest('Password is required');
		}

		if (!city) {
			throw ApiError.badRequest('City is required');
		}

		if (!cityModel) {
			throw ApiError.badRequest('Invalid city name');
		}

		return new UserBeforeSignUpDTO(name, lastName, login, password, cpf, street, streetNumber, 
			district, birthDate, phone, email, cityModel.idCity, idCompany);
	}

	/**
     * Create an new user DTO to return data of sign up
     * @param { Model<User> } userModel User model
	 * @param { Model<City> } cityModel User city model
	 * @param { Model<Company> } idCompany User company model
     * @returns { UserAfterSignUpDTO } UserAfterSignUpDTO
     */
	createUserAfterSignUpDTO(userModel, cityModel, companyModel) {

		const { name, lastName, login, cpf, street, streetNumber, district, birthDate, phone, email, createdAt } = userModel;

		return new UserAfterSignUpDTO(name, lastName, login, cpf, street, streetNumber, district, cityModel.name, birthDate, phone, email, companyModel.name, createdAt);
	}

}

module.exports = UserDTOFactory;
