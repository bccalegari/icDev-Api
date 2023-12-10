/**
 * User Before Sign Up DTO
 * 
 * Represents an user data to be used for registration
 */
class UserBeforeSignUpDTO {
    
	/**
     * User name
     * @type { String }
     */
	name;

	/**
     * User last name
     * @type { String }
     */
	lastName;

	/**
     * User login
     * @type { String }
     */
	login;

	/**
     * User password
     * @type { String }
     */
	password;

	/**
     * User cpf
     * @type { String }
     */
	cpf;

	/**
     * User street
     * @type { String }
     */
	street;

	/**
     * User street number
     * @type { Number }
     */
	streetNumber;

	/**
     * User district
     * @type { String }
     */
	district;

	/**
     * User birth date
     * @type { String }
     */
	birthDate;

	/**
     * User phone
     * @type { String }
     */
	phone;

	/**
     * User email
     * @type { String }
     */
	email;

	/**
     * User city id
     * @type { Number }
     */
	idCity;

	/**
     * User company id
     * @type { Number }
     */
	idCompany;

	/**
     * Class constructor
     * @param { Model } user 
     */
	constructor(name, lastName, login, password, cpf, street, streetNumber, district, birthDate, phone, email, idCity, idCompany) {
		this.name = name;
		this.lastName = lastName;
		this.login = login;
		this.password = password;
		this.cpf = cpf;
		this.street = street;
		this.streetNumber = streetNumber;
		this.district = district; 
		this.birthDate = birthDate;
		this.phone = phone;
		this.email = email;
		this.idCity = idCity;
		this.idCompany = idCompany;
	}

}

module.exports = UserBeforeSignUpDTO;
